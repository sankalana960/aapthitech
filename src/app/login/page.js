'use client';
import "../login/login.css"
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [formDetails, setForm] = useState({email:'', password:""})
  const [formErrors, setFormError] = useState({email:false, password:false})

  const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };


  const fromChanger = (e)=>{
    setForm((prev)=>{
        return {...prev, [e.target.id]:e.target.value}
    })
  }
  
  const validateForm = () =>{
    if(formDetails.email==="" || formDetails.email.length<=8){
      if(formDetails.password.length>8){
        setFormError(pre=>{ return {...pre, password:false} })
      }
      setFormError(pre=>{ return {...pre, email:true} })
    }else if(formDetails.password==="" || formDetails.password.length<=8){
      setFormError(pre=>{ return {...pre, password:true} })
    }else{
      setFormError(pre=>{ return {email:false, password:false} })
    }
  }

  const login  = async () =>{
    validateForm()
    const email = formDetails.email
    const password = formDetails.password//await hashPassword(formDetails.password);
    
    const responce = await fetch("http://localhost:8333/loginuser", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email, password})
    })
    const data = await responce.json()
    console.log(data)
    if (data.valid) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', data.role);      
      router.push("/dashboard");
      }
    }
  return (
    <div className='containers'>
      <div className="login-form">
        <h4 className="text">Sign in to your session</h4>
          <input id="email" onChange={fromChanger} value={formDetails.email} className="form-control input-feild" type="text" placeholder="Email"/>
          {formErrors.email&&<p className="error">Enter valid Email</p>}
          <input id="password" onChange={fromChanger} value={formDetails.password} className="form-control input-feild" type="text" placeholder="Password"/>
          {formErrors.password&&<p className="error">Enter valid Password</p>}
          <button onClick={login} className="btn btn-primary">Login</button>
      </div>
    </div>
  )
}
