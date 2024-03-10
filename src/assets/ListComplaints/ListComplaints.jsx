import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'

function ListComplaints() {
    const [complaints, setComplaints] = useState([])
    useEffect(() => {
        const Data = [{
            image_url: "https://via.placeholder.com/150",
            title: "Card Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet."
        }]
        setComplaints(Data)
    }, [])
    return (
        <div>
            <Navbar />
            <h1 className="h1"><b>Complaints</b></h1>
            <div className="flex flex-row space-x-4">
                {complaints.map(item =>
                    <>
                        <div className="flex w-full bg-white justify-space-between shadow-md rounded-lg mt-5 p-4">
                            <div className="imgDiv w-50">
                                <img src={item.image_url} alt="Placeholder" className="w-full object-cover rounded-lg mb-4" />
                            </div>
                            <div className="desc w-full">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    </>
                )}
            </div >

        </div>
    )
}

export default ListComplaints
