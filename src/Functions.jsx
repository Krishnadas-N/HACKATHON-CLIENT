import axios from "axios"


export const getUserToken = () => JSON.parse(localStorage.getItem('userToken'))
export const Logout = (Route) => { localStorage.removeItem('userToken'); window.location.href = Route }

export const getComplaints = async () => {
    const { data } = await axios.get('http://localhost:3000/officials/home', {
        headers: { 'Authorization': `Bearer ${getUserToken()}` }
    })
    return data?.success
}

export const acceptFunc = async () => {
    const { data } = await axios.get('http://localhost:3000/officials/accept')
    return data
}