import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Footer from '../../Component/Footer/Footer';
import Header from '../../Component/Header/Header';
import { IsLogin } from '../utils/Index';

function PrivateRoute({component : Component , restricted=false, ...rest}) {

    let login = useSelector(state => state.login);

    return (
        <Route {...rest} render={props => (

            // login.user !== null && restricted ?
            // <>
            // <Redirect to={"/"} /> 
            // </>
            // :
            // <>
            // <Component {...props}/>
            // </>
           
        

            IsLogin() && restricted ?
            <Redirect to={"/"} /> 
            :
                <Component {...props}/>
         )}
         

       
             

       />
    );
}

export default PrivateRoute;