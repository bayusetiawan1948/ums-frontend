import React from 'react';
import Navbar from '../Components/Layouts/Navbar';
import PelangganLayout from '../Components/Layouts/PelangganLayout';

function Pelanggan() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <PelangganLayout />
      </div>
    </>
  );
}

export default Pelanggan;
