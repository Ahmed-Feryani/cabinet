import React from "react";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  return (
    <section className="category-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-6">
                <div className="heading aos" data-aos="fade-up">
                  <h2>{t("FeaturedCategories")}</h2>
                  <span>{t("Need2Find")}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="viewall aos" data-aos="fade-up">
                  <h4>
                    <a href="categories.html">
                      {t("ViewAll")} <i className="fas fa-angle-right"></i>
                    </a>
                  </h4>
                  <span>{t("FeaturedCategories")}</span>
                </div>
              </div>
            </div>
            <div className="catsec">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <a href="search.html">
                    <div className="cate-widget aos" data-aos="fade-up">
                      <img src="/assets/img/category/category-01.jpg" alt="" />
                      <div className="cate-title">
                        <h3>
                          <span>
                            <i className="fas fa-circle"></i> {t("Computer")}
                          </span>
                        </h3>
                      </div>
                      <div className="cate-count">
                        <i className="fas fa-clone"></i> 21
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6">
                  <a href="search.html">
                    <div className="cate-widget aos" data-aos="fade-up">
                      <img src="/assets/img/category/category-02.jpg" alt="" />
                      <div className="cate-title">
                        <h3>
                          <span>
                            <i className="fas fa-circle"></i> {t("Interior")}
                          </span>
                        </h3>
                      </div>
                      <div className="cate-count">
                        <i className="fas fa-clone"></i> 15
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6">
                  <a href="search.html">
                    <div className="cate-widget aos" data-aos="fade-up">
                      <img src="/assets/img/category/category-03.jpg" alt="" />
                      <div className="cate-title">
                        <h3>
                          <span>
                            <i className="fas fa-circle"></i> {t("CarWash")}
                          </span>
                        </h3>
                      </div>
                      <div className="cate-count">
                        <i className="fas fa-clone"></i> 15
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6">
                  <a href="search.html">
                    <div className="cate-widget aos" data-aos="fade-up">
                      <img src="/assets/img/category/category-04.jpg" alt="" />
                      <div className="cate-title">
                        <h3>
                          <span>
                            <i className="fas fa-circle"></i> {t("Cleaning")}
                          </span>
                        </h3>
                      </div>
                      <div className="cate-count">
                        <i className="fas fa-clone"></i> 14
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6">
                  <a href="search.html">
                    <div className="cate-widget aos" data-aos="fade-up">
                      <img src="/assets/img/category/category-05.jpg" alt="" />
                      <div className="cate-title">
                        <h3>
                          <span>
                            <i className="fas fa-circle"></i> {t("Electrical")}
                          </span>
                        </h3>
                      </div>
                      <div className="cate-count">
                        <i className="fas fa-clone"></i> 10
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6">
                  <a href="search.html">
                    <div className="cate-widget aos" data-aos="fade-up">
                      <img src="/assets/img/category/category-06.jpg" alt="" />
                      <div className="cate-title">
                        <h3>
                          <span>
                            <i className="fas fa-circle"></i> Construction
                          </span>
                        </h3>
                      </div>
                      <div className="cate-count">
                        <i className="fas fa-clone"></i> 8
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
