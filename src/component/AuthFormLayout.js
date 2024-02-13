import logoDarkImg from "../assets/images/logoDarkImg.png"
import logoLightImg from "../assets/images/logoLightImg.jpg"
import React, { useEffect } from 'react';
import axios from 'axios';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { useState } from 'react';
import PropTypes from 'prop-types'
function AuthFormLayout1({ sendtoparent }) {
    const [isActive, setActive] = useState(false);

    const inputElements = document.getElementsByTagName("input");
    //to toggle the show password icon
    const toggleeye = () => {
        const inputArray = Array.from(inputElements);
        setActive(!isActive);
        inputArray.forEach(element => {
            if (element.name === "password") {
                isActive === true ? element.type = "password" : element.type = "text";
            }
        });
    }
    //warnings
    const showPass = () => {
        const inputArray = Array.from(inputElements);
        const enterpass = document.getElementById("enterpass");
        inputArray.forEach(element => {
            if (element.name === "password") {
                if (element.value === "") {
                    enterpass.className = "text-red-700 mt-4"
                }
            }
        });

    }
    const showEmail = () => {
        const inputArray = Array.from(inputElements);
        const enteremail = document.getElementById("enteremail");
        inputArray.forEach(element => {
            if (element.type == "text") {
                if (element.value == "") {
                    enteremail.className = "text-red-700"
                }
            }
        });

    }
    //for authorization
    const Handlesubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await axios.post('https://e5ed-119-160-199-91.ngrok-free.app/api/loginAuth', {
                email: formData.get('email'),
                passwd: formData.get('password') // Fixed typo: 'passwd' should be 'password'
            });
            // console.log('Login successful:', response.data);
            localStorage.setItem('token', JSON.stringify(response.data)); // Store response data in localStorage
            const credentialsjson = localStorage.getItem('token');
            const credential = JSON.parse(credentialsjson);
            // console.log(credential);
            const validtoken = await axios.post('https://e5ed-119-160-199-91.ngrok-free.app/api/verifyUser', credential);
            console.log(validtoken.data.valid);
            sendtoparent(validtoken.data.valid);
        }
        catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
    //usereffect with [] empty array will works as componentdidmount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const credential = JSON.parse(token);
        if (token) {
            const verifyToken = async () => {
                try {
                    const isvalid = await axios.post('https://e5ed-119-160-199-91.ngrok-free.app/api/verifyUser', credential);
                    let verified = isvalid.data.valid;

                    if (verified) {
                        sendtoparent(verified);
                    }

                    return verified;
                } catch (error) {
                    console.error('Error occurred while verifying token:', error);
                    return false; // Assuming you want to return false in case of an error
                }
            }

            verifyToken();


        }
        else {
            Handlesubmit;
        }
    }, [])

    return (
        <div className="flex h-lvh sm:justify-center justify-center lg:justify-start items-center">
            <div className="mx-12 mb-[65px] flex items-center justify-center lg:max-w-lg">
                <div className="flex h-full flex-col">
                    <div className="shrink">
                        <div>
                            <a to="/" className="flex items-center">
                                <img
                                    width={120}
                                    src={logoDarkImg}
                                    alt="logo"
                                    className="flex relative left-2 aspect-square dark:flex"
                                />
                                <img
                                    width={120}
                                    src={logoLightImg}
                                    alt="logo"
                                    className=" h-48 dark:hidden hidden relative aspect-square"
                                />
                            </a>
                        </div>
                        <div className="py-6 pl-6">
                            <h1 className="mb-2 font-semibold text-[32px] text-gray-800">
                                Login
                            </h1>
                            <p className="max-w-md mb-2 w-64 sm:w-96 text-md text-gray-600 text-default-500">Enter your credentials to access Flashpackers.</p>
                        </div>
                    </div>
                    <form className="flex flex-col relative pl-6" onSubmit={Handlesubmit}>
                        <label className="mb-2 lg:text-md" htmlFor="email">Email</label>
                        <input className="py-3 px-4 border-2 lg:w-[382px] lg:h-12 border-gray-200 pl-3 sm:w-96 w-64 rounded-lg placeholder:text-lg placeholder-gray-500" onBlur={showEmail} name="email" type="text" placeholder="Enter your email" required />
                        <span id="enteremail" className="text-red-700 hidden">Please enter your Email</span>
                        <span id="invalidemail" className="text-red-700 hidden">Please enter valid Email</span>
                        <label className="mb-2 relative  lg:text-md top-4" htmlFor="password">Password</label>
                        <div className="relative top-4">
                            <input className=" py-3 pr-[74px] pl-4 border-2 lg:w-[382px] lg:h-12 border-gray-200 sm:w-96 w-64 rounded-lg" name="password" onBlur={showPass} type="password" required />
                            <span className="bg-gray-200 w-[1px] h-12 absolute top-[2px] right-[60px]"></span>

                            {isActive && <LuEyeOff onClick={toggleeye} size={20} className="text-default-600 absolute sm:right-[20px] right-[20px] bottom-[16px]" />}
                            {!isActive && <LuEye onClick={toggleeye} size={20} className="text-default-600 absolute sm:right-[20px] right-[20px] bottom-[16px]" />}

                        </div>
                        <span id="invalidpass" className="text-red-700 hidden">Invalid password</span>
                        <span id="enterpass" className="text-red-700 hidden">please enter the password</span>
                        <button
                            type="submit"
                            className="relative top-10 sm:w-96 lg:w-[382px] lg:h-12 w-64 shadow-lg shadow-gray-400 rounded-lg bg-green-500 px-6 py-3 text-lg flex items-center justify-center text-black transition-all hover:bg-green-400"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
AuthFormLayout1.propTypes = {
    sendtoparent: PropTypes.func.isRequired // Ensure sendtoparent is a function and required
};
export default AuthFormLayout1