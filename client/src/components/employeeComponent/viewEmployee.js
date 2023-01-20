import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from 'react-router-dom'

const ViewEmployee = () => {
    const [data, SetData] = useState({})
    let Params = useParams()
    useEffect(() => {
        getSingle();
    }, [])
    const getSingle = async () => {
        let result = await fetch(`http://localhost:3000/getEmployee/${Params.id}`)
        result = await result.json()
        SetData(result.data)
    }
    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">first Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">email</th>
                        <th scope="col">phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                    </tr>


                </tbody>
            </table>
        </>
    )
}
export default ViewEmployee;