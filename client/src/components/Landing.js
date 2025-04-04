import {faUnlock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AttackBlock from "./Items/AttackBlock";
import Digest from "./Digest";

export default function Home() {

    function handleKnowMore() {
        const element = document.getElementById('home--2')
        if (element) element.scrollIntoView({behavior: "smooth"})
    }

    return (
        <div className="bg-black text-cyan-400 min-h-screen font-mono">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-around mt-8 sm:mt-16 px-6 sm:px-20">
            {/* IMAGE FOR MOBILE */}
            <div className="sm:hidden flex justify-center">
                <div className="relative w-[90%]">
                <img
    alt="Encrypted Data"
    className="w-[400px] h-[400px] rounded-2xl border border-cyan-500 shadow-lg shadow-cyan-600/50 hover:scale-95 transition duration-300 ease-in-out"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvVBJ1xoHB1wp_LCac_5f6Y-joS_rm37uGUQ&s"
/>

                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-700/30 rounded-2xl mix-blend-screen"></div>
                </div>
            </div>
    
            {/* INFO SECTION */}
            <div className="ml-8 mt-8 text-cyan-400">
                <p className="text-4xl sm:text-5xl font-bold mb-2 glitch">ACCESS</p>
                <p className="text-4xl sm:text-5xl font-bold mb-2 glitch">GRAPHICAL</p>
                <p className="text-4xl sm:text-5xl font-bold mb-4 glitch">AUTH</p>
                <p className="text-lg sm:text-xl mt-2 text-gray-400">
                    Cybersecurity Protocol: Secure Entry
                </p>
                <p className="text-lg sm:text-xl mt-1">Enhanced Security & User Interface</p>
                <button
                    onClick={handleKnowMore}
                    className="transition duration-300 ease-in-out sm:w-1/3 bg-cyan-600 text-black rounded-md px-6 py-3 mt-8 sm:text-lg border border-cyan-600 hover:bg-transparent hover:text-cyan-600 hover:shadow-lg hover:shadow-cyan-600/50 flex items-center justify-center"
                >
                    <FontAwesomeIcon className="mr-3" icon={faUnlock} />
                    Decrypt
                </button>
            </div>
    
            {/* IMAGE FOR DESKTOP */}
            <div className="hidden sm:block relative">
                <div className="relative">
                <img
    alt="Encrypted Data"
    className="w-[750px] h-[500px] rounded-2xl border border-cyan-500 shadow-lg shadow-cyan-600/50"
    src="https://www.shutterstock.com/shutterstock/videos/33710788/thumb/5.jpg?ip=x480"
/>

                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-700/30 rounded-2xl mix-blend-screen"></div>
                </div>
            </div>
        </div>
    
        {/* ATTACK RESISTANCE SECTION */}
        <div id="home--2" className="sm:mt-32 px-6 sm:px-20">
            <div className="pt-20">
                <p className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400 glitch">
                    DEFENSE PROTOCOLS
                </p>
                <p className="text-lg sm:text-xl mt-3 text-gray-400">
                    System Hardening: Countermeasures Activated.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                    <AttackBlock
                        icon="https://img.icons8.com/ios-filled/100/22D1EE/re-enter-pincode.png"
                        title="BRUTEFORCE"
                        desc="Lockdown and Intrusion Alerts Engaged."
                    />
                    <AttackBlock
                        icon="https://img.icons8.com/ios-filled/100/22D1EE/show-password.png"
                        title="SHOULDER SURF"
                        desc="Visual Obfuscation: Data Shield Active."
                    />
                    <AttackBlock
                        icon="https://img.icons8.com/ios-filled/100/22D1EE/spyware-free.png"
                        title="SPYWARE"
                        desc="Keylogging Prevention: Secure Input Enabled."
                    />
                    <AttackBlock
                        icon="https://img.icons8.com/ios-filled/100/22D1EE/enter-pin.png"
                        title="PHISHING"
                        desc="Decoy Protocols: Fake Login Detection."
                    />
                </div>
            </div>
        </div>
    
        <Digest />
    </div>
    )
}