"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../adduser/adduser.css"
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

export default function Page() {

  const [formDetails, setForm] = useState({firstName:"", lastName:"", email:"", gender:"Male", password:"", hobbies:"", role:"", number:""})
  const [formErrors, setFormErrors] = useState({});
  const [profile, setImage] = useState(null)
  const [preview, setPreviewImage] = useState(null)
  const searchParams = useSearchParams();

  const [update, setUpdate] = useState(true)
  const id = searchParams.get("id")
  useEffect(()=>{
    if (id){
      (async ()=>{
        const response = await fetch(`http://localhost:8333/getusers/${id}`)
        const data = await response.json()
        setForm(data)
        const dp = await fetch(`http://localhost:8333/uploads/${formDetails.imagePath}`)
        setImage(data.imagePath)
        setUpdate(false)
      })()
    }
  },[])
  useEffect(() => {
          const isLoggedIn = localStorage.getItem('isLoggedIn');
          if (!isLoggedIn) {
              router.push('/login');
          }
      });

  const formHandler = (e) => {
    const { id, value } = e.target;
    setForm((prev) => {
      return { ...prev, [id]: value };
    });
  }
  const router = useRouter()
  const validation = () =>{
    // const errors = {};
    //     if (!formData.first_name) errors.first_name = "First name is required";
    //     if (!formData.last_name) errors.last_name = "Last name is required";
    //     if (!formData.email) {
    //         errors.email = "Email is required";
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         errors.email = "Email is not valid";
    //     }
    //     if (!formData.phone_number) errors.phone_number = "Phone number is required";
    //     if (!formData.password) errors.password = "Password is required";
    //     else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters long";
  }
  const submitForm = async (e) =>{
    e.preventDefault();
    validation();
    const formData = new FormData();
    for (const key in formDetails) {
      formData.append(key, formDetails[key]);
    }
    if (profile) {
      formData.append('image', profile);
    }
    const data = await fetch("http://localhost:8333/userdetails", {
        method:'POST',
        body:formData
    })
    const response = await data.json()
    router.push('/dashboard')
  }
  // const UpdateForm = async (e) =>{
  //   e.preventDefault();
  //   console.log(formDetails)
  //   const data = await fetch(`http://localhost:8333/updateuser/${id}`, {
  //       method:'PUT',
  //       headers:{
  //         'Content-Type':"Application/json"
  //       },
  //       body:JSON.stringify(formDetails)
  //   })
  //   const response = await data.json()
  //   router.push('/dashboard')
  // }
  const UpdateForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in formDetails) {
        formData.append(key, formDetails[key]);
    }
    if (profile) {
        formData.append('image', profile);
    }
    try {
        const response = await fetch(`http://localhost:8333/updateuser/${id}`, {
            method: 'PUT',
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json();
            console.error("Error updating user:", error.error);
            return;
        }

        const result = await response.json();
        console.log(result.message);
        router.push('/dashboard');
    } catch (error) {
        console.error("Request failed:", error);
    }
};



  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
};
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
        setPreviewImage(reader.result); // Set the preview image URL
    };
    reader.readAsDataURL(file);
  }else{
    setPreviewImage(null);
  }
};


  return (
    <>
      <nav className='nav-bar'>
        <p className="nav-menu">Home</p>
        <Link href="dashboard"><p className="nav-menu">User</p></Link>
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
      </nav>
      <div className='container pt-3'>
      <form>
      <input onChange={handleImageChange} type="file" accept="image/*" />
      {preview&&<img src={preview} alt="NA" style={{ width: '80px', height: 'auto' }}/>}
      {!preview&&<img src={`http://localhost:8333/uploads/${formDetails.imagePath}`} alt="NA" style={{ width: '80px', height: 'auto' }}/>}
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="firstName">First name</label>
            <input onChange={formHandler} value={formDetails.firstName} type="text" className="form-control" id="firstName" placeholder="First name" required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input onChange={formHandler} value={formDetails.lastName} type="text" className="form-control" id="lastName" placeholder="Last name" required />
          </div>
          <div className="col-md-4 mb-3">
            <label  htmlFor="email">Email</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
              </div>
              <input onChange={formHandler} value={formDetails.email} type="text" className="form-control" id="email" placeholder="Email" aria-describedby="inputGroupPrepend2" required />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label  htmlFor="email">Number</label>
            <div className="input-group">
              <input onChange={formHandler} value={formDetails.number} type="text" className="form-control" id="number" placeholder="Mobile number" aria-describedby="inputGroupPrepend2" required />
            </div>
          </div>
          <div className="col-md-4 mb-3">
          <label htmlFor="role">Role</label>
          <select
            onChange={formHandler}
            value={formDetails.role}
            className="form-control"
            id="role"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        </div>
        <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="gender">Gender</label>
          <select
              onChange={formHandler}
              value={formDetails.gender}
              className="form-control"
              id="gender"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="password">Password</label>
            <input onChange={formHandler} value={formDetails.password} type="text" className="form-control" id="password" placeholder="Password" required />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="hobbies">Hobbies</label>
            <input onChange={formHandler} value={formDetails.hobbies} type="text" className="form-control" id="hobbies" placeholder="Hobbies" required />
          </div>
        </div>
        {update?<button onClick={submitForm} className="btn btn-primary" type="submit">Create User</button>:
        <button onClick={UpdateForm} className="btn btn-primary" type="Update">update</button>
        }
      </form>
      </div>
    </>
  )
}
