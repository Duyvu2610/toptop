import { upload } from '@testing-library/user-event/dist/upload'
import React from 'react'
import images from '../assets/images'
import Image from "../components/Image"
import Button from '../components/Button'
import { DropDownIcon, MoreIcon } from '../components/icons/icons'
import { useRef } from 'react'
import { useState } from 'react'
function UploadPage() {
  const dropDown = useRef()
  const [dropDownValue, setDropDownValue] = useState("Công khai")
  const [visibleDropDown, setVisibleDropDown] = useState(false)
  const handleDropDown = () => {
    setVisibleDropDown(prev => !prev)
    if (dropDown.current.style.rotate !== "180deg") {
      dropDown.current.style.rotate = "180deg"
    } else {
      dropDown.current.style.rotate = "0deg"
    }
  }
  return (
    <div className='top-header absolute bg-[rgb(248,248,248)] w-full'>
      <div className="w-[68.7rem] bg-white pt-6 px-14 mx-auto mt-4 rounded-xl flex flex-col">
        <span className='font-semibold text-2xl'>Tải video lên</span>
        <span className='text-lg font-light opacity-60 mt-1'>Đăng video vào tài khoản của bạn</span>
        <div action="" className='flex mt-6 mb-32'>
          <div className="">
            <div className="border-dashed border-[3px] px-9 flex flex-col justify-center items-center rounded-lg cursor-pointer w-64 h-[28.6rem] hover:border-red-500 hover:bg-[rgba(22,24,35,0.03)] transition-all">
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
          <div className="flex-1 w-full ml-6">
            <div className="mb-2 font-semibold">Chú thích</div>
            <div className="flex border-[2px] w-full h-10 rounded-md ">
              <textarea wrap='' type="text" className='flex-1 outline-none py-3 px-4 overflow-hidden h-full' />
              <div className="flex font-semibold w-15 text-center items-center">
                <div className="flex-1 cursor-pointer">@</div>
                <div className="flex-1 cursor-pointer">#</div>
              </div>
            </div>
            <div className="mt-6 mb-2 font-semibold">Ảnh bìa</div>
            <input type="number" className='flex border-[2px] w-full h-10 rounded-md p-3' placeholder='Chọn giây thứ bao nhiêu làm thumb' />
            <div className="mt-6 mb-2 font-semibold">Ai có thể xem video này</div>
            <div className="relative w-72 transition-all">
              <div className=" h-9 rounded-sm border-[2px] pl-2 pt-1" onClick={handleDropDown}>
                {dropDownValue}
              </div>
              <div className="absolute right-2 top-3" ref={dropDown}>
                <DropDownIcon className="" />
              </div>
              {visibleDropDown &&
                <div className="w-full bg-input pl-2 rounded-md">
                  <div className="cursor-pointer" onClick={() => {
                    handleDropDown()
                    setDropDownValue("Công khai")
                  }}>Công khai</div>
                  <div className="cursor-pointer" onClick={() => {
                    handleDropDown()
                    setDropDownValue("Bạn bè")
                  }}>Bạn bè</div>
                  <div className="cursor-pointer" onClick={() => {
                    handleDropDown()
                    setDropDownValue("Riêng tư")
                  }}>Riêng tư</div>
                </div>}
            </div>
            <div className="mt-6 mb-2 font-semibold">Cho phép người dùng</div>
            <div className="flex">
              <input type="checkbox" defaultChecked value="comment" />
              <label className='ml-2 mr-6'>Bình luận</label>
              <input type="checkbox" defaultChecked value="duet" />
              <label className='ml-2 mr-6'>Duet</label>
              <input type="checkbox" defaultChecked value="stitch" />
              <label className='ml-2 mr-6'>Stitch</label>
            </div>
            <div className="flex mt-6">
              <Button rounded className="mr-4 w-40 h-12">Hủy bỏ</Button>
              <Button noClick className="mr-4 w-40 h-12" disabled>Đăng</Button>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-black w-full mt-4 py-10 pl-96 relative text-white flex">
        <Image src={images.logoImg} className="absolute left-[150px]"></Image>
        <Image src={images.logoText} className="absolute left-[200px] top-[46px]"></Image>
        <div className="flex flex-col flex-1">
          <span className='font-medium mb-1'>Công ty</span>
          <span className='font-light mb-1 text-[#ccc]'>Giới thiệu</span>
          <span className='font-light mb-1 text-[#ccc]'>Bảng tin</span>
          <span className='font-light mb-1 text-[#ccc]'>Liên hệ</span>
          <span className='font-light mb-1 text-[#ccc]'>Sự nghiệp</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className='font-medium mb-1'>Chương trình</span>
          <span className='font-light mb-1 text-[#ccc]'>TikTok for Good</span>
          <span className='font-light mb-1 text-[#ccc]'>Quảng cáo</span>
          <span className='font-light mb-1 text-[#ccc]'>Developers</span>
          <span className='font-light mb-1 text-[#ccc]'>TikTok Rewards</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className='font-medium mb-1'>Hỗ trợ</span>
          <span className='font-light mb-1 text-[#ccc]'>Trung tâm trợ giúp</span>
          <span className='font-light mb-1 text-[#ccc]'>Trung tâm an toàn</span>
          <span className='font-light mb-1 text-[#ccc]'>Creator Portal</span>
          <span className='font-light mb-1 text-[#ccc]'>Hướng dẫn cộng đồng</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className='font-medium mb-1'>Pháp lý</span>
          <span className='font-light mb-1 text-[#ccc]'>Terms of Use</span>
          <span className='font-light mb-1 text-[#ccc]'>Private Policy</span>
          <span className='font-light mb-1 text-[#ccc]'>NGUYÊN TẮC THỰC THI</span>
          <span className='font-light mb-1 text-[#ccc]'>PHÁP LUẬT CỦA TIKTOK</span>
        </div>
      </div>
    </div>
  )
}

export default UploadPage