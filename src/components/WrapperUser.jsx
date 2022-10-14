import React from 'react'
function WrapperUser({ label, showmore, children }) {
    return (
        <div className='p-2 border-t-[#1618231f] border-t'>
            <p className='mb-2 text-sm text-[#161823] font-semibold opacity-70'>{label}</p>
            {children}
            <p className='text-[#fe2c55] font-semibold text-sm cursor-pointer'>{showmore}</p>
        </div>
    )
}

export default WrapperUser