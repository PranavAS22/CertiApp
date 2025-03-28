import { useState } from "react";
import NavBar from "../Component/Nav";

const AddCertificate = () => {
  const [course, setCourse] = useState("Certified Blockchain Associate");
  const [certificateId, setCertificateId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [grade, setGrade] = useState("S");
  const [issueDate, setIssueDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const certificateData = { course, certificateId, candidateName, grade, issueDate };

    try {
      const response = await fetch("http://localhost:6500/api/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to issue certificate");
      }

      setSuccess("Certificate issued successfully!");
      setError("");
      setCertificateId("");
      setCandidateName("");
      setIssueDate("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center bg-slate-200 m-16 p-16 shadow-xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-4xl mb-8 text-blue-600">Issue Certificate</h2>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <h2 className="text-xl mb-4">Select Course*</h2>
          <select className="p-2 bg-white mb-4 w-96" value={course} onChange={(e) => setCourse(e.target.value)} required>
            <option>Certified Blockchain Associate</option>
            <option>Certified Frontend Developer</option>
            <option>Certified React.js Developer</option>
            <option>Certified Express.js Develpoer</option>
          </select>

          <h2 className="text-xl mb-4">Certificate Id*</h2>
          <input className="p-2 bg-white mb-4 w-96" type="text" value={certificateId} onChange={(e) => setCertificateId(e.target.value)} required />

          <h2 className="text-xl mb-4">Candidate Name*</h2>
          <input className="p-2 bg-white mb-4 w-96" type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required />

          <h2 className="text-xl mb-4">Select Grade*</h2>
          <select className="p-2 bg-white mb-4 w-96" value={grade} onChange={(e) => setGrade(e.target.value)} required>
            <option>S</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <h2 className="text-xl mb-4">Select Date*</h2>
          <input type="date" className="p-2 bg-white mb-4 w-96" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required />

          <div className="w-96">
          <button className="p-4 mt-4 bg-blue-600 text-white rounded w-full">
            Issue Certificate
          </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificate;
