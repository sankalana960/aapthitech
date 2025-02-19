"use client"
import "./dashboard.css"
import React, {useEffect, useLayoutEffect, useState } from 'react'
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
// import { API_ROUTES } from "../constants/apiroutes";
import { API_ROUTES, getEndpointUrl } from "../../../constants/apiroutes";
export default function Page() {
    const router = useRouter()
    const [userDetails, setUserDetails] = useState([])
    const userRole = localStorage.getItem('userRole');
    const userFirst = localStorage.getItem('firstName');
    const userimage = localStorage.getItem('imagePath');
    const userID = localStorage.getItem('id');
    
    const fetchData = async () => {
        // const response = await fetch(`${API_URL}/${API_ROUTES.GETALLUSERS.GETALLUSERS}`)
        const response = await fetch(getEndpointUrl(API_ROUTES.GETALLUSERS.GETALLUSERS))
        const data = await response.json()
        setUserDetails(data)
    }
    useEffect(()=>{
        fetchData()
    }, [])

    const editUser = (user)=>{
        const {id} = user;
        router.push(`/adduser?id=${encodeURIComponent(id)}`);
    }

    const deleteUser = async (user)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) {
            return;
        }
        const {id} = user;
        const response = await fetch(`${getEndpointUrl(API_ROUTES.USER.DELETEUSER)}/${id}`, {
            // const response = await fetch(`${API_URL}/${API_ROUTES.USER.DELETEUSER}/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    }
    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove("isLoggedIn");
        router.push('/login');
    };


  return (
    <div className="">
        <div className="container" style={{padding: "30px", width: "100vw"}}>
        <div className="d-flex justify-content-between mb-3">
            <h2 className="user-text">Users</h2>
            {userRole==="Admin"&&
                <Link href="adduser">
                    <button className="btn btn-success">Add User</button>
                </Link>
            }
        </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Profile</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((each)=>{
                        let {id,first_name, last_name, email, phone_number,imagePath, role} = each
                        if (!first_name){
                            let {firstName, lastName, phoneNumber} = each
                            first_name=firstName
                            last_name=lastName
                            phone_number=phoneNumber
                        }
                        imagePath= imagePath.replace(/C:\\uploads\\/g,"")
                        if(userRole==="Admin" && id!=userID)
                        {
                            return(
                                <tr key={id} className="user-row">
                                    <td><img src={`${getEndpointUrl(API_ROUTES.STATICFILES)}${imagePath}`} alt="NA" style={{ width: '80px', height: 'auto' }}/></td>
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>{email}</td>
                                    <td>{phone_number}</td>
                                    <td>{role}</td>
                                    <td><button onClick={()=>editUser(each)} className="btn btn-primary">Edit</button></td>
                                    <td><button onClick={()=>deleteUser(each)} className="btn btn-secondary">delete</button></td>
                                </tr>
                            )
                        }else{
                            if(role==="User" && id!=userID){
                                return(
                                    <tr key={id} className="user-row" >
                                        <td><img src={`${getEndpointUrl(API_ROUTES.STATICFILES)}${imagePath}`} alt="NA" style={{ width: '80px', height: 'auto' }}/></td>
                                        <td>{first_name}</td>
                                        <td>{last_name}</td>
                                        <td>{email}</td>
                                        <td>{phone_number}</td>
                                        <td>{role}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            }
                        }
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
