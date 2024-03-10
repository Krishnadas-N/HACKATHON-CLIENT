import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { acceptFunc } from "../Functions";

export default function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState({});

    useEffect(() => {

        const fetchReport = async () => {
            try {
                // const { data } = await axios.get(`http://localhost:3000/officials/reports/${id}`);
                const Data = {
                    userName: "vishuvanam",
                    contactDetails: {
                        address: "westfort thrissur kerala india",
                        phone: 9567358657,
                        email: "vishnu1210@gmail.com"
                    },
                    location: { type: "Point", coordinates: ["1260", '2520'] },
                    complaintText: "i am raped 3 days ago",
                    severity: "High",
                    category: "Rape",
                    images: [
                        "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1583041181/1583041180.jpg"
                    ],
                    audio: {},
                    video: {},
                    officialContact: { name: "swafuvan", email: "swafuvan99@gmail.com", phone: 9999569956 },
                    status: "not died",
                    feedback: "very fantastic",
                    officialMessage: "swafuvan will help in 9 days otherwise contact krishnadas under bridge kundannur"
                }
                setReport(Data);
            } catch (error) {
                toast.error("Error fetching report details.");
            }
        };

        fetchReport();
    }, [id]);

    // if (!report) {
    //     return <div>Loading...</div>;
    // }

    return (
        <center>
            <div className="p-4">
                <button onClick={acceptFunc} className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Accept</button>
                <h1 className="text-2xl font-bold mb-4">{report?.userName}</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">Contact Details</h2>
                    <p>Address: {report?.contactDetails?.address}</p>
                    <p>Phone: {report?.contactDetails?.phone}</p>
                    <p>Email: {report?.contactDetails?.email}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">Location</h2>
                    <p>Type: {report?.location?.type}</p>
                    <p>Coordinates: {report?.location?.coordinates.join(", ")}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">Complaint Details</h2>
                    <p>Text: {report?.complaintText}</p>
                    <p>Severity: {report?.severity}</p>
                    <p>Category: {report?.category}</p>
                    {report?.images?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-1">Images:</h3>
                            <div className="grid grid-cols-3 gap-4 center">
                                {report?.images?.map((image) => (
                                    <center>  <img key={image} src={image} alt="" className="w-full h-32 object-cover" /></center>
                                ))}
                            </div>
                        </div>
                    )}
                    {report?.audio?.url && (
                        <div>
                            <h3 className="text-xl font-bold mb-1">Audio:</h3>
                            <audio controls>
                                <source src={report?.audio?.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                    {report?.video?.url && (
                        <div>
                            <h3 className="text-xl font-bold mb-1">Video:</h3>
                            <video controls>
                                <source src={report?.video?.url} type="video/mp4" />
                                Your browser does not support the video element.
                            </video>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">Status</h2>
                    <p>
                        {report?.status} {report?.feedback}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">Official Contact</h2>
                    <p>Name: {report?.officialContact?.name}</p>
                    <p>Email: {report?.officialContact?.email}</p>
                    <p>Phone: {report?.officialContact?.phone}</p>
                    <p>Message: {report?.officialMessage}</p>
                </div>
                <div />

            </div>
        </center>
    )
}

