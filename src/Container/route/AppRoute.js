import React from 'react';
import Home from '../Home/Home';
import About from '../About/About';
import Testimonial from '../Testimonial/Testimonial';
import Product from '../Product/Product';
import Product_admin from '../../Adminpannel/Container/Product_admin';
import Catagory from '../Catagory/Catagory';
import Vieworeder_admin from '../../Adminpannel/Container/Vieworeder_admin';
import ProductDetails from '../Productdetails/ProductDetails';
import CartDetails from '../Add-To-Cart/CartDetails';
import Catagories_admin from '../../Adminpannel/Container/Catagories_admin';
import Contact from '../Contact/Contact';
import Blog_list from '../Blog_list/Blog_list';
import Login from '../Login/Login';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from '../route/PublicRoute';


function AppRoute(props) {
    return (
      <>
         <Switch>
              <PublicRoute exact path={"/"} component={Home} />
              <PublicRoute exact path={"/about"} component={About} />
              <PublicRoute exact path={"/testimonial"} component={Testimonial} />
              <PublicRoute exact path={"/products"} component={Product} />
              <Route exact path={"/product_admin"} component={Product_admin} />
              <PublicRoute exact path={"/catagory"} component={Catagory} />
              <Route exact path={"/vieworder_admin"} component={Vieworeder_admin} />
              <PublicRoute exact path={"/product_detail"} component={ProductDetails} />
              <PublicRoute exact path={"/cart_detail"} component={CartDetails} />
              <Route exact path={"/Catagories_admin"} component={Catagories_admin} />
              <PublicRoute exact path={"/blog"} component={Blog_list} />
              <PublicRoute exact path={"/contact"} component={Contact} />
              <PublicRoute exact path={"/login"} restricted={true} component={Login} />
            </Switch>
      </>

    );
}

export default AppRoute;