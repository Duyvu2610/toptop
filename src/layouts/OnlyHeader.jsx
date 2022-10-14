import React from 'react'
import Header from './Header'
function OnlyHeader({ children }) {
  return (
    <>
      <Header fullSize />
      {children}
    </>
  )
}

export default OnlyHeader