import React from 'react';
import Navbar from '../Components/Layouts/Navbar';
import PelangganForm from '../Components/Layouts/PelangganForm';
import { useParams } from 'react-router-dom';

function CreatePelanggan() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center px-4">
        <p className="font-bold text-xl my-4">
          {id ? 'Update Pelanggan' : 'Buat Pelanggan'}
        </p>
        <div className="self-start w-full md:self-center max-w-xl">
          <PelangganForm />
        </div>
      </div>
    </>
  );
}

export default CreatePelanggan;
