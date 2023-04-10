
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from './componentes/layout/Header';
import Footer from './componentes/layout/Footer';

import HomePage from './pages/HomePage';
import GenerosPage from './pages/GenerosPage';
import LanzamientosPage from './pages/LanzamientosPage';
import ArtistasNuevosPage from './pages/ArtistasNuevosPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <div className='App'>


      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/generos' element={<GenerosPage />} />
          <Route path='/lanzamientos' element={<LanzamientosPage />} />
          <Route path='/nuevosartistas' element={<ArtistasNuevosPage />} />
          <Route path='/contacto' element={<ContactoPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
