import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveToOutlist, deleteRepair } from '../redux/actions';

const ShowRepairs = () => {
  const repairs = useSelector((state) => state.repairs);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>All Mobile Repairs</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Model Number</th>
            <th>Company Name</th>
            <th>Type of Repair</th>
            <th>Cost of Repair</th>
            <th>Amount</th>
            <th>Date and Time Received</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((repair, index) => (
            <tr key={index}>
              <td>{repair.modelNumber}</td>
              <td>{repair.companyName}</td>
              <td>{repair.typeOfRepair}</td>
              <td>{repair.cost}</td>
              <td>{repair.amount}</td>
              <td>{repair.dateReceived}</td>
              <td>
                <button
                  className="btn btn-warning mx-1"
                  onClick={() => dispatch(moveToOutlist(index))}
                >
                  Move to Outlist
                </button>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => dispatch(deleteRepair(index))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRepairs;
