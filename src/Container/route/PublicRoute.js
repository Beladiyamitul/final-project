import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IsLogin } from '../utils/Index';

function PublicRoute({ component : Component, ...rest}) {
    let login = useSelector(state => state.login);
    return (
  
     <Route {...rest} render ={props => (
        
        IsLogin() ? <Component {...props}/> 
        :
        <Redirect to={"/login"}/>

       )}


       
     />
    );
}

export default PublicRoute;