import React, { useEffect, useState } from 'react';

import { getdocdata } from '../../Redux/Acton/doctor.action';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/Acton/product.action';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddcartAction } from '../../Redux/Acton/cart.action';
function Catagory(props) {

    
    const catagory = useSelector(state => state.doctors);
    const product = useSelector(state => state.product);

    const productdata = product.product ;

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [price, setPrice] = useState('');
    const [data, setData] = useState([]);
    const [search , setSearch] = useState("All");
    const [filterDataPro , setFilterDataPro] = useState([]);


    const [quantity, setQuantity] = useState(1)
    const history = useHistory()

    const handlecart = (g) => {
        const Datacart = {
            id: g,
            quantity: quantity
        }
        dispatch(AddcartAction(Datacart))
        history.push("/cart_detail")
    }


    const handleCatagory = (c) => {
        let filter = [];
        if (c === "All") {
            setFilterDataPro([]);
        }

        productdata.filter((f) =>{
            if (c === f.product_list) {
                filter.push(f);
            }
        })
        setFilterDataPro(filter);
    };

const filtercat = filterDataPro.length > 0 ? filterDataPro : productdata;


const historty = useHistory()


const handledetail = (p) =>{
    historty.push('/product_detail', p)  
}



useEffect(() =>{
   dispatch(getdocdata());
   dispatch(getProduct())

},[])







    return (
        <div>
            <section className="inner_page_head">
                <div className="container_fuild">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="full">
                                <h3>Product </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='catagory-view'>
            <div className="container">
            <div className="heading_container heading_center">
                        <h2>
                            Our <span>Catagory</span>
                        </h2>
                    </div>
            <div className="row">
            <a href="#" onClick={(e) => handleCatagory("All")}>
                     <div className='cat-view-box'> 
                             <div className='box-img'>
                                <img src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f6cd.png" />
                             </div>
                               <h4 className='cat-box-title'>All</h4>
                             
                      </div>
                      </a>
                    {

                        catagory.doctor.map((c) =>{
                            return(
                            <a href="#" onClick={(e) => handleCatagory(c.id)}>
                                <div className='cat-view-box'>
                                
                                    <div className='box-img'>
                                        <img src={c.url}/>
                                    </div>
                                    <h4 className='cat-box-title'>{c.catagory_name}</h4>
                                </div>
                            </a>
                            )
                        })
                    }
                    

            </div>

            </div>

            </section>

            {/* end inner page section */}
            {/* product section */}
           



        </div>

    );
}
export default Catagory;







