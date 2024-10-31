import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteRepairs } from '../redux/actions'; // Ensure this action is defined

const ShowAllMobileRepairs = () => {
  const repairs = useSelector((state) => state.repairs.repairs || []); // Accessing repairs correctly
  
  console.log('Updated repairs state:', repairs);  // Log the updated state
  const navigate = useNavigate();    
  const dispatch = useDispatch();  // Hook to dispatch actions

  const [selectedRepairs, setSelectedRepairs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  // Filter repairs based on the search query across all fields
  const searchedRepairs = repairs.filter((repair) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      repair.modelNumber.toLowerCase().includes(searchLower) ||
      repair.companyName.toLowerCase().includes(searchLower) ||
      repair.typeOfRepair.toLowerCase().includes(searchLower) ||
      repair.costOfRepair.toString().toLowerCase().includes(searchLower) ||
      repair.dateOfReceived.toLowerCase().includes(searchLower)
    );
  });

  // Calculate total cost for all displayed repairs
  const totalCostForRepairs = searchedRepairs.reduce((acc, repair) => acc + parseFloat(repair.costOfRepair || 0), 0);

  const handleCheckboxChange = (repair) => {
    if (selectedRepairs.includes(repair)) {
      setSelectedRepairs(selectedRepairs.filter((r) => r !== repair));
    } else {
      setSelectedRepairs([...selectedRepairs, repair]);
    }
  };

  const handleMoveSelectedToOutlist = () => {
    const existingRepairs = JSON.parse(localStorage.getItem('outlistRepairs')) || [];
    const updatedRepairs = [
      ...existingRepairs,
      ...selectedRepairs.filter(
        (selected) => !existingRepairs.some((existing) => existing.modelNumber === selected.modelNumber)
      ),
    ];
    localStorage.setItem('outlistRepairs', JSON.stringify(updatedRepairs));
    navigate('/outlist');
  };

  const handleMoveSelectedToUnderRepair = () => {
    const existingRepairs = JSON.parse(localStorage.getItem('underRepairRepairs')) || [];
    const updatedRepairs = [
      ...existingRepairs,
      ...selectedRepairs.filter(
        (selected) => !existingRepairs.some((existing) => existing.modelNumber === selected.modelNumber)
      ),
    ];
    localStorage.setItem('underRepairRepairs', JSON.stringify(updatedRepairs));
    navigate('/underrepair');
  };

  const handleDeleteSelected = () => {
    // Dispatch an action to delete selected repairs
    const repairsToDelete = selectedRepairs.map(repair => repair.modelNumber);
    console.log('Repairs to delete:', repairsToDelete); // Debugging line
    dispatch(deleteRepairs(repairsToDelete));  // Implement this action in Redux

    // Clear selected repairs after deletion
    setSelectedRepairs([]);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(',', '');
  };

  return (
    <div className="container mt-4">
      <h5 className="text-center">Total Cost for Repairs: ${totalCostForRepairs.toFixed(2)}</h5>

      {/* Search Input */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by any field"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Select</th> {/* Add a select column */}
              <th>Model/Mobile Number</th>
              <th>Company Name</th>
              <th>Type of Repair</th>
              <th>Cost of Repair</th>
              <th>Date and Time Received</th>
            </tr>
          </thead>
          <tbody>
            {searchedRepairs.length > 0 ? (
              searchedRepairs.map((repair, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRepairs.includes(repair)}
                      onChange={() => handleCheckboxChange(repair)}
                    />
                  </td>
                  <td>{repair.modelNumber}</td>
                  <td>{repair.companyName}</td>
                  <td>{repair.typeOfRepair}</td>
                  <td>{repair.costOfRepair}</td>
                  <td>{formatDateTime(repair.dateOfReceived)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No repairs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Buttons to move selected repairs */}
      <div className="text-center">
        <button
          className="btn btn-info mx-1"
          onClick={handleMoveSelectedToOutlist}
          disabled={selectedRepairs.length === 0}
        >
          Move Selected to Outlist
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={handleMoveSelectedToUnderRepair}
          disabled={selectedRepairs.length === 0}
        >
          Move Selected to Under Repair
        </button>
        <button
          className="btn btn-danger mx-1"
          onClick={handleDeleteSelected}
          disabled={selectedRepairs.length === 0}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};
export default ShowAllMobileRepairs;
