import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import * as videoApi from "../api/videoApi"
function HomePage() {
  const [videoList, setVideoList] = useState([])
  const pageNum = useRef(1)
  useEffect(() => {
    const res = async () => {
      const data = await videoApi.getVideoList("for-you", pageNum.current)
      setVideoList(data)
    }
    res()
  }, [])
  const handleShowMore = async () => {
    // setPageNum(prev => prev + 1)
    pageNum.current++
    const data = await videoApi.getVideoList("for-you", pageNum.current)
    setVideoList(prev => [...prev, ...data])
  }

  return (
    <div className='pl-24'>
      {videoList && videoList.map((e, i) => <Container key={i} videoUser={e} />)}
      <button className="text-red-500" onClick={handleShowMore}>Show more</button>
    </div>
  )
}

export default HomePage