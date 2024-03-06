import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddProduct({ dishlist, updateDishlist }) {
    const additemurl = 'https://1d63-119-160-199-91.ngrok-free.app/api/menu/addMenu';
    const handlesubmitevent = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const plainFormData = Object.fromEntries(formData.entries()); // Convert FormData to plain object
        try {
            const response = await axios.post(additemurl, plainFormData);
            if (response.status === 201) {
                toast.success("Item added successfully!");
                const newItem = response.data;
                const updatedList = [...dishlist, newItem];
                updateDishlist(updatedList);
            }
        } catch (error) {
            console.error('Error in Adding item:', error);
            throw error;
        }
    }
    return (
        <div className='border h-[800px] text-sm overflow-auto '>
            <div className="text-xl font-semibold flex justify-between items-center px-5 py-4">
                <span className="ml-1 font-medium">Add Dish</span>
                <span className="text-sm flex mr-2 font-medium">Dishes &nbsp;
                    <svg className="h-5 w-5 mt-[1px]" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>&nbsp;
                    <p className="text-green-500">Add Dish</p>
                </span>
            </div>
            <ToastContainer />
            <div>
                <form onSubmit={handlesubmitevent} action="submit" className='grid grid-flow-col gap-5 m-7 p-2'>
                    <div className='border border-gray-300 p-4 rounded-md flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='myfont font-bold'>Name</label>
                            <input className='myfont border border-gray-300 rounded-md h-10 w-full text-sm px-2' placeholder='Enter the name' type="text" name="name" required />
                        </div>
                        <div className='flex flex-col myfont gap-1'>
                            <label htmlFor="type" className='font-bold'>Type</label>
                            <select name="type" className='border myfont border-gray-300 bg-white rounded-md  px-2 h-10' required>
                                <option className='myfont' value="Breakfast & Pancakes">Breakfast & Pancakes</option>
                                <option className='myfont' value="Beverages">Beverages</option>
                                <option className='myfont' value="Chapati and Paratha">Chapati and Paratha</option>
                                <option className='myfont' value="Desserts">Desserts</option>
                                <option className='myfont' value="Main Course">Main Course</option>
                                <option className='myfont' value="Pasta">Pasta</option>
                                <option className='myfont' value="Meals">Meals</option>
                                <option className='myfont' value="Sandwiches & Rolls">Sandwiches & Rolls</option>
                                <option className='myfont' value="Snacks & Starters">Snacks & Starters</option>
                                <option className='myfont' value="Rice & Noodles">Rice & Noodles</option>
                            </select>
                        </div>
                        <div className='flex flex-col myfont gap-1'>
                            <label className='font-bold' htmlFor="subtype" >Subtype</label>
                            <select name="subtype" className='border myfont border-gray-300 bg-white rounded-md  px-2 h-10' required>
                                <option className='myfont' value="Brownie">Brownie</option>
                                <option className='myfont' value="Cake">Cake</option>
                                <option className='myfont' value="chapati">Chapati</option>
                                <option className='myfont' value="Coolers">Coolers</option>
                                <option className='myfont' value="Coffees & Hot Drinks">Coffees & Hot Drinks</option>
                                <option className='myfont' value="Eggs & Omelettes">Eggs & Omelettes</option>
                                <option className='myfont' value="Healthy and filling">Healthy and filling</option>
                                <option className='myfont' value="Maggi">Maggi</option>
                                <option className='myfont' value="meals">Meals</option>
                                <option className='myfont' value="Noodles">Noodles</option>
                                <option className='myfont' value="Non-Vegetarian">Non-Vegetarian</option>
                                <option className='myfont' value="Parathas">Parathas</option>
                                <option className='myfont' value="Pancakes">Pancakes</option>
                                <option className='myfont' value="Pasta">Pasta</option>
                                <option className='myfont' value="Rice">Rice</option>
                                <option className='myfont' value="Rolls">Rolls</option>
                                <option className='myfont' value="Snacks & Starters">Snacks & Starters</option>
                                <option className='myfont' value="Sandwiches">Sandwiches</option>
                                <option className='myfont' value="Soup">Soup</option>
                                <option className='myfont' value="Shakes">Shakes</option>
                                <option className='myfont' value="Toast/bread">Toast/bread</option>
                                <option className='myfont' value="teas">Teas</option>
                                <option className='myfont' value="Vegetarian">Vegetarian</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='font-bold'>Category</h4>
                            <div className='flex flex-col w-44 gap-3'>
                                <span className='grid grid-flow-col grid-cols-1'>
                                    <label htmlFor="Veg">
                                        Veg
                                    </label>
                                    <input type="radio" id="Veg" name='category' value={'Veg'} className="relative h-5 w-[2.27rem] cursor-pointer appearance-none rounded-full border-2 border-transparent bg-green-200 transition-colors duration-200 ease-in-out before:inline-block before:h-4 before:w-4 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:transition before:duration-200 before:ease-in-out checked:!bg-green-500 checked:bg-none checked:before:translate-x-full focus:ring-0 focus:ring-transparent" required></input>
                                </span>
                                <span className='grid grid-flow-col grid-cols-1'>
                                    <label htmlFor="NonVeg">
                                        Non-Veg
                                    </label>
                                    <input type="radio" id="NonVeg" name='category' value={'NonVeg'} className="relative h-5 w-[2.27rem] cursor-pointer appearance-none rounded-full border-2 border-transparent bg-green-200 transition-colors duration-200 ease-in-out before:inline-block before:h-4 before:w-4 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:transition before:duration-200 before:ease-in-out checked:!bg-green-500 checked:bg-none checked:before:translate-x-full focus:ring-0 focus:ring-transparent" required></input>
                                </span>
                                <span className='grid grid-flow-col grid-cols-1'>
                                    <label htmlFor="Egg">
                                        Egg
                                    </label>
                                    <input type="radio" id="Egg" name='category' value={'Egg'} className="relative h-5 w-[2.27rem] cursor-pointer appearance-none rounded-full border-2 border-transparent bg-green-200 transition-colors duration-200 ease-in-out before:inline-block before:h-4 before:w-4 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:transition before:duration-200 before:ease-in-out checked:!bg-green-500 checked:bg-none checked:before:translate-x-full focus:ring-0 focus:ring-transparent" required></input>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-300 p-4 myfont rounded-md flex flex-col gap-4">
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="image" className='myfont font-bold'>Image URL</label>
                            <input className='myfont border border-gray-300 rounded-md h-10 w-full text-sm px-2' placeholder='Enter the name' type='url' name="image" required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="price" className='myfont font-bold'>Price</label>
                            <input className='myfont border border-gray-300 rounded-md h-10 w-full text-sm px-2' placeholder='Enter the name' type='number' name="price" required />
                        </div>
                        <div>
                            <label className="myfont font-bold mb-2 block text-sm text-default-900" htmlFor="description" >Description</label>
                            <div className="relative w-full">
                                <textarea placeholder="short Description" name="description" rows="5" className="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full h-44 resize-none"></textarea>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <button type='submit' className='border p-2 rounded-md font-semibold hover:bg-green-400 bg-green-500 text-white myfont w-24 h-10 flex justify-evenly items-center'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                Save
                            </button>
                            <button type='reset' className='border p-2 rounded-md font-semibold hover:bg-green-300 bg-green-200 text-green-500 myfont w-24 h-10 flex justify-evenly items-center'>
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                Clear
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
AddProduct.propTypes = {
    updateDishlist: PropTypes.func.isRequired,
    dishlist: PropTypes.array.isRequired
};

export default AddProduct