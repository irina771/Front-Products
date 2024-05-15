import React, { useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import Barcode from "react-barcode";
import axios from "axios";

const Cards = ({ product, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEdit = () => {
    setEditing(true);
  };

  
  const handleCancelEdit = () => {
    setEditing(false);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:3001/products/update/${product._id}`, editedProduct)
      .then((response) => {
        console.log("Actualización exitosa:", response);
        setEditing(false);
        // Aquí podrías actualizar la interfaz de usuario si fuera necesario
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/products/delete/${product._id}`)
      .then((response) => {
        console.log("Eliminación exitosa:", response);
        if (response.status === 200) {
          onDelete(product._id);
        } else {
          console.error("Error al eliminar la publicación");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la publicación:", error);
      });
  };

  return (
    <Card className="h-100">
    <Card.Body className="d-flex flex-column align-items-start">
      <div className="d-flex justify-content-between w-100">
        <Card.Title>
          {editing ? (
            <input
              type="text"
              name="Title"
              value={editedProduct.Title}
              onChange={handleChange}
            />
          ) : (
            product.Title
          )}
        </Card.Title>
        
        <Dropdown className="menu-button">
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            <i className="fas fa-ellipsis-v"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="start">
            <Dropdown.Item onClick={handleEdit}>Editar producto</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Eliminar producto</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
      <strong>Peso: </strong>
      {editing ? (
        <input
          type="text"
          name="Grams"
          value={editedProduct.Grams}
          onChange={handleChange}
        />
      ) : (
        `${product.Grams}g`
      )}
    </div>
      <div>
      {editing ? (
        <textarea
          name="Description"
          className="p-5"
          value={editedProduct.Description}
          onChange={handleChange}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: product.Description }} />
      )}
    </div>
      {!expanded && (
        <Button variant="link" onClick={toggleExpanded}>
          Ver más
        </Button>
      )}
      {expanded && (
        <Button variant="link" onClick={toggleExpanded}>
          Ver menos
        </Button>
      )}
      <div>
      <strong>Cantidad: </strong>
      {editing ? (
        <input
          type="text"
          name="Stock"
          value={editedProduct.Stock}
          onChange={handleChange}
        />
      ) : (
        `${product.Stock} disponibles`
      )}
    </div>
    <div>
    <strong style={{ fontSize: '1.2em' }}>$ </strong>
      {editing ? (
        <input
          type="text"
          name="Price"
          value={editedProduct.Price}
          onChange={handleChange}
        />
      ) : (
        `${product.Price}`
      )}
    </div>
      <Barcode value={product.Barcode} />
      {editing && (
        <div>
          <Button variant="primary" onClick={handleSaveEdit}>Guardar</Button>
          <Button variant="secondary" onClick={handleCancelEdit}>Cancelar</Button>
        </div>
      )}
    </Card.Body>
  </Card>
  );
};

export default Cards;
