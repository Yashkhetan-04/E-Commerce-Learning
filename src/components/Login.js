import React from 'react';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [Password , setPassword] = useState("");

    const UpdateEmail = (event) =>{
        setEmail(event.target.value);
    }

    const UpdatePassword = (event) =>{
        setPassword(event.target.value);
    }

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/');
        }
    })

    const UpdateDetails = async () => {
        console.warn(email , Password);
        let result = await fetch('http://localhost:5000/login' , {
            method:'post',
            body: JSON.stringify({email,Password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        
        if(result.auth){
            localStorage.setItem("user" , JSON.stringify(result.user));
            localStorage.setItem("token" , JSON.stringify(result.user));
            navigate('/');
        }
        else{
            alert("Please enter correct email");
        }
    }

    return(
        <div className='Login'>
            <h1>Login</h1>
            <h4>Email <span><input type="text" className='inputBox_login' value={email} placeholder='Enter email' onChange={UpdateEmail}/></span></h4>
            <h4>Password <span><input type="text" className='inputBox_login' value={Password} placeholder='Enter Password' onChange={UpdatePassword}/></span></h4>
            <button onClick={UpdateDetails} className='Login_button'  type='button'>Login</button>
        </div>
    )
}

export default Login