'use client';
import "../login/login.css"
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Page() {

  const [formDetails, setForm] = useState({email:'', password:""})

  const fromChanger = (e)=>{
    setForm((prev)=>{
        return {...prev, [e.target.id]:e.target.value}
    })
    console.log(formDetails)
  }

  const login = () =>{
    console.log("clicked")
  }

  return (
    <div className='container'>
      <div className="login-form">
        <h4 className="text">Sign in to your session</h4>
          <input id="email" onChange={fromChanger} value={formDetails.email} className="form-control input-feild" type="text" placeholder="Email"/>
          <input id="password" onChange={fromChanger} value={formDetails.password} className="form-control input-feild" type="text" placeholder="Password"/>
          <button onClick={login} className="btn btn-primary">Login</button>
      </div>
    </div>
  )
}
