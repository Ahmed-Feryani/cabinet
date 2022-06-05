import React from "react";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "./style.scss";
SwiperCore.use([Pagination]);
export default function ServicesSlider(props) {
  return (
    <div className="container ServicesSlider">
      <div className="row">
        <div className="col-lg-12">
          <Swiper
            loop
            pagination={{ clickable: true }}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {props?.list?.map((img) => {
              if (!img) {
                return;
              }
              return (
                <SwiperSlide key={img._id}>
                  <div className="ServicesSlider__item">
                    <img alt="Service Image" src={img?.url} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
