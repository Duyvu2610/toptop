import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as videoApi from '../api/videoApi'
import { CommentIcon, EmbedIcon, FbIcon, LikeIcon, MusicIcon, ShareIcon, ShareLinkIcon, TwitterIcon, WhatAppIcon } from '../components/icons/icons'
import InfoContainer from '../components/InfoContainer'
import * as commentApi from '../api/commentApi'
import Comment from '../components/Comment'
function VideoPage() {
    const data = useLocation()
    const id = data.pathname.slice(data.pathname.lastIndexOf("/") + 1)
    const [video, setVideo] = useState([])
    const [cmtList, setCmtList] = useState([])
    const [cmtText, setCmtText] = useState("")
    useEffect(() => {
        const res = async () => {
            const cmtData = await commentApi.getCmtList(id)
            setCmtList(cmtData)
        }
        res()
    }, [cmtText])
    useEffect(() => {
        const res = async () => {
            const videoData = await videoApi.getVideo(id)
            setVideo(videoData)
        }
        res()
    }, [])
    const handleSubmit = () => {
        setCmtText("")
        commentApi.createCmt(id, cmtText)
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
                    <InfoContainer user={video.user} video={video} />
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
                                <div className="w-8 h-8 rounded-full bg-input flex items-center justify-center my-1 mr-1" >
                                    <LikeIcon className='w-5 h-5' />
                                </div>
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
                            <p className='pl-2'>{data.pathname}</p>
                            <div className="text-boldColor font-bold cursor-pointer hover:bg-[#16182308] p-2">Sao chép liên kết</div>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-6 px-8 bg-[#f8f8f8] border-t border-b border-[#16182333] overflow-auto">
                    {cmtList?.map((e, i) => <Comment data={e} key={i} />)}
                </div>
                <div className="h-[5.37rem] mx-8 py-5">
                    <div className="flex justify-end">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPage