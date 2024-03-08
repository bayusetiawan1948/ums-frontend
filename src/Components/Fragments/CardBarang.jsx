import React, { useState } from 'react';
import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { formatRupiah } from '../../utils/helper';
import { Link } from 'react-router-dom';
import instance from '../api/main';

function CardBarang(props) {
  const { show, data, onClickedDelete, onClickAdd } = props;
  // const [display, setDisplay] = useState(show);
  const { nama, kategori, harga, kode } = data;
  const handlingConfirmation = async (id) => {
    const url = `http://127.0.0.1:8000/api/barang/${id}`;
    const postData = await instance.delete(url);
    onClickedDelete(true);
  };
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <div>
        <div className="w-36 h-44 rounded-lg bg-blue-400"></div>
      </div>
      <div className="">
        <p className="font-normal">{nama}</p>
        <p className="font-semibold">{formatRupiah(harga)}</p>
      </div>
      <div className="flex justify-center items-center">
        {show === 'sales'
          ? ButtonBarang(kode, handlingConfirmation)
          : ButtonSales(onClickAdd, kode, nama, kategori, harga)}
      </div>
    </div>
  );
}

// button yang akan muncul ketika berada di halaman penjualan / untuk keperluan penjualan
function ButtonSales(onClickFuntion, kode, nama, kategori, harga) {
  return (
    <button
      className="bg-blue-500 flex items-center justify-center px-4 py-2 rounded-md text-white hover:bg-blue-300"
      onClick={() => {
        onClickFuntion(kode, nama, kategori, harga, harga, 1); // lifting state untuk menambahkan cart ke data cart parent
      }}
    >
      Tambah
    </button>
  );
}

// button yang akan muncul ketika berada di halaman barang / untuk keperluan edit atau delete
function ButtonBarang(kode, onClickFunction) {
  return (
    <div className="flex flex-row justify-center items-center text-white gap-4">
      {/* di beri komentar karena disiapkan jika ingin melihat secara detail */}
      {/* <Link to="">
        <button className="bg-blue-500 flex justify-center rounded-md p-1.5 hover:bg-blue-300">
          <Eye size={22} />
        </button>
      </Link> */}
      <Link to={`/barang/update/${kode}`}>
        <button className="bg-yellow-500 flex justify-center rounded-md p-1.5 hover:bg-yellow-300">
          <PencilSimpleLine size={22} />
        </button>
      </Link>
      <button
        className="bg-red-500 flex justify-center rounded-md p-1.5 hover:bg-red-300"
        onClick={() => onClickFunction(kode)} // lifting state untuk memberikan id barang kepada parent untuk di hapus nantinya
      >
        <Trash size={22} />
      </button>
    </div>
  );
}

export default CardBarang;
