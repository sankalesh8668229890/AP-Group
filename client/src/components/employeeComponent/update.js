import React, {  useState} from "react";
import { useEffect } from "react";
import {useParams,useNavigate} from 'react-router-dom'

const Update = () => {
    const [updateEmployee ,setUpdateEmployee]=useState({
      firstName:"",
      lastName:"",
      email:"",
      phone:"",
      password:""
    })

    const handleOnchange = (event) => {
      setUpdateEmployee({
        ...updateEmployee,
        [event.target.name]:event.target.value
      })
    }
    



  useEffect(() =>{
    getSingle()
  },[])
    let Params=useParams()
    let Navigate=useNavigate()
  
        
    
    const getSingle= async() =>{


      let result=await fetch(`http://localhost:5000/getEmployee/${Params.id}`)
      result= await result.json()
    let  data=result.data
    }
   
   
   
    const updateData=async() =>{

      const {firstName, lastName,email,phone,password} = updateEmployee

      let result=await fetch(`http://localhost:5000/updateEmployee/${Params.id}`,{
        method:"put",
        body:JSON.stringify({firstName, lastName,email,phone,password}),
        headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result= await result.json()
      if(result.status){
        alert("Updated SuccessFully")
      }
      Navigate('/userhomepage')
     
        
    }
    return (
        <>
          <div className="container mt-4">

<div className="p-4 m-4">

    <div className="col-lg-5 rounded mx-auto  pt-4  shadow-lg p-3 mb-5 bg-body rounded">
        <div className="text-center col">
                <hr />
                <div className="display-8"><h3>Update Employee</h3></div>
                <hr />
        </div>
 
            <div className="form-group">
                <label for="">From</label>
                <input type="v" value={updateEmployee.firstName} onChange={handleOnchange} required 
                     className="form-control form-control-sm"
                    placeholder="First Name" />
            </div>
            <div className="form-group">
                <label for="">Last Name</label>
                <input name="lastName" type="text" value={updateEmployee.lastName} onChange={handleOnchange} required 
                     className="form-control form-control-sm"
                    placeholder="Last Name" />
            </div>
            <div className="form-group">
                <label for="">Email</label>
                <input name="email" type="date" value={updateEmployee.email} onChange={handleOnchange} required 
                     className="form-control form-control-sm"
                    placeholder="email" />
            </div>
            <div className="form-group">
                <label for="">Phone</label>
                <input name="phone" type="text" value={updateEmployee.phone} onChange={handleOnchange} required 
                     className="form-control form-control-sm"
                    placeholder=" phone" />
            </div>
            <div className="form-group">
                <label for="">Password</label>
                <input name=""password type="text" value={updateEmployee.password} onChange={handleOnchange} required 
                     className="form-control form-control-sm"
                    placeholder="password" />
            </div>
           

         


            <hr />
            <div className="form-group">
            <button type="submit" onClick={updateData} className="btn btn-primary w-100 mt-2">Update A Employee</button>

            </div>


    </div>
</div>
</div>   
        </>
    )
}
export default Update;