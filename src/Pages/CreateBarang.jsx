import React from 'react';
import Navbar from '../Components/Layouts/Navbar';
import BarangForm from '../Components/Layouts/BarangForm';
import { useParams } from 'react-router-dom';

function CreateBarang() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center px-4">
        <p className="font-bold text-xl my-4">
          {id ? 'Update Barang' : 'Buat Barang'}
        </p>
        <div className="self-start w-full md:self-center max-w-xl">
          <BarangForm />
        </div>
      </div>
    </>
  );
}

export default CreateBarang;
