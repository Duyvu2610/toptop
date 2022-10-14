import React from 'react'
import { Link } from 'react-router-dom'
import useConvertDate from '../hooks/useConvertDate'
import Button from './Button'
import Image from './Image'

function InfoContainer({ user = [], video }) {
    // console.log(Date.now());
    const date = useConvertDate(video.created_at)
    return (
        <div className='flex items-center'>
            <Image src={user.avatar} className="w-10 h-10 rounded-full mr-2" />
            <div className="flex flex-col">
                <Link className='font-bold text-lg hover:underline' to={`/@${user.nickname}`}>{user.nickname} </Link>
                <div className="flex items-center text-sm ">
                    <span>{user.first_name + " " + user.last_name}</span>
                    <span className='mx-1'>.</span>
                    <span>{date}</span>
                </div>

            </div>
            <div className="ml-auto">{user.is_followed ? <Button rounded>Đã Follow</Button> : <Button red>Follow</Button>}</div>

        </div>
    )
}

export default InfoContainer