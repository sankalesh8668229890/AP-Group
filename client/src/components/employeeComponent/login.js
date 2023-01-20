import React from "react";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const handleInput = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const userHandle = async () => {

        const { email, password } = user

        if (!email || !password) {
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:3000/login", {
            method: "Post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json()

        console.log(result + "  result page line no 36")
        JSON.stringify(result)
        // console.log(result.auth)
        if (result.status) {
            localStorage.setItem('userId', JSON.stringify(result.data.userId))
            localStorage.setItem('token', JSON.stringify(result.data.token))

            navigate('/userhomepage')
        } else {
            alert("Something Wrong !!")
        }

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
                            <div className="display-8"><h3>Login</h3></div>
                            <hr />
                        </div>
                        <h3 hidden className="alert alert-light border rounded">Sign In</h3>




                        <div className="form-group">
                            <label for="">Email</label>
                            <input
                                value={user.email}
                                name="email"
                                onChange={handleInput} required
                                type="email"

                                className=" form-control-sm form-control" placeholder="example@gmail.com" />
                            {error && !user.email && <span className="text-danger"> Invalid Email !!!</span>}

                        </div>



                        <div className="form-group">
                            <label for="">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleInput} required

                                className="form-control form-control-sm" placeholder="********" />
                            {error && !user.password && <span className="text-danger"> Invalid Password !!!</span>}

                        </div>

                        <hr />
                        <div className="form-group">
                            <button type="submit" onClick={userHandle} className="btn btn-primary w-100 mt-2">Login</button>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;