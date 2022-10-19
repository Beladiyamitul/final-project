import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Footer from '../../Component/Footer/Footer';
import Header from '../../Component/Header/Header';
import { IsLogin } from '../utils/Index';

function PrivateRoute({component : Component , ...rest}) {

    const login = useSelector(state => state.login);

    console.log(login);

    return (
       <Route {...rest} render ={props => (


         login.user !== null && login.user.role === 'admin' ? 
     <>
         <Header/>
        <Component {...props}/> 
        <Footer/>
    </>
        :
        <Redirect to={"/"}/>

       )}
             

       />
    );
}

export default PrivateRoute;