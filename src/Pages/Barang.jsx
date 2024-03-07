import React from 'react';
import Navbar from '../Components/Layouts/Navbar';
import BarangLayouts from '../Components/Layouts/BarangLayouts';

function Barang() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <BarangLayouts />
      </div>
    </>
  );
}

export default Barang;
