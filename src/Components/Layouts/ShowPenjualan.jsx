import React, { useEffect, useState } from 'react';
import Disclosure from '../Fragments/Disclosure';
import instance from '../api/main';
function ShowPenjualan() {
  let i = 0;
  const [data, setData] = useState([]);
  const handlingSetData = (value) => {
    setData(value);
  };
  const handlingDeleteClicked = (condition) => {
    if (condition) {
      const handlingFetching = async () => {
        const url = 'http://127.0.0.1:8000/api/penjualan';
        const result = await instance.get(url);
        handlingSetData(result.data.data);
      };
      handlingFetching();
    }
  };
  useEffect(() => {
    const handlingFetching = async () => {
      const url = 'http://127.0.0.1:8000/api/penjualan';
      const result = await instance.get(url);
      handlingSetData(result.data.data);
    };
    handlingFetching();
  }, []);
  return (
    <div className="px-3 w-72 md:w-96 flex flex-col justify-center items-center gap-3">
      {data.map((value) => {
        i++;
        return (
          <Disclosure
            key={i}
            data={value}
            onClickedDelete={handlingDeleteClicked}
          />
        );
      })}
    </div>
  );
}

export default ShowPenjualan;
