import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home.tsx";
import { Login } from "./views/Login.tsx";
import  CreateProduct  from './views/CreateProduct.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
