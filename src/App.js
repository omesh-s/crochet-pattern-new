import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { ReactTyped } from "react-typed";
import axios from "axios";

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [conversionOption, setConversionOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [convertedFile, setConvertedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleOptionChange = (e) => {
        setConversionOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile || !conversionOption) {
            alert("Please upload a file and select a conversion option.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("conversionOption", conversionOption);

        try {
            setLoading(true);
            setConvertedFile(null);

            const response = await axios.post("http://localhost:5000/convert", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setConvertedFile(response.data.fileUrl);
        } catch (error) {
            console.error("Error processing the file:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container mx-auto p-6">
                {/* Typing Effect Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Convert Patterns with Ease
                    </h1>
                    <p className="text-xl font-medium text-gray-700">
                        Convert from{" "}
                        <ReactTyped
                            strings={["UK to US formats!", "US to UK formats!"]}
                            typeSpeed={40}
                            backSpeed={50}
                            loop
                            className="text-blue-600 font-semibold"
                        />
                    </p>
                </div>

                {/* Upload and Conversion Options */}
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
                    {/* File Upload */}
                    <div className="w-full">
                        <label className="block text-gray-700 mb-2">Upload PDF File:</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>

                    {/* Conversion Options */}
                    <div className="w-full">
                        <label className="block text-gray-700 mb-2">Choose Conversion Option:</label>
                        <select
                            value={conversionOption}
                            onChange={handleOptionChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="" disabled>
                                -- Select an option --
                            </option>
                            <option value="us">Convert to US Format</option>
                            <option value="uk">Convert to UK Format</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Convert Pattern"}
                    </button>
                </form>

                {/* Converted File Download */}
                {convertedFile && (
                    <div className="text-center mt-6">
                        <a
                            href={convertedFile}
                            download
                            className="text-blue-500 underline"
                        >
                            Download Converted File
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
