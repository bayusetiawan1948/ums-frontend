import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../api/main';
function PelangganForm() {
  const domisiliData = ['JAK-UT', 'JAK-BAR', 'JAK-SEL', 'JAK-TIM']; //default data untuk domisili
  const jekelData = [
    //default data untuk jenis kelamin
    {
      value: 'PRIA',
      display: 'Pria',
    },
    {
      value: 'WANITA',
      display: 'Wanita',
    },
  ];
  const [nama, setNama] = useState('');
  const [domisili, setDomisili] = useState('');
  const [jekel, setJekel] = useState('');
  const { id } = useParams();
  let i = 0;
  let j = 0;
  if (id) {
    const handlingSetData = (value) => {
      setNama(value.nama);
      setDomisili(value.domisili);
      setJekel(value.jenis_kelamin);
    };
    useEffect(() => {
      const handlingFetching = async () => {
        const url = `http://127.0.0.1:8000/api/pelanggan/${id}`;
        const result = await instance.get(url);
        console.log(result.data.data);
        handlingSetData(result.data.data);
      };
      handlingFetching();
    }, []);
  }
  const handlingCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (id) {
      const url = `http://127.0.0.1:8000/api/pelanggan/${id}`;
      const postData = await instance.patch(url, {
        nama: e.target.nama.value,
        domisili: e.target.domisili.value,
        jenis_kelamin: e.target.jenis_kelamin.value,
      });
      window.location.href = 'http://localhost:5173/pelanggan';
    } else {
      const url = `http://127.0.0.1:8000/api/pelanggan`;
      const postData = await instance.post(url, {
        nama: e.target.nama.value,
        domisili: e.target.domisili.value,
        jenis_kelamin: e.target.jenis_kelamin.value,
      });
      window.location.href = 'http://localhost:5173/pelanggan';
    }
  };
  return (
    <form
      action="POST"
      className="flex flex-col justify-start items-start gap-4 font-medium w-full"
      onSubmit={handlingCreateOrUpdate}
    >
      <div className="flex flex-col justify-start items-start gap-1.5 w-full">
        <label htmlFor="nama">Nama Pelanggan : </label>
        <input
          type="text"
          id="nama"
          value={nama}
          required
          onChange={(e) => {
            setNama(e.target.value);
          }}
          className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-1.5 w-full">
        <label htmlFor="domisili">Domisili : </label>
        <select
          id="domisili"
          name="domisili"
          value={domisili}
          onChange={(e) => {
            setDomisili(e.target.value);
          }}
          className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
        >
          {domisiliData.map((value) => {
            i++;
            return (
              <option value={value} key={i}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col justify-start items-start gap-1.5 w-full">
        <label htmlFor="jekel">Jenis Kelamin : </label>
        <select
          id="jekel"
          name="jenis_kelamin"
          value={jekel}
          onChange={(e) => {
            setJekel(e.target.value);
          }}
          className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
        >
          {jekelData.map((value) => {
            j++;
            return (
              <option value={value.value} key={j}>
                {value.display}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button className="bg-green-600 rounded-lg text-white py-2 px-3 hover:bg-green-300">
          {id ? 'Ubah' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}

export default PelangganForm;
