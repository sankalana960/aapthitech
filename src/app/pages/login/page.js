'use client';
import "../login/login.css"
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Page() {

  const [formDetails, setForm] = useState({email:'', password:""})

  const [formErrors, setFormError] = useState({email:false, password:false})
  const fromChanger = (e)=>{
    setForm((prev)=>{
        return {...prev, [e.target.id]:e.target.value}
    })
    console.log(formDetails)
  }
# just pull to local
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
      router.push('http://localhost:3000/pages/dashboard')
    }
  }

  const login = () =>{
    validateForm()
  }

  return (
    <div className='container'>
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
