import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import * as videoApi from "../api/videoApi"
import { useRef } from 'react'
function FollowingPage() {
  const [videoList, setVideoList] = useState([])
  // const [pageNum, setPageNum] = useState(1)
  let pageNum = useRef(1)
  useEffect(() => {
    const res = async () => {
      const data = await videoApi.getVideoList("following", pageNum.current)
      setVideoList(data)
    }
    res()
  }, [])
  const handleShowMore = async () => {
    // setPageNum(prev => prev + 1)
    pageNum.current++
    const data = await videoApi.getVideoList("following", pageNum.current)
    setVideoList(prev => [...prev, ...data])
  }

  return (
    <div className='pl-24 relative'>
      {videoList?.map((e, i) => <Container key={i} videoUser={e} />)}
      <button className="text-red-500" onClick={handleShowMore}>Show more</button>
    </div>
  )
}

export default FollowingPage