import React from 'react';
import { useState , useEffect} from 'react';
import { useParams , useNavigate} from 'react-router-dom';
const UpdateProduct = () => {

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category , setCategory] = useState("");
    const [company,setCompany] = useState("");
    const params = useParams();
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


    useEffect(()=>{
        console.log(params);
        getProductDetails();
    },[])

    const getProductDetails = async () =>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const changeDetails = async () =>{
        let result = await fetch(`http://localhost:5000/product/${params.id}` , {
            method:'put',
            body: JSON.stringify({name , price , category , company}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return(
        <div className='product'>
            <h1>Update Product</h1>
            
            <input type="text" value={name} placeholder='Product Name' className='inputBox' onChange={changeName} />
            <input type="text" value={price} placeholder='Product Price' className='inputBox' onChange={changePrice}/>
            <input type="text" value={category} placeholder='Product Category' className='inputBox' onChange={changeCategory}/>
            <input type="text" value={company} placeholder='Company' className='inputBox' onChange={changeCompany}/>
            <button onClick={changeDetails} className='add-product-btn'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;