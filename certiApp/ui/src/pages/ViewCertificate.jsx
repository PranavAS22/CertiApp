import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Component/Nav";
import certiImg from "../images/medal.jpg"; 

const ViewCertificate = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`http://localhost:6500/api/view/${certificateId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || "Failed to fetch certificate");
        }

        setCertificate(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center m-16 p-16 border-solid border-black border-2">
        {error ? (
          <h2 className="text-red-500">{error}</h2>
        ) : certificate ? (
          <div className="text-center m-16 p-16 border-solid border-black border-2">
            <img className="h-60 mx-auto mb-6" src={certiImg} alt="Course Image" />
            <h2 className="mb-1 text-xl">
              This is to Verify that <b>{certificate.candidateName}</b>
            </h2>
            <h2 className="mb-1 text-xl">
              Has Successfully Completed <b>{certificate.course}</b>
            </h2>
            <h2 className="mb-1 text-xl">
              with <b>{certificate.grade}</b> on <b>{new Date(certificate.issueDate).toLocaleDateString()}</b>
            </h2>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
};

export default ViewCertificate;
