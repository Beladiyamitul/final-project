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



function Catagories_admin(props) {

    const [open, setOpen] = useState(false);
    const [docopen, setDocopen] = useState(false);
    const [catagory_name, setName] = useState('');
    const [catagory_price, setPrice] = useState('');
    const [data, setData] = useState([]);
    const [datadoc, setDatadoc] = useState('');
    const [docdid, setDocdid] = useState('');
    const [update, setUpdate] = useState('');
    const [eid, setEid] = useState('');






    const dispatch = useDispatch();
    const catagory = useSelector(state => state.doctors);
    
    const catagories_data = catagory.doctor ;

  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDClickOpen = (id) => {
        setDocopen(true);
        setDocdid(id);

    };



    const handleClickEditOpen = (params) => {
  
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
        catagory_name: yup.string().required("Please enter name"),
        // catagory_price: yup.string().required("Please enter Price"),
        // catagory_list : yup.string().required("please select catagory"),
        file: yup.mixed().required("please upload file")

    });

    const formik = useFormik({
        initialValues: {
            catagory_name: '',
            catagory_price: '',
            // catagory_list: "",
            file: ''
        },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleEdit(values)
            } else {

     

                //   alert(JSON.stringify(values, null, 2));
                // const {
                //     catagory_name,
                //     catagory_price,
                //     file

                // } = values;

                // const docdata = {
                //     id: Math.floor(Math.random() * 1000),
                //     catagory_name,
                //     catagory_price,
                //     file
                // }

                // let newdata = JSON.parse(localStorage.getItem("doctor"));
               
                // if (newdata == null) {
                //     localStorage.setItem('doctor', JSON.stringify([docdata]));
                // } else {
                //     newdata.push(docdata)
                //     localStorage.setItem('doctor', JSON.stringify(newdata));
                // }




                dispatch(addDoctordata(values))

                handleClose();
                getData();
          
                resetForm();
            }

        }


    });


    const handleEdit = (values) => {
        // let eData = JSON.parse(localStorage.getItem("doctor"));      
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

        dispatch(updateDoctordata(values))

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
            getData();
        },
        [])

    const handleDelete = () => {
        // let deldata = JSON.parse(localStorage.getItem("doctor"));

        // let filterdata = deldata.filter((r, i) => r.id !== docdid);

        // localStorage.setItem("doctor", JSON.stringify(filterdata));

        dispatch(deletDoctordata(docdid))

        getData();
        setDocopen(false);

    }


    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'catagory_name', headerName: 'Catagory Name', width: 130 },
        // { field: 'catagory_price', headerName: 'Catagory Price', width: 130 },
        // { field: 'catagory_list', headerName: 'Catagory Type', width: 130 },
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
                Add Catagories
            </Button>
            <div className="container">
                
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={catagories_data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            <div>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Catagories Data</DialogTitle>
                        <Formik value={formik}>
                            <Form key={formik} onSubmit={formik.handleSubmit}>
                                <DialogContent>

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="catagory_name"
                                        name="catagory_name"
                                        value={formik.values.catagory_name}
                                        label="Catagory Name"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}

                                    />
                                    {
                                        formik.errors.catagory_name ? <p>{formik.errors.catagory_name}</p> : null
                                    }

                                    {/* <TextField
                                        autoFocus
                                        margin="dense"
                                        id="catagory_price"
                                        name="catagory_price"
                                        value={formik.values.catagory_price}
                                        label="Catagory price"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}

                                    />
                                    {
                                        formik.errors.catagory_price ? <p>{formik.errors.catagory_price}</p> : null
                                    } */}
                               

                                    {/* <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Catagory Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="catagory_list"
                                            name='catagory_list'
                                            value={formik.values.catagory_list}
                                            label="Catagory"
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={"T-shirt"}>T-shirt</MenuItem>
                                            <MenuItem value={"Shirt"}>Shirt</MenuItem>
                                            <MenuItem value={"Dress"}>Dress</MenuItem>
                                            <MenuItem value={"Kurti"}>Kurti</MenuItem>
                                            <MenuItem value={"shoes"}>shoes</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {
                                        formik.errors.atagory_list ? <p>{formik.errors.atagory_list}</p> : null
                                    } */}

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

export default Catagories_admin;