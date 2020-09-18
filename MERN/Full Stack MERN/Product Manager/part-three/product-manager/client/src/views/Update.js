import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate  } from '@reach/router';


export default props => {
    const { id } = props;
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [reqErrors, setReqErrors] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + id)
            .then(res => {
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description)
            })
    }, [id])

    const updateProduct = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/products/' + id, {
            title,
            price,
            description
        })
            .then((res) => { 
                if (res.data.errors) {
                    setReqErrors(res.data.errors)
                }
                else {
                    navigate(`/products/${id}`) 
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2 className="mt-4 mb-4">Update a Product</h2>
            <form onSubmit={updateProduct} className="container">
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Title: </label>
                        <div className="col-sm-8 text-left">
                            <input type="text" className="form-control d-flex justify-content-end" 
                            name="title" 
                            value={title} 
                            onChange={(e) => { setTitle(e.target.value) }} />
                            { reqErrors.title ? <small className="text-danger">{reqErrors.title.message}</small> : null }
                        </div>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Price: </label>
                        <div className="col-sm-8 text-left">
                            <input type="text" className="form-control d-flex justify-content-end" 
                            name="price"
                            value={price} 
                            onChange={(e) => { setPrice(e.target.value) }} />
                            { reqErrors.price ? <small className="text-danger">{reqErrors.price.message}</small> : null }

                        </div>
                    </div>
                </div>
                
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Description: </label>
                        <div className="col-sm-8 text-left">
                            <input type="text" className="form-control d-flex justify-content-end" 
                            name="description" 
                            value={description} 
                            onChange={(e) => { setDescription(e.target.value) }} />
                            { reqErrors.description ? <small className="text-danger">{reqErrors.description.message}</small> : null }
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
