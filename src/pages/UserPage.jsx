import React, { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import { LockIcon, MoreIcon, ShareIconSolid, SwitchIcon } from '../components/icons/icons'
import Image from '../components/Image'
import Sidebar from '../layouts/Sidebar'
import { Link, useLocation, matchRoutes } from 'react-router-dom'
import * as userApi from '../api/userApi'
function UserPage() {
    const divRef = useRef()
    const videoListRef = useRef()
    const user = useLocation()
    const data = user.pathname.slice(2)
    const [absolute, setAbsolute] = useState(0)
    const [videoList, setVideoList] = useState([])
    const [userProfile, setUserProfile] = useState([])
    useEffect(() => {
        const res = async () => {
            const res = await userApi.getUser(data)
            setVideoList(res.videos)
            setUserProfile(res)
            setAbsolute(0)
        }
        res()
    }, [data])
    return (
        <div className='mt-header flex'>
            <div className="pt-5 pl-2 pb-6">
                <Sidebar isSmall />
            </div>
            <div className="ml-sidebar-w-small py-8 px-6 w-full">
                <div className="flex flex-col">
                    <div className="flex flex-col pr-24 relative max-w-[39rem] mb-5 ">
                        <div className="flex">
                            <Image className='w-28 h-28 rounded-full' src={userProfile.avatar} />
                            <div className="ml-5">
                                <h2 className='font-bold text-3xl pb-1'>{userProfile.nickname}</h2>
                                <h1 className='font-semibold text-lg text-ellipsis overflow-hidden max-w-[28rem] whitespace-nowrap pb-1'>{userProfile.first_name + " " + userProfile.last_name}</h1>
                                <div className="flex items-center mt-2"><Button red className='w-40 mr-2'>Tin nhắn</Button> <span className='w-9 h-9 rounded-md flex items-center justify-center border-solid border-[#1618231f] border-focus'><SwitchIcon /></span></div>

                            </div>
                        </div>
                        <h2 className="flex mt-5">
                            <div className="mr-5 font-semibold text-lg "><span>{userProfile.followings_count}</span><span className='font-normal text-base ml-1'>Đang follow</span></div>
                            <div className="mr-5 font-semibold text-lg "><span>{userProfile.followers_count
                            }</span><span className='font-normal text-base ml-1'>Follower</span></div>
                            <div className="mr-5 font-semibold text-lg "><span>{userProfile.likes_count
                            }</span><span className='font-normal text-base ml-1'>Thích</span></div>
                        </h2>
                        <h2 className='font-normal text-base mt-2 whitespace-pre-line'>{userProfile.bio}</h2>
                        <ShareIconSolid className='absolute right-8 top-2' />
                        <MoreIcon className='absolute right-0 top-2' />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex h-11 w-[28.75rem] relative border-b-focus text-[#16182380] mb-2">
                            <p className={`font-semibold text-lg relative cursor-pointer flex items-center justify-center flex-1 ${absolute === 0 ? 'text-black' : ""}`}
                                onClick={() => {
                                    setAbsolute(0)
                                }}
                                onMouseOver={() => {
                                    divRef.current.style.transform = "translateX(0)"
                                }}
                                onMouseLeave={() => {
                                    if (absolute === 230) return divRef.current.style.transform = "translateX(230px)"

                                }}
                            >
                                Video
                            </p>
                            <p className={`font-semibold text-lg relative cursor-pointer flex items-center justify-center flex-1 ${absolute === 230 ? 'text-black' : ""}`}
                                onClick={() => {
                                    setAbsolute(230)
                                }}
                                onMouseOver={() => {
                                    divRef.current.style.transform = "translateX(230px)"
                                }}
                                onMouseLeave={() => {
                                    if (absolute === 0) return divRef.current.style.transform = "translateX(0)"

                                }}
                            >
                                <LockIcon />
                                Đã thích
                            </p>
                            <div className={`w-1/2 absolute h-[2px] bg-black bottom-0 transition left-[${absolute}px] duration-300`} ref={divRef}></div>
                        </div>
                        <div className={`grid gap-x-6 gap-y-4 grid-cols-userVideo `} ref={videoListRef}>
                            {videoList.map((e, i) =>
                                <Link className="" key={i} to={`/@${e.user.nickname}/video/${e.id}`}>
                                    <Image src={e.thumb_url} className='h-64 w-full rounded' />
                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap font-normal mt-1 text-textColor'>{e.description}</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserPage