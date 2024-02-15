import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {


    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category , setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    const changeName = (event) =>{
        setName(event.target.value);
    }
    const changePrice = (event) =>{
        setPrice(event.target.value);
    }
    const changeCategory = (event) =>{
        setCategory(event.target.value);
    }
    const changeCompany = (event) =>{
        setCompany(event.target.value);
    }

    const changeDetails = async () =>{
        
        console.log(name , price , category , company);

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/app-product' , {
            method : 'post',
            body : JSON.stringify({name , price , category , company , userId}),
            // jo cheez request(req) krna hai vo body me jaiga
            headers : {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return(
        <div className='product'>
            <h1>Add Product</h1>
            
            <input type="text" value={name} placeholder='Product Name' className='inputBox' onChange={changeName} />
            {error && !name && <span className='invalid-text'>Enter Valid Name</span>}
            <input type="text" value={price} placeholder='Product Price' className='inputBox' onChange={changePrice}/>
            {error && !price && <span className='invalid-text'>Enter Valid Price</span>}
            <input type="text" value={category} placeholder='Product Category' className='inputBox' onChange={changeCategory}/>
            {error && !category && <span className='invalid-text'>Enter Valid category</span>}
            <input type="text" value={company} placeholder='Company' className='inputBox' onChange={changeCompany}/>
            {error && !company && <span className='invalid-text'>Enter Valid Company</span>}
            <button onClick={changeDetails} className='add-product-btn'>Add Product</button>
        </div>
    )
}

export default AddProduct;