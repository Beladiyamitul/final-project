



// import React from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getdocdata } from '../../Redux/Acton/doctor.action';
import { getorderdata } from '../../Redux/Acton/orderplace.action';
import { getProduct } from '../../Redux/Acton/product.action';



function Vieworeder_admin(props) {

    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors);
    const vieworder = useSelector(state => state.order);
    const product = useSelector(state => state.product);
    const catagorydata = doctors.doctor;
    const orderdata = vieworder.order;
    const productdata = product.product;


    const getData = () => {
        // let getDocData =JSON.parse( localStorage.getItem('doctor'));

        // if(getDocData !== null){
        // setDatadoc(doctor.doctor);
        // }
        // setDatadoc(doctor.doctors);
    }
    useEffect(
        () => {
            dispatch(getorderdata())
            getData();
        },
        [])




    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'product_name', headerName: 'Product Name', width: 130 },
        { field: 'product_price', headerName: 'Product Price', width: 130 },
        {
            field: 'product_list', headerName: 'Product Type', width: 130,
            renderCell: (params) => (
                catagorydata.map((x) => {
                    if (x.id === params.formattedValue) {
                        return <div>{x.catagory_name}</div>
                    }
                })
            )

        },
        { field: 'product_description', headerName: 'Product Description', width: 130 },
        {
            field: 'file', headerName: 'Image', width: 130,
            renderCell: (params) => (
                <img src={params.row.url} width="100" height={100} />
            )
        },


    ];

    return (
        <div className='order-view-table'>
            <div className='container'>
                <table>
                    <thead>
                        <tr className='text-red-600'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th
                            >
                            <th>Address</th>
                            <th>Product detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderdata.map((o, i) => (

                                <tr>
                                    <th scope='row'>{i + 1}</th>
                                    <td>{o.User.user_name}</td>
                                    <td>{o.User.user_email}</td>
                                    <td>{o.User.user_phone}</td>
                                    <td>{o.User.user_address}</td>
                                    <td>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Quantity</th>
                                                <th>Product Price</th>
                                                <th>Product image</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {
                                                o.Cart.map((s, i) => (
                                                    <tr>
                                                        <td>{s.product_name}</td>
                                                        <td>{s.quantity}</td>
                                                        <td>₹{s.product_price}</td>
                                                        <td className='view-oreder-img'><img src={s.url}/></td>
                                                    </tr>
                                                    ))
                                            }
                                         </tbody>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>



            </div>
        </div>

    );

}

export default Vieworeder_admin;