import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddMobileRepairForm from './components/AddMobileRepairForm';
import UpdateMobileRepairForm from './components/UpdateMobileRepairForm';
import DeleteMobileRepairForm from './components/DeleteMobileRepairForm';
import ShowAllMobileRepairs from './components/ShowAllMobileRepairs';
import repairReducer from './redux/reducer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OutlistPage from './components/Outlistpage';
import LargeSquareButton from './components/LargeSquareButton';
import UnderRepairPage from './components/UnderRepairPage';


function App() {
  return (
    
    <Router>
      <div>
        <Navbar />
<div style={{ padding: '20px' }}>
                   <Routes>
            <Route path="/add" element={<AddMobileRepairForm />} />
            <Route path="/update" element={<UpdateMobileRepairForm />} />
            <Route path="/delete" element={<DeleteMobileRepairForm />} />
            <Route path="/showall" element={<ShowAllMobileRepairs />} />
            <Route path="/outlist" element={<OutlistPage />} />
            <Route path='underrepair' element={<UnderRepairPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  
  );
}

export default App;
