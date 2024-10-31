import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRepair } from '../redux/actions'; // Ensure this action is defined

const AddMobileRepairForm = () => {
  const [form, setForm] = useState({
    modelNumber: '',
    companyName: '',
    typeOfRepair: '',
    costOfRepair: '',
    dateOfReceived: new Date().toISOString().slice(0, 16), // Current IST datetime
  });

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(form.costOfRepair)) {
      alert("Cost must be a valid number.");
      return;
    }
    dispatch(addRepair(form));
    setForm({
      modelNumber: '',
      companyName: '',
      typeOfRepair: '',
      costOfRepair: '',
      dateOfReceived: new Date().toISOString().slice(0, 16),
    });
  };

  return (
    <div>
      <style>
        {`
          body {
            margin: 0; /* Remove body margin */
            padding: 0; /* Remove body padding */
          }
          
          .container {
            margin-top: 0; /* Remove any margin at the top */
            padding-top: 0; /* Remove any padding at the top */
          }

          form {
            margin-top: 0; /* Remove any margin at the top of the form */
          }
        `}
      </style>

      <div className="container d-flex justify-content-center align-items-start vh-100" style={{ paddingTop: '0', margin: '0' }}>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm" style={{ maxWidth: '400px', marginTop: '0' }}>
          <h3 className="text-center mb-4">Add Mobile Repair</h3>
          {['modelNumber', 'companyName', 'typeOfRepair', 'costOfRepair', 'dateOfReceived'].map((field, index) => (
            <div className="form-group" key={index}>
              <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
              <input
                type={field === 'costOfRepair' ? 'number' : field === 'dateOfReceived' ? 'datetime-local' : 'text'}
                className="form-control"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100 mt-3">Add Repair</button>
        </form>
      </div>
    </div>
  );
};

export default AddMobileRepairForm;
