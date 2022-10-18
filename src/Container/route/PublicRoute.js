import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IsLogin } from '../utils/Index';

function PublicRoute({ component : Component, restricted=false , ...rest}) {
    const login = useSelector(state => state.login);

    return (
     <Route {...rest} render={props => (

        


        login.user !== null &&  restricted ?
        <Redirect to={"/"} /> 
        :
            <Component {...props}/>
     )}
     
     
     />
    );
}

export default PublicRoute;