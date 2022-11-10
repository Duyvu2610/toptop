import { upload } from '@testing-library/user-event/dist/upload'
import React from 'react'
import images from '../assets/images'
import Image from "../components/Image"
import Button from '../components/Button'
function UploadPage() {
  return (
    <div className='top-header absolute bg-[rgb(248,248,248)] w-full h-screen'>
      <div className="w-[68.7rem] bg-white py-6 px-14 mx-auto mt-4 rounded-xl flex flex-col">
        <span className='font-semibold text-2xl'>Tải video lên</span>
        <span className='text-lg font-light opacity-60 mt-1'>Đăng video vào tài khoản của bạn</span>
        <form action="" className='flex mt-6 mb-32'>
          <div className="">
            <div className="border-dashed border-[3px] px-9 flex flex-col justify-center items-center rounded-lg cursor-pointer w-64 h-[28.6rem] hover:border-red-500 hover:bg-[rgba(22,24,35,0.03)]">
              <Image src={images.upload} />
              <span className='mt-6 font-semibold text-lg'>Chọn video để tải lên</span>
              <span className='mt-1 mb-6 text-center text-sm'>Hoặc kéo và thả tập tin</span>
              <div className="my-4 text-center flex flex-col text-[rgba(22,24,35,0.5)]">
                <span className='mb-1 text-center'>MP4 hoặc WebM</span>
                <span className='mb-1 text-center'>Độ phân giải 720x1280 trở lên</span>
                <span className='mb-1 text-center'>Tối đa 10 phút</span>
                <span className=''>Nhỏ hơn 2GB</span>
              </div>
              <div className="w-full">
                <Button primary className='mt-6 w-full rounded-none'>Chọn tập tin</Button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full"></div>
        </form>
      </div>
    </div>
  )
}

export default UploadPage