import React, { useState } from 'react'
import Input from '../Components/Input';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Background from '../../../public/userLogin.jpg'

function Login({ userState }) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [passwordErr, setPasswordErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const navigate = useNavigate()
    const { setUser } = userState
    const [err, setErr] = useState('')
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

        }
    };


    const registeredUser = async (e) => {
        e.preventDefault()
        let check = true

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{6,}$/;

        if (!emailRegex.test(Email.trim())) {
            setEmailErr('Invalid email format');
            check = false;
        }

        if (!passwordRegex.test(Password.trim())) {
            setPasswordErr('Password must be at least 6 characters/digit');
            check = false;
        }

        if (!check) {
            return false
        }

        const response = await axios.post('http://localhost:3000/login', { Email, Password }, {
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
                        Sign In Your account
                    </h2>
                    <p className='text-red-600 font-serif font-2'>{err}</p>
                </div>
                <form className="mt-8 space-y-6" method="POST">

                    <div className="inputBox">
                        <Input Properties={{ type: 'email', name: 'Email', value: Email, callback: handleChange, placeholder: 'Enter Email' }} />
                        <center><p className='text-red-500 justify-c'>{emailErr}</p></center>
                    </div>

                    <div className="inputBox relative">
                        <input id="password" name="Password"
                            type={show ? "text" : "password"}
                            className="w-full px-3 py-2 placeholder-gray-500 border rounded-t-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password" value={Password} onChange={handleChange} />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900" onClick={() => setShow(!show)} > {show ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)} </button>
                        <center><span className='text-red-500 justify-c'>{passwordErr}</span></center>
                    </div>


                    <div className="inputBox">
                        <button type="button" onClick={registeredUser} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > Login </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">I Don't have an account? <a href="#" onClick={(e) => navigate('/register')} className="font-medium text-indigo-600 hover:text-indigo-500"> Sign Up now </a> </p>
                    </div>
                </form>

            </div >
        </div >
    )
}

export default Login