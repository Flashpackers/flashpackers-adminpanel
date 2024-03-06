  import React, { useEffect } from 'react'
  import { useContext, useState } from 'react'
  import DataContext from '../Datacontext'
  import PropTypes from 'prop-types'
  import Logo from '../../assets/images/logoDarkImg.png'
  import Adminimg from '../../assets/images/human.png'
  import Productlist from './Product/Productlist'
  import axios from 'axios';
  import { LuLogOut, LuSearch } from 'react-icons/lu'
  import AddProduct from './Product/AddProduct'
  import Updateproduct from './Product/Updateproduct'
  function Dashboard({ sendtoparent }) {
    const [id ,setId]=useState(null);
    const [itemdata, setItemData] = useState(null); // State for item data
    const [isClicked, setIsClicked] = useState(false);
    const [productname, setProductname] = useState([]);
    const [isDashboardActive, setIsDashboardActive] = useState(true);
    const [isformActive, setIsformActive] = useState(false);
    const [isProductListActive, setIsProductListActive] = useState(false);
    const { data } = useContext(DataContext);
    const menuurl = 'https://1d63-119-160-199-91.ngrok-free.app/api/menu/listMenu';
    const  getdataurl = 'https://1d63-119-160-199-91.ngrok-free.app/api/menu/getMenuById/'
    const handleUpdate = async(value,id) => {
      setId(id);
      setIsClicked(value);
      setIsProductListActive(false);
      try{
        const response =await axios.get(getdataurl+id, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })
          const itemdata = response.data;
          setItemData(itemdata)
      }catch(error){
        console.error('Error in fetching items details item:', error);
        throw error;
      }
    };
    const addDashboardClasses = () => {
      document.getElementById('dashboard').classList.remove('hover:bg-gray-200');
      document.getElementById('dashboard').classList.add('bg-green-100', 'text-green-500');
    };
    const removeDashboardClasses = () => {
      document.getElementById('dashboard').classList.remove('bg-green-100', 'text-green-500');
      document.getElementById('dashboard').classList.add('hover:bg-gray-100');
    };
    const addDishList = () => {
      document.getElementById('dishList').classList.remove('hover:bg-gray-200')
      document.getElementById('dishList').classList.add('bg-green-100', 'text-green-500')
    }
    const removeDishList = () => {
      document.getElementById('dishList').classList.add('hover:bg-gray-200')
      document.getElementById('dishList').classList.remove('bg-green-100', 'text-green-500')
    }
    const addDish = () => {
      document.getElementById('adddish').classList.remove('hover:bg-gray-200')
      document.getElementById('adddish').classList.add('bg-green-100', 'text-green-500')
    }
    const removeDish = () => {
      document.getElementById('adddish').classList.remove('bg-green-100', 'text-green-500')
      document.getElementById('adddish').classList.add('hover:bg-gray-200')
    }
    const handleDashboardClick = () => {
      addDashboardClasses();
      document.getElementById('dishes').classList.remove('bg-gray-100')
      removeDishList();
      removeDish();
      if (!isDashboardActive) {
        setIsDashboardActive(true);
        setIsProductListActive(false);
        setIsformActive(false);
      }
    };

    const handleDishListClick = () => {
      removeDish();
      addDishList();
      removeDashboardClasses();
      if (!isProductListActive) {
        setIsDashboardActive(false);
        setIsformActive(false);
        setIsClicked(false);
        setIsProductListActive(true);
      }
    };
    const handleAddDish = () => {
      addDish();
      removeDishList();
      removeDashboardClasses();
      if(!isformActive){
        setIsDashboardActive(false);
        setIsProductListActive(false);
        setIsClicked(false);
        setIsformActive(true);
      }
    }

    const handlelogout = () => {
      sendtoparent(false);
      localStorage.clear();
    }
    const togglelogout = () => {
      const logout = document.getElementById('logout');
      if (logout.classList.contains('hidden')) {
        logout.classList.remove('hidden');
        logout.classList.add('flex');
      } else {
        logout.classList.remove('flex');
        logout.classList.add('hidden');
      }
    };
    const togglemenu = () => {
      removeDashboardClasses();
      const product = document.getElementById('product');
      const arrow = document.getElementById('arrow')
      if (product.classList.contains('hidden')) {
        product.classList.remove('hidden');
        product.classList.add('flex');
        arrow.classList.add('rotate-180', 'ml-1', 'mt-1');
        document.getElementById('dishes').classList.add('bg-gray-100')
        removeDish();
        removeDishList();

      } else {
        document.getElementById('dishes').classList.remove('bg-gray-100')
        product.classList.remove('flex');
        product.classList.add('hidden');
        addDish();
        addDishList();
        arrow.classList.remove('rotate-180', 'ml-1', 'mt-1');
      }
    };
    function showsidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.className = 'border lg:flex lg:w-1/6 sm:flex'
    }
    function hidesidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.className = 'border lg:flex  lg:w-1/6 sm:hidden hidden'
    }
    useEffect(() => {
      addDashboardClasses();
      const fetchdata = async () => {
        document.body.style.backgroundImage = 'linear-gradient(white,white)';
        const res = await axios.get(menuurl, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })
        setProductname(res.data);
      }
      if (productname.length === 0) {
        fetchdata();
      }
    },[])
    const updateDishlist = (updatedList) => {
      setProductname(updatedList);
  };
    return (
      <div className='text-black text-7xl flex h-lvh'>
        <div id='sidebar' className='lg:flex flex-col sm:hidden hidden lg:w-1/6' onBlur={hidesidebar}>

          <a className='border border-gray-100 border-r-0 w-full flex justify-center p-2 py-4' href='/'><img src={Logo} alt="" width={'100px'} /></a>
          <div className=' h-full'>
            <ul>
              <li id='dashboard' onClick={handleDashboardClick} className='myfont flex items-center hover:cursor-pointer m-2 text-gray-600 text-[14px] hover:bg-gray-200 pl-2 py-3 rounded-md'>
                <svg className='mr-3' stroke="currentColor" fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
                Dashboard</li>
              <li id='dishes' onClick={togglemenu} className='myfont flex items-center hover:cursor-pointer m-2 text-gray-600 text-[14px] hover:bg-gray-200 pl-2 py-3 rounded-md'>
                <svg className='mr-2 h-6 w-6 relative right-[2px]' stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path><path d="M7 21h10"></path><path d="M19.5 12 22 6"></path><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"></path><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"></path><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"></path></svg>
                Dishes
                <svg id='arrow' stroke="currentColor" fill="none" className='h-5 w-5 absolute left-44' xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"></path></svg>
              </li>
              <ul id='product' className='hidden myfont flex-col'>
                <li id='dishList' onClick={handleDishListClick} className='myfont flex items-center hover:cursor-pointer m-2 gap-[11px] text-gray-600 text-[14px] hover:bg-gray-200 pl-2 py-3 rounded-md'>
                  <svg className='h-5 w-5' stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.1" cy="12.1" r="1"></circle></svg>
                  Dishes List</li>
                <li id='adddish' onClick={handleAddDish} className='myfont flex items-center hover:cursor-pointer  m-2 gap-[11px] text-gray-600 text-[14px] hover:bg-gray-200 pl-2 py-3  rounded-md'>
                  <svg className='h-5 w-5' stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.1" cy="12.1" r="1"></circle></svg>
                  Add Dish</li>
              </ul>
            </ul>
          </div>
        </div>
        <div className='grid grid-flow-row w-full '>
          <div className='border border-b-0 h-20 col-span-full flex items-center justify-between'>
            <button className=' p-1 lg:hidden' onClick={showsidebar}>
              <hr className='bg-black w-10 h-[2px] m-1 my-2'></hr>
              <hr className='bg-black w-10 h-[2px] m-1 my-2'></hr>
              <hr className='bg-black w-10 h-[2px] m-1 my-2'></hr>
            </button>
            <span className='myfont flex items-center mx-6'>
              <LuSearch size={20} className='relative left-8 ' />
              <input placeholder='Search for items..' type='search' className='text-lg placeholder:text-[15px] placeholder:text-gray-500 font-normal border border-gray-300 w-64 py-3 pl-10 pr-4 h-10 rounded-3xl bg-gray-100 focus:outline-none focus:border-green-500'>
              </input>
            </span>

            <button onClick={togglelogout} className='h-14 w-40 myfont text-xl  flex justify-evenly items-center absolute right-5' >
              <img src={Adminimg} alt="" height={'40px'} width={'40px'} />
              <div className='flex flex-col text-left'>
                <span className='text-lg'>{data.name}</span>
                <span className='text-sm text-gray-500'>Admin</span>
              </div>
            </button>
            <button id='logout' onClick={handlelogout} className='hidden myfont border hover:bg-green-100 justify-evenly w-36 shadow-md relative right-2 top-14 rounded-sm p-2 text-green-500 bg-white'>
              <LuLogOut size={20} className='relative top-1 ' />
              <p className='text-lg'>Logout</p>
            </button>

          </div>
          {isDashboardActive && <div className='border h-[800px]'>
            <div>
              <div className='myfont text-xl font-semibold flex justify-between items-center px-5 py-4'>
                <span className='ml-1 font-medium'>Dashboard</span>
                <span className='text-sm flex mr-2 font-medium'>Admin &nbsp; <svg className='h-5 w-5 mt-[1px]' stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9 18 6-6-6-6"></path></svg>&nbsp; <p className='text-green-500'>Dashboard</p></span>
              </div>
              <div className='myfont gap-5 mx-6 grid grid-flow-col'>
                <div className='rounded-md border gap-4 border-gray-300 flex flex-col text-lg justify-center items-center p-6'>
                  <span className='text-orange-500 font-bold text-3xl'>325.7k</span>
                  <span >Total Revenue</span>
                  <span className='text-sm text-green-500'>10% Increase</span>
                </div>
                <div className='rounded-md gap-4 border border-gray-300 flex flex-col text-lg justify-center items-center p-6'>
                  <span className='text-orange-500 font-bold text-3xl'>2.6k</span>
                  <span >New Orders</span>
                  <span className='text-sm text-green-500'>50% Increase</span>
                </div>
                <div className='rounded-md gap-4 border border-gray-300 flex flex-col text-lg justify-center items-center p-6'>
                  <span className='text-orange-500 font-bold text-3xl'>12.6k</span>
                  <span >Received Orders</span>
                  <span className='text-sm text-green-500'>34% Increase</span>
                </div>
                <div className='rounded-md gap-4 border border-gray-300 flex flex-col text-lg justify-center items-center p-6'>
                  <span className='text-orange-500 font-bold text-3xl'>476</span>
                  <span >Reviews</span>
                  <span className='text-sm text-red-500'>5% Decrease</span>
                </div>
                <div className='rounded-md gap-4 border border-gray-300 flex flex-col text-lg justify-center items-center p-6'>
                  <span className='text-orange-500 font-bold text-3xl'>865</span>
                  <span >New Reach</span>
                  <span className='text-sm text-green-500'>48% Increase</span>
                </div>
                <div className='rounded-md gap-4 border border-gray-300 flex flex-col text-lg justify-center items-center p-6'>
                  <span className='text-orange-500 font-bold text-3xl'>9.2k</span>
                  <span >Successful Orders</span>
                  <span className='text-sm text-red-500'>8% Decrease</span>
                </div>

              </div>
            </div>
            <div>
              <div className='myfont text-xl font-semibold items-center flex justify-between px-5 py-6'>
                <span className='ml-1 font-semibold'>Best Selling Product</span>
                <button className='text-orange-500 text-sm flex relative right-28 font-medium'>View all <svg className='h-5 w-5 mt-[1px] ml-1' stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9 18 6-6-6-6"></path></svg></button>
              </div>
              <div className='grid grid-flow-col gap-5 rounded-md w-5/6 ml-6'>
                {productname.slice(0, 6).map((element) => {
                  return <div key={element._id} className='rounded-md hover:border-green-500 myfont myfont font-semibold border border-gray-300 w-44'>
                    <img className='h-28 m-auto' src={element.image} alt="" height={'60px'} width={'60px'} />
                    <hr className="border bg-gray-600 w-36 m-auto" />
                    <div className=' text-lg px-[14px] my-2'>{element.name}</div>
                    <div className=' text-gray-500 text-lg pl-[14px] my-2'>&#8377;{element.price}</div>
                  </div>
                })}
              </div>
            </div>
          </div>}
          {isClicked && <Updateproduct Id={id} itemdetails={itemdata} dishlist={productname} updateDishlist={updateDishlist}/>}
          {isProductListActive && <Productlist onClick={handleUpdate} dishlist={productname} updateDishlist={updateDishlist} />}
          <AddProduct dishlist={productname} updateDishlist={updateDishlist}/>
        </div>
      </div>
    )
  }
  Dashboard.propTypes = {
    sendtoparent: PropTypes.func.isRequired // Ensure sendtoparent is a function and required
  };
  export default Dashboard