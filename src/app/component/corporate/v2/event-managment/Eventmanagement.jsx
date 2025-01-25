'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './event.css'

export default function Eventmanagement() {
  const sliderRef = useRef(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const initialImages = [
    {
      img: "/images/landing-page-images/section7/BLUE_COLLAR.webp",
      name: "Blue collar chronicles",
      desc: "Conferences and Seminars",
    },
    {
      img: "/images/landing-page-images/section7/COUPLE'S_MARATHON.webp",
      name: "Marathon mingle",
      desc: "Product Launches",
    },
    {
      img: "/images/landing-page-images/section7/PAINTBALL.webp",
      name: "Warzone Paintfull Tournament",
      desc: "Conferences and Seminars",
    },
    {
      img: "/images/landing-page-images/section7/STANDUP.webp",
      name: "Comedy Show",
      desc: "Conferences and Seminars",
    }
  ];

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    centerMode: false,
    focusOnSelect: true,
    dots: true,
    arrows: true,
    prevArrow: <button className="slick-prev">Prev</button>,
    nextArrow: <button className="slick-next">Next</button>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container-fluid p-5 bg-black">
      <div className="slider-container">
        <Slider {...settings} ref={sliderRef}>
          {initialImages.map((image, index) => (
            <div key={index} className="d-flex justify-content-center align-items-center p-2">
              <div className="image-container-event position-relative">
                <img
                  className="img-fluid rounded"
                  src={image.img}
                  alt={image.name}
                />
                <p
                  className="position-absolute fs-6 d-flex justify-content-center align-items-center"
                  style={{
                    top: "85%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {image.desc}
                </p>
              </div>
            </div>
          ))}
        </Slider>



        <div
          style={{ textAlign: "left" }}
          className="d-flex justify-content-end gap-2 my-4 cursor-pointer"
        >
          {/* <div className="rounded-full p-2" onClick={previous}>
            <img
              style={{ transform: "rotate(-180deg)" }}
              className="img-fluid w-50 arrow-img mx-lg-4"
              src="/images/arrow.png"
            />
          </div> */}
          <div
            className="rounded-full p-2"
            onClick={next}
            style={{ color: "white" }}
          >
            <img
              className="img-fluid w-50 arrow-img mx-lg-4"
              src="/images/arrow.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}