import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-6xl font-bold text-center text-lime-600 hover:text-white'> Hey Arushi ☺️</h1>
      <h2 className='mt-5 text-5xl text-center text-lime-600 hover:text-white'>Welcome Back!</h2>
      <h3 className='text-4xl text-center text-lime-600 hover:text-white'>Let's Get Started With The MERN Auth System...</h3>\
      <button className='items-center py-4 mt-10 text-center bg-white border border-gray-900 rounded-full px-7 text-slate-950 hover:bg-blue-500'>Get Started</button>
    </div>
  )
}

export default Header
