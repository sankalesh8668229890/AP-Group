import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const UserHomepage = () => {
    const [products, setProducts] = useState([])



    useEffect(() => {
        getproduct();

    }, [])





    const getproduct = async () => {
        let userId = JSON.parse(localStorage.getItem('userId'))
        let result = await fetch(`http://localhost:5000/summary/${userId}`)
        result = await result.json()

        setProducts(result.data);
    }
    return (
        <>

            <div className="container-fluid">
                <table className="table mt-2">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">logo</th>
                            <th scope="col">website</th>
                        </tr>
                    </thead>
                    <tbody>
                             <h1>No result Found</h1>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default UserHomepage;