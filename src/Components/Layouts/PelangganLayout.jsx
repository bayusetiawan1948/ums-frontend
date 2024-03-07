import React, { useState, useEffect } from 'react';
import ListPelanggan from '../Fragments/ListPelanggan';
import { Link } from 'react-router-dom';
import instance from '../api/main';

function PelangganLayout() {
  let i = 0;
  const [data, setData] = useState([]);
  const handlingSetData = (value) => {
    setData(value);
  };
  const handlingDeleteClicked = (condition) => {
    if (condition) {
      const handlingFetching = async () => {
        const url = 'http://127.0.0.1:8000/api/pelanggan';
        const result = await instance.get(url);
        handlingSetData(result.data.data);
      };
      handlingFetching();
    }
  };
  useEffect(() => {
    const handlingFetching = async () => {
      const url = 'http://127.0.0.1:8000/api/pelanggan';
      const result = await instance.get(url);
      handlingSetData(result.data.data);
    };
    handlingFetching();
  }, []);
  return (
    <div className="px-4 flex flex-col justify-center items-center">
      <button className="bg-blue-500 text-white rounded-lg w-full py-3 my-3 hover:bg-blue-300">
        <Link to={'/pelanggan/create'}>Tambah</Link>
      </button>
      <div className="flex flex-col justify-between items-center w-full">
        {data.map((value) => {
          i++;
          return (
            <ListPelanggan
              key={i}
              data={value}
              onClickedDelete={handlingDeleteClicked}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PelangganLayout;
