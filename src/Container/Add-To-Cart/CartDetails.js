import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, deletecart, increment } from '../../Redux/Acton/cart.action';
import {  getProduct } from '../../Redux/Acton/product.action';
import CloseIcon from '@mui/icons-material/Close';

function CartDetails(props) {
    const [cartData, setCartData] = useState([])
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const Cartproduct = useSelector(state => state.cartpro);
    const productdata = product.product;
    const CartProData = Cartproduct.cart;

    console.log(CartProData, productdata);


    const handleDelete = (id) => {
        dispatch(deletecart(id))
    }

    console.log(CartProData ,productdata);


    const cartDataFun = () => {
        const Procart = [];

        productdata.map((j) => {
            CartProData.map((s) => {
                if (j.id === s.id) {
                    const quacount = {
                        ...j,
                        quantity: s.quantity
                    }
                    Procart.push(quacount)
                }
            })
        })

        setCartData(Procart)

    }


    const handleincrement = (id) =>{
        dispatch(increment(id))
    }

   
 
    let total;
    let totalamount = 0;

    cartData.map((g) => {
        total = g.product_price * g.quantity;
        totalamount = totalamount + total;
    })
    
 
    const discoutnt = Math.round(totalamount * 0.08);
    const finaltotal = totalamount - discoutnt ;




    const handledecrement = (id) => {
        dispatch(decrement(id))
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
                    <div className='row main-tit'>
                         <div className='col-12'>
                         <div className='Add-main-title'>
                            <h3>Add To Cart Items</h3>
                        </div>
                         </div>
                        
                    </div>
                    <div className='row'>
                        <div className='col-9'>   
                                    <div>
                                        <table>
                                            <thead>
                                                <tr className='text-red-600'>
                                                    <th>Images</th>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            {
                                               cartData.map((k)  => (

                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <a href="">
                                                                    <img src={k.url} alt='' width={70} />
                                                                </a>
                                                            </td>
                                                            <td className="">
                                                                <a href="/product_detail">{k.product_name}</a>
                                                            </td>
                                                                <td className="">
                                                                    <span className="">₹{k.product_price}</span>
                                                                </td>
                                                            <td className="">
                                                                <div className="text-center">
                                                                    <div className='quantity-box'>
                                                                        <button onClick={() => handleincrement(k.id)} className='border-2 p-2'>+</button>
                                                                        <p className='border-2 p-2'>{k.quantity}</p> 
                                                                        <button disabled={k.quantity === 1 && true} onClick={() => handledecrement(k.id)} className='border-2 p-2'>-</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="">
                                                                <span className="">₹{k.product_price * k.quantity}</span>
                                                            </td>
                                                            <td className="">
                                                                <a href=""  onClick={() => handleDelete(k.id)}  ><CloseIcon /></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))
                                            }
                                        </table>
                                        <div className="box Add-button">
                                        <div className="option_container">
                                            <div className="options">
                                                <button><a href="/products" className="option1"> Continue Shopping</a></button>
                                              
                                            </div>
                                        </div>

                                    </div>
                                    </div>
                        </div>  

                         <div className='col-3 side-total'>
                            <div className='row total-box'>
                                    <h6>PRICE DETAILS</h6>
                            </div>
                            <div className='row'>
                                <p className='main-tit-box'>Price ({cartData.length} items)</p>
                                <p className='sub-tit-box'>₹{totalamount}</p>
                            </div>
                            <div className='row'>
                                <p className='main-tit-box'>Discount</p>
                                <p className='sub-tit-box'>₹{discoutnt}</p>
                            </div>
                     
                            <div className='row final-total'>
                                <h6>Total Price</h6>
                                <h6>₹{finaltotal}</h6>
                            </div>
                            <div className='row save-line'>
                                <p className='save-price'>You will save <span className='save-green'>₹{discoutnt}</span> on this order</p>
                            </div>

                        </div>
                    
                    </div>
                </div>

            </div>


        </>

    );
}



export default CartDetails;