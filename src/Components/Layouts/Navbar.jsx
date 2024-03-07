import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
function Navbar() {
  const [nav, setNav] = useState(true);
  const handlingBurger = () => {
    setNav(!nav);
  };
  return (
    <div className="mb-4">
      <div className="hidden md:flex flex-row justify-center items-center gap-8 py-4 bg-blue-500 text-white font-medium">
        <Link
          to="/"
          className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
        >
          <div>Home</div>
        </Link>
        <Link
          to="/barang"
          className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
        >
          <div>Barang</div>
        </Link>
        <Link
          to="/pelanggan"
          className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
        >
          <div>Pelanggan</div>
        </Link>
        <Link
          to="/penjualan"
          className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
        >
          <div>Penjualan</div>
        </Link>
      </div>
      <div className="flex flex-col px-3 py-4 bg-blue-500 text-white font-medium md:hidden">
        <div className={`${nav ? 'flex' : 'hidden'}  flex-row justify-between`}>
          <p className="font-bold">Bayu Setiawan</p>
          <List size={32} weight="bold" onClick={handlingBurger} />
        </div>
        <div
          className={`${
            nav ? 'hidden' : 'flex'
          } flex flex-col justify-start gap-4 bg-blue-500 rounded-lg`}
        >
          <div className={`flex flex-row justify-between`}>
            <p className="font-bold">Bayu Setiawan</p>
            <X size={32} weight="bold" onClick={handlingBurger} />
          </div>
          <Link
            to="/"
            className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
          >
            <div>Home</div>
          </Link>
          <Link
            to="/barang"
            className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
          >
            <div>Barang</div>
          </Link>
          <Link
            to="/pelanggan"
            className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
          >
            <div>Pelanggan</div>
          </Link>
          <Link
            to="/penjualan"
            className="px-4 py-2 border-2 border-white rounded-xl hover:bg-white hover:text-blue-500"
          >
            <div>Penjualan</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
