import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    const removeFromDom = (productId) => {
        setProducts(products.filter((product) => product._id !== productId));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                setProducts(res.data);
                setLoaded(true);
            })
            .catch(err => console.log("Something went wrong: ", err));
    },[]);

    return (
        <>
           <ProductForm/>
           <hr className="col-sm-6"/>
           <h3 className="text-muted mb-4">All Products</h3>
           {loaded && <ProductList products={products} removeFromDom={removeFromDom}/>}
        </>
    )
};
