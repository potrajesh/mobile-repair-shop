import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRepair, deleteRepairs, updateRepair } from '../redux/actions'; // Import your actions

const ShowAllMobileRepairs = () => {
  const repairs = useSelector((state) => state.repairs);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [editingMobileNumber, setEditingMobileNumber] = useState(null); // Track which mobile number is being edited
  const [formData, setFormData] = useState({}); // Store form data for updating

  const today = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Filter repairs based on selected filter criteria
  const filteredRepairs = repairs.filter((repair) => {
    const repairDate = new Date(repair.dateOfReceived);
    const repairYear = repairDate.getFullYear();
    const repairMonth = repairDate.getMonth() + 1;
    const repairDay = repairDate.toISOString().split('T')[0];

    if (filter === 'today') return repairDay === today;
    if (filter === 'month') return repairYear === currentYear && repairMonth === currentMonth;
    if (filter === 'year') return repairYear === currentYear;
    return true; // Return all if filter is 'all'
  });

  // Calculate total amount of filtered repairs
  const totalAmount = filteredRepairs.reduce((acc, repair) => acc + parseFloat(repair.amount || 0), 0);

  // Handle delete action
  const handleDelete = (mobileNumber) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this repair entry?");
    if (confirmDelete) {
      dispatch(deleteRepairs(mobileNumber));
    }
  };

  // Handle edit action
  const handleEdit = (mobileNumber) => {
    const repairToEdit = repairs.find((repair) => repair.mobileNumber === mobileNumber);
    setEditingMobileNumber(mobileNumber);
    setFormData({ ...repairToEdit }); // Populate form with the selected repair
  };

  // Handle update action
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateRepair(editingMobileNumber, formData)); // Dispatch the update action
    setEditingMobileNumber(null); // Reset editing mobile number
    setFormData({}); // Reset form data
  };

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update form data for the specific field
  };

  return (
    <div className="container mt-4">
      <h3>All Mobile Repairs</h3>

      {/* Filter Buttons */}
      <div className="mb-3">
        <button className="btn btn-primary mr-2" onClick={() => setFilter('today')}>
          Today's Repairs
        </button>
        <button className="btn btn-secondary mr-2" onClick={() => setFilter('month')}>
          This Month's Repairs
        </button>
        <button className="btn btn-info mr-2" onClick={() => setFilter('year')}>
          This Year's Repairs
        </button>
        <button className="btn btn-dark" onClick={() => setFilter('all')}>
          All Repairs
        </button>
      </div>

      {/* Display the Total Amount */}
      <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Model Number</th>
              <th>Company Name</th>
              <th>Type of Repair</th>
              <th>Cost of Repair</th>
              <th>Amount</th>
              <th>Date of Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepairs.length > 0 ? (
              filteredRepairs.map((repair) => (
                <tr key={repair.mobileNumber}> {/* Use mobile number as the key */}
                  <td>{repair.modelNumber}</td>
                  <td>{repair.companyName}</td>
                  <td>{repair.typeOfRepair}</td>
                  <td>{repair.costOfRepair}</td>
                  <td>{repair.amount}</td>
                  <td>{repair.dateOfReceived}</td>
                  <td>
                    <button className="btn btn-warning mr-2" onClick={() => handleEdit(repair.mobileNumber)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(repair.mobileNumber)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No repairs available for the selected period
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Form Modal (shown below the table) */}
      {editingMobileNumber && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h5>Update Repair Details</h5>
          <div className="form-group">
            <label>Model Number:</label>
            <input
              type="text"
              name="modelNumber"
              value={formData.modelNumber || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Type of Repair:</label>
            <input
              type="text"
              name="typeOfRepair"
              value={formData.typeOfRepair || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Cost of Repair:</label>
            <input
              type="number"
              name="costOfRepair"
              value={formData.costOfRepair || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Date of Received:</label>
            <input
              type="date"
              name="dateOfReceived"
              value={formData.dateOfReceived || ''}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success">Update Repair</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditingMobileNumber(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ShowAllMobileRepairs;
