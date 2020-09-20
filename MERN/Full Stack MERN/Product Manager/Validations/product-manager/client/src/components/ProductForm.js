import React, { useState } from 'react'

export default (props) => {
    const { initialTitle, initialPrice, initialDescription, reqErrors, onSubmitProp } = props;

    //keep track of what is being typed via useState hook
    const [title, setTitle] = useState(initialTitle); 
    const [price, setPrice] = useState(initialPrice);
    const [description, setDescription] = useState(initialDescription);
    

    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new product
        onSubmitProp({title, price, description})
        setTitle(initialTitle)
        setPrice(initialPrice)
        setDescription(initialDescription);
    }

    //onChange to update title, price, and description
    return (
        <>
            <form onSubmit={onSubmitHandler} className="container">
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Title: </label>
                        <div className="col-sm-8 text-left">                
                            <input 
                            type="text" 
                            name="title" value={title}
                            className="form-control d-flex justify-content-end" 
                            onChange = {(e)=>setTitle(e.target.value)} />
                            {/* Server side Validation */}
                            { reqErrors.title ? 
                            <small className="text-danger">{reqErrors.title.message}</small> : 
                            null } 
                        </div>
                    </div>

                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Price: </label>
                        <div className="col-sm-8 text-left">                
                            <input 
                            type="text" 
                            name="price" value={price}
                            className="form-control d-flex justify-content-end" 
                            onChange = {(e)=>setPrice(e.target.value)}/>
                            {/* Server side Validation */}
                            { reqErrors.price ? 
                            <small className="text-danger">{reqErrors.price.message}</small> :
                             null }
                        </div>
                    </div>                    
                </div>
                    
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Description: </label>
                        <div className="col-sm-8 text-left">
                            <input 
                            type="text" 
                            name="description" value={description}
                            className="form-control d-flex justify-content-end" 
                            onChange = {(e)=>setDescription(e.target.value)}/>
                            {/* Server side Validation */}
                            { reqErrors.description ? 
                            <small className="text-danger">{reqErrors.description.message}</small> :
                             null }
                        </div>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="col-sm-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </>        
    )
}
