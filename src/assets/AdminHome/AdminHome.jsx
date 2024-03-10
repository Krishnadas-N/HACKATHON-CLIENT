import React, { useEffect } from 'react'
import { getComplaints } from '../../Functions';

function AdminHome() {
    useEffect(() => {
        getComplaints().then((result)=>{
            console.log(result,"this are the complaints");
        })
    }, [])
    return (
        <div>
            this is officials home
        </div>
    )
}

export default AdminHome
