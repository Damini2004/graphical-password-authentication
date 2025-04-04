import {Page} from "../util/config";
import {useState} from "react";
import validator from "validator/es";
import {successToast, Toast} from "../util/toast";
import axios from "axios";
import {api} from "../static/config";

export default function Footer(props) {

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
        <div className="bg-black text-cyan-400 font-mono">
        <div className="mt-24 flex justify-around flex-col sm:flex-row px-4 sm:px-0">
            <div className="mt-6">
                <div className="flex items-center">
                    <img
                        className="w-6 h-6 animate-pulse" // Added pulse animation
                        src="https://img.icons8.com/material-rounded/48/22D1EE/cyber-security.png"
                        alt="Cyber Security Icon"
                    />
                    <p className="sm:text-lg ml-2 font-bold uppercase text-cyan-300 glitch">
                        GraphicGate
                    </p>
                </div>
                <p className="text-gray-500 mt-2 sm:mt-4 text-xs tracking-wider">
                    System Security Protocol v3.7
                </p>
            </div>
    
    
            
        </div>
        <hr className="border-t border-gray-700 my-8 mx-auto w-3/4" />
        <p className="text-gray-600 text-center pb-4 text-xs tracking-wider">
            github.com/damini2004
        </p>
    </div>
    )
}
