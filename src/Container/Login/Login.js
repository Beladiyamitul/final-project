import React, { useState } from 'react';
import { Button  , Row , Col , FormGroup , Label , Input } from 'reactstrap';
import * as yup from 'yup';
import { Formik, Form , useFormik } from 'formik';



function Login(props) {

  const [User , setUserType] = useState('login')

  const loginbutton ={
  email: yup.string().email('please enter valid email').required('please enter email'),
  password: yup.string().required('please enter password')
  }
  

  let schema = yup.object().shape(loginbutton);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
      
    },
    validationSchema: schema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });



  console.log(formik.errors.email);

    return (
      <section id="appointment" className="appointment">
      <div className="container">
          {
            User === 'login' ?
              <div className="section-title">
                  <h2 className='text-center m-3'>Login</h2>
              </div>
              :  <div className="section-title">
                   <h2 className='text-center m-3'>signup</h2>
                  </div>
          }

<Formik values={formik}> 
         
        <Form  className="php-email-form">
          {
            User === "signup" ?
            <div className="row justify-content-center"> 
                <div className="col-md-4 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div className="validate" />
                </div> 
               </div> 
            :null
          }
        
          <div className="row justify-content-center">  
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" onChange={formik.handleChange} />
              <div className="validate" />
            </div>
          </div>
          <div className="row justify-content-center"> 
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input type="password" className="form-control" name="password" id="password" placeholder="Your password" onChange={formik.handleChange} />
              <div className="validate" />
            </div>
          </div>
          <div className='row   justify-content-center'>
            <div className='d-flex'>
            <div class="text-center login m-3"><button type="button" onClick={()=> setUserType('login')}>Login</button></div>
            
            <div class="text-center singup m-3"><button type="button" onClick={()=> setUserType('signup')}>Signup</button></div>
            </div>

          </div>
        </Form>
</Formik>        
      </div>
   </section>
    );
}

export default Login;