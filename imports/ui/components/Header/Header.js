import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import modal from "../../../libs/modal";
import LogInForm from "../forms/LogInForm/LogInForm";
import LogInModal from "../Modal/LogInModal/LogInModal";
import { useTracker } from "meteor/react-meteor-data";
import cx from "classnames";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import "./style.scss";
import SignUpModal from "../Modal/SignUpModal/SignUpModal";
import SignUpForm from "../forms/SignUpForm/SignUpForm";
import NotifMessage from "../NotifMessage/NotifMessage";
import { Notification } from "../../../api/notification/notification";
import ModalDellAllNoti from "../Modal/ModalDellAllNoti/ModalDellAllNoti";
import { useTranslation } from "react-i18next";
// import "../../../../client/i18n";

const Header = () => {
  let navigate = useNavigate();
  const [profileShow, setprofileShow] = useState(false);
  const [notifDrop, setnotifDrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [selected, setSelected] = useState("/assets/img/france.png");
  const user = useTracker(() => {
    return Meteor.user();
  });

  // const openMenu = () => {
  //   setMenuOpen(true);
  // };

  const notifications = useTracker(() => {
    Meteor.subscribe("notification");
    const notifications = Notification.find({ recId: Meteor.userId() }).fetch();
    return notifications?.map((notif) => {
      Meteor.subscribe("allUsers");
      const user = Meteor.users.findOne(notif.sender);
      return {
        ...notif,
        name: user?.profile?.name,
        lastName: user?.profile?.lastName,
      };
    });
  });

  const notSeenCount = useTracker(() => {
    Meteor.subscribe("notification");
    const notifications = Notification.find({
      recId: Meteor.userId(),
      seen: false,
    }).fetch();
    return notifications.length;
  });

  const profileDropHandler = () => {
    setprofileShow(!profileShow);
  };
  const notifDropHandler = () => {
    setnotifDrop(!notifDrop);
  };

  const handleClickAway = () => {
    setprofileShow(false);
  };
  const handleClickAwayNotifDrop = () => {
    setnotifDrop(false);
  };

  const ModalLogInHandler = () => {
    modal.set("modalLogIn", {
      open: true,
    });
  };
  const ModalSignUpHandler = () => {
    modal.set("modalSignUp", {
      open: true,
    });
  };

  const ModalRemoveAllHandler = () => {
    modal.set("modalDelAllnotif", {
      open: true,
    });
  };

  const logoutHandler = () => {
    Meteor.users.update(
      { _id: Meteor.user()._id },
      {
        $set: {
          "profile.isOnline": false,
        },
      },
      () => {
        Meteor.logout();
        setprofileShow(false);
        navigate("/", { replace: true });
      }
    );
  };
  const { t, i18n } = useTranslation();
  const language = (x, y) => {
    i18n.changeLanguage(x);
    setSelected(y);
  };
  return (
    <header className="header">
      <LogInModal>
        <LogInForm></LogInForm>
      </LogInModal>
      <SignUpModal>
        <SignUpForm></SignUpForm>
      </SignUpModal>
      <ModalDellAllNoti></ModalDellAllNoti>

      <nav className="navbar navbar-expand-lg header-nav">
        <div className="navbar-header">
          <a id="mobile_btn" href="#" onClick={() => setMenuOpen(true)}>
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
        </div>

        {menuOpen && (
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img
                  src="/assets/img/tc4.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <a
                id="menu_close"
                className="menu-close"
                href="#"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-times"></i>
              </a>
            </div>
            <ul className="main-nav">
              <li className={cx({ active: pathname === "/" })}>
                <Link to="/">{t("Home")}</Link>
              </li>
              {Meteor.userId() && (
                <li className={cx({ active: pathname === "/services" })}>
                  <Link to="/services">Services</Link>
                </li>
              )}

              <li className={cx({ active: pathname === "/providers" })}>
                <Link to="/providers">{t("providers")}</Link>
              </li>
              {user?.profile?.isProvider && (
                <li className={cx({ active: pathname === "/clients" })}>
                  <Link to="/clients">{t("Customers")}</Link>
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="right-navbar">
          <ul className="main-nav navout mynav">
            <li className={cx({ active: pathname === "/" })}>
              <Link to="/">{t("Home")}</Link>
            </li>
            {user?.profile?.isSecretary && (
              <li className={cx({ active: pathname === "/providers" })}>
                <Link to="/providers">Patients</Link>
              </li>
            )}
            {user?.profile?.isDoctor && (
              <li className={cx({ active: pathname === "/providers" })}>
                <Link to="/providers">Patients</Link>
              </li>
            )}
            {user?.profile?.isSecretary && (
              <li className={cx({ active: pathname === "/rdv" })}>
                <Link to="/rdv">Rdv</Link>
              </li>
            )}
            {user?.profile?.isDoctor && (
              <li className={cx({ active: pathname === "/rdv" })}>
                <Link to="/rdv">Rdv</Link>
              </li>
            )}

            {user?.profile?.isPatient && (
              <li className={cx({ active: pathname === "/rdv" })}>
                <Link to="/rdv">My Rdv</Link>
              </li>
            )}
            {user?.profile?.isAdmin && (
              <li className={cx({ active: pathname === "/rdv" })}>
                <Link to="/users">Users</Link>
              </li>
            )}
            <ul className="nav header-navbar-rht">
              {user?.profile?.isPatient && (
                <li className="rdv-btn">
                  <Link
                    to={`/ask-rdv/${Meteor.userId()}`}
                    className="nav-link header-login"
                    data-bs-toggle="modal"
                    data-bs-target="#login_modal"
                  >
                    Ask for rdv
                  </Link>
                </li>
              )}
            </ul>
          </ul>

          {/* lang finish */}
          {!Meteor.userId() && (
            <>
              {" "}
              <ul className="nav header-navbar-rht header-navbar-rht-signup">
                <li
                  className="nav-item nav-item--signUp"
                  onClick={ModalSignUpHandler}
                >
                  <Link
                    to=""
                    className="nav-link header-login"
                    data-bs-toggle="modal"
                    data-bs-target="#login_modal"
                  >
                    {t("SignUp")}
                  </Link>
                </li>
              </ul>
              <ul className="nav header-navbar-rht">
                <li className="nav-item" onClick={ModalLogInHandler}>
                  <Link
                    to=""
                    className="nav-link header-login"
                    data-bs-toggle="modal"
                    data-bs-target="#login_modal"
                  >
                    {t("Login")}
                  </Link>
                </li>
              </ul>
            </>
          )}

          {/******* */}
          {Meteor.userId() && (
            <ul className={cx("nav", "header-navbar-rht")}>
              <ClickAwayListener onClickAway={handleClickAwayNotifDrop}>
                <li
                  className={cx("nav-item dropdown logged-item", {
                    show: notifDrop,
                  })}
                >
                  <div
                    onClick={() => {
                      if (notifications.length !== 0) {
                        notifDropHandler();
                      }
                      return null;
                    }}
                    className={cx("dropdown-toggle nav-link", {
                      show: notifDrop,
                    })}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className={cx("fas fa-bell", {
                        active: notSeenCount !== 0,
                      })}
                    ></i>
                    {notSeenCount !== 0 && (
                      <span className="badge badge-pill bg-yellow">
                        {notSeenCount}
                      </span>
                    )}
                  </div>
                  <div className="dropdown-menu notify-blk dropdown-menu-end notifications">
                    <div className="topnav-dropdown-header">
                      <span className="notification-title">Notifications</span>
                      <div
                        onClick={ModalRemoveAllHandler}
                        className="clear-noti"
                      >
                        {t("ClearAll")}
                      </div>
                    </div>
                    <div className="noti-content">
                      <ul className="notification-list">
                        {notifications?.map((notif) => {
                          return (
                            <NotifMessage
                              key={notif._id}
                              notif={notif}
                              to={`/service/${notif.serviceId}`}
                              setnotifDrop={setnotifDrop}
                            ></NotifMessage>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="topnav-dropdown-footer">
                      <Link
                        to="/notifications"
                        onClick={() => {
                          setnotifDrop(false);
                        }}
                      >
                        {t("ViewAllNotifications")}
                      </Link>
                    </div>
                  </div>
                </li>
              </ClickAwayListener>
              {/* <li className="nav-item logged-item switch">
              <img className="flag" src={selected} alt="" />
              <ul className="lang-list">
                <li
                  className="lang"
                  onClick={() => language("fr", "/assets/img/france.png")}
                >
                  <img className="flag" src="/assets/img/france.png" alt="" />
                </li>
                <li
                  className="lang"
                  onClick={() =>
                    language("en", "/assets/img/united-kingdom.png")
                  }
                >
                  <img
                    className="flag"
                    src="/assets/img/united-kingdom.png"
                    alt=""
                  />
                </li>
              </ul>
            </li> */}
              <ClickAwayListener onClickAway={handleClickAway}>
                <li
                  className={cx(
                    "nav-item",
                    "dropdown",
                    "has-arrow",
                    { "logged-item": profileShow },
                    {
                      show: profileShow,
                    }
                  )}
                >
                  <div
                    onClick={() => {
                      profileDropHandler();
                    }}
                    className={cx("dropdown-toggle", "nav-link", {
                      show: profileShow,
                    })}
                  >
                    <span className="user-img">
                      <img
                        className="rounded-circle"
                        src={user?.profile?.avatar?.url || "/profile.jpg"}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="user-header">
                      <div className="avatar avatar-sm">
                        <img
                          className="avatar-img rounded-circle"
                          src={user?.profile?.avatar?.url || "/profile.jpg"}
                          alt=""
                        />
                      </div>
                      <div className="user-text">
                        <h6>
                          {`${user?.profile?.name} ${user?.profile?.lastName}`}{" "}
                        </h6>
                        {user?.profile?.isClient ? (
                          <p className="text-muted mb-0">{t("User")}</p>
                        ) : (
                          <p className="text-muted mb-0">{t("Provider")}</p>
                        )}
                      </div>
                    </div>
                    {user?.profile?.isProvider && (
                      <Link to="/dashboard/dashboard" className="dropdown-item">
                        {t("Dashboard")}
                      </Link>
                    )}

                    <Link
                      to="/dashboard/settings"
                      className="dropdown-item"
                      href="user-settings.html"
                    >
                      {t("ProfileSettings")}
                    </Link>
                    <Link
                      to="/dashboard/services"
                      className="dropdown-item"
                      href="user-bookings.html"
                    >
                      {user?.profile?.isProvider ? "Services" : "My Bookings"}
                    </Link>
                    {user?.profile?.isProvider && (
                      <Link
                        to="/dashboard/reviews"
                        className="dropdown-item"
                        href="user-bookings.html"
                      >
                        {t("Reviews")}
                      </Link>
                    )}

                    <div className="dropdown-item" onClick={logoutHandler}>
                      {t("Logout")}
                    </div>
                  </div>
                </li>
              </ClickAwayListener>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
