import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
   const navigate = useNavigate()
  return (
    <div onClick={()=> navigate('/login')} className='flex items-center justify-center mt-10'>
      <button className='items-center px-6 py-2 bg-white border border-gray-900 rounded-full text-slate-950 hover:bg-blue-500'>Login</button>
    
    </div>
  )
}

export default NavBar
