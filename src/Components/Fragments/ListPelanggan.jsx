import React from 'react';
import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import instance from '../api/main';

function ListPelanggan(props) {
  const { data, onClickedDelete } = props;
  const { id_pelanggan, nama, domisili, jenis_kelamin } = data;
  const handlingConfirmation = async (id) => {
    const url = `http://127.0.0.1:8000/api/pelanggan/${id}`;
    const postData = await instance.delete(url);
    onClickedDelete(true);
  };
  return (
    <div className="flex flex-row justify-between items-center my-4 gap-10 xl:gap-24 w-full">
      <div className="flex flex-row gap-2">
        <div>
          <div className="bg-blue-500 w-12 h-12 rounded-full"></div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="font-bold">{nama}</p>
            <p className="text-slate-500">{domisili}</p>
          </div>
          {/* diberikan komentar jika ada keperluan melihat jenis kelamin */}
          {/* <div>PRIA</div> */}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center text-white gap-4">
        {/* di beri komentar karena disiapkan jika ingin melihat secara detail */}
        {/* <a href="">
          <button className="bg-blue-500 flex justify-center rounded-md p-1.5 hover:bg-blue-300">
            <Eye size={22} />
          </button>
        </a> */}
        <Link to={`/pelanggan/update/${id_pelanggan}`}>
          <button className="bg-yellow-500 flex justify-center rounded-md p-1.5 hover:bg-yellow-300">
            <PencilSimpleLine size={22} />
          </button>
        </Link>
        <button
          className="bg-red-500 flex justify-center rounded-md p-1.5 hover:bg-red-300"
          onClick={() => handlingConfirmation(id_pelanggan)} // lifting state up untuk merefresh data sekaligus mengirim data ke server agar data ini di hapus
        >
          <Trash size={22} />
        </button>
      </div>
    </div>
  );
}

export default ListPelanggan;
