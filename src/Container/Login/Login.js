import React, { useState } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { googleLogin, loginUser, resetPassword, signupUser } from '../../Redux/Acton/login.action';

function Login(props) {

  const dispatch = useDispatch()

  const [User, setUserType] = useState('Login')
  // const [Reset, setReset] = useState(false)

  let login = {
    email: yup.string().email("Please enter valid email").required("Please enter Email"),
    password: yup.string().required("Please enter password")
  }

  let Signup = {
    // name: yup.string().required("Please enter your name"),
    email: yup.string().email("Please enter valid email").required("Please enter Email"),
    password: yup.string().required("Please enter password")
  }

  let forgotPass = {
    email: yup.string().email("Please enter valid email").required("Please enter Email"),
  }

  let schema, iniValue;

  if (User === 'Login') {
    schema = yup.object().shape(login);
    iniValue = {
      email: '',
      password: ''
    }
  }
  else if (User === 'Signup') {
    schema = yup.object().shape(Signup);
    iniValue = {
      // name: '',
      email: '',
      password: ''
    }
  }
  else if (User === 'Forgot') {
    schema = yup.object().shape(forgotPass);
    iniValue = {
      email: ''
    }
  }


  const formik = useFormik({
    initialValues: iniValue,
    validationSchema: schema,
    onSubmit: values => {
      if (User === 'Login') {
        console.log('Login Successfully ');
        dispatch(loginUser(values))

      } else if (User === 'Signup') {
        console.log('Signup Successfully ');
        dispatch(signupUser(values))
      } else if (User === 'Forgot') {
        console.log(values);
        dispatch(resetPassword(values))
        // console.log('Your OTP is : 852002');
    }
    }
  });

  const googleSignin = () =>{
    dispatch(googleLogin())
    
  }

  return (
    <main id="main">
      <section id="Final-login" className="Final-login">
        <div className="container">
          <div className="section-title text-center">
            {
              User === 'Forgot' ?
                <h2>Forgot Password</h2> :
                User === 'Login' ?
                  <h2>Login</h2>
                  :
                  <h2>Sign Up</h2>
            }
            
          </div>
          <Formik values={formik}>
            <Form onSubmit={formik.handleSubmit} className="php-email-form">
              <div className="row flex-column align-items-center">
                {
                  User === 'Forgot' ?
                    <div className="col-md-4 form-group mt-3 mt-md-0">
                      <input type="email" className="form-control" name="email" id="email" placeholder="Enter email" onChange={formik.handleChange} />
                      {
                        formik.errors.email ? <p>{formik.errors.email}</p>
                          :
                          null
                      }
                      <div className="validate" />
                    </div> :
                    null
                }
                {/* {
                  User === 'Signup' ?
                    <div className="col-md-4 form-group">
                      <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" onChange={formik.handleChange} />
                      <div className="validate" />
                      {
                        formik.errors.name ? <p>{formik.errors.name}</p>
                          :
                          null
                      }
                    </div>
                    :
                    null
                } */}
                {
                  (User === 'Login' || User === 'Signup') ?
                    <>
                      <div className="col-md-4 form-group mt-3 mt-md-0">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" onChange={formik.handleChange} />
                        {
                          formik.errors.email ? <p>{formik.errors.email}</p>
                            :
                            null
                        }
                        <div className="validate" />
                      </div>
                      <div className="col-md-4 form-group mt-3 mt-md-0">
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={formik.handleChange} />
                        {
                          formik.errors.password ? <p>{formik.errors.password}</p>
                            :
                            null
                        }
                        <div className="validate" />
                      </div>
                    </>
                    :
                    null
                }

              </div>

              {
                User === 'Forgot' ?
                  <>
                   <div className='login-button'>
                    <div className="text-center"><Button className='F-login-btn border-0 m-0' type="submit">Send OTP</Button></div>
                    <div className="text-center"><Button className='F-login-btn border-0 ms-0 mt-3' type="submit" onClick={() => setUserType('Login')}>Login</Button></div>
                    </div>  
                  </>
                  :
                  User === 'Login' ?
                    <>
                    <div className='login-button'>
                      <div className="text-center"><Button className='F-login-btn border-0 m-0' type="submit">Login</Button></div>
                      <div className='text-center pt-4'>
                        <Button className='F-login-btn border-0 m-0' type="button" onClick={() => setUserType('Signup')}>Sign Up</Button>
                      </div>
                    </div>  
                      <div className="text-center"><p className=' border-0 ms-0 mt-3' type="submit" onClick={() => setUserType('Forgot')} >Forgot Password</p></div>
                    </>
                    :
                    <>
                    <div className='login-button'>
                      <div className="text-center"><Button className='F-login-btn border-0 m-0' type="submit">Sign Up</Button></div>
                      <div className='text-center pt-4'>
                      <Button className='F-login-btn border-0 m-0' type="submit" onClick={() => setUserType('Login')}>Login</Button>
                      </div>
                    </div> 
                      <p className='text-center border-0 ms-0 mt-3'>Already have an account </p>
                    </>
              }
                <div className='text-center'>
                <Button className='appointment-btn-2 border-0 m-0 google-login' type="submit" onClick={() => googleSignin()}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"/>Login With Google</Button>
              </div>
            </Form>


            
          </Formik>
        </div>
      </section>
    </main>
  );
}


export default Login;
