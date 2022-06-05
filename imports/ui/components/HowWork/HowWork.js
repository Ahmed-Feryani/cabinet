import React from "react";
import { useTranslation } from "react-i18next";

const HowWork = () => {
  const { t } = useTranslation();
  return (
    <section className="how-work">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading howitworks aos" data-aos="fade-up">
              <h2>{t("howWork")}</h2>
              {/* <span>Aliquam lorem ante, dapibus in, viverra quis</span> */}
            </div>
            <div className="howworksec">
              <div className="row">
                <div className="col-lg-4">
                  <div className="howwork aos" data-aos="fade-up">
                    <div className="iconround">
                      <div className="steps">01</div>
                      <img src="/assets/img/icon-2.png" alt="" />
                    </div>
                    <h3>{t("FindWant")}</h3>

                    <p>{t("FindWantDetail")}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="howwork aos" data-aos="fade-up">
                    <div className="iconround">
                      <div className="steps">02</div>
                      <img src="/assets/img/icon-1.png" alt="" />
                    </div>
                    <h3>{t("ChooseToDo")}</h3>

                    <p>{t("ChooseToDoDetail")}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="howwork aos" data-aos="fade-up">
                    <div className="iconround">
                      <div className="steps">03</div>
                      <img src="/assets/img/icon-3.png" alt="" />
                    </div>
                    <h3>{t("proPlace")}</h3>
                    <p>{t("proPlaceDetail")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
