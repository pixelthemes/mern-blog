import React, { useEffect } from "react";
import { Link,} from "react-router-dom";
import logo from "../../assets/images/logo-regular-free-img (1).png";
import UserStore from "../../store/UserStore.js";
import UserSubmitButton from "../layout/UserSubmitButton.jsx";


const AppNav = () => {
  const { isLogin, UserLogoutRequest } = UserStore();

  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    (async () => {
      if (isLogin()) {
      }
    })();
  }, []);

  return (
    <nav className="navbar hamburgerNav navbar-expand-lg navbar-light m-0 py-3">
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">
          <img className="img-fluid" src={logo} alt="logo" width="210px"/>
        </Link>
        <button className="navbar-toggler border-0 bg-white" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse row" id='navbarSupportedContent'>
          <ul className="position-relative navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
            <span className="navLinkContainer nav-item me-4 sty bodySmal nav">
              <Link className="navLink ms-2 btn nav" to="/">
                Home
              </Link>
              <Link to="/about" type="button" className=" navLink btn ms-2 nav">
                About
              </Link>
              <Link to="/blog" type="button" className=" navLink btn ms-2 nav">
                Blog
              </Link>
              <Link to="/service" type="button" className="navLink btn ms-2 nav">
                Service
              </Link>
              <Link to="/contact" type="button" className=" navLink btn ms-2 nav">
                Contact
              </Link>
            </span>
            <span className='hookButton'>

            {isLogin() ? (
                <div className='d-flex align-items-center '>
                  <UserSubmitButton
                      onClick={onLogout}
                      text="Logout"
                      className="btn ms-3 btn-light d-flex"
                  />
                  <Link
                      type="button"
                      className="btn ms-3 btn-light d-flex"
                      to="/dashboard/blogs"
                  >
                    DashBoard
                  </Link>
                </div>
            ) : (
                <>
                  <Link
                      type="button"
                      className="btn ms-3 btn-light d-flex"
                      to="/login"
                  >
                    Login
                  </Link>
                </>
            )}
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
