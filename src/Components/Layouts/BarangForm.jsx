import React, { useState, useEffect } from 'react';
import { formatRupiah, formatRupiahToNumber } from '../../utils/helper';
import instance from '../api/main';
import { useParams } from 'react-router-dom';
function BarangForm() {
  const kategori = [
    // default data untuk kategori
    {
      value: 'ATK',
      display: 'ATK',
    },
    {
      value: 'RT',
      display: 'RT',
    },
    {
      value: 'Elektronik',
      display: 'Elektronik',
    },
    {
      value: 'Masak',
      display: 'Masak',
    },
  ];
  let i = 0;
  const [rupiah, setRupiah] = useState('');
  const [nama, setNama] = useState('');
  const [kategoriSelected, setKategoriSelected] = useState('');
  const { id } = useParams();
  if (id) {
    const handlingSetData = (value) => {
      setNama(value.nama);
      setRupiah(formatRupiah(value.harga));
      setKategoriSelected(value.kategori);
    };
    useEffect(() => {
      const handlingFetching = async () => {
        const url = `http://127.0.0.1:8000/api/barang/${id}`;
        const result = await instance.get(url);
        handlingSetData(result.data.data);
      };
      handlingFetching();
    }, []);
  }
  const handlingMoneyInput = (e) => {
    const value = formatRupiah(formatRupiahToNumber(e.target.value)); // di reformat menjadi tipe data number setelah itu di ubah menjadi bentuk rupiah string
    setRupiah(value);
  };
  const handlingCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (id) {
      const url = `http://127.0.0.1:8000/api/barang/${id}`;
      const postData = await instance.patch(url, {
        nama: e.target.nama.value,
        kategori: e.target.kategori.value,
        harga: formatRupiahToNumber(e.target.harga.value),
      });
      window.location.href = 'http://localhost:5173/barang';
    } else {
      const url = `http://127.0.0.1:8000/api/barang`;
      const postData = await instance.post(url, {
        nama: e.target.nama.value,
        kategori: e.target.kategori.value,
        harga: formatRupiahToNumber(e.target.harga.value),
      });
      window.location.href = 'http://localhost:5173/barang';
    }
  };
  return (
    <form
      action="POST"
      className="flex flex-col justify-start items-start gap-4 font-medium w-full"
      onSubmit={handlingCreateOrUpdate}
    >
      <div className="flex flex-col justify-start items-start gap-1.5 w-full">
        <label htmlFor="nama">Nama Barang : </label>
        <input
          type="text"
          id="nama"
          name="nama"
          placeholder="Baling baling bambu"
          value={nama}
          required
          onChange={(e) => {
            setNama(e.target.value);
          }}
          className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-1.5 w-full">
        <label htmlFor="kategori">Kategori : </label>
        <select
          id="kategori"
          name="kategori"
          value={kategoriSelected}
          className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
          onChange={(e) => {
            setKategoriSelected(e.target.value);
          }}
        >
          {kategori.map(({ value, display }, index) => {
            i++;
            return (
              <option key={i} value={value}>
                {display}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col justify-start items-start gap-1.5 w-full">
        <label htmlFor="harga">Harga : </label>
        <input
          type="text"
          name="harga"
          id="harga"
          placeholder="Rp.100.000"
          required
          value={rupiah}
          className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
          onChange={handlingMoneyInput}
        />
      </div>
      <div>
        <button className="bg-green-600 rounded-lg text-white py-2 px-3 hover:bg-green-300">
          {id ? 'Ubah' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}

export default BarangForm;
