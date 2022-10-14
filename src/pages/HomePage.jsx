import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import * as videoApi from "../api/videoApi"
function HomePage() {
  const [videoList, setVideoList] = useState([])
  useEffect(() => {
    const res = async () => {
      const data = await videoApi.getVideoList("for-you", 1)
      setVideoList(data)
    }
    res()
  }, [])
  return (
    <div className='pl-24'>
      {videoList && videoList.map((e, i) => <Container key={i} videoUser={e} />)}
    </div>
  )
}

export default HomePage