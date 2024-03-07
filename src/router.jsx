import { createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Pelanggan from './Pages/Pelanggan';
import Barang from './Pages/Barang';
import Penjualan from './Pages/Penjualan';
import CreateBarang from './Pages/CreateBarang';
import CreatePelanggan from './Pages/CreatePelanggan';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pelanggan',
    element: <Pelanggan />,
  },
  {
    path: '/pelanggan/create',
    element: <CreatePelanggan />,
  },
  {
    path: '/pelanggan/update/:id',
    element: <CreatePelanggan />,
  },
  {
    path: '/barang',
    element: <Barang />,
  },
  {
    path: '/barang/create',
    element: <CreateBarang />,
  },
  {
    path: '/barang/update/:id',
    element: <CreateBarang />,
  },
  {
    path: '/penjualan',
    element: <Penjualan />,
  },
  {
    path: '/penjualan/update/:id',
    element: <Penjualan />,
  },
]);

export { router };
