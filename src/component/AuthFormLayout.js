import logoDarkImg from "../assets/images/logoDarkImg.png"
import logoLightImg from "../assets/images/logoLightImg.jpg"
import show from '../assets/images/show.png';
import hide from '../assets/images/hide.png';
import { useState } from 'react';
function AuthFormLayout1() {
    const [isActive, setActive] = useState(false);
    const toggleeye = (event) => {
        setActive(!isActive);
        const inputElements = document.getElementsByTagName("input");
        const inputArray = Array.from(inputElements);
        inputArray.forEach(element => {
            if (element.name === "password") {
                isActive === true ? element.type = "password" : element.type = "text";
            }
        });
    }



    return (
        <div className="relative top-16 mx-10 flex items-center justify-center lg:max-w-lg">
            <div className="flex h-full flex-col">
                <div className="shrink">
                    <div>
                        <a to="/" className="flex items-center">
                            <img
                                width={156}
                                src={logoDarkImg}
                                alt="logo"
                                className="flex relative aspect-square right-6 dark:flex"
                            />
                            <img
                                width={150}
                                src={logoLightImg}
                                alt="logo"
                                className="hidden h-48 dark:hidden"
                            />
                        </a>
                    </div>
                    <div className="py-6">
                        <h1 className="mb-2 font-bold text-3xl text-default-800">
                            Login
                        </h1>
                        <p className="max-w-md text-sm text-gray-600 text-default-500">Enter your credentials to access Flashpackers.</p>
                    </div>
                </div>
                <form className="flex flex-col relative ">
                    <label className="my-3" htmlFor="email">Email</label>
                    <input className="p-2 w-96 rounded-lg" name="email" type="text" placeholder="Enter your email" />
                    <label className="my-3" htmlFor="password">Password</label>
                    <input className="p-2 w-96 rounded-lg" name="password" type="password" />
                    {!isActive && <img onClick={toggleeye} className="relative  left-[340px] bottom-8" src={show} alt="" height={"25px"} width={"25px"} ></img>}
                    {isActive && <img onClick={toggleeye} className="relative left-[340px] bottom-8" src={hide} alt="" height={"25px"} width={"25px"} ></img>}
                    <button
                        type="submit"
                        className="mt-5 shadow-lg shadow-gray-400 rounded-lg bg-green-500 px-6 py-3 text-base capitalize text-black transition-all hover:bg-green-400"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthFormLayout1