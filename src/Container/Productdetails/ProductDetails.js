import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import { AddcartAction } from '../../Redux/Acton/cart.action';


function ProductDetails(props) {

    const data = [props.location.state]
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()

    const handlecart = (g) => {
        const Datacart = {
            id: g,
            quantity: quantity
        }
        dispatch(AddcartAction(Datacart))
        history.push("/cart_detail")
    }

    return (
        <>

            {
                data.map((k) => (
                    <div >
                        <div className='container'>
                            <div class="single-pro">
                                <div>
                                    <img src={k.url} />
                                </div>
                                <div className='pr-des'>
                                    <h4>{k.product_name}</h4>
                                    <p><strong>Price :</strong> {k.product_price}</p>
                                    <p className='single-des'>
                                        <span><strong>Description </strong> </span>
                                        {k.product_description}
                                    </p>
                                    <div className="box Add-button">
                                        <div className="option_container">
                                            <div className="options">
                                                <button><a href className="option1" onClick={() => handlecart(k.id)} ><ShoppingCartIcon /> Add To Cart</a></button>
                                                <button class="buy-now"> <a href className="option2"><BoltIcon /> Buy Now </a></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ProductDetails;