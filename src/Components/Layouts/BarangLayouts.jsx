import React, { useState, useEffect } from 'react';
import CardBarang from '../Fragments/CardBarang';
import { Link } from 'react-router-dom';
import instance from '../api/main';

function BarangLayouts() {
  let i = 0;
  const [data, setData] = useState([]);
  const handlingSetData = (value) => {
    setData(value);
  };
  const handlingDeleteClicked = (condition) => {
    if (condition) {
      const handlingFetching = async () => {
        const url = 'http://127.0.0.1:8000/api/barang';
        const result = await instance.get(url);
        handlingSetData(result.data.data);
      };
      handlingFetching();
    }
  };
  useEffect(() => {
    const handlingFetching = async () => {
      const url = 'http://127.0.0.1:8000/api/barang';
      const result = await instance.get(url);
      handlingSetData(result.data.data);
    };
    handlingFetching();
  }, []);
  return (
    <div>
      <button className="bg-blue-500 text-white rounded-lg px-4 py-3 my-3 hover:bg-blue-300">
        <Link to={'/barang/create'}>Tambah</Link>
      </button>
      <div className="flex flex-wrap justify-center items-center gap-3 max-w-5xl">
        {data.map((value) => {
          i++;
          return (
            <CardBarang
              show="sales"
              data={value}
              key={i}
              onClickedDelete={handlingDeleteClicked}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BarangLayouts;
