import React from 'react';
import RiceClassification from './pages/RiceClassification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <RiceClassification />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;