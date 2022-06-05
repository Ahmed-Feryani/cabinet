import React from "react";
import { useTranslation } from "react-i18next";

const AppSet = () => {
  const { t } = useTranslation();
  return (
    <section className="app-set">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            <div className="col-md-12">
              <div className="heading aos" data-aos="fade-up">
                <h2>{t("AppDownload")}</h2>
              </div>
            </div>
            <div className="downlaod-sett aost" data-aos="fade-up">
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <li
                  style={{
                    marginRight: "2rem",
                  }}
                >
                  <a href="#">
                    <img
                      style={{
                        width: "20rem",
                      }}
                      src="/assets/img/google.svg"
                      alt="img"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{
                        width: "20rem",
                      }}
                      src="/assets/img/google.svg"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="appimg-set aos" data-aos="fade-up">
              <img src="/assets/img/app.png" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSet;
