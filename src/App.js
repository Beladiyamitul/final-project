import { Route, Switch } from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Container/Home/Home';
import About from './Container/About/About';
import Testimonial from './Container/Testimonial/Testimonial';
import Product from './Container/Product/Product';
import Blog_list from './Container/Blog_list/Blog_list';
import Contact from './Container/Contact/Contact';
import Footer from './Component/Footer/Footer';

function App() {
  return (
    <>
      <Header/>
        <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route exact path={"/about"} component={About}/>
            <Route exact path={"/testimonial"} component={Testimonial}/>
            <Route exact path={"/products"} component={Product}/>
            <Route exact path={"/blog"} component={Blog_list}/>
            <Route exact path={"/contact"} component={Contact}/>
        </Switch>
      <Footer/>
    </>
  );
}

export default App;
