import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate  } from '@reach/router';


export default (props) => {
    const [product, setProduct] = useState({})

    const deleteProduct = (productId) => {
        axios.delete('http://localhost:8000/api/products/' + productId)
            .then(res => {
                navigate('/products/')
            })
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/products/" + props.id)
            .then(res => setProduct({
                ...res.data
            }))
    }, [props])
    return (
        <>
            <div className="mt-4 jumbotron container-fluid align-self-center vertical-center col-sm-8 d-flex justify-content-center">
                <div className="media-body mb-auto">
                    <h1 className="mt-0 display-6">{product.title}</h1>
                    <hr className="my-4 w-50"/>
                    <p className="lead">Price: ${product.price}</p>
                    <p className="lead">Description: {product.description}</p>
                </div>
            </div>

            <div className="row justify-content-center">
                <button className="btn btn-warning mr-5" onClick={(e) => navigate(`/products/${product._id}/edit`)} >
                    Edit
                </button>
                
                <button className="btn btn-danger" onClick={(e) => {deleteProduct(product._id)}}>
                    Delete
                </button>
            </div>
            
        </>
    )
}
