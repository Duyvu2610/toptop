import React, { useRef, useState } from 'react'
import images from '../assets/images'
import { UploadIcon, MessengerIcon, BoxIcon } from '../components/icons/icons'
import Button from '../components/Button'
import Search from '../components/Search'
import Menu from '../components/Menu'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../redux/appSlice'

function Header({ fullSize }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login.currentUser)
  const ref1 = useRef()
  const ref2 = useRef()
  const handleLogin = () => {
    dispatch(show())
  }
  return (
    <div className={`fixed h-header w-full shadow-header top-0 bg-white z-30`}>
      <div className={`px-5 flex h-full m-center justify-between items-center ${fullSize ? 'w-full' : 'w-app '}`}>
        <a href="/"><img src={images.logo} alt="" /></a>
        {/*  input */}
        <Search />
        {/* nav */}
        <div className="flex">
          <Button href="/" rounded leftIcon={<UploadIcon />}>Tải lên</Button>
          {user ?
            <>
              <Tippy content="Tin nhắn">
                <Button href="/" ref={ref1} className='ml-5'> <MessengerIcon className="text-2xl"></MessengerIcon></Button>
              </Tippy>
              <Tippy content="Hộp thư" placement='bottom'>
                <Button href="/" ref={ref2} className='ml-5'> <BoxIcon className="text-2xl "></BoxIcon></Button>
              </Tippy>
            </>
            :
            <>
              <Button primary className="ml-4" onClick={handleLogin}>Đăng nhập</Button>
            </>
          }
          <Menu></Menu>
        </div>
      </div>
    </div>
  )
}

export default Header