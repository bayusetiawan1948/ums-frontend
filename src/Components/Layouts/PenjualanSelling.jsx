import React, { useState, useEffect } from 'react';
import CardBarang from '../Fragments/CardBarang';
import CartPenjualan from '../Fragments/CartPenjualan';
import instance from '../api/main';
import { useParams } from 'react-router-dom';
function PenjualanSelling() {
  let i = 0;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [selectedPelanggan, setSelectedPelanggan] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const getPreviousData = () => {
    const urlSinglePenjualan = `http://127.0.0.1:8000/api/penjualan/${id}`;
    return instance.get(urlSinglePenjualan);
  };
  const getBarang = () => {
    const urlBarang = 'http://127.0.0.1:8000/api/barang';
    return instance.get(urlBarang);
  };
  const getPelanggan = () => {
    const urlPelanggan = 'http://127.0.0.1:8000/api/pelanggan';
    return instance.get(urlPelanggan);
  };
  const handlingSetData = (
    valuePelanggan,
    valueBarang,
    forCart = null,
    forPelanggan = null
  ) => {
    setData(valueBarang);
    setPelanggan(valuePelanggan);

    if (id) {
      setCart(forCart);
      setSelectedPelanggan(forPelanggan);
    }
  };
  const handlingSendData = async (data) => {
    if (id) {
      const url = `http://127.0.0.1:8000/api/penjualan/${id}`;
      const postData = await instance.patch(url, data);
      window.location.href = 'http://localhost:5173/';
    } else {
      const url = `http://127.0.0.1:8000/api/penjualan`;
      const postData = await instance.post(url, data);
      window.location.href = 'http://localhost:5173/';
    }
  };
  useEffect(() => {
    const handlingFetching = async () => {
      if (id) {
        const [resultPelanggan, resultBarang, resultPreviousData] =
          await Promise.all([getPelanggan(), getBarang(), getPreviousData()]);
        handlingSetData(
          resultPelanggan.data.data,
          resultBarang.data.data,
          resultPreviousData.data.data[0].detail,
          resultPreviousData.data.data[0].id_pelanggan
        );
      } else {
        const [resultPelanggan, resultBarang] = await Promise.all([
          getPelanggan(),
          getBarang(),
        ]);
        handlingSetData(resultPelanggan.data.data, resultBarang.data.data);
      }
    };
    handlingFetching();
  }, []);

  const addBarang = (
    id_barang,
    nama_barang,
    kategori_barang,
    normal_harga,
    multiple_harga,
    qty
  ) => {
    const findIsIdExist = cart.find(
      (element) => element.id_barang === id_barang
    );
    if (findIsIdExist) {
      setCart(
        cart.map((element) => {
          if (element.id_barang === id_barang) {
            let tmpQty = element.qty + 1;
            let tmpMultipleHarga = tmpQty * element.normal_harga;
            return {
              ...element,
              qty: tmpQty,
              multiple_harga: tmpMultipleHarga,
            };
          } else {
            return { ...element };
          }
        })
      );
    } else {
      setCart([
        ...cart,
        {
          id_barang,
          nama_barang,
          kategori_barang,
          normal_harga,
          multiple_harga,
          qty,
        },
      ]);
    }
  };
  const plusCart = (id_barang) => {
    console.log(cart);
    setCart(
      cart.map((element) => {
        if (element.id_barang === id_barang) {
          let tmpQty = element.qty + 1;
          let tmpMultipleHarga = tmpQty * element.normal_harga;
          return {
            ...element,
            qty: tmpQty,
            multiple_harga: tmpMultipleHarga,
          };
        } else {
          return { ...element };
        }
      })
    );
  };
  const minusCart = (id_barang) => {
    setCart(
      cart
        .map((element) => {
          if (element.id_barang === id_barang) {
            let tmpQty = element.qty - 1;
            let tmpMultipleHarga = tmpQty * element.normal_harga;
            if (tmpQty <= 0) {
              return null;
            } else {
              return {
                ...element,
                qty: tmpQty,
                multiple_harga: tmpMultipleHarga,
              };
            }
          } else {
            return { ...element };
          }
        })
        .filter((element) => element !== null)
    );
  };
  const handlingSubmit = async (cart, idPelanggan) => {
    if (idPelanggan === '' || idPelanggan === null) {
      alert('Masukan pelanggan');
    }
    const header = {
      pelanggan: idPelanggan,
      detail: [],
    };

    cart.map((element) => {
      header.detail.push({
        barang: element.id_barang,
        qty: element.qty,
      });
    });
    await handlingSendData(header);
  };
  return (
    <div className="max-w-3xl flex flex-col justify-center items-center w-full md:flex-row md:justify-between md:items-start">
      <div className="flex flex-wrap justify-center items-center gap-3 max-w-5xl">
        {data.map((value) => {
          i++;
          return <CardBarang key={i} data={value} onClickAdd={addBarang} />;
        })}
      </div>
      <div className="p-2 mt-8 w-full md:w-1/3">
        <CartPenjualan
          pelangganData={pelanggan}
          selectedPelanggan={selectedPelanggan}
          cartData={cart}
          onPlusClick={plusCart}
          onMinusClick={minusCart}
          onSend={handlingSubmit}
        />
      </div>
    </div>
  );
}

export default PenjualanSelling;
