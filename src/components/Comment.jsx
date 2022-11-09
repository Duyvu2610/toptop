import React from 'react'
import { Link } from 'react-router-dom'
import useConvertDate from '../hooks/useConvertDate'
import Image from './Image'


function Comment({ data }) {
    const date = useConvertDate(data.updated_at)

    return (
        <div className='flex mb-4 relative'>
            <Link className='flex justify-start' to={`/@${data.user.nickname}`}><Image src={data.user.avatar} className="w-10 h-10 rounded-full mr-3" /></Link>
            <div className="flex flex-col flex-1">
                <Link to={`/@${data.user.nickname}`} className='hover:underline font-bold text-lg'>{data.user.first_name ? data.user.first_name + " " + data.user.last_name : data.user.nickname}</Link>
                <p>{data.comment}</p>
                <div className="flex">
                    <p>{date}</p>
                    <p className='cursor-pointer ml-4'>Trả lời</p>
                </div>
            </div>
        </div>
    )
}

export default Comment