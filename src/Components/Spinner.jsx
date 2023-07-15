import React from 'react'
import spinner from '../asests/Svg/spinner.svg'

export default function Spinner() {
  return (
    <div className='bg-opacity-50 bg-black flex justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50'>
        <div>
            <img src={spinner} alt="Loading..." className='h-24' />
        </div>
    </div>
  )
}
