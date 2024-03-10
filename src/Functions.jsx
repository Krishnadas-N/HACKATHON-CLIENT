import axios from "axios"


export const getUserToken = () => JSON.parse(localStorage.getItem('userToken'))
export const logout = () => { localStorage.removeItem('userToken'); window.location.href = '/officials/login' }

export const getComplaints = async () => {
    const { data } = await axios.get('http://localhost:3000/officials/home', {
        headers: { 'Authorization': `Bearer ${getUserToken()}` }
    })
    return data?.success
}