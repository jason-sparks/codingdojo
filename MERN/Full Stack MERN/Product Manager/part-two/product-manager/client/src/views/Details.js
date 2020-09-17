import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default props => {
    const [product, setProduct] = useState({})
    useEffect((props) => {
        axios.get("http://localhost:8000/api/products/" + props.id)
            .then(res => setProduct({
                ...res.data
            }))
    }, [])
    return (
        <>
            <div className="mt-4 jumbotron container-fluid align-self-center vertical-center col-sm-8 d-flex justify-content-center">
                <div className="media-body mb-auto">
                    <h1 className="mt-0 display-6">{product.title}</h1>
                    <hr class="my-4 col-sm-6"/>
                    <p className="lead">Price: </p>
                    <p className="lead">Description: {product.description}</p>
                </div>
            </div>
            <img className="mr-3 mt-5 mb-auto" src={product.image} alt="Generic placeholder"/>
        </>
    )
}
