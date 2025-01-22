"use client"
import "./dashboard.css"
import React, {useEffect, useLayoutEffect, useState } from 'react'
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
        }
    });
    const [userDetails, setUserDetails] = useState([])
    const role = localStorage.getItem('userRole');
    const fetchData = async () => {
        const response = await fetch("http://localhost:8333/getusers")
        const data = await response.json()
        setUserDetails(data)
    }
    useEffect(()=>{
        console.log('effect triggered')
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
        const response = await fetch(`http://localhost:8333/deleteuser/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    }
    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };
    console.log(userDetails)


  return (
    <div className="">
        <nav className='nav-bar'>
            <p className="nav-menu">Home</p>
            <p className="nav-menu">User</p>
            <button onClick={handleLogout} className="btn btn-danger">
            Logout
            </button>
        </nav>
        <div className="container" style={{padding: "30px", width: "100vw"}}>
            <h2 className="user-text">Users</h2>
            <Link href="adduser"><button className="btn btn-success">Add User</button></Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Profile</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((each)=>{
                        let {id,first_name, last_name, email, phone_number,imagePath,  admin} = each
                        imagePath= imagePath.replace(/C:\\uploads\\/g,"")
                        return(
                            <tr key={id}>
                                <td><img src={`http://localhost:8333/uploads/${imagePath}`} alt="NA" style={{ width: '80px', height: 'auto' }}/></td>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{email}</td>
                                <td>{phone_number}</td>
                                {role==="Admin"&&<>
                                    <td><button onClick={()=>editUser(each)} className="btn btn-primary">Edit</button></td>
                                    <td><button onClick={()=>deleteUser(each)} className="btn btn-secondary">delete</button></td>
                                </>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
