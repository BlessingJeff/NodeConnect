import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
function UserList() {
const [userList, setUserList] = useState([])
useEffect( () => {
    fetchUsers()
}, [])

let fetchUsers = async () => {
  try {
   let userData = await axios.get("http://localhost:3000/users");
   setUserList(userData.data)
  } catch (error) {
      console.log(error);
  }
}

let handleDelete = async(id) => {
    try {
        let result = window.confirm("Are you sure, you wanna delete?")
        if(result) {
            await axios.delete(`http://localhost:3000/user/${id}`)
            fetchUsers() 
        }
        
    } catch (error) {
       console.log(error) 
    }
} 
    return (
        <>
        <div className="row">
    <div className="col-lg-6">
        <h3>User List</h3>
        </div>
  <div className="col-lg-6 text-end">
  <Link to="/create">
      <button className="btn btn-primary" >Create</button></Link>
        </div>
    </div>
        <table className="table table-striped table-hover">
        <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
      </tr>
    </thead>
    <tbody>
        {
            userList.map((user) =>{
                       return <tr>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
        <Link to={`/edit-user/${user.id}`}>
        <button className="btn btn-sm btn-primary">Edit</button>
        </Link>
        </td>
        <td><button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button></td>
        </tr>
            })
        }
      </tbody>
  </table>
    </>
    )
}  

export default UserList
