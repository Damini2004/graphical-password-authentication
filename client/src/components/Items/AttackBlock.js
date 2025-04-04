export default function AttackBlock(props) {
    return (
        <div className="transition duration-300 ease-in-out bg-black border border-cyan-600 shadow-lg shadow-cyan-600/50 hover:scale-95 rounded-lg p-6 sm:p-8 mb-8 relative overflow-hidden">
            {/* Background Overlay for Hacking Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-700/20 mix-blend-screen animate-pulse"></div>

            <div className="relative z-10"> {/* Ensure content is above the overlay */}
                <div className="flex items-center mb-4">
                    <img className="w-1/6 mr-4" alt="" src={`${props.icon}`} />
                    <p className="text-cyan-400 text-2xl sm:text-3xl font-semibold uppercase">{props.title}</p>
                </div>
                <div className="text-gray-400 sm:text-lg">
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    );
}