import React, { useState } from 'react';
import Input from '../Components/Input';
import { emailValidation, nameValidation, passwordValidation, phoneNumberValidation } from '../Script/Common';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Background from '../../../public/userLogin.jpg';


function Register({ userState }) {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [Confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);
    const [conf, setConf] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [phoneErr, setPhoneErr] = useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const { setUser } = userState;
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'Email':
                setEmail(value);
                setEmailErr('');
                break;
            case 'Password':
                setPassword(value);
                setPasswordErr('');
                break;
            case 'Confirm':
                setConfirm(value);
                setPasswordErr('');
                break;
            case 'Name':
                setName(value);
                setNameErr('');
                break;
            case 'Phone':
                setPhone(value);
                break;
            default:
                break;
        }
    };


    const registerUser = async (e) => {
        e.preventDefault();
        let check = true;
        if (Password !== Confirm || Confirm === "") {
            setPasswordErr('Enter Confirm password properly')
            return false
        }
        if (!emailValidation(Email, setEmailErr)) {
            check = false
        }

        if (!passwordValidation(Password, setPasswordErr)) {
            check = false
        }

        if (!nameValidation(Name, setNameErr)) {
            check = false
        }
        if (!phoneNumberValidation(Phone, setPhoneErr)) {
            check = false
        }

        if (!check) {
            return false
        }

        const response = await axios.post('http://localhost:3000/signup', { userName: Name, Email, Password, Phone }, {
            withCredentials: true
        })
        const { data } = response
        if (data.success) {
            setUser(data.data)
            return navigate('/')
        } else {
            setErr(data.message)
            return false
        }
    }
    return (
        <div className="min-h-full h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover relative">
            <div className="absolute inset-0">
                <img
                    src={Background}
                    className="w-full h-full object-cover min-h-screen"
                    alt=""
                />
            </div>
            <div className="max-w-md w-full space-y-8 relative">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
                        Create an account
                    </h2>
                    <p className='text-red-600 font-serif font-2'>{err}</p>
                </div>
                <form className="mt-8 space-y-6" method="POST">
                    <div className="inputBox">
                        <Input Properties={{ type: 'text', name: 'Name', value: Name, callback: handleChange, placeholder: 'Enter Name' }} />
                        <p className='text-red-500 justify-center'>{nameErr}</p>
                    </div>
                    <div className="inputBox">
                        <Input Properties={{ type: 'email', name: 'Email', value: Email, callback: handleChange, placeholder: 'Enter Email' }} />
                        <p className='text-red-500 justify-center'>{emailErr}</p>
                    </div>
                    <div className="inputBox">
                        <Input Properties={{ type: 'number', name: 'Phone', value: Phone, callback: handleChange, placeholder: 'Enter Phone Number' }} />
                        <p className='text-red-500 justify-center'>{phoneErr}</p>
                    </div>
                    <div className="inputBox relative">
                        <input id="password" name="Password"
                            type={show ? "text" : "password"}
                            className="w-full px-3 py-2 placeholder-gray-500 border rounded-t-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password" value={Password} onChange={handleChange} />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900" onClick={() => setShow(!show)} > {show ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)} </button>
                    </div>
                    <div className="inputBox relative">
                        <input id="password" name="Confirm"
                            type={conf ? "text" : "password"}
                            className="w-full px-3 py-2 placeholder-gray-500 border rounded-t-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm Password" value={Confirm} onChange={handleChange} />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900" onClick={() => setConf(!conf)} > {conf ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)} </button>
                    </div>
                    <p className='text-red-500 justify-center' >{passwordErr}</p>
                    <div className="inputBox">
                        <button type="button" onClick={registerUser} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > Sign up </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600"> Already have an account? <a href="#" onClick={(e) => navigate('/login')} className="font-medium text-indigo-600 hover:text-indigo-500"> Sign in now </a> </p>
                    </div>
                </form>

            </div >
        </div >
    )
}

export default Register