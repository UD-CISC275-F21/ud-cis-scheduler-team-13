import React from "react";
import Logo from "../img/logo-udel.png";

export function Header(): JSX.Element {
    return(
        <div>
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
                            <a href="#"> UD CIS Scheduler</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}