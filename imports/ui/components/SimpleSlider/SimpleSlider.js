import React from "react";
import Slider from "react-slick";
import { useTracker } from "meteor/react-meteor-data";
import ServiceWidget from "../ServiceWidget/ServiceWidget";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "./style.scss";
export default function SimpleSlider() {
  const users = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users
      .find({
        "profile.isProvider": true,
      })
      .fetch();
  });

  return (
    <div className="container slider">
      <div className="row">
        <div className="col-lg-12">
          <Swiper
            loop
            pagination={{ clickable: true }}
            spaceBetween={27}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {users?.map((user) => {
              return (
                <SwiperSlide>
                  <div className="slider__item">
                    <ServiceWidget
                      profile={user.profile}
                      user={user}
                    ></ServiceWidget>
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
