import React, { forwardRef, useContext, useState } from 'react'
import { TickIcon } from './icons/icons'
import { Link } from 'react-router-dom'
import Image from './Image'
import Tippy from '@tippyjs/react/headless'
import Poper from './Poper'
import Button from './Button'
import * as followApi from '../api/followApi'
import { useDispatch, useSelector } from 'react-redux'
import { dontShowInput, setInputValue } from '../redux/appSlice'

function User({ item, isItem, suggestUser, followUser }, ref) {
    let classNames = "py-2 px-4 cursor-pointer flex items-center h-15 hover:bg-[#16182308]"
    let img = "h-10 w-10 rounded-full mr-3 object-cover"
    let p
    if (isItem) {
        classNames = " pl-2 h-12 py-2 px-4 cursor-pointer flex items-center hover:bg-[#16182308] rounded ml-[-8px]"
        img = "h-8 w-8 rounded-full mr-3 object-cover "
        p = 'text-xs opacity-70'
    }
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.login.currentUser)
    const [isfollow, setIsfollow] = useState(item.is_followed)
    const [userProfile, setUserProfile] = useState(item)
    const handleFollow = async () => {
        const data = await followApi.followUser(item.id, user.meta.token)
        setUserProfile(data)
        setIsfollow(true)
    }
    const handleUnFollow = async () => {
        const data = await followApi.unFollowUser(item.id, user.meta.token)
        setUserProfile(data)
        setIsfollow(false)
    }

    const handleClickUser = () => {
        dispatch(dontShowInput())
        dispatch(setInputValue(""))
    }
    return (<Tippy
        delay={[700, 700]}
        placement="bottom-end"
        interactive
        appendTo={document.body}
        render={attrs => (
            <div className="w-80" tabIndex="-1" {...attrs}>
                <Poper>
                    {suggestUser && <div className="flex flex-col relative p-5">
                        <div className="flex items-center w-full mb-2">
                            <Image src={userProfile.avatar} className="w-11 h-11 rounded-full" />
                            {isfollow ? <Button rounded className=" ml-auto" onClick={handleUnFollow}>Đang Follow</Button> : <Button primary className=" ml-auto" onClick={handleFollow}>Follow</Button>}
                        </div>
                        <Link to={`/@${userProfile.nickname}`} className="flex items-center">
                            <h4 className='font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>{userProfile.nickname}</h4>
                            {userProfile.tick && <TickIcon />}
                        </Link>
                        <Link to={`/@${userProfile.nickname}`} className='text-boldColor'><h4 className='font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>{userProfile.first_name + " " + userProfile.last_name}</h4></Link>
                        <p className='mt-2 '>
                            <span className='font-bold mr-1 text-base'>{userProfile.followers_count}</span>
                            <span className='mr-1'>Follower</span>
                            <span className='font-bold mr-1 text-base'>{userProfile.likes_count}</span>
                            <span className='mr-1'>Thích</span>
                        </p>
                    </div>}
                </Poper>
            </div>
        )}
    >
        <Link className={classNames} to={`/@${userProfile.nickname}`} ref={ref} state={userProfile} onClick={handleClickUser}>
            <Image src={userProfile.avatar} alt="" className={img} />
            <div className="">
                <div className="flex items-center justify-center">
                    <h4 className='font-semibold overflow-hidden text-ellipsis whitespace-nowrap mr-2'>{userProfile.nickname}</h4>
                    {userProfile.tick && <TickIcon />}
                </div>
                <p className={p}>{userProfile.full_name || userProfile.first_name + " " + userProfile.last_name}</p>
            </div>
        </Link>
    </Tippy>)
}

export default forwardRef(User)