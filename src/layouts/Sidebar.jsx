import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeFillIcon, HomeSolidIcon, LiveFillIcon, LiveSolidIcon, FollowFillIcon, FollowSolidIcon } from '../components/icons/icons'
import User from '../components/User'
import WrapperUser from '../components/WrapperUser'
import * as userApi from '../api/userApi'
import * as followApi from '../api/followApi'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../redux/appSlice'
function Sidebar({ isSmall }) {
  const nav = [
    {
      icon: <HomeSolidIcon />,
      activeIcon: <HomeFillIcon />,
      content: "Dành cho bạn",
      to: "/",
    },
    {
      icon: <FollowSolidIcon />,
      activeIcon: <FollowFillIcon />,
      content: "Đang Follow",
      to: "/following",
    },
    {
      icon: <LiveSolidIcon />,
      activeIcon: <LiveFillIcon />,
      content: "LIVE",
      to: "/live",
    },
  ]
  const location = useLocation()
  const [active, setActive] = useState(location.pathname)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login.currentUser)
  const [suggestUser, setSuggestUser] = useState([])
  const [followUser, setFollowUser] = useState([])
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    if (token) {
      const fetch = async () => {
        const data = await followApi.getFollowing(1)
        setFollowUser(data)
      }
      fetch()
    }
  }, [user])
  useEffect(() => {
    const fetch = async () => {
      const data = await userApi.suggest(1, 5)
      setSuggestUser(data)
    }
    fetch()
  }, [])
  const handleLogin = () => {
    dispatch(show())
  }
  return (
    <div className={`flex flex-col ${isSmall ? 'w-sidebar-w-small' : 'w-sidebar-w'}  fixed overflow-auto h-sidebar-h-sm z-20`}>
      {nav.map((e, i) => (
        <Link to={(e.to === "/following" && !token) ? "" : e.to} key={i} className="p-2 flex items-center hover:bg-[#16182308] rounded" onClick={() => {
          if (e.to === "/following" && !token) {
            dispatch(show())
          } else {
            setActive(e.to)

          }
        }}>
          <div className="">{active === e.to ? e.activeIcon : e.icon}</div>
          {active === e.to ? <h2 className="ml-2 text-[#FE2C55] font-bold text-lg text-[]">{e.content}</h2> : <h2 className="ml-2 text-[#161823] font-bold text-lg">{e.content}</h2>}
        </Link>
      ))}
      {!user && <WrapperUser>
        <p className='text-[#16182380]  text-base '>Đăng nhập để follow các tác giả, thích video và xem bình luận.</p>
        <Button red className='w-full h-12' onClick={handleLogin}>Đăng nhập</Button>
      </WrapperUser>}
      <WrapperUser label="Tài khoản được đề xuất" showmore="Xem tất cả">
        {suggestUser?.map((e, i) => <User item={e} key={i} isItem suggestUser />)}
      </WrapperUser>
      {user && <WrapperUser label="Tài khoản đang follow" showmore="Xem thêm">
        {followUser?.map((e, i) => <User item={e} key={i} isItem />)}
      </WrapperUser>}

    </div>
  )
}

export default Sidebar