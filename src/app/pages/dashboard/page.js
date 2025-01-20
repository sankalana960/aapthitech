"use client"
import "../dashboard/dashboard.css"
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {

    const [userDetails, setUserDetails] = useState([])

    useEffect(()=>{
        console.log('effect triggered')
        const fetchData = async () => {
            const response = await fetch("http://localhost:8333/getusers")
            const data = await response.json()
            setUserDetails(data)
        }
        fetchData()
    }, [])

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
                    {userDetails.map((each)=>{
                        const {first_name, last_name, email, phone_number} = each
                        return(
                            <tr key={phone_number}>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{email}</td>
                                <td>{phone_number}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
