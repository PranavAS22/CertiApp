// ui/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {


  return (
    <>
    <div className="flex justify-between my-8 mx-4">
        <div>
          <h1 className="text-4xl">CertiApp</h1>
        </div>
        <div className="flex mt-4">
          <Link className="py-4 px-3 mr-4 bg-blue-600 text-white rounded" to="/home">
            Home
          </Link>
          <Link className="py-4 px-3 bg-blue-600 text-white rounded" to="/issue">
            Issue Certificate
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;