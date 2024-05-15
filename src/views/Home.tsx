import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cards from '../components/Card.tsx'
import NavBar from "../components/NavBar.tsx";

interface Product {
  _id: string;
  Title: string;
  Description: string;
  Price: string;
  Barcode: string;
  ComparePrice: string;
  Grams: string;
  Stock: string;
  Handle: string;
  SKU: number;
}
export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product._id !== productId));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //paginacion
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <div>
       <NavBar/>
    </div>
  
    <div className="container">
      <h2 className="text-center mt-5 mb-4">Productos</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-5">
        {currentProducts.map((product) => (
          <div key={product._id} className="col mb-5">
            <Cards product={product} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      {/* paginacion */}
      <nav className="mt-4" aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${i + 1 === currentPage ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </>
  );
};


