import {useEffect, useState} from "react";
import PasswordIcon from "./Items/PasswordIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons'
import validator from "validator/es";
import axios from "axios";
import {successToast, Toast} from "../util/toast";
import {checkEmail, checkUsername} from "../util/validation";
import {Page} from "../util/config";
import {api} from "../static/config";
import {getNameByNumber} from "../util/util";
import {nanoid} from "nanoid";

export default function Signup(props) {

    const [next, setNext] = useState(false)
    const [iteration, setIteration] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [imageData, setImageData] = useState([])
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        email: "",
        password: "",
        pattern: ["", "", "", ""],
        sets: [[]]
    })

    function handleChange(event) {
        setSignupInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect(function() {
        setSignupInfo(prev => {
            return {
                ...prev,
                "sets": imageData,
                "pattern": ["", "", "", ""]
            }
        })
    }, [imageData])

    function getIcons() {
        return imageData[iteration].map(prev => <PasswordIcon iteration={iteration} id={prev.id} key={nanoid()} src={prev.url} selected={prev.id === signupInfo.pattern[iteration]} onClick={handleImageClick}/>)
    }

    function handleImageClick(id, iteration) {
        var newPattern = signupInfo.pattern
        newPattern[iteration] = id
        setSignupInfo(prev => {
            return {
                ...prev,
                "pattern": newPattern
            }
        })
    }

    function createAccount() {
        if (signupInfo.pattern[iteration] === "") {
            Toast("Select an image first!")
            return
        }

        if (iteration < 3) {
            setIteration(iteration+1)
            return
        }

        if (signupInfo.pattern.length < 4) {
            Toast("Chose all 4 images!")
            return
        }
        props.setLoading(true)
        axios.post(`${api.url}/api/user/signup`, signupInfo)
            .then(res => {
                    props.setLoading(false)
                    console.log(res.data)
                    props.setUserInfo({email: res.data.email, username: res.data.username})
                    props.setLoggedIn(true)
                    successToast("Logged In!")
                    props.setPage(Page.HOME_PAGE)
                }
            )
            .catch(err => {
                console.log(err)
                props.setLoading(false)
                Toast(err.response.data.message)
            })
    }

    function validateData() {
        if (signupInfo.username.length < 1) {
            Toast("Invalid username!")
            return false
        }
        else if (!validator.isEmail(signupInfo.email)) {
            Toast("Invalid email address!")
            return false
        }
        else if (signupInfo.password.length < 8) {
            Toast("Password length should be more than 8")
            return false
        }
        return true
    }

    async function validateUsernameAndEmail() {
        const isEmailExist = await checkEmail(signupInfo.email, props.setLoading)
        const isUsernameExists = await checkUsername(signupInfo.username, props.setLoading)

        if (isUsernameExists) Toast("Username already exists!")
        else if (isEmailExist) Toast("Email already exists!")

        return !isEmailExist && !isUsernameExists
    }

    async function handleNextClick(event) {
        if (validateData() && await validateUsernameAndEmail()) {setNext(true)}
    }

    function searchKeyword() {
        if (keyword === "") {
            Toast("Invalid keyword!")
            return
        }

        props.setLoading(true)
        axios.get(`${api.url}/api/image/search?keyword=${keyword}`)
            .then(data => {
                props.setLoading(false)
                setImageData(data.data)
            })
            .catch(err => {
                console.log(err)
                props.setLoading(false)
                Toast(err.response.data.message)
            })
    }

    function getButtonTitle() {
        if (iteration < 3) return "Next"
        else return "Create Account"
    }

    function handleBackClick() {
        if (iteration === 0) setNext(false)
        else setIteration(iteration-1)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-['Work_Sans'] flex items-center justify-center">
        <div className="sm:h-[38rem] mt-12 w-full max-w-4xl p-4">

            {!next && (
                <div className="flex flex-col sm:flex-row justify-center h-full">
                    <div className="mt-4 p-4 sm:w-1/2">
                        <p className="text-3xl sm:text-5xl font-extrabold mb-4">Create Account</p>
                        <p className="text-lg sm:text-2xl mb-2 text-gray-300">Welcome! Enter Your Details And Experience</p>
                        <p className="text-lg sm:text-2xl mb-6 text-gray-300">Graphical Password System.</p>

                        <div className="flex flex-col gap-4">
                            <input
                                value={signupInfo.username}
                                onChange={handleChange}
                                name="username"
                                className="rounded-full h-12 px-6 text-xl shadow-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                type="text"
                                placeholder="Username"
                            />
                            <input
                                value={signupInfo.email}
                                onChange={handleChange}
                                name="email"
                                className="rounded-full h-12 px-6 text-xl shadow-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                type="email"
                                placeholder="Email"
                            />
                            <input
                                value={signupInfo.password}
                                onChange={handleChange}
                                name="password"
                                className="rounded-full h-12 px-6 text-xl shadow-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        <button
                            onClick={handleNextClick}
                            className="mt-6 w-full sm:w-2/3 h-12 bg-cyan-600 rounded-full px-6 text-white border-2 hover:bg-transparent hover:text-cyan-600 border-cyan-600 font-bold shadow-lg transition-colors duration-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {next && (
                <div className="flex flex-col sm:flex-row h-full">
                    {imageData.length > 0 && (
                        <div className="sm:grid grid-cols-4 bg-gray-800 rounded-2xl sm:w-3/4 justify-items-center py-4 px-2 gap-4 shadow-lg">
                            {getIcons()}
                        </div>
                    )}

                    {imageData.length === 0 && (
                        <div className="text-2xl text-white flex justify-center items-center h-full bg-gray-800 sm:w-3/4 ml-0 sm:ml-12 rounded-2xl shadow-lg">
                            <p className="bg-red-600 px-3 py-1 rounded-lg">No Images :(</p>
                        </div>
                    )}

                    <div className="mt-4 p-4 sm:ml-8">
                        <p className="text-3xl sm:text-5xl font-extrabold mb-4">Set Graphical Password</p>
                        <p className="text-lg sm:text-2xl text-gray-300">Enter keyword to get images.</p>
                        <p className="text-lg sm:text-2xl mb-4">Select <span className="text-green-400">{getNameByNumber(iteration + 1)}</span> Image.</p>

                        {iteration === 0 && (
                            <div className="mb-4">
                                <p className="text-lg sm:text-2xl">Type Keyword: </p>
                                <div className="mt-2 flex shadow-md rounded-lg">
                                    <input
                                        onChange={(event) => setKeyword(event.target.value)}
                                        value={keyword}
                                        placeholder="Try 'Cats'"
                                        className="rounded-l-md px-4 py-2 text-black bg-gray-100 text-xl focus:outline-none"
                                    />
                                    <button
                                        onClick={searchKeyword}
                                        className="bg-gray-100 rounded-r-md px-4 h-12 hover:bg-gray-300 transition-colors duration-300"
                                    >
                                        <FontAwesomeIcon className="text-black" icon={faSearch} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={createAccount}
                            className="mt-8 w-full sm:w-2/3 h-12 bg-cyan-600 rounded-full px-6 text-white border-2 hover:bg-transparent hover:text-cyan-600 border-cyan-600 font-bold shadow-lg transition-colors duration-300"
                        >
                            {getButtonTitle()}
                        </button>
                        <button
                            onClick={handleBackClick}
                            className="mt-4 h-12 border-2 border-cyan-600 rounded-full px-4 hover:bg-cyan-600 transition-colors duration-300"
                        >
                            <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}


// useEffect(function() {
//     const newPattern = signupInfo.pattern;
//     for(let i=0; i<iconsData.length; i++) {
//         const icon = iconsData[i];
//         if (icon.selected && (!newPattern.includes(icon.id))) {
//             newPattern.push(icon.id)
//         }
//         else if (newPattern.includes(icon.id) && !icon.selected){
//             removeElementFromArray(icon.id, newPattern)
//         }
//     }
//     setSignupInfo(prev => {
//         return {
//             ...prev,
//             "pattern": newPattern
//         }
//     })
// }, [iconsData])