import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
function MainLayout({ children }) {
  return (
    <div className='mt-header'>
      <Header />
      <div className=' flex max-w-app m-center relative justify-between'>
        <div className="w-sidebar-w pt-5 pl-2 pb-6"><Sidebar /></div>
        <div className="py-6 h-[1000px] flex-1 ">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout