import React from 'react'
import { HashLoader } from 'react-spinners'

function Loader({
  className,
}:{
  className?:string
}) {
  return (
    <div className= {`${className} flex justify-center items-center h-screen w-ful`}>
        <HashLoader color='#FFFFFF'/>
      </div>
  )
}

export {Loader}
