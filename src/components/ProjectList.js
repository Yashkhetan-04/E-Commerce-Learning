import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProjectList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products' , {
            // headers:{
            //     authorization:JSON.parse(localStorage.getItem('token'))
            // }
        });
        result = await result.json();
        setProducts(result);
    }

    const DeleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}` , {
            method : 'Delete'
        });
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    const SearchProduct = async (event) => {
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
            
        }
        else{
            getProducts();
        }
    }

    return (
        <div className='product-List'>
            <h1>Project List</h1>
            <h3>Search product - <span><input className='Product-list-input' type="text" placeholder='Type here' onChange={SearchProduct}/></span></h3>
            <ul>
                <li>S.NO</li>
                <li>NAME</li>
                <li>PRICE</li>
                <li>CATEGORY</li>
                <li>OPERATIONS</li>
            </ul>
            {
                products.length>0 ? products.map((item,index) =>
                    <ul key={item}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <span><button className='projectList-delete-btn' onClick={()=>DeleteProduct(item._id)}>Delete</button>/<Link className='projectList-update-btn' to={"/update/"+item._id}>Update</Link></span>
                            
                        </li>
                    </ul>
                )
                : 
                <h1>"No Result Found"</h1>
            }
        </div>
    )
}

export default ProjectList
