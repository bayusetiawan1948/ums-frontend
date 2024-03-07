import React, { useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { formatRupiah } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react';
import instance from '../api/main';

function Disclosure(props) {
  let i = 0;
  const { data, onClickedDelete } = props;
  const { id_nota, id_pelanggan, nama_pelanggan, tanggal, subtotal, detail } =
    data;
  const [open, setOpen] = useState(true);
  const handlingOpenClose = () => {
    setOpen(!open);
  };
  const onClickFunction = async (id) => {
    const url = `http://127.0.0.1:8000/api/penjualan/${id}`;
    const postData = await instance.delete(url);
    onClickedDelete(true);
  };
  return (
    <div className="w-full">
      <div
        onClick={handlingOpenClose}
        className="w-full flex justify-between items-center rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:rounded-t-lg hover:bg-blue-300 cursor-pointer"
      >
        <div>{id_nota}</div>
        <div className="flex flex-row justify-center items-center">
          <button
            className="text-red-500 p-1.5 rounded-md hover:bg-red-300 hover:text-white"
            onClick={() => onClickFunction(id_nota)}
          >
            <Trash size={22} />
          </button>
          <Link to={`/penjualan/update/${id_nota}`}>
            <button className="text-yellow-500 p-1.5 rounded-md hover:bg-yellow-300 hover:text-white">
              <PencilSimpleLine size={22} />
            </button>
          </Link>
          {open ? (
            <button className="text-white p-1.5 rounded-md hover:bg-slate-300 hover:text-white">
              <CaretUp size={26} />
            </button>
          ) : (
            <button className="text-white p-1.5 rounded-md hover:bg-slate-300 hover:text-white">
              <CaretDown size={26} />
            </button>
          )}
        </div>
      </div>
      <div
        className={`${
          open ? '' : 'hidden'
        } bg-slate-300 px-4 pb-2 pt-4 text-sm text-black w-full rounded-b-lg`}
      >
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="px-2 grid gap-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p>Nama Pelanggan</p>
            <p className="font-semibold">{nama_pelanggan}</p>
          </div>
          <div className="px-2 grid gap-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p>Tanggal</p>
            <p className="font-semibold">{tanggal}</p>
          </div>
          <div className="px-2 grid gap-2 sm:grid sm:grid-cols-3 sm:gap-12 sm:px-0">
            <p>Subtotal</p>
            <p className="font-semibold">
              {formatRupiah(subtotal === undefined)}
            </p>
          </div>
          <div className="px-2 grid gap-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:px-0">
            <p>Barang</p>
            <div className="flex flex-col justify-start items-start gap-1">
              {detail.map((value) => {
                i++;
                return (
                  <li
                    className="flex flex-row justify-start items-start gap-2 font-semibold"
                    key={i}
                  >
                    <p>{value.nama_barang}</p>
                    <p> - </p>
                    <p>{value.qty}x</p>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Disclosure;
