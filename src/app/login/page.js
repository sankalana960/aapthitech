'use client';
import "../login/login.css"
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";
import { API_ROUTES, getEndpointUrl } from "../../constants/apiroutes";
import { PAGE_ROUTE } from "../../constants/pagesroutes";

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
    const password = formDetails.password
    const API_URL = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
    const responce = await fetch(getEndpointUrl(API_ROUTES.AUTH.LOGIN), {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email, password})
    })
    const data = await responce.json()
    if (data.valid) {
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('firstName', data.user.firstName);
      localStorage.setItem('imagePath', data.user.imagePath);
      localStorage.setItem('id', data.user.id);
      document.cookie = `isLoggedIn=true; path=/; SameSite=Strict; Secure`;
      // document.cookie = `userRole=${data.role}; path=/; SameSite=Strict; Secure`;      
      router.push(PAGE_ROUTE.DASHBOARD);
      }else{
        alert("Enter Valid Credentials")
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
