import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Component/Nav";
import certi from "../images/certi.jpg"

const Home = () => {
    const [certificateId, setCertificateId] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (certificateId) {
            navigate(`/viewCertificate/${certificateId}`);
        }
    };

    return (
        <>
        <Nav />
        <div className="my-24 flex flex-col items-center justify-center">
            
            <img className="h-60 mb-6" src={certi} alt="Certi Image" />

            
            <div className="flex space-x-4">
                <input
                    className="ring p-2"
                    type="text"
                    placeholder="Enter Certificate Id"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                />
                <button
                    className="p-2 rounded bg-teal-500 text-white"
                    onClick={handleSearch}
                >
                    SEARCH
                </button>
            </div>
        </div>
        </>
    );
};

export default Home;
