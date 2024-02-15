import React, {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [Password , setPassword] = useState("");

    const navigate = useNavigate();

    const UpdateName = (event) => {
        setName(event.target.value);
    }
    const UpdateEmail = (event) => {
        setEmail(event.target.value);
    }
    const UpdatePassword = (event) => {
        setPassword(event.target.value);
    }

    const Collect_Data = async () => {
        console.warn(name , email , Password);
        if(name.length>0 && email.length>0 && Password.length){
            let result = await fetch('http://localhost:5000/register' , {
                method:'post',
                body: JSON.stringify({name,email,Password}),
                headers:{
                    'Content-Type':'application/json'
                },
            });
            result = await result.json();
            console.warn(result);
            if(result){
                localStorage.setItem("user" , JSON.stringify(result.result));
                localStorage.setItem("token" , JSON.stringify(result.auth));
                navigate('/');
            }
            else{
                alert("");
            }
        }
        else{
            alert("Enter all fields listed below");
        }
    }

    // sign up hone ke baad sign up page pe nhi jana hai tho ye likhna hai
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/');
        }
    })

    return(
        <div className='SignUp'>
            <h1>Sign Up</h1>
            <h4>Name<span><input className='inputBox' type="text" value={name} onChange={UpdateName} placeholder='Type here'/></span></h4>
            <h4>Email <span><input className='inputBox' type="text" value={email} onChange={UpdateEmail} placeholder='Type here'/></span></h4>
            <h4>Password <span><input className='inputBox' type="password" value={Password} onChange={UpdatePassword} placeholder='Type here'/></span></h4>
            <button onClick={Collect_Data} type='button' className='SignUp_button'>Sign Up</button>
        </div>
    )
}

export default SignUp;