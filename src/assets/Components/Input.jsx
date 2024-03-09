import React from 'react'

function Input({ Properties }) {
    const { name, type, callback, value, placeholder } = Properties
    const className = "w-full px-3 py-2 placeholder-gray-500 border rounded-t-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

    return (
        <div>
            <input className={className} type={type} name={name} onChange={(e) => callback(e)} placeholder={placeholder} value={value} />
        </div>
    )
}

export default Input