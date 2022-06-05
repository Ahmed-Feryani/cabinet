import "./about.css";
import React from "react";
const About = () => {
  return (
    <div>
      <section className="about" id="about">
        <div className="content">
          <h3>best quality Repair services</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
            laboriosam quidem eaque, ex qui fugit velit veniam veritatis a
            nostrum amet perspiciatis pariatur ducimus ipsam officiis quae
            cumque maiores voluptates!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus iste ab eos ea rerum obcaecati illo ex recusandae
            expedita aspernatur?
          </p>
          <a href="#services" className="btn">
            read more
          </a>
        </div>

        <div className="image">
          <img src="/about-img.svg" alt="" />
        </div>
      </section>
    </div>
  );
};

export default About;
