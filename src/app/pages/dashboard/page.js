"use client"
import "../dashboard/dashboard.css"
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {

    const [userDetails, setUserDetails] = useState({})

    useEffect(()=>{
        console.log('effect triggered')
        const fetchData = async () => {
            const response = await fetch("/dashboard/api/index")
            console.log(response)
        }
        fetchData()
    })

  return (
    <div className="">
        <nav className='nav-bar'>
            <p className="nav-menu">Home</p>
            <p className="nav-menu">User</p>
        </nav>
        <div className="containers">
            <h2 className="user-text">Users</h2>
            <button className="btn btn-success">Add User</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sankalana</td>
                        <td>chary</td>
                        <td>sankalana3@gmail.com</td>
                        <td>8333881112</td>
                    </tr>
                    <tr>
                        <td>sankalana</td>
                        <td>chary</td>
                        <td>sankalana3@gmail.com</td>
                        <td>8333881112</td>
                    </tr>
                    <tr>
                        <td>sankalana</td>
                        <td>chary</td>
                        <td>sankalana3@gmail.com</td>
                        <td>8333881112</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
