import { useState } from "react";
import emailjs from "emailjs-com";
import { successToast, Toast } from "../util/toast";

export default function Contact(props) {
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleChange(event) {
        setData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateData()) return;
        props.setLoading(true);

        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
        };

        emailjs
            .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_USER_ID")
            .then(() => {
                props.setLoading(false);
                successToast("Message Sent");
                clearData();
            })
            .catch((err) => {
                props.setLoading(false);
                Toast("Failed to send message");
            });
    }

    function clearData() {
        setData({
            name: "",
            email: "",
            message: "",
        });
    }

    function validateData() {
        if (data.name.length < 3) {
            Toast("Invalid Name");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            Toast("Invalid Email");
            return false;
        }
        if (data.message.length < 3) {
            Toast("Enter a valid message");
            return false;
        }
        return true;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black font-mono text-cyan-400">
            <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-2xl border border-cyan-600">
                <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
                    &#62; Initiate Connection
                </h2>
                <p className="text-sm text-gray-400 text-center mb-8">
                    &#47;&#47; Enter your credentials below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-cyan-400">
                            &#62; Name:
                        </label>
                        <input
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                            type="text"
                            className="mt-1 block w-full p-2 bg-gray-800 border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="&#47;&#47; Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-cyan-400">
                            &#62; Email:
                        </label>
                        <input
                            onChange={handleChange}
                            name="email"
                            value={data.email}
                            type="email"
                            className="mt-1 block w-full p-2 bg-gray-800 border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="&#47;&#47; Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-cyan-400">
                            &#62; Message:
                        </label>
                        <textarea
                            onChange={handleChange}
                            name="message"
                            value={data.message}
                            rows="4"
                            className="mt-1 block w-full p-2 bg-gray-800 border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="&#47;&#47; Enter your message"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-cyan-700 text-black font-bold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                            &#62; SEND
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}