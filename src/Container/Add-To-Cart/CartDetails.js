import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/Acton/product.action';

function CartDetails(props) {
    const [cartData, setCartData] = useState([])
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const Cartproduct = useSelector(state => state.cartpro);
    const productdata = product.product;
    const CartProData = Cartproduct.cart;

    console.log(CartProData, productdata);



    const cartDataFun = () => {
        const Procart = [];

        productdata.map((j) => {
            CartProData.map((s) => {
                if (j.id === s.id) {
                    console.log("llllll");
                    Procart.push(j)
                }
            })
        })

        setCartData(Procart)

    }

    useEffect(() => {
        dispatch(getProduct());

        cartDataFun();
    }, [CartProData])


    console.log(cartData);

    return (
        <>
                <div className='cart-box'>
                    <div className='container'>
                        <div className='row'>
                          <div className='col-8'>
                                <div className='view-box'>
                                        {
                                            cartData.map((k) =>(
                                                <>
                                            <div className='cart-v-box'>
                                                    <div className='view-c-img'>
                                                            <img src={k.url} />
                                                    </div>
                                                    <div className='view-details'>
                                                        <h5>{k.product_name}</h5>
                                                        <p><strong>Price :</strong> {k.product_price}</p>
                                                        <div className='cart-item'>
                                                            <button>-</button>
                                                            <div className='input'>
                                                                <input type="text" />
                                                            </div>
                                                            <button>+</button>

                                                        </div>
                                                    </div>
                                                    <div className='deletItem'>
                                                     REMOVE
                                                    </div>
                                            </div>
                                                
                                                </>
                                            ))
                                        }
                                    
                                    </div>
                          </div>
                          <div className='col-4'>

                          </div>
                           
                        </div>
                    </div>

                </div>
            

        </>

    );
}



export default CartDetails;