import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { validateForm, getLocation } from "./ReportValidation";
import Swal from 'sweetalert2'

const ReportForm = () => {
    const [contactDetails, setContactDetails] = useState({
        address: '',
        phone: '',
        email: ''
    });
    const [report, setReport] = useState({
        userName: '',
        contactDetails: contactDetails,
        complaintText: '',
        severity: '',
        category: '',
        audio: null,
        video: null,
        images: [],
        location: [null, null]
    });
    const [errors, setErrors] = useState({
        userName: null,
        address: null,
        phone: null,
        email: null,
        complaintText: null,
        severity: null,
        category: null,
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'userName':
                setReport(prevState => ({ ...prevState, userName: value }));
                break;
            case 'address':
                setContactDetails(prevState => {
                    const updatedContactDetails = { ...prevState, address: value };
                    setReport(prevReport => ({ ...prevReport, contactDetails: updatedContactDetails }));
                    return updatedContactDetails;
                });
                break;
            case 'phone':
                setContactDetails(prevState => {
                    const updatedContactDetails = { ...prevState, phone: value };
                    setReport(prevReport => ({ ...prevReport, contactDetails: updatedContactDetails }));
                    return updatedContactDetails;
                });
                break;
            case 'email':
                setContactDetails(prevState => {
                    const updatedContactDetails = { ...prevState, email: value };
                    setReport(prevReport => ({ ...prevReport, contactDetails: updatedContactDetails }));
                    return updatedContactDetails;
                });
                break;
            case 'complaintText':
                setReport(prevState => ({ ...prevState, complaintText: value }));
                break;
            case 'severity':
                setReport(prevState => ({ ...prevState, severity: value }));
                break;
            case 'category':
                setReport(prevState => ({ ...prevState, category: value }));
                break;
            default:
                break;
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        getLocation().then(({ latitude, longitude }) => {
            setReport(prevState => ({ ...prevState, location: [latitude, longitude] }))
            alert(true)
            console.log(report);
            submitReport()
        }).catch((error) => {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Please Allow Location Access'
            });
        });
    };
    const submitReport = async () => {
        if (!validateForm(report, contactDetails, setErrors)) {
            return false
        }
        try {
            const userToken = localStorage.getItem('userToken');

            const headers = {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.post(
                "http://localhost:3000/report-complaint",
                report,
                { headers }
            );
            if (response.status === 200) {
                await Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    timer: 3000
                })

            }

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
    const handleFile = (e) => {
        const { name, files } = e.target
        switch (name) {
            case 'audio':
                setReport(prevState => ({ ...prevState, audio: files[0] }));
                break;
            case 'video':
                setReport(prevState => ({ ...prevState, video: files[0] }));
                break;
            case 'image':
                setReport(prevState => ({
                    ...prevState, images: Array.from(files)
                        .slice(0, 4)
                        .map(file => file)
                }));
                break;
            default:
                break;
        }
    }
    const className = "w-full px-3 py-2 placeholder-gray-500 border rounded-t-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

    return (
        <div className="min-h-full h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover relative">
            <div className="max-w-md w-full space-y-8 relative">
                <form className="mt-8 space-y-6" method="POST">
                    <div className="inputBox">
                        <label htmlFor="userName" className="block text-sm font-medium text-white">Your Name</label>
                        <Input Properties={{ name: 'userName', type: 'text', placeholder: 'Enter Your Name', value: report.userName, callback: handleChange }} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
                        <Input Properties={{ name: 'address', type: 'text', placeholder: 'Enter Address', value: contactDetails.address, callback: handleChange }} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</label>
                        <Input Properties={{ name: 'phone', type: 'text', placeholder: 'Enter Phone Number', value: contactDetails.phone, callback: handleChange }} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                        <Input Properties={{ name: 'email', type: 'text', placeholder: 'Enter Email Address', value: contactDetails.email, callback: handleChange }} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="complaintText" className="block text-sm font-medium text-white">Complaint Description</label>
                        <Input Properties={{ name: 'complaintText', type: 'text', placeholder: 'Enter Complaint Description', value: report.complaintText, callback: handleChange }} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="severity" className="block text-sm font-medium text-white">Severity</label>
                        <select name="severity" className={className} value={report.severity} onChange={handleChange}>
                            <option className={className} value="low">Low</option>
                            <option className={className} value="medium">Medium</option>
                            <option className={className} value="high">High</option>
                        </select>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="category" className="block text-sm font-medium text-white">Category</label>
                        <select name="category" className={className} value={report.category} onChange={handleChange}>
                            <option className={className} value="Physical Abuse">Physical Abuse</option>
                            <option className={className} value="Sexual Abuse">Sexual Abuse</option>
                            <option className={className} value="Emotional Abuse">Emotional Abuse</option>
                            <option className={className} value="Financial Abuse">Financial Abuse</option>
                            <option className={className} value="Isolation">Isolation</option>
                            <option className={className} value="Stalking">Stalking</option>
                        </select>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="audio" className="block text-sm font-medium text-white">Audio</label>
                        <input className={className} type="file" name="audio" accept="audio/*" onChange={handleFile} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="video" className="block text-sm font-medium text-white">Video</label>
                        <input className={className} type="file" name="video" accept="video/*" onChange={handleFile} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="image" className="block text-sm font-medium text-white">Image</label>
                        <input className={className} type="file" name="image" multiple accept="image/*" onChange={handleFile} />
                    </div>
                    <div className="inputBox">
                        <button type="button" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > Sign up </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ReportForm;
