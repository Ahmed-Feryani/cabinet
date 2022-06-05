import React, { useState } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
const Language = () => {
  const { t, i18n } = useTranslation();

  const setLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="switch-lang">
      <div className="current-lang">
        {i18n.language === "en" && (
          <div>
            <img
              className="lang-flag"
              src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png"
            />
            <p className="lang-text">English</p>
          </div>
        )}
        {i18n.language === "fr" && (
          <div>
            <img
              className="lang-flag"
              src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_France.png"
            />
            <p className="lang-text">Français</p>
          </div>
        )}
      </div>
      <div className="lang-dropdown">
        <div
          className="selecting-lang"
          onClick={() => setLanguageHandler("fr")}
        >
          <img
            className="lang-flag"
            src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_France.png"
          />
          <p className="lang-text">Français</p>
        </div>
        <div
          className="selecting-lang"
          onClick={() => setLanguageHandler("en")}
        >
          <img
            className="lang-flag"
            src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png"
          />
          <p className="lang-text">English</p>
        </div>
      </div>
    </div>
  );
};

export default Language;
