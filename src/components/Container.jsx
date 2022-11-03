import React, { useEffect, useRef, useState } from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import { CommentIcon, LikeIcon, MusicIcon, PauseIcon, PlayIcon, ShareIcon, VolumnIcon } from './icons/icons'
import Button from './Button'
import * as likeApi from '../api/likeApi'
import * as followApi from '../api/followApi'
import * as videoApi from '../api/videoApi'
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../redux/appSlice'
import ReactVisibilitySensor from 'react-visibility-sensor'
function Container({ videoUser }) {

    const [video, setVideo] = useState(videoUser)
    const [isLike, setIsLike] = useState(videoUser.is_liked)
    const [visibleIcon, setVisibleIcon] = useState("hidden")
    const [isPLay, setIsPlay] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    // const [isFollow, setIsFollow] = useState(videoUser?.user.is_followed)
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const videoRef = useRef()
    const handleLike = async () => {
        if (token) {
            const data = await likeApi.unLikeVideo(video.id, dispatch)
            setVideo(data)
            setIsLike(false)
        } else {
            dispatch(show())
        }

    }
    const handleUnLike = async () => {
        if (token) {
            const data = await likeApi.likeVideo(video.id, dispatch)
            setVideo(data)
            setIsLike(true)
        } else {
            dispatch(show())
        }

    }
    const handleFollow = async () => {
        if (video.user.is_followed) {
            await followApi.unFollowUser(video.user.id)
            const data = await videoApi.getVideo(video.id)
            setVideo(data)
        } else {
            await followApi.followUser(video.user.id)
            const data = await videoApi.getVideo(video.id)
            setVideo(data)
        }


    }
    const handlePlay = () => {
        videoRef.current.play()
        setIsPlay(true)
    }
    const handlePause = () => {
        videoRef.current.pause()
        setIsPlay(false)
    }
    useEffect(() => {
        if (isVisible) {
            videoRef.current.play();
        } else {
            if (videoRef.current.play) {
                videoRef.current.pause();
            }
        }
    }, [isVisible]);

    return (
        <div className='py-5 flex border-b-[#1618231f] border-b'>
            <Link className='w-14 h-14 contents'><Image src={video?.user.avatar} className="w-14 rounded-full  h-14" /></Link>
            <div className="flex ml-3 w-full flex-col">
                {/* contetn */}
                <div className="relative w-full">
                    <Link className='font-bold text-lg hover:underline' to={`/@${video.user.nickname}`} state={video.user}>{video.user.nickname}&nbsp;<span className='font-normal text-sm hover:no-underline'>{video.user.first_name + " " + video.user.last_name}</span></Link>
                    <div className='overflow-hidden w-3/4'>{video.description}</div>
                    <div className="flex items-center hover:underline">
                        <MusicIcon className="mr-2 " />
                        <Link className='text-boldColor'>{video.music || 'Chua xac dinh'}</Link>
                    </div>
                    {video.user.is_followed ? <Button rounded className="absolute top-0 right-0" onClick={handleFollow}>Đang Follow</Button> : <Button className="absolute top-0 right-0" red onClick={handleFollow}>Follow</Button >}
                </div>
                {/* video */}
                <div className="mt-2 flex relative">
                    <div
                        className="relative"
                        onMouseOver={() => setVisibleIcon("visible")}
                        onMouseLeave={() => setVisibleIcon('hidden')}
                        state={video}
                    >
                        <Link to={`/@${video.user.nickname}/video/${video.id}`}>
                            <ReactVisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
                                <video src={video.file_url} className="w-72 rounded-xl" ref={videoRef} loop></video>
                            </ReactVisibilitySensor>
                        </Link>

                        {
                            isPLay
                                ?
                                <Button className={`absolute bottom-8 left-6 ${visibleIcon} ease-in duration-1000 `} onClick={handlePause}><PauseIcon /></Button>
                                :
                                <Button className={`absolute bottom-8 left-6 ${visibleIcon} ease-in duration-1000 `} onClick={handlePlay}><PlayIcon /></Button>
                        }
                        <Button className={`absolute bottom-8 right-6 ${visibleIcon} transition duration-300`} ><VolumnIcon /></Button>
                    </div>

                    <div className="ml-4 flex flex-col justify-end">
                        <div className="w-12 h-12 rounded-full bg-input flex items-center justify-center my-1" onClick={isLike ? handleLike : handleUnLike}><LikeIcon className={isLike ? `text-red-500` : ''} /></div>
                        <p className='text-center text-xs font-semibold'>{video.likes_count}</p>
                        <div className="w-12 h-12 rounded-full bg-input flex items-center justify-center my-1"><CommentIcon /></div>
                        <p className='text-center text-xs font-semibold'>{video.comments_count}</p>
                        <div className="w-12 h-12 rounded-full bg-input flex items-center justify-center my-1"><ShareIcon /></div>
                        <p className='text-center text-xs font-semibold'>{video.shares_count}</p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Container