import React, { useState } from 'react'
import Tippy from '@tippyjs/react/headless';
import Button from './Button';
import Poper from './Poper';
import { HumanIcon, TiktokIcon, SettingIcon, LanguageIcon, LogoutIcon, BackIcon, MoreIconVertical } from './icons/icons'
import * as authApi from '../api/authApi'
import Image from './Image';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSucces } from '../redux/authSilce';
function Menu() {
    const items = [
        {
            icon: <HumanIcon />,
            title: "Xem hồ sơ",
            isProfile: true,
            isLogin: false
        },
        {
            icon: <TiktokIcon />,
            title: "Nhận xu",
            to: "/coin",
            isLogin: false
        },
        {
            icon: <SettingIcon />,
            title: "Cài đặt",
            to: '/setting',
            isLogin: false

        },
        {
            icon: <LanguageIcon />,
            title: "Tiếng việt",

            children: {
                title: "Language",
                data: [
                    {
                        code: 'en',
                        title: 'English'
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt'
                    },
                ]
            },
            last: true

        },
        {
            icon: <LogoutIcon />,
            title: "Đăng xuất",
            isLogin: false,
            logout: true

        },
    ]
    // const dispatch = useDispatch()
    const user = useSelector(state => state.auth.login.currentUser)
    const [history, setHisory] = useState([{ data: items }])
    const current = history[history.length - 1]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = () => {
        authApi.logout(dispatch)
        navigate(0)
        dispatch(logoutSucces())

    }
    const handleRedirectProfile = async () => {
        const data = await authApi.getCurrentUser()
        navigate(`/@${data.nickname}`)
    }
    return (
        <Tippy
            delay={[0, 700]}
            placement="bottom-end"
            interactive
            hideOnClick={false}
            onHidden={() => setHisory(prev => prev.slice(0, 1))}
            render={attrs => (
                <div className="" tabIndex="-1" {...attrs}>
                    <Poper className=" max-h-96">
                        <ul className='flex flex-col py-3'>
                            {history.length > 1 && <div className="h-12 relative">
                                <button className='w-12 h-full ' onClick={() => setHisory(prev => prev.slice(0, history.length - 1))}><BackIcon className='text-xl ml-7' /></button>
                                <h4 className='absolute top-1/2 left-1/2 translate-x-50% translate-y-50%'>Ngôn ngữ</h4>
                            </div>}
                            {current.data.map((item, index) => {
                                const isParent = !!item.children
                                item.isLogin = !!user
                                if (item.last) {
                                    return <li key={index} className=' px-3 h-10 inline-block hover:bg-input shadow-header'>
                                        <Button leftIcon={item.icon} to={item.to} onClick={() => {
                                            if (isParent) {
                                                setHisory(prev => [...prev, item.children])
                                            }
                                        }}>{item.title}</Button>
                                    </li>
                                } else if (item.isLogin || item.code) {
                                    return (
                                        <li key={index} className=' px-3 h-10 inline-block hover:bg-input'>
                                            <Button leftIcon={item.icon} to={item.to} onClick={() => {
                                                if (isParent) {
                                                    setHisory(prev => [...prev, item.children])
                                                } else if (item.logout) {
                                                    handleLogOut()
                                                } else if (item.isProfile) {
                                                    handleRedirectProfile()
                                                }
                                            }}>{item.title}</Button>
                                        </li>)
                                }
                            }
                            )}
                        </ul>
                    </Poper>

                </div>
            )}
        >
            {user ? <Image src={user.data.avatar} className="w-8 h-8 rounded-full ml-6" /> : <div className='flex items-center justify-center ml-2'><MoreIconVertical /></div>}
        </Tippy>
    )
}

export default Menu