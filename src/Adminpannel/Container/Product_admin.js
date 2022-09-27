// import React from 'react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addDoctordata, deletDoctordata, getdocdata, updateDoctordata } from '../../Redux/Acton/doctor.action';
import { addProductdata, deletCatagorydata, getProduct, getproduct, updateCatagoryata } from '../../Redux/Acton/product.action';



function Product_admin(props) {

    const [open, setOpen] = useState(false);
    const [docopen, setDocopen] = useState(false);
    const [product_name, setName] = useState('');
    const [product_price, setPrice] = useState('');
    const [data, setData] = useState([]);
    const [datadoc, setDatadoc] = useState('');
    const [docdid, setDocdid] = useState('');
    const [update, setUpdate] = useState('');
    const [eid, setEid] = useState('');
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors);
    const product = useSelector(state => state.product);
    
    const catagorydata = doctors.doctor;
    const productdata = product.product;
    console.log("catagorydata",catagorydata);

    // console.log(product);
// console.log(product.doctor);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDClickOpen = (id) => {
        setDocopen(true);
        setDocdid(id);

    };



    const handleClickEditOpen = (params) => {
        console.log(params.row);
        setOpen(true);

        formik.setValues({
            ...params.row,
            file: params.row.url
        })

        setEid(params.id);
        setUpdate(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDocopen(false);


    };

    let schema = yup.object().shape({
        product_name: yup.string().required("Please enter name"),
        product_price: yup.string().required("Please enter Price"),
        product_list : yup.string().required("please select product"),
        product_description : yup.string().required("please enter description"),
        file: yup.mixed().required("please upload file")

    });

    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_price: '',
            product_list: "",
            product_description : "",
            file: ''
        },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleEdit(values)
            } else {

                console.log(values);

                //   alert(JSON.stringify(values, null, 2));
                // const {
                //     product_name,
                //     product_price,
                //     file

                // } = values;

                // const docdata = {
                //     id: Math.floor(Math.random() * 1000),
                //     product_name,
                //     product_price,
                //     file
                // }

                // let newdata = JSON.parse(localStorage.getItem("doctor"));
                // console.log(newdata);

                // if (newdata == null) {
                //     localStorage.setItem('doctor', JSON.stringify([docdata]));
                // } else {
                //     newdata.push(docdata)
                //     localStorage.setItem('doctor', JSON.stringify(newdata));
                // }


                // console.log(values);


                dispatch(addProductdata(values))

                handleClose();
                getData();
                // console.log(data);
                resetForm();
            }

        }


    });


    const handleEdit = (values) => {
        console.log(values)

        // let eData = JSON.parse(localStorage.getItem("doctor"));
        // console.log(eData);

        // let editData = eData.map((u) => {
        //     if (u.id == eid) {
        //         return(
        //             {id: eid , ...values}
        //         )
        //     }else{
        //         return u;
        //     }
        // });

        // localStorage.setItem("doctor", JSON.stringify(editData));

        dispatch(updateCatagoryata(values))

        getData();
        setOpen(false);
        setUpdate(false);
        setEid();

    }


    const getData = () => {
        // let getDocData =JSON.parse( localStorage.getItem('doctor'));

        // if(getDocData !== null){
        // setDatadoc(doctor.doctor);
        // }
        // setDatadoc(doctor.doctors);
    }



    useEffect(
        () => {
            dispatch(getdocdata())
            dispatch(getProduct())
            getData();
        },
        [])

    const handleDelete = () => {
        // let deldata = JSON.parse(localStorage.getItem("doctor"));

        // let filterdata = deldata.filter((r, i) => r.id !== docdid);

        // localStorage.setItem("doctor", JSON.stringify(filterdata));

        dispatch(deletCatagorydata(docdid))

        getData();
        setDocopen(false);

    }


    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'product_name', headerName: 'Product Name', width: 130 },
        { field: 'product_price', headerName: 'Product Price', width: 130 },
        { field: 'product_list', headerName: 'Product Type', width: 130,
        renderCell: (params) => (
            catagorydata.map((x) => {
                // console.log(x.id, params.formattedValue);
                if(x.id === params.formattedValue){
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
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (
                    <>

                        <Button startIcon={<DeleteIcon />} onClick={() => handleDClickOpen(params.row)}></Button>

                        <IconButton aria-label="edit" onClick={() => handleClickEditOpen(params)}>
                            <ModeEditIcon />
                        </IconButton>
                    </>

                )
            }
        },

    ];

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Product
            </Button>
            <div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={productdata}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <div>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Product</DialogTitle>
                        <Formik value={formik}>
                            <Form key={formik} onSubmit={formik.handleSubmit}>
                                <DialogContent>

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="product_name"
                                        name="product_name"
                                        value={formik.values.product_name}
                                        label="Product Name"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}

                                    />
                                    {
                                        formik.errors.product_name ? <p>{formik.errors.product_name}</p> : null
                                    }

                                   <TextField
                                        autoFocus
                                        margin="dense"
                                        id="product_price"
                                        name="product_price"
                                        value={formik.values.product_price}
                                        label="Product price"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}

                                    />
                                    {
                                        formik.errors.product_price ? <p>{formik.errors.product_price}</p> : null
                                    } 
                               

                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="product_list"
                                            name='product_list'
                                            // value={formik.values.product_list}
                                            label="Product"
                                            onChange={formik.handleChange}
                                        >
                                             {
                                                catagorydata.map((c) =>{
                                                    return(
                                                        <MenuItem value={c.id}>{c.catagory_name}</MenuItem>
                                                    )
                                                })
                                                    }
                                        </Select>
                                    </FormControl>

                                    {
                                        formik.errors.product_list ? <p>{formik.errors.product_list}</p> : null
                                    } 


                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="product_description"
                                        name="product_description"
                                        value={formik.values.product_description}
                                        label="Product Description"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}

                                    />
                                    {
                                        formik.errors.product_description ? <p>{formik.errors.product_description}</p> : null
                                    } 

                                    <input
                                        autoFocus
                                        margin="dense"
                                        type="file"
                                        id="file"
                                        name="file"
                                        label="Upload File"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => formik.setFieldValue('file', e.target.files[0])}

                                    />
                                    {
                                        formik.errors.file ? <p>{formik.errors.file}</p> : null
                                    }

                              
                               
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Submit</Button>
                                </DialogActions>
                            </Form>
                        </Formik>
                    </Dialog>


                    
            <Dialog
                open={docopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure Delete Data?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={ handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
                </div>

            </div>

        </div>

    );

}

export default Product_admin;