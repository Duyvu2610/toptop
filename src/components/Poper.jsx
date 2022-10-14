import React from 'react'

function Poper({ children, className }) {
    return (
        <div className={`w-full max-h-poper rounded-lg shadow-tippy bg-white overflow-auto min-w-[14rem] ${className}`}>{children}</div>
    )
}

export default Poper