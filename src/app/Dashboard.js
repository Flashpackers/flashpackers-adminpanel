import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../assets/images/logoDarkImg.png'
import { LuLogOut, LuSearch } from 'react-icons/lu'
function Dashboard({ sendtoparent }) {
  const handlelogout = () => {
    // console.log("hiiii")
    sendtoparent(false);
    localStorage.clear();
  }
  function showsidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.className = 'border lg:flex lg:w-1/6 sm:flex'
  }
  function hidesidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.className = 'border lg:flex  lg:w-1/6 sm:hidden hidden'
  }
  return (
    <div className='text-black text-7xl flex h-lvh'>
      <div id='sidebar' className='border border-gray-400 lg:flex flex-col sm:hidden hidden lg:w-1/6' onBlur={hidesidebar}>

        <a className='border w-full flex justify-center p-2' href='/'><img src={Logo} alt="" width={'100px'} /></a>
        <div className='border border-fuchsia-600 h-full'>
          <ul className='border-2'>
            <li className='text-center border'>item1</li>
            <li className='text-center border'>item2</li>
            <li className='text-center border'>item3</li>
          </ul>
        </div>
      </div>
      <div className='grid grid-flow-row w-full '>
        <div className='border h-20 col-span-full flex items-center justify-between'>
          <button className=' p-1 lg:hidden' onClick={showsidebar}>
            <hr className='bg-black w-10 h-[2px] m-1 my-2'></hr>
            <hr className='bg-black w-10 h-[2px] m-1 my-2'></hr>
            <hr className='bg-black w-10 h-[2px] m-1 my-2'></hr>
          </button>
          <span className='flex items-center mx-6'>
            <LuSearch size={20} className='relative left-8 ' />
            <input placeholder='Search for items..' type='search' className='text-lg placeholder:text-[15px] placeholder:text-gray-500 font-normal focus:border-green-500 
           border border-gray-200 w-96 pl-10 pr-4 h-10 rounded-3xl bg-gray-100'>
            </input>
          </span>
          <button onClick={handlelogout} className='h-11 w-28 rounded-md font-semibold text-green-500 text-xl border-2 border-green-500 hover:bg-green-100 flex  justify-evenly items-center absolute right-5' >
            <LuLogOut size={20} />Logout
          </button>
        </div>
        <div className='border h-[800px]'>
        </div>
      </div>
    </div>
  )
}
Dashboard.propTypes = {
  sendtoparent: PropTypes.func.isRequired // Ensure sendtoparent is a function and required
};
export default Dashboard