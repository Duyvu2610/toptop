import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as videoApi from '../api/videoApi'
import { CommentIcon, EmbedIcon, FbIcon, LikeIcon, MusicIcon, ShareIcon, ShareLinkIcon, TwitterIcon, WhatAppIcon } from '../components/icons/icons'
import InfoContainer from '../components/InfoContainer'
import * as followApi from '../api/followApi'
import * as commentApi from '../api/commentApi'
import * as likeApi from '../api/likeApi'
import Comment from '../components/Comment'
import useConvertDate from '../hooks/useConvertDate'
import Button from '../components/Button'
import Image from '../components/Image'
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../redux/appSlice'
function VideoPage() {
    const data = useLocation()
    const id = data.pathname.slice(data.pathname.lastIndexOf("/") + 1)
    const [video, setVideo] = useState([])
    const [cmtList, setCmtList] = useState([])
    const [cmtText, setCmtText] = useState("")
    const dispatch = useDispatch()
    const date = useConvertDate(video.created_at)
    useEffect(() => {
        if (token) {
            const res = async () => {
                const cmtData = await commentApi.getCmtList(id)
                setCmtList(cmtData)
            }
            res()
        }
    }, [])
    useEffect(() => {
        const res = async () => {
            const videoData = await videoApi.getVideo(id)
            setVideo(videoData)
        }
        res()
    }, [])
    const handleSubmit = async () => {
        setCmtText("")
        await commentApi.createCmt(id, cmtText)
        const cmtData = await commentApi.getCmtList(id)
        setCmtList(cmtData)

    }
    const handleFollow = async () => {
        if (token) {
            if (video.user.is_followed) {
                await followApi.unFollowUser(video.user.id)
                const videoData = await videoApi.getVideo(id)
                setVideo(videoData)
            } else {
                await followApi.followUser(video.user.id)
                const videoData = await videoApi.getVideo(id)
                setVideo(videoData)
                // const data = await videoApi.getVideo(video.id)
                // setVideo(data)
            }
        } else {
            dispatch(show())
        }


    }
    const token = useSelector(state => state.auth.token)
    const handleLike = async () => {
        if (token) {
            if (video.is_liked) {
                const data = await likeApi.unLikeVideo(video.id, dispatch)
                setVideo(data)
            } else {
                const data = await likeApi.likeVideo(video.id, dispatch)
                setVideo(data)
            }

        } else {
            dispatch(show())
        }

    }
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        alert("Đã sao chép")
    }
    return (
        <div className='flex bg-white'>
            <div className="flex-1 bg-black relative overflow-hidden px-20">
                <div className="relative w-full cursor-pointer overflow-hidden h-screen">
                    <div className="h-full">
                        <video controls autoPlay loop src={video.file_url} className='object-contain w-auto h-full  my-0 mx-auto'></video>
                    </div>

                </div>
            </div>
            <div className="w-[34rem] flex flex-col pt-8 h-screen">
                <div className="px-8 py-5">
                    <div className='flex items-center'>
                        <Image src={video.user?.avatar} className="w-10 h-10 rounded-full mr-2" />
                        <div className="flex flex-col">
                            <Link className='font-bold text-lg hover:underline' to={`/@${video.user?.nickname}`}>{video.user?.nickname} </Link>
                            <div className="flex items-center text-sm ">
                                <span>{video.user?.first_name + " " + video.user?.last_name}</span>
                                <span className='mx-1'>.</span>
                                <span>{date}</span>
                            </div>

                        </div>
                        <div className="ml-auto">{video.user?.is_followed ? <Button rounded onClick={handleFollow}>Đang Follow</Button> : <Button red onClick={handleFollow}>Follow</Button >}</div>

                    </div>
                </div>
                <div className="flex flex-col px-8">
                    <div className="">{video.description}</div>
                    <div className="flex items-center hover:underline font-bold text-base my-2">
                        <MusicIcon className="mr-2 " />
                        <Link className='text-boldColor'>{video.music || 'Chua xac dinh'}</Link>
                    </div>
                    <div className="py-4">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-input flex items-center justify-center my-1 mr-1" onClick={handleLike}><LikeIcon className={video.is_liked ? `text-red-500 w-5 h-5` : 'w-5 h-5'} /></div>
                                <p className='text-center text-xs font-semibold mr-5'>{video.likes_count}</p>
                                <div className="w-8 h-8 rounded-full bg-input flex items-center justify-center my-1 mr-1"><CommentIcon className='w-5 h-5' /></div>
                                <p className='text-center text-xs font-semibold'>{video.comments_count}</p>
                            </div>
                            <div className="flex items-center">
                                <a href="/" className='mr-2'><EmbedIcon /></a>
                                <a href="/" className='mr-2'><ShareLinkIcon /></a>
                                <a href="/" className='mr-2'><FbIcon /></a>
                                <a href="/" className='mr-2'><WhatAppIcon /></a>
                                <a href="/" className='mr-2'><TwitterIcon /></a>
                                <a href="/" className='mr-2'><ShareIcon /></a>
                            </div>
                        </div>
                        <div className="flex items-center text-[#161823bf] text-sm mt-4 bg-[#f1f1f2] border-span border-focus justify-between">
                            <p className='pl-2'>{window.location.href}</p>
                            <div className="text-boldColor font-bold cursor-pointer hover:bg-[#16182308] p-2" onClick={handleCopy}>Sao chép liên kết</div>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-6 px-8 bg-[#f8f8f8] border-t border-b border-[#16182333] overflow-auto flex-1">
                    {cmtList?.map((e, i) => <Comment data={e} key={i} />)}
                    {!token && <div className="text-2xl font-bold text-center">Đăng nhập để xem</div>}
                </div>
                <div className="h-[5.37rem] mx-8 py-5">
                    {token ? <div className="flex justify-end">
                        <input type="text" name="" id="" className='flex-1 outline-none bg-input p-2 rounded mr-3' placeholder='Thêm bình luận' value={cmtText}
                            onChange={(e) => { setCmtText(e.target.value) }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit()
                                }
                                return
                            }}
                        />
                        <button onClick={handleSubmit}>Đăng</button>
                    </div> :
                        <div className='text-red-600 text-center'>Đăng nhập để bình luận</div>}
                </div>
            </div>
        </div>
    )
}

export default VideoPage