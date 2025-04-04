import {useState} from "react";
import { checkUsername} from "../util/validation";
import {successToast, Toast} from "../util/toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import PasswordIcon from "./Items/PasswordIcon";
import axios from "axios";
import {Page} from "../util/config";
import {api} from "../static/config";
import {getNameByNumber} from "../util/util";
import {nanoid} from "nanoid";
import BlockedBox from "./Items/BlockedBox";

export default function Login(props) {

    const [next, setNext] = useState(false)
    const [blocked, setBlocked] = useState(false)
    const [iteration, setIteration] = useState(0)
    const [imageData, setImageData] = useState([])
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        pattern: ["", "", "", ""]
    })

    function handleChange(event) {
        setLoginInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    function validateData() {
        if (loginInfo.username.length < 1) {
            Toast("Invalid Username!")
            return false
        }
        else if (loginInfo.password.length < 8) {
            Toast("Password Length Must Be Greater Than 8")
            return false
        }
        return true
    }

    async function validateUsernameAndEmail() {
        const isUsernameExists = await checkUsername(loginInfo.username, props.setLoading)
        if (!isUsernameExists) Toast("Username does not exists!")
        return isUsernameExists
    }

    async function handleNextClick(event) {
        if (validateData() && await validateUsernameAndEmail()) {
            axios.get(`${api.url}/api/image?username=${loginInfo.username}`)
                .then(res => {
                    setImageData(res.data)
                    setNext(true)
                })
                .catch(err => Toast("Internal server error"))
        }
    }

    function getIcons() {
        return imageData[iteration].map(prev => <PasswordIcon iteration={iteration} id={prev.id} key={nanoid()} src={prev.url} selected={prev.id === loginInfo.pattern[iteration]} onClick={handleImageClick}/>)
    }

    function handleImageClick(id, iteration) {
        var newPattern = loginInfo.pattern
        newPattern[iteration] = id
        setLoginInfo(prev => {
            return {
                ...prev,
                "pattern": newPattern
            }
        })
    }

    function login() {

        if (loginInfo.pattern[iteration] === "") {
            Toast("Select an image first!")
            return
        }

        if (iteration < 3) {
            setIteration(iteration+1)
            return
        }

        if (loginInfo.pattern.length < 4) {
            Toast("Chose minimum 4 images!")
            return
        }
        props.setLoading(true)
        axios.post(`${api.url}/api/user/login`, loginInfo)
            .then(res => {
                props.setLoading(false)
                console.log(res.data)
                props.setUserInfo({email: res.data.email, username: res.data.username})
                props.setLoggedIn(true)
                successToast("Logged In!")
                props.setPage(Page.HOME_PAGE)
            })
            .catch(err => {
                props.setLoading(false)
                setIteration(0)
                setLoginInfo(prev => {
                    return {
                        ...prev,
                        "pattern": ["", "", "", ""]
                    }
                })
                setNext(false)
                if (typeof err.response.data.status != 'undefined' && err.response.data.status === 'blocked') {
                    setBlocked(true)
                }
                else Toast(err.response.data.message)
            })
    }

    function getButtonTitle() {
        if (iteration < 3) return "Next"
        else return "Login"
    }

    function handleBackClick() {
        if (iteration === 0) setNext(false)
        else setIteration(iteration-1)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-mono flex items-center justify-center">
            <div className="sm:h-[38rem] sm:mt-12 w-full max-w-4xl p-4">

                {blocked && <BlockedBox onClick={setBlocked} />}

                {!next && (
                    <div className="flex flex-col sm:flex-row justify-center h-full">
                       
                        {/* LOGIN FORM */}
                        <div className="font-mono mt-8 sm:mt-16 sm:w-1/2 p-4">
                            <p className="text-3xl sm:text-5xl font-bold mb-4 text-center">Login</p>
                            <p className="text-lg sm:text-2xl mb-6 text-gray-400">Welcome Back! Enter Your Details Below</p>
                            <div className="flex flex-col space-y-4">
                                <input value={loginInfo.username} onChange={handleChange} name="username" className="rounded-full h-12 px-6 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Username" />
                                <input value={loginInfo.password} onChange={handleChange} name="password" className="rounded-full h-12 px-6 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Password" />
                            </div>
                            <button onClick={handleNextClick} className="mt-6 w-full sm:w-2/3 h-12 bg-blue-600 rounded-full px-6 text-white font-bold hover:bg-blue-700 transition-colors">Next</button>
                        </div>
                    </div>
                )}

                {next && (
                    <div className="flex flex-col sm:flex-row justify-center h-full">
                        <div className="sm:grid grid-cols-4 bg-gray-800 rounded-lg sm:w-3/4 sm:h-full justify-items-center py-4 px-2 gap-4">
                            {getIcons()}
                        </div>

                        <div className="mt-8 sm:mt-4 sm:ml-8 flex flex-col items-start space-y-4 p-4">
                            <p className="text-3xl sm:text-5xl font-bold">Set Graphical Password</p>
                            <p className="text-lg sm:text-2xl text-gray-400">Select Images For Your Graphical Password.</p>
                            <p className="text-lg sm:text-2xl">Select <span className="text-green-400">{getNameByNumber(iteration + 1)}</span> Image.</p>
                            <div className="flex space-x-4">
                                <button onClick={login} className="h-12 bg-blue-600 rounded-full px-6 text-white font-bold hover:bg-blue-700 transition-colors">{getButtonTitle()}</button>
                                <button onClick={handleBackClick} className="h-12 border border-blue-600 rounded-full px-4 hover:bg-blue-600 transition-colors">
                                    <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}