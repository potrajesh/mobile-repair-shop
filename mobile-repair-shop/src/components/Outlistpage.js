import React, { useEffect, useState } from 'react';

const OutlistPage = () => {
  const [selectedRepairs, setSelectedRepairs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [checkedRepairs, setCheckedRepairs] = useState({}); // State to track checked repairs

  useEffect(() => {
    // Retrieve repairs from localStorage if available
    const savedRepairs = JSON.parse(localStorage.getItem('outlistRepairs')) || [];
    setSelectedRepairs(savedRepairs);
  }, []);

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

  // Filter repairs based on the search query across all fields
  const filteredRepairs = selectedRepairs.filter((repair) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      repair.modelNumber.toLowerCase().includes(searchLower) ||
      repair.companyName.toLowerCase().includes(searchLower) ||
      repair.typeOfRepair.toLowerCase().includes(searchLower) ||
      repair.costOfRepair.toString().toLowerCase().includes(searchLower) ||
      repair.dateOfReceived.toLowerCase().includes(searchLower)
    );
  });

  // Function to handle checkbox change
  const handleCheckboxChange = (modelNumber) => {
    setCheckedRepairs((prev) => ({
      ...prev,
      [modelNumber]: !prev[modelNumber], // Toggle the checked state
    }));
  };

  // Function to delete selected repairs
  const handleDeleteSelected = () => {
    // Get model numbers of checked repairs
    const repairsToDelete = Object.keys(checkedRepairs).filter(modelNumber => checkedRepairs[modelNumber]);

    // Filter out the selected repairs
    const updatedRepairs = selectedRepairs.filter(repair => !repairsToDelete.includes(repair.modelNumber));
    setSelectedRepairs(updatedRepairs);

    // Update localStorage
    localStorage.setItem('outlistRepairs', JSON.stringify(updatedRepairs));

    // Clear checked repairs
    setCheckedRepairs({});
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Under Outlist</h3>

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
              <th>Select</th> {/* Checkbox header */}
              <th>Model/Mobile Number</th>
              <th>Company Name</th>
              <th>Type of Repair</th>
              <th>Cost of Repair</th>
              <th>Date and Time Received</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepairs.length > 0 ? (
              filteredRepairs.map((repair, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!checkedRepairs[repair.modelNumber]} // Check if the repair is selected
                      onChange={() => handleCheckboxChange(repair.modelNumber)} // Call the checkbox change handler
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
                <td colSpan="6" className="text-center">No repairs match the search criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Selected Button */}
      <button
        className="btn btn-danger mb-3"
        onClick={handleDeleteSelected}
        disabled={!Object.values(checkedRepairs).some(Boolean)} // Disable button if no repairs are selected
      >
        Delete Selected
      </button>
    </div>
  );
};

export default OutlistPage;
