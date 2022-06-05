import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import searchBar from "../../../libs/searchBar";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    searchBar.set("searchBar", {
      keyword: e.target.keyword.value,
      location: '',
    });
    navigate("/providers");
  };

  return (
    <section className="hero-section">
      <div className="layer">
        <div className="home-banner">
          <div className="home-banner__over"></div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-search aos" data-aos="fade-up">
                <h3>
                  My <span>Office</span>
                </h3>
                <div className="search-box">
                  <form action="search.html" onSubmit={submitHandler}>
                    <div className="search-input">
                      <i className="fas fa-tv bficon"></i>
                      <div className="form-group mb-0">
                        <input
                          name="keyword"
                          type="text"
                          className="form-control"
                          placeholder={t("Keyword")}
                        />
                      </div>
                    </div>
                    <div className="search-btn">
                      <button className="btn search_service" type="submit">
                        {t("Search")}
                      </button>
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
