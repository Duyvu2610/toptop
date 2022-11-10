import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BackIcon, FbIcon, GoogleIcon, HumanIcon, InstagramIcon, KakaoTalkIcon, LineIcon, TwitterIcon, WhatAppIcon } from './icons/icons'
import Button from './Button'
import * as authApi from '../api/authApi'
import { dontShow } from '../redux/appSlice'
import { useNavigate } from 'react-router-dom'

function FormLogin() {

    const dispatch = useDispatch()
    const handleCloseModal = () => {
        dispatch(dontShow())
    }
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => document.body.style.overflow = "auto"
    })
    const list = [
        {
            icon: <HumanIcon className="h-6 w-6" />,
            text: "Số điện thoại / Email / TikTok ID",
            showMore: true
        },
        {
            icon: <FbIcon />,
            text: "Tiếp tục với Facebook"
        },
        {
            icon: <GoogleIcon />,
            text: "Tiếp tục với Google"
        },
        {
            icon: <TwitterIcon />,
            text: "Tiếp tục với Twitter"
        },
        {
            icon: <WhatAppIcon />,
            text: "Tiếp tục với Whatapp"
        },
        {
            icon: <LineIcon />,
            text: "Tiếp tục với LINE"
        },
        {
            icon: <KakaoTalkIcon />,
            text: "Tiếp tục với Kakaotalk"
        },
        {
            icon: <InstagramIcon className="w-6 h-6" />,
            text: "Tiếp tục với Instagram"
        },

    ]
    const [loginModal, setLoginModal] = useState(list)
    const [loginInput, setLoginInput] = useState(false)
    const [registerInput, setRegisterInput] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleShowLoginInput = () => {
        setLoginModal(list)
        setLoginInput(true)
    }
    const handleShowRegisterInput = () => {
        setLoginModal([])
        setRegisterInput(true)

    }
    const handleRegister = () => {
        setRegisterInput(false)
        setLoginModal([])
    }
    const handleLogin = () => {
        setLoginInput(false)
        setRegisterInput(false)
        setLoginModal(list)


    }
    const handleLoginAcc = async () => {
        const user = {
            email,
            password
        }
        await authApi.login(user, dispatch)
        navigate(0)
    }
    const handleRegisterAcc = () => {
        const user = {
            type: "email",
            email,
            password
        }
        authApi.register(dispatch, user)
    }
    return (
        <div className=" w-screen h-screen z-[999999] bg-[#00000080] absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center scroll-none transition duration-500" >
            {loginModal.length !== 0 ?
                <div className='w-logonForm-w flex flex-col pt-12 m-auto bg-white  rounded-lg relative '>
                    <div className="flex-1">
                        <div className="w-[23.4rem] m-auto">
                            {!loginInput ?
                                <>
                                    <div className=" text-3xl my-4 font-bold text-center">Đăng nhập vào tiktok</div>
                                    <div className="  overflow-auto max-h-[23rem]">
                                        {loginModal.map((e, i) => (
                                            <div className='flex items-center p-2 mb-4 border cursor-pointer' key={i}
                                                onClick={() => {
                                                    if (e.showMore) handleShowLoginInput()
                                                    return
                                                }}>
                                                {e.icon}
                                                <div className="text-center flex-1 font-semibold select-none">{e.text}</div>
                                            </div>))}
                                    </div>
                                </>
                                :
                                <div className="">
                                    <div className=" text-3xl my-4 font-bold text-center">Đăng nhập</div>
                                    <div className="flex flex-col">
                                        <span className='font-semibold'>Tài khoản</span>
                                        <input type="text" placeholder='Email' className='p-3 no-underline caret-primary outline-none border rounded-lg my-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <span>Mật khẩu</span>
                                        <input type="password" placeholder='Mật khẩu' className='p-3 no-underline caret-primary outline-none border rounded-lg my-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <Button primary className='h-12 my-10' onClick={handleLoginAcc}>Đăng nhập</Button>
                                    </div>
                                    <div className="absolute top-3 left-3 cursor-pointer" onClick={handleLogin}>
                                        <BackIcon className="w-6 h-6" />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="h-16 flex justify-center items-center border-t">
                        <div className="mr-4">Bạn không có tài khỏan ?</div>
                        <div className="text-primary hover:underline font-semibold" onClick={handleRegister}>Đăng ký</div>
                    </div>
                    <div className="absolute w-10 h-10 rounded-full bg-[#16182308] flex top-3 right-3 cursor-pointer" onClick={handleCloseModal}>
                        <p className='font-bold w-1/2 h-1/2 m-auto text-center'>X</p>
                    </div>
                </div>
                :
                <>
                    <div className='w-logonForm-w flex flex-col pt-12 m-auto bg-white  rounded-lg relative '>
                        <div className="flex-1">
                            <div className="w-[23.4rem] m-auto">
                                {!registerInput ?
                                    <>
                                        <div className=" text-3xl my-4 font-bold text-center">Đăng Ký tiktok</div>
                                        <div className='flex items-center p-2 mb-4 border cursor-pointer'
                                            onClick={() =>
                                                handleShowRegisterInput()
                                            }>
                                            <HumanIcon />
                                            <div className="text-center flex-1 font-semibold select-none"> Sử dụng số điện thoại hoặc email</div>
                                        </div>
                                        <div className='flex items-center p-2 mb-4 border cursor-pointer'>
                                            <FbIcon />
                                            <div className="text-center flex-1 font-semibold select-none"> Sử dụng Facebook</div>
                                        </div>
                                        <div className='flex items-center p-2 mb-4 border cursor-pointer'>
                                            <GoogleIcon />
                                            <div className="text-center flex-1 font-semibold select-none"> Sử dụng Google</div>
                                        </div>
                                    </>
                                    :
                                    <div className="">
                                        <div className=" text-3xl my-4 font-bold text-center">Đăng Ký</div>
                                        <div className="flex flex-col">
                                            <span className='font-semibold'>Tài khoản</span>
                                            <input type="text" placeholder='Email' className='p-3 no-underline caret-primary outline-none border rounded-lg my-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <span>Mật khẩu</span>
                                            <input type="password" placeholder='Mật khẩu' className='p-3 no-underline caret-primary outline-none border rounded-lg my-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <Button primary className='h-12 my-10' onClick={handleRegisterAcc}>Đăng ký</Button>
                                        </div>
                                        <div className="absolute top-3 left-3 cursor-pointer" onClick={handleRegister}>
                                            <BackIcon className="w-6 h-6" />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="h-16 flex justify-center items-center border-t">
                            <div className="mr-4">Bạn đã có tài khỏan ?</div>
                            <div className="text-primary hover:underline font-semibold" onClick={handleLogin}>Đăng nhập</div>
                        </div>
                        <div className="absolute w-10 h-10 rounded-full bg-[#16182308] flex top-3 right-3 cursor-pointer" onClick={handleCloseModal}>
                            <p className='font-bold w-1/2 h-1/2 m-auto text-center'>X</p>
                        </div>
                    </div>
                </>

            }
        </div>
    )
}

export default FormLogin