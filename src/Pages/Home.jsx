import React from 'react';
import Navbar from '../Components/Layouts/Navbar';
import ShowPenjualan from '../Components/Layouts/ShowPenjualan';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="my-3">
          <p className="font-semibold text-2xl px-3">Riwayat Penjualan</p>
        </div>
        <div className="max-w-lg flex justify-center">
          <ShowPenjualan />
        </div>
      </div>
    </div>
  );
}

export default Home;
