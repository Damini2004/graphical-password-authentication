import {useState} from "react";
import validator from "validator/es";
import {successToast, Toast} from "../util/toast";
import axios from "axios";
import {api} from "../static/config";

export default function Digest() {

    const[email, setEMail] = useState("")

    function handleChange(event) {
        setEMail(event.target.value)
    }

    function handleSubmit() {
        if (validator.isEmail(email)) {
            axios.post(`${api.url}/api/digest`, {email: email})
                .then(() => {
                    successToast("Thank You For Subscribing!")
                    clearData()
                })
                .catch(err => {
                    Toast(err.response.data.message)
                    clearData()
                })
        }
        else Toast("Invalid Email")

    }

    function clearData() {
        setEMail("")
    }

    return (
        <div className="flex sm:flex-row flex-col justify-center bg-black border border-cyan-600 shadow-lg shadow-cyan-600/50 rounded-lg mt-12 sm:mt-24 w-[90%] sm:w-3/4 mx-auto relative overflow-hidden">
        {/* Background Overlay for Hacking Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-700/20 mix-blend-screen animate-pulse"></div>
    
        <div className="flex justify-center transition duration-300 ease-in-out hover:scale-95 px-4 sm:w-2/5 sm:ml-12 my-4 sm:my-16 relative z-10">
            <img
                alt="Digital Circuit Board"
                src="https://i.ytimg.com/vi/yI31KlEwXJQ/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-HYAC8BCKAgwIABABGCsgZShfMA8=&rs=AOn4CLCyL7lZoKPkr0nLmlqiZ5u6XFB3nw"
                className="rounded-lg brightness-110 contrast-125" // Add rounded corners and filter
            />
        </div>
    
        <div className="px-4 sm:px-0 font-mono text-cyan-400 max-w-lg mx-auto sm:mt-16 relative z-10">
            <p className="text-3xl sm:text-5xl font-bold uppercase glitch">
                Newsletter Section
            </p>
            <p className="text-lg sm:text-xl mt-4 text-gray-400">
                Gain Access to Real-Time Vulnerability Data.
            </p>
            <div className="flex sm:mt-4 mb-8 justify-center sm:justify-start">
                <input
                    value={email}
                    onChange={handleChange}
                    className="bg-gray-800 text-cyan-400 w-1/2 mt-6 rounded-md px-4 py-2 border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    placeholder="Target Node"
                />
                <button
                    onClick={handleSubmit}
                    className="transition duration-300 ease-out w-1/3 bg-cyan-600 text-black rounded-md px-4 py-2 mt-6 text-sm sm:text-lg border border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:shadow-lg hover:shadow-cyan-600/50 -ml-4"
                >
                    Execute
                </button>
            </div>
        </div>
    </div>
    )
}