import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate  } from '@reach/router';
import ProductForm from '../components/ProductForm';
import DeleteButton from '../components/DeleteButton';

export default (props) => {
    const { id } = props;
    const [product, setProduct] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [reqErrors, setReqErrors] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + id)
            .then(res => {
                setProduct(res.data);
                setLoaded(true);
            })
    }, [id])

    const updateProduct = (product) => {
        axios.put('http://localhost:8000/api/products/' + id, product)
            .then((res) => { 
                if (res.data.errors) {
                    console.log(res);
                    setReqErrors(res.data.errors)
                }
                else {
                    navigate('/products/' + id);
                }
                
            })
            .catch((err) => console.log(err));
    };

         return (
            loaded && 
                <>
                <h2 className="mt-4 mb-4">Update a Product</h2>
                <ProductForm 
                    onSubmitProp={updateProduct}
                    initialTitle={product.title}
                    initialPrice={product.price}
                    initialDescription={product.description}
                    reqErrors={reqErrors}
                />
                <DeleteButton productId={product._id} successCallback={() => navigate("/products/")} />
                </>
                
         )
}
