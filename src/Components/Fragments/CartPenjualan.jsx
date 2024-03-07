import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatRupiah } from '../../utils/helper';
import { Plus, Minus } from '@phosphor-icons/react';
function CartPenjualan(props) {
  console.log('asdasd');
  const {
    pelangganData,
    cartData,
    onPlusClick,
    onMinusClick,
    onSend,
    selectedPelanggan,
  } = props;
  let subtotal = 0;
  const { id } = useParams();
  let i = 0;
  let j = 0;
  const [pelanggan, setPelanggan] = useState('');
  useEffect(() => {
    if (id) {
      setPelanggan(selectedPelanggan);
    }
  }, [id, selectedPelanggan]);
  return (
    <div className="border-2 border-blue-500 p-3 rounded-lg flex flex-col justify-start items-start w-full">
      <div className="">
        <p className="font-bold text-lg underline underline-offset-4">
          Keranjang Belanja
        </p>
      </div>
      <div className="w-full">
        <div className="flex flex-col justify-start items-start my-4 gap-1.5 w-full font-semibold">
          <label htmlFor="pelanggan">Pelanggan : </label>
          <select
            id="pelanggan"
            name="pelanggan"
            value={pelanggan}
            onChange={(e) => {
              setPelanggan(e.target.value);
            }}
            className="focus:border-orange-500 border-2 border-blue-400 rounded-lg ps-3 py-1 w-full "
          >
            <option value="">Pilih Pelanggan</option>
            {pelangganData.map((value) => {
              i++;
              return (
                <option key={i} value={value.id_pelanggan}>
                  {value.nama}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col justify-start items-start gap-4">
          {cartData.map((element) => {
            j++;
            subtotal += element.multiple_harga;
            return (
              <div
                className="flex flex-row justify-between items-center w-full"
                key={j}
              >
                <div className="flex flex-row justify-start items-start gap-3">
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-semibold">{element.nama_barang}</p>
                    <p className="text-slate-500">{element.kategori_barang}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <p className="font-semibold">{element.qty}x</p>
                  <p className="font-semibold">
                    {formatRupiah(element.multiple_harga)}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center gap-3">
                  <button
                    className="bg-red-500 rounded-full p-0.5 text-white"
                    onClick={() => {
                      onMinusClick(element.id_barang);
                    }}
                  >
                    <Minus size={32} />
                  </button>
                  <button
                    className="bg-green-500 rounded-full p-0.5 text-white"
                    onClick={() => {
                      onPlusClick(element.id_barang);
                    }}
                  >
                    <Plus size={32} />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col justify-start items-start w-full divide-y-4 divide-slate-600">
            <div className="flex flex-row justify-between w-full">
              <p className="font-medium">Total : </p>
              <p className="font-bold">{formatRupiah(subtotal)}</p>
            </div>
            <button
              className="w-full py-1.5 bg-blue-500 rounded-lg text-white my-2 hover:bg-blue-300"
              onClick={() => onSend(cartData, pelanggan)}
            >
              {id ? 'Ubah' : 'Beli'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPenjualan;
