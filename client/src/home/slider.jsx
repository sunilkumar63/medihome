import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from '../components/Loader'
import withLoader  from '../components/LoaderHoc'
class SimpleSlider extends React.Component {
  state = {banners : null  }

  componentDidMount(){
  fetch('/api/banners/list')
        .then(res => res.json() )
        .then(result =>{
          this.setState({banners : result})
          console.log(result);
        })
  }
  render() {
    const {banners} = this.state;
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
      banners && banners.length <= 0 ? <Loader /> :
        <div className="">
            <Slider {...settings}>
            {
             banners &&  banners.map( banner =>{
                return (
                        <div><img src={`/media/banner/${banner.filename} `} width="100%" alt="dfd" style={{"maxHeight" : "400px"}}/>  </div>
                      )
              })
            }                
            </Slider>
      </div>
    );
  }
}
export default SimpleSlider;
// export default withLoader('/api/banners/list' , 'banners')(SimpleSlider );