import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


const NewCompanyAdded = () => {
    const [company, setCompany] = useState({
        name: "",
        email: "",
        logoLink: "",
        website: ""
    });

    const handleInput = (event) => {
        setCompany({
            ...company,
            [event.target.name]: event.target.value
        })
    }
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const forSubmit = async (event) => {

        const { name, email, logoLink, website } = company

        if (!name || !email || !logoLink || !website) {
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:3000/newCompany", {
            method: "POST",
            body: JSON.stringify({ name, email, logoLink, website }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result + "signup page line no 38");
        if (result.status) {
            alert("User Created Successfully !")
        }

        navigate('/UserHomepage')

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
                            <div className="display-8"><h3>Add Company</h3></div>
                            <hr />
                        </div>
                        <h3 hidden className="alert alert-light border rounded">Add Company</h3>

                        <div className="form-group">
                            <label for="">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={company.name}
                                onChange={handleInput} required
                                className="form-control form-control-sm"
                                placeholder="Full Name" />
                            {error && !company.name && <span className="text-danger"> Invalid Name !!!</span>}
                        </div>

                        <div className="form-group">
                            <label for="">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={company.email}
                                onChange={handleInput} required
                                className="form-control form-control-sm"

                                placeholder="+example@gmail.com"
                            />
                            {error && !company.email && <span className="text-danger"> Invalid email !!!</span>}
                        </div>

                        <div className="form-group">
                            <label for="">logoLink</label>
                            <input
                                type="logoLink"
                                name="logoLink"
                                value={company.logoLink}
                                onChange={handleInput} required

                                className="form-control form-control-sm" placeholder="Enter your Logo Link" />
                            {error && !company.logoLink && <span className="text-danger"> Invalid logoLink !!!</span>}
                        </div>

                        <div className="form-group">
                            <label for="">website</label>
                            <input
                                type="website"
                                name="website"
                                value={company.website}
                                onChange={handleInput} required

                                className="form-control form-control-sm" placeholder="Add company website" />
                            {error && !company.website && <span className="text-danger"> Invalid website !!!</span>}
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
export default NewCompanyAdded;