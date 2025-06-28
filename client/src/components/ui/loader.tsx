import React from 'react'
import { BarLoader } from 'react-spinners'

function Loader({
  className,
}:{
  className?:string
}) {
  return (
    <div className= {`${className} flex justify-center items-center`}>
        <BarLoader color='#FFFFFF'/>
      </div>
  )
}

export {Loader}
