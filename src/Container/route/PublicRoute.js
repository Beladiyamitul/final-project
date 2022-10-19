import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Footer from '../../Component/Footer/Footer';
import Header from '../../Component/Header/Header';
import { IsLogin } from '../utils/Index';

function PublicRoute({ component : Component, restricted=false , ...rest}) {
    const login = useSelector(state => state.login);

    return (
     <Route {...rest} render={props => (

        


        login.user !== null &&  restricted ?
        <>
        <Header />
        <Redirect to={"/"} /> 
        <Footer/>
        </>
        :
        <>
        <Header />
        <Component {...props}/>
        <Footer/>
        </>
     )}
     
     
     />
    );
}

export default PublicRoute;