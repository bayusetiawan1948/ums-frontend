import React from 'react';
import Navbar from '../Components/Layouts/Navbar';
import PenjualanSelling from '../Components/Layouts/PenjualanSelling';

function Penjualan() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <PenjualanSelling />
      </div>
    </>
  );
}

export default Penjualan;
