import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import transitions from "bootstrap";

const Header = ({ active, setActive, user, handleLogout }) => {
    const userId = user?.uid;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-head">
            <div className="container-fluid padding-media">
                <div className="container padding-media">
                    <nav className="navbar navber-toggleable-md navbar-light">
                        <button
                            className="navbar-toggler mt-3"
                            type='button'
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            data-bs-parent="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="true"
                            aria-label="Toggle Navigation">
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >

                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link ${active === "Home" ? "active" : " "}`}
                                        onClick={() => setActive("Home")}
                                    >Home</li>
                                </Link>
                                {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                    <Link to="/createExplore/" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${active === "Explore" ? "active" : " "}`}
                                            onClick={() => setActive("Explore")}
                                        >Explore</li>
                                    </Link>
                                )}
                                {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                    <Link to="/createLeisure/" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${active === "Leisure" ? "active" : " "}`}
                                            onClick={() => setActive("Leisure")}
                                        >Leisure</li>
                                    </Link>
                                )}
                                {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                    <Link to="/store/" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${active === "Store" ? "active" : " "}`}
                                            onClick={() => setActive("Store")}
                                        >Store</li>
                                    </Link>
                                )}
                                {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                    <Link to="/news/" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${active === "News" ? "active" : " "}`}
                                            onClick={() => setActive("News")}
                                        >News</li>
                                    </Link>
                                )}
                                <Link to="/about" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link ${active === "About" ? "active" : " "}`}
                                        onClick={() => setActive("About")}
                                    >About</li>
                                </Link>

                            </ul>
                            <div className="row g-3">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {userId ? (
                                        <>
                                            <div className="profile-logo">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                    alt="logo"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        marginTop: "12px"
                                                    }}
                                                />
                                            </div>
                                            <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                                                {user?.displayName}
                                            </p>
                                            <li className="nav-item nav-link" onClick={handleLogout}>
                                                Logout
                                            </li>
                                        </>
                                    ) : (
                                        <Link to="/auth" style={{ textDecoration: "none" }}>
                                            <li className={`nav-item nav-link ${active === "Login" ? "active" : " "}`}
                                                onClick={() => setActive("Login")}
                                            >Login</li>
                                        </Link>
                                    )}

                                </ul>
                            </div>

                        </div>

                    </nav>

                </div>

            </div>
        </nav>
    )
}

export default Header