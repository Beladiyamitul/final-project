import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IsLogin } from '../utils/Index';

function ClinteRoute({component : Component, restricted=false , ...rest}) {
    let login = useSelector(state => state.login);

    return (
        <Route {...rest} render={props => (

            // login.user !== null ?
            // <>
           
            // <Component {...props}/>
            // </>
            // :
            // <>
            // <Redirect to={"/login"} /> 
            // </>
           
        

            IsLogin() && restricted ?
            <Component {...props}/>
            :
            <Redirect to={"/login"} /> 
         )}
         

       
             

       />
    );
}

export default ClinteRoute;