import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"

const Navbar = () => { 
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container w-100">
        <Link to="/populars" className="navbar-brand">
          Movies Web App
        </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {/* Checking the current path name using javascript ternary operator and if true adding active classname to it */}
              <li className={splitLocation[1] === "upcoming" ? "active" : ""}>
                <Link to="/upcoming" className="nav-item"> 
                  <span className="nav-link" href="!#">
                    upcoming
                  </span>
                </Link>
              </li>
              <li className={splitLocation[1] === "toprated" ? "active" : ""}>
                <Link to="/toprated" className="nav-item">
                  <span className="nav-link" href="!#">
                    top rated
                  </span>
                </Link>
              </li>
              <li className={(splitLocation[1] === "populars" || splitLocation[1] === "") ? "active" : ""}>
                <Link to="/populars" className="nav-item">
                  <span className="nav-link" href="!#">
                    populars
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     </div>
  );
}

export default Navbar;
