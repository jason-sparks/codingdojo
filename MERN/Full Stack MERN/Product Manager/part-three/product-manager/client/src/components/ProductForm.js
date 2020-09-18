import React, { useState } from 'react'
import { navigate  } from '@reach/router';
import axios from 'axios';
export default () => {

    //keep track of what is being typed via useState hook
    const [title, setTitle] = useState(""); 
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [reqErrors, setReqErrors] = useState({});


    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new product
        axios.post('http://localhost:8000/api/products', {
            title,
            price,
            description
        })            
            .then( (res) => { 
                if (res.data.errors) { console.log(res.data.errors)
                    setReqErrors(res.data.errors)
                }
                else {
                    navigate(`/products/${res.data._id}`) 
                }
            })
            // navigate('/products/' + res.data._id) 
            // )                
            .catch((err) => console.log(err));
    }

    //onChange to update title, price, and description
    return (
        <>
            <h2 className="mt-4 mb-4">Product Manager</h2>
            <form onSubmit={onSubmitHandler} className="container">
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Title: </label>
                        <div className="col-sm-8 text-left">                
                            <input type="text" className="form-control d-flex justify-content-end" onChange = {(e)=>setTitle(e.target.value)}/>
                            { reqErrors.title ? <small className="text-danger">{reqErrors.title.message}</small> : null } {/* Server side Validation */}
                        </div>
                    </div>

                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Price: </label>
                        <div className="col-sm-8 text-left">                
                            <input type="text" className="form-control d-flex justify-content-end" onChange = {(e)=>setPrice(e.target.value)}/>
                            { reqErrors.price ? <small className="text-danger">{reqErrors.price.message}</small> : null } {/* Server side Validation */}
                        </div>
                    </div>                    
                </div>
                    
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Description: </label>
                        <div className="col-sm-8 text-left">
                            <input type="text" className="form-control d-flex justify-content-end" onChange = {(e)=>setDescription(e.target.value)}/>
                            { reqErrors.description ? <small className="text-danger">{reqErrors.description.message}</small> : null } {/* Server side Validation */}
                        </div>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="col-sm-3">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </div>
            </form>
        </>        
    )
}
