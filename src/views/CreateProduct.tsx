import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Barcode from "react-barcode";
import { Link } from "react-router-dom";


interface FormData {
    Title: string;
    Description: string;
    Grams: string;
    Price: string;
    Stock: string;
    Barcode: string;
}

const CreateProduct = () => {
    const [product, setProduct] = useState(false)
    const initialState: FormData = {
        Title: "",
        Description: "",
        Grams: "",
        Price: "",
        Stock: "",
        Barcode: "",
    };

    const [formData, setFormData] = useState<FormData>(initialState);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = () => {
        let errors: Partial<FormData> = {};
        if (!formData.Title) {
            errors.Title = "El nombre del producto es requerido";
        }
        if (!formData.Title) {
            errors.Title = "El nombre del producto es requerido";
        }
        if (formData.Description.length < 3) {
            errors.Description = "La descripción debe tener al menos 3 caracteres";
        }
        if (Number(formData.Grams) <= 0 || isNaN(Number(formData.Grams))) {
            errors.Grams = "El peso es requerido y debe ser un número mayor que cero";
        }
        if (Number(formData.Price) <= 0 || isNaN(Number(formData.Price))) {
            errors.Price = "El precio es requerido y debe ser un número mayor que cero";
        }
        if (!formData.Stock) {
            errors.Stock = "La cantidad es requerida";
        }
        return errors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
    };

    const handleSubmit = async () => {
        try {
            const errors = validate();
            if (Object.keys(errors).length === 0) {
                const response = await axios.post("http://localhost:3001/products/createProduct", formData);
                if (response.data) {

                    setProduct(response.data);
                    setFormData(initialState);
                }
            } else {
                setErrors(errors);
            }
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4 mb-5">Crear Producto</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Título:</Form.Label>
                    <Form.Control
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        placeholder="Ingrese el título"
                        required
                    />
                    {errors.Title && <Form.Text className="text-danger">{errors.Title}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        placeholder="Ingrese la descripción"
                        required
                    />
                    {errors.Description && <Form.Text className="text-danger">{errors.Description}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="grams">
                    <Form.Label>Peso:</Form.Label>
                    <Form.Control
                        type="number"
                        name="Grams"
                        value={formData.Grams}
                        onChange={handleChange}
                        placeholder="Ingrese el peso"
                        required
                    />
                    {errors.Grams && <Form.Text className="text-danger">{errors.Grams}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                        type="number"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChange}
                        placeholder="Ingrese el precio"
                        required
                    />
                    {errors.Price && <Form.Text className="text-danger">{errors.Price}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Cantidad:</Form.Label>
                    <Form.Control
                        type="number"
                        name="Stock"
                        value={formData.Stock}
                        onChange={handleChange}
                        placeholder="Ingrese la cantidad"
                        required
                    />
                    {errors.Stock && <Form.Text className="text-danger">{errors.Stock}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Codigo de barra</Form.Label>
                    <Form.Control
                        type="number"
                        name="Barcode"
                        value={formData.Barcode}
                        onChange={handleChange}
                        placeholder="Ingrese el codigo de barra"
                        
                    />
                    {errors.Barcode && <Form.Text className="text-danger">{errors.Barcode}</Form.Text>}
                </Form.Group>

                <Button type="submit">Crear Producto</Button>
                {product && (
                    <Link to="/home" className="btn btn-primary ms-2">
                        Ir a la página de inicio
                    </Link>
                )}
            </Form>
        </div>
    );
};

export default CreateProduct;
