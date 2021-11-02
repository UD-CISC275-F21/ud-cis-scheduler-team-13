import React from "react";
import Logo from "../img/logo-udel.png";
import { Link } from "react-router-dom";

export function Header(): JSX.Element {
    return(
        <div className="header">
            <div className="udHeader">
                <div className="udHeaderContainer">
                    <div className="udHeaderWrapper">
                        <a href="https://www.udel.edu/" className="udHeaderLogo">
                            <img src={Logo} alt="University of Delaware" className="img-responsive"/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="udHeader-collegeOuterWrapper">
                <div className="udHeader-collegeBar">
                    <div className="udHeader-collegeWrapper">
                        <div className="udHeader-collegeName">
                            <Link to="/">UD CIS Scheduler</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}