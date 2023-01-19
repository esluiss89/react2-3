import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Favoritos from './views/Favoritos'
import Home from './views/Home'
import Navbar from './components/Navbar'
import Context from './Context'

export default function App() {
  const [imagenes, setImagenes] = useState([]);
  const apiKey = '563492ad6f917000010000012a35f2ac85644fdebfe6d16dd64402c0';
  const endpoint = 'https://api.pexels.com/v1/search?query=nature&per_page=15&page=1';

  useEffect(() => {
    const galeriaImagenes = async () => {
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': apiKey
            }
        });
        const data = await response.json();
        let filteredData = data.photos.map((e) => ({
            id: e.id, src: e.src.medium,
            desc: e.alt, fav: false
        }));
        setImagenes(filteredData);
    };
    galeriaImagenes();
  }, [endpoint]);

  return (
    <div className="App">
      <Context.Provider value={{ imagenes, setImagenes }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

