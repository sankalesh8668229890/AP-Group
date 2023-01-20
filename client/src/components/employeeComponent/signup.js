import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    });

    const handleInput = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        })
    }
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const forSubmit = async (event) => {

        const { firstName, lastName, email, phone, password } = employee

        if (!firstName || !lastName || !phone || !email || !password) {
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, phone, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result + "signup page line no 38");
        if (result.status) {
            alert("User Created Successfully !")
        }
        // localStorage.setItem('user',JSON.stringify(result.user))
        // localStorage.setItem('token',JSON.stringify(result.auth))
        navigate('/login')

    }

    return (
        <>
            <div className="container mt-4">

                <div className="p-4 m-4">

                    <div className="col-lg-5 rounded mx-auto  pt-4  shadow-lg p-3 mb-5 bg-body rounded">
                        <div className="text-center col">

                            <img className="img-fluid w-25"
                                src="https://www.transparentpng.com/thumb/user/blak-frame-user-profile-png-icon--cupR3D.png" alt=""
                            />
                            <hr />
                            <div className="display-8"><h3>Create An Account</h3></div>
                            <hr />
                        </div>
                        <h3 hidden className="alert alert-light border rounded">Create An Account</h3>

                        <div className="form-group">
                            <label for="">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={employee.firstName}
                                onChange={handleInput} required
                                className="form-control form-control-sm"
                                placeholder="First Name" />
                            {error && !employee.firstName && <span className="text-danger"> Invalid Name !!!</span>}
                        </div>

                        <div className="form-group">
                            <label for="">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={employee.lastName}
                                onChange={handleInput} required
                                className="form-control form-control-sm"
                                placeholder="Last Name" />
                            {error && !employee.lastName && <span className="text-danger"> Invalid Name !!!</span>}
                        </div>

                        <div className="form-group">
                            <label for="">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={employee.phone}
                                onChange={handleInput} required
                                className="form-control form-control-sm"

                                placeholder="+91866123456"
                            />
                            {error && !employee.phone && <span className="text-danger"> Invalid Phone !!!</span>}

                        </div>


                        <div className="form-group">
                            <label for="">Email</label>
                            <input
                                value={employee.email}
                                onChange={handleInput}
                                required type="email"
                                name="email"

                                className=" form-control-sm form-control" placeholder="example@gmail.com" />
                            {error && !employee.email && <span className="text-danger"> Invalid Email !!!</span>}

                        </div>



                        <div className="form-group">
                            <label for="">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={employee.password}
                                onChange={handleInput} required

                                className="form-control form-control-sm" placeholder="********" />
                            {error && !employee.password && <span className="text-danger"> Invalid Password !!!</span>}

                        </div>

                        <hr />
                        <div className="form-group">
                            <button type="submit" onClick={forSubmit} className="btn btn-primary w-100 mt-2">Create An Account</button>

                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}
export default Signup;