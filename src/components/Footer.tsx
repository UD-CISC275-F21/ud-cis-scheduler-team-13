import React from "react";
import Seal from "../img/ud-monogram.png";
import Twitter from "../img/twitter.png";
import Facebook from "../img/facebook.png";
import Instagram from "../img/instagram.png";
import Youtube from "../img/youtube.png";
import Pinterest from "../img/pininterest.png";
import Linkedin from "../img/linkedin.png";

export function Footer(): JSX.Element {
    return(
        //Imported fixed-bottom from react-bootstrap
        //https://stackoverflow.com/questions/40515142/how-to-make-a-sticky-footer-in-react
        <div className="sticky-bottom">
            <div className="udFooter">
                <div className="udFooter-container">
                    <div className="udFooterHeader">
                        <a href="https://www.udel.edu/">
                            <img src={Seal} alt="udFooterLogo" className="udFooterLogo"/>
                        </a>
                        <ul className="udFooterSocial-icons">
                            <li>
                                <a href="https://twitter.com/UDelaware" title="Twitter" target="_blank" rel="noreferrer">
                                    <img title="Twitter" src={Twitter} alt="Twitter" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/udelaware" title="Facebook" target="_blank" rel="noreferrer">
                                    <img title="Facebook" src={Facebook} alt="Facebook" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/udelaware/" title="Instagram" target="_blank" rel="noreferrer">
                                    <img title="Instagram" src={Instagram} alt="Instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/user/UnivDelaware" title="YouTube" target="_blank" rel="noreferrer">
                                    <img title="YouTube" src={Youtube} alt="YouTube" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.pinterest.com/udelaware/" title="Pinterest" target="_blank" rel="noreferrer">
                                    <img title="Pinterest" src={Pinterest} alt="Pinterest" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/school/university-of-delaware/" title="Linkedin" target="_blank" rel="noreferrer">
                                    <img title="Linkedin" src={Linkedin} alt="Linkedin" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="FooterLinks">
                <div className="container-fluid">
                    <div> 2018 University of Delaware</div>
                    <div className="link-item">
                        <a href="https://www.udel.edu/home/comments/">Comments</a>
                    </div>
                    <div className="link-item">
                        <a href="https://www.udel.edu/home/legal-notices/">Legal Notices</a>
                    </div>
                    <div className="link-item">
                        <a href="https://www.udel.edu/home/legal-notices/accessibility/">Accessibility Notice</a>
                    </div>
                </div>
            </div>
        </div>
    );
}