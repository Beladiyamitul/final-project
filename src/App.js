import { Route, Switch } from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Container/Home/Home';
import About from './Container/About/About';
import Testimonial from './Container/Testimonial/Testimonial';
import Product from './Container/Product/Product';
import Blog_list from './Container/Blog_list/Blog_list';
import Contact from './Container/Contact/Contact';
import Login from './Container/Login/Login';
import Footer from './Component/Footer/Footer';
import Catagories_admin from "./Adminpannel/Container/Catagories_admin";
import Product_admin from "./Adminpannel/Container/Product_admin";
import { Provider } from "react-redux";
import { counterStore } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import ProductDetails from "./Container/Productdetails/ProductDetails";
import CartDetails from "./Container/Add-To-Cart/CartDetails";
import Vieworeder_admin from "./Adminpannel/Container/Vieworeder_admin";
import Catagory from "./Container/Catagory/Catagory";

function App() {

  let { store, persistor } = counterStore()
  return (
    <>

        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/about"} component={About} />
          <Route exact path={"/testimonial"} component={Testimonial} />
          <Route exact path={"/products"} component={Product} />
          <Route exact path={"/product_admin"} component={Product_admin} />
          <Route exact path={"/catagory"} component={Catagory} />
          <Route exact path={"/vieworder_admin"} component={Vieworeder_admin} />
          <Route exact path={"/product_detail"} component={ProductDetails} />
          <Route exact path={"/cart_detail"} component={CartDetails} />
          <Route exact path={"/Catagories_admin"} component={Catagories_admin} />
          <Route exact path={"/blog"} component={Blog_list} />
          <Route exact path={"/contact"} component={Contact} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
        <Footer />
        </PersistGate>

</Provider>


    </>
  );
}

export default App;
