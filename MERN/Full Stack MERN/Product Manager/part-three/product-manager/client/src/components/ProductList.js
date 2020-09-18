import React from 'react'
import axios from 'axios';
import { Link } from '@reach/router';

export default (props) => {
    const { removeFromDom } = props;

    const deleteProduct = (productId) => {
        axios.delete('http://localhost:8000/api/products/' + productId)
            .then(res => {
                removeFromDom(productId)
            })
    }

    return (
        <div className="d-flex justify-content-center">
            <ul className="list-group list-group-flush col-sm-6">
                {props.products.map((product, id) => {
                    return (
                        <li className="list-group-item lead" key={id}>
                            <div className="text-left row justify-content-between">
                                <Link to={"/products/" + product._id}>{product.title}</Link>
                                <button className="btn btn-danger" onClick={(e)=>{deleteProduct(product._id)}} >Delete</button>
                            </div>
                        </li>
                    ) 
                })}
            </ul>
        </div>
    )
}
