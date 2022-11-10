import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'

function Button({ to, href, onClick, className, leftIcon, primary = false, rounded = false, red = false,
  rightIcon, children, noClick, ...passProps }, ref) {

  let Temp = 'button'
  const props = {
    onClick,
    ...passProps
  }
  let classNames = '';
  let classNames1 = 'flex h-9 items-center font-medium';
  if (to) {
    Temp = Link;
    props.to = to
  } else if (href) {
    props.href = href
    Temp = 'a';
  } else {
    classNames1 = "flex h-9 items-center font-medium justify-center"
  }
  if (rounded) {
    classNames = 'hover:bg-input rounded border-focus px-4'
  } else if (primary) {
    classNames = 'rounded px-4 bg-primary font-semibold text-white'
  } else if (red) {
    classNames = 'rounded px-4 text-primary border-primary border-focus hover:bg-[#fe2c550f]'
  } else if (noClick) {
    classNames = 'rounded px-4 bg-[#ebebeb] text-[#16182357] cursor-not-allowed '
  }
  return (
    <Temp className={`${classNames1} ${className} ${classNames}`} {...props} ref={ref}>
      {leftIcon && <span className='mr-2 text-xl ' >{leftIcon}</span>}
      <span className="inline-block ">{children}</span>
      {rightIcon && <span className=''>{rightIcon}</span>}
    </Temp>
  )
}

export default forwardRef(Button)