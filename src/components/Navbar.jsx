import React from 'react'

const Navbar = () => {
  return (
      <nav className="flex justify-around bg-purple-950 text-white px-1 py-2">
        <div className="logo">
            <span className='font-bold text-xl'>iTask</span>
        </div>
        <ul className="flex gap-5">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>About</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Contact</li>
        </ul>
      </nav>
  )
}

export default Navbar
