import axios from "axios";

export function postProduct(payload) {
    return async function(dispatch) {
        try {
            const post = await axios.post("http://localhost:3001/products/createProduct", payload);
            dispatch({
                type: 'POST_PRODUCT',
                payload: post.data  
            });
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            
        }
    };
}
