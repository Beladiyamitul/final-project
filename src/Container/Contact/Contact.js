import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';

import { Formik, Form, useFormik } from 'formik';
import Inputbox from '../../Component/InputBox/Inputbox';

function Contact(props) {

    const [Usertype, setUserType] = useState('ContactUs')
    const [data , setData] = useState([])


    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        email: yup.string().email("please enter valid email").required("please enter email"),
        phone: yup.number().required("please enter number")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validationSchema: schema,
        onSubmit: (values , {resetForm}) => {
            const  {
                name,
                email,
                phone
            } = values
            
            const datacon = {
                id: Math.floor(Math.random() * 1000),
                name, 
                email,
                phone
            }
            let condata = JSON.parse(localStorage.getItem("contactdata"));
            if (condata == null) {
                localStorage.setItem("contactdata" , JSON.stringify([datacon]));
            }else{
                condata.push(datacon);
                localStorage.setItem("contactdata" , JSON.stringify(condata));
            }
            getData();
            resetForm();

            // alert(JSON.stringify(values, null, 2));

        },
    });



    const getData = () => {
        let getconData = JSON.parse(localStorage.getItem('contactdata'));

        if (getconData !== null) {
            setData(getconData);
        
        }

    }

    useEffect(
        () =>{
            getData();
        },
        []
    )

    const { errors, values, handleChange, handleSubmit } = formik;

    const columns = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
       
    
      ];
    return (
        <div>
            <section className="inner_page_head">
                <div className="container_fuild">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="full">
                                <h3>Contact us</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end inner page section */}
            {/* why section */}
            <section className="why_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="full">
                                <Formik values={formik}>
                                    <Form onSubmit={handleSubmit}>

                                        {/* <Label for="exampleName">Name</Label> */}
                                        <Inputbox type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            error={Boolean(errors.name)}
                                            errormessage={errors.name}

                                        />

                                        {/* <Label for="exampleEmail">Email</Label> */}
                                        <Inputbox type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            error={Boolean(errors.email)}
                                            errormessage={errors.email}
                                        />


                                        {/* <Label for="exampleSubject">Subject</Label> */}
                                        <Inputbox type="number"
                                            name="phone"
                                            id="phone"
                                            placeholder="Mobile Number"
                                            onChange={handleChange}
                                            error={Boolean(errors.phone)}
                                            errormessage={errors.phone}

                                        />


                                        {/* <Label for="exampleText">Text Area</Label> */}
                                        <Inputbox type="textarea"
                                            name="Message"
                                            id="exampleText"
                                            placeholder="Message"
                                        />

                                        <div class="text-center"><Button className='F-login-btn border-0 ms-0 mt-3' type="submit">Submit</Button></div>
                                    </Form>
                                </Formik>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
            {/* end why section */}
            {/* arrival section */}
            <section className="arrival_section">
                <div className="container">
                    <div className="box">
                        <div className="arrival_bg_box">
                            <img src="images/arrival-bg.png" alt />
                        </div>
                        <div className="row">
                            <div className="col-md-6 ml-auto">
                                <div className="heading_container remove_line_bt">
                                    <h2>
                                        #NewArrivals
                                    </h2>
                                </div>
                                <p style={{ marginTop: 20, marginBottom: 30 }}>
                                    Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!
                                </p>
                                <a href>
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>

    );
}

export default Contact;