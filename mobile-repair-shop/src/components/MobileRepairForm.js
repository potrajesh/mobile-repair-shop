// MobileRepairForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRepair } from '../redux/actions';

const MobileRepairForm = () => {
  const [form, setForm] = useState({
    modelNumber: '',
    companyName: '',
    typeOfRepair: '',
    costOfRepair: '',
    totalAmount: '',
    dateOfReceived: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRepair(form));
    setForm({
      modelNumber: '',
      companyName: '',
      typeOfRepair: '',
      costOfRepair: '',
      totalAmount: '',
      dateOfReceived: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div>
        <label>Model Number: </label>
        <input type="text" name="modelNumber" value={form.modelNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Company Name: </label>
        <input type="text" name="companyName" value={form.companyName} onChange={handleChange} required />
      </div>
      <div>
        <label>Type of Repair: </label>
        <input type="text" name="typeOfRepair" value={form.typeOfRepair} onChange={handleChange} required />
      </div>
      <div>
        <label>Cost of Repair: </label>
        <input type="number" name="costOfRepair" value={form.costOfRepair} onChange={handleChange} required />
      </div>
      <div>
        <label>Total Amount: </label>
        <input type="number" name="totalAmount" value={form.totalAmount} onChange={handleChange} required />
      </div>
      <div>
        <label>Date Received: </label>
        <input type="date" name="dateOfReceived" value={form.dateOfReceived} onChange={handleChange} required />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
    </form>
  );
};

export default MobileRepairForm;
