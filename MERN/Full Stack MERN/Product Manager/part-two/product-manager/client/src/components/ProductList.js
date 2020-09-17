import React from 'react'

export default props => {
    return (
        <div className="d-flex justify-content-center">
            <ul className="list-group list-group-flush col-sm-4">
                {props.products.map((product, id) => {
                    return (
                        <li className="list-group-item lead" key={id}><a href={'/products/' + product._id}>{product.title}</a></li>
                        ) 
                })}
            </ul>
        </div>
    )
}
