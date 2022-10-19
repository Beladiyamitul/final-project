import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, deletecart, emptybuy, emptycart, increment } from '../../Redux/Acton/cart.action';
import { getProduct } from '../../Redux/Acton/product.action';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';

import { Button } from 'reactstrap';
import CloseIcon from '@mui/icons-material/Close';
import { getorderdata, postorder } from '../../Redux/Acton/orderplace.action';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function CartDetails(props) {
    const [cartData, setCartData] = useState([])
    const [Buycartdata, setBuycartdata] = useState([])
    const dispatch = useDispatch();
    const [placeorder, setPlaceorder] = useState(false)
    const product = useSelector(state => state.product);
    const Cartproduct = useSelector(state => state.cartpro);
    const productdata = product.product;
    const CartProData = Cartproduct.cart;

    const login = useSelector(state => state.login);

    const history = useHistory()



    const handleDelete = (id) => {
        dispatch(deletecart(id))
    }


   
    
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
    
    const buyDataFun = () => {
        const Buycart = [];
       
        productdata.map((j) => {
          
                if (j.id === props?.location?.state?.id) {
                    const quacountB = {
                        ...j,
                        quantity: props.location.state.quantity
                    }
                    Buycart.push(quacountB)
                }
            
        })

        setBuycartdata(Buycart)

    }


    const handleincrement = (id) => {
        dispatch(increment(id))
    }

    useEffect(() => {
        if (props?.location?.state?.search === 'Buy') {
            login.user !== null ? setPlaceorder(true) : history.push("/login");
         
        }
     }, [props?.location?.state?.search ])
     

     let total;
     let totalbuy;
     let totalamount = 0;
    let totalamountbuy = 0;
    
    cartData.map((g) => {
        total = g.product_price * g.quantity;
        totalamount = totalamount + total;
    })

    Buycartdata.map((g) => {
        totalbuy = g.product_price * g.quantity;
        totalamountbuy = totalamountbuy + totalbuy;
    })



    const discoutnt = Math.round(totalamount * 0.08);
    const finaltotal = totalamount - discoutnt;

    const discoutntbuy = Math.round(totalamountbuy * 0.08);
    const finaltotalbuy = totalamountbuy - discoutntbuy;


    const handledecrement = (id) => {
        dispatch(decrement(id))
    }


    const orderplace = () => {
        
        login.user !== null ? setPlaceorder(true) : history.push("/login");
    }   

    useEffect(() => {
        dispatch(getProduct());

        cartDataFun();
        buyDataFun();

    }, [CartProData])

   

    var str = '0123456789';

    let schema = yup.object().shape({
        user_name: yup.string().required("Please enter name").matches(/[abcdefghijklmnopqrstuvwxyz]+/, 'Is not in correct format'),
        user_email: yup.string().required("Please enter email"),
        user_address: yup.string().required("please enter address").max(100, 'Must be exactly 100 digits'),
        user_phone: yup.string().required("please enter Phone number").max(10, 'Must be exactly 10 digits'),

    });

    const formik = useFormik({
        initialValues: {
            user_name: '',
            user_email: '',
            user_address: "",
            user_phone: "",
        },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {
            if (props?.location?.state?.search === 'Buy') {
                const submitorder = {
                    userDetails: values,
                    cartDetails: cartData
                };
    
                dispatch(postorder(submitorder))
                history.push('/')
                resetForm();
                toast.success("Your Order is successfully submited")
                dispatch(emptybuy())

            }else{
            const submitorder = {
                userDetails: values,
                cartDetails: cartData
            };

            dispatch(postorder(submitorder))
            history.push('/')
            resetForm();
            toast.success("Your Order is successfully submited")
            dispatch(emptycart())
        }

        }


    });

  

    return (
        <>
            <div className='cart-box'>
                <div className='container'>
                    <div className='row main-tit'>
                        <div className='col-12'>
                            {placeorder ?
                                <div className='Add-main-title'>
                                    <h3>Place Order</h3>
                                </div>
                                :
                                <div className='Add-main-title'>
                                    <h3>Add To Cart Items</h3>
                                </div>
                            }
                        </div>


                    </div>
                    <div className='row'>
                        <div className='col-9'>

                            {placeorder ?

                                <Formik value={formik}>
                                    <Form key={formik} onSubmit={formik.handleSubmit}>
                                        <DialogContent>

                                            <TextField

                                                margin="dense"
                                                id="user_name"
                                                name="user_name"
                                                value={formik.values.user_name}
                                                label="Name"
                                                fullWidth
                                                variant="standard"
                                                onChange={formik.handleChange}

                                            />
                                            {
                                                formik.errors.user_name ? <p className='error-form'>{formik.errors.user_name}</p> : null
                                            }

                                            <TextField

                                                margin="dense"
                                                id="user_email"
                                                name="user_email"
                                                value={formik.values.user_email}
                                                label="email"
                                                fullWidth
                                                variant="standard"
                                                onChange={formik.handleChange}

                                            />
                                            {
                                                formik.errors.user_email ? <p className='error-form'>{formik.errors.user_email}</p> : null
                                            }

                                            <TextField

                                                margin="dense"
                                                id="user_address"
                                                name="user_address"
                                                value={formik.values.user_address}
                                                label="Address"
                                                fullWidth
                                                variant="standard"
                                                onChange={formik.handleChange}

                                            />
                                            {
                                                formik.errors.user_address ? <p className='error-form'>{formik.errors.user_address}</p> : null
                                            }

                                            <TextField

                                                margin="dense"
                                                id="user_phone"
                                                name="user_phone"
                                                value={formik.values.user_phone}
                                                label="phone Number"
                                                type="number"
                                                fullWidth
                                                variant="standard"
                                                onChange={formik.handleChange}

                                            />
                                            {
                                                formik.errors.user_phone ? <p className='error-form'>{formik.errors.user_phone}</p> : null
                                            }



                                        </DialogContent>
                                        <DialogActions>
                                            <Button type="submit">Submit</Button>
                                        </DialogActions>
                                    </Form>
                                </Formik>


                                :

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
                                            cartData.map((k) => (

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
                                                            <a href="" onClick={() => handleDelete(k.id)}  ><CloseIcon /></a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                    <div className="box Add-button Continue">
                                        <div className="option_container">
                                            <div className="options">
                                                <button><a href="/products" className="option1"> Continue Shopping</a></button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>

                  { props?.location?.state?.search === 'Buy' ?

                        <div className='col-3 side-total'>
                            <div className='row total-box'>
                                <h6>PRICE DETAILS</h6>
                            </div>
                   
                          
                            <div className='row'>
                                <p className='main-tit-box'>Price ({Buycartdata.length} items)</p>
                                <p className='sub-tit-box'>₹{totalamountbuy}</p>
                            </div>
                            <div className='row'>
                                <p className='main-tit-box'>Discount</p>
                                <p className='sub-tit-box'>- ₹{discoutntbuy}</p>
                            </div>

                            <div className='row final-total'>
                                <h6>Total Price</h6>
                                <h6>₹{finaltotalbuy}</h6>
                            </div>
                            <div className='row save-line'>
                                <p className='save-price'>You will save <span className='save-green'>₹{discoutntbuy}</span> on this order</p>
                            </div>

                            {placeorder ?
                                <div className='row  place-btn d-none'>
                                    <div className="box Add-button btn-plceorder">
                                        <div className="option_container btn-plceorder">
                                            <div className="options btn-plceorder">
                                                <button><a href onClick={orderplace} className="option1"> Place Order</a></button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                :
                                <div className='row  place-btn'>
                                    <div className="box Add-button btn-plceorder">
                                        <div className="option_container btn-plceorder">
                                            <div className="options btn-plceorder">
                                                <button><a href onClick={orderplace} className="option1"> Place Order</a></button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }

                        </div>
                        :
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
                                <p className='sub-tit-box'>- ₹{discoutnt}</p>
                            </div>

                            <div className='row final-total'>
                                <h6>Total Price</h6>
                                <h6>₹{finaltotal}</h6>
                            </div>
                            <div className='row save-line'>
                                <p className='save-price'>You will save <span className='save-green'>₹{discoutnt}</span> on this order</p>
                            </div>

                            {placeorder ?
                                <div className='row  place-btn d-none'>
                                    <div className="box Add-button btn-plceorder">
                                        <div className="option_container btn-plceorder">
                                            <div className="options btn-plceorder">
                                                <button><a href onClick={orderplace} className="option1"> Place Order</a></button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                :
                                <div className='row  place-btn'>
                                    <div className="box Add-button btn-plceorder">
                                        <div className="option_container btn-plceorder">
                                            <div className="options btn-plceorder">
                                                <button><a href onClick={orderplace} className="option1"> Place Order</a></button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }

                        </div>
                        }

                    </div>
                </div>

            </div>


        </>

    );
}



export default CartDetails;