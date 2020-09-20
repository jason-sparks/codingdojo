import React from 'react'
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';

export default (props) => {
    const { products, setProducts } = props;
    // const [products, setProducts] = useState([]);

    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id !== productId))
    }

    return (
        <div className="d-flex justify-content-center">
            <ul className="list-group list-group-flush col-sm-6">
                {props.products.map((product, id) => {
                    return (
                        <li className="list-group-item lead" key={id}>
                            <div className="text-left row justify-content-between">
                                <Link to={"/products/" + product._id}>{product.title}</Link>
                                <DeleteButton productId={product._id} successCallback={()=>removeFromDom(product._id)}/>
                                {/* <button className="btn btn-danger" onClick={(e)=>{deleteProduct(product._id)}} >Delete</button> */}
                            </div>
                        </li>
                    ) 
                })}
            </ul>
        </div>
    )
}
