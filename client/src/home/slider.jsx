import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
    //   infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight : false
    };
    return (
        <div className="">
            <Slider {...settings}>
                <div>
            <img src="https://lorempixel.com/800/200/food/1" width="100%" alt="dfd" />
                </div>
                <div>
                <img src="https://lorempixel.com/800/200/food/2" width="100%" alt="dfd" />
                </div>
                <div>
                <img src="https://lorempixel.com/800/200/food/3" width="100%"alt="dfd" />
                </div>
            </Slider>
      </div>
    );
  }
}
export default SimpleSlider;