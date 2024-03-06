import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../Product/Productlist.css'
function Productlist({ dishlist, updateDishlist, onClick }) {
    const [deleteitem, setDeleteitem] = useState(false);
    const deleteurl = 'https://1d63-119-160-199-91.ngrok-free.app/api/menu/deleteMenu/'
    const handledelete = async (id) => {
        const response = await axios.delete(deleteurl + id);
        if (response.status == 200) {

            setDeleteitem(true);
            toast.success("Item deleted successfully!");
            setDeleteitem(false);
            //update the dishlist by removing the item which we have deleted
            const updatedList = dishlist.filter(item => item._id !== id);
            updateDishlist(updatedList);
        }
    }
    return (
        <div className='border h-[800px] overflow-auto'>
            <div className='text-xl font-semibold flex justify-between items-center px-5 py-4'>
                <span className='ml-1 font-medium'>Dishes List</span>
                <span className='text-sm flex mr-2 font-medium'>Dishes &nbsp;
                    <svg className='h-5 w-5 mt-[1px]' stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m9 18 6-6-6-6"></path></svg>&nbsp;
                    <p className='text-green-500'>Dishes List</p>
                </span>
            </div>
            <div className='border rounded-md mx-5'>
                <div className=' py-5 flex justify-between items-center'>
                    <span className='text-xl font-semibold ml-6'>Dishes List</span>
                    <span className='grid grid-flow-col mr-4 gap-5'>
                        <button className='myfont grid grid-flow-col gap-2 items-center text-sm text-black bg-gray-100 p-2 px-6 rounded-md'>Sort : Ascending
                            <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"></path></svg>
                        </button>

                            <button className='myfont text-sm bg-green-500 text-white p-2 px-6 rounded-md'>+ Add Dish</button>
                    </span>
                </div>
                {deleteitem == true && <ToastContainer />}
                <div className='grid border w-full m-auto overflow-auto h-[480px] pb-2'>
                    <table className="min-w-full divide-y divide-default-200 ">
                        <thead className="bg-gray-100">
                            <tr className="text-start">
                                <th className="whitespace-nowrap px-6 py-3 text-start text-sm font-semibold text-default-800">Dish Name</th>
                                <th className="whitespace-nowrap px-6 py-3 text-start text-sm font-semibold text-default-800">Category</th>
                                <th className="whitespace-nowrap px-6 py-3 text-start text-sm font-semibold text-default-800">Price</th>
                                <th className="whitespace-nowrap px-6 py-3 text-start text-sm font-semibold text-default-800">Type</th>
                                <th className="whitespace-nowrap px-6 py-3 text-start text-sm font-semibold text-default-800">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default-200">

                            {dishlist.map((element) => {
                                return <tr key={element._id}>
                                    <td className=" text-gray-500 whitespace-nowrap px-6 py-4 text-sm font-semibold text-default-800">
                                        <a className="flex items-center gap-3" href="/yum_r/admin/dishes/1008">
                                            <div className="h-12 w-12 shrink">
                                                <img src={element.image} height="48" width="48" alt="image" className="h-full max-w-full" />
                                            </div>
                                            <p className="text-base text-default-500 transition-all hover:text-primary">{element.name}</p>
                                        </a>
                                    </td>
                                    <td className=" text-gray-500 whitespace-nowrap px-6 py-4 text-sm font-semibold text-default-500">{element.type}</td><td className=" text-gray-500 whitespace-nowrap px-6 py-4 text-sm font-semibold text-default-500">{element.price}</td>
                                    <td className=" text-gray-500 whitespace-nowrap px-6 py-4 text-sm font-semibold text-default-500">{element.category}</td>

                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">
                                            <svg onClick={() => onClick(true, element._id)} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer transition-colors hover:text-primary" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                                <path d="m15 5 4 4"></path>
                                            </svg>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer transition-colors hover:text-primary" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                            <svg key={element._id} onClick={() => handledelete(element._id)} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer transition-colors hover:text-red-500" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                                <line x1="14" x2="14" y1="11" y2="17"></line>
                                            </svg>
                                        </div>

                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
Productlist.propTypes = {
    dishlist: PropTypes.array.isRequired,
    updateDishlist: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Productlist