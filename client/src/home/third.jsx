import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Icon} from 'react-materialize';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col} from 'react-bootstrap';

const  settings = {
    dots: false,
  //   infinite: true,
    speed: 600,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight : false,
    arrows : true,
    swipe : true
  };
const Block = () =>(
    <div className="section">
     <div class="left-wrapper"><div>Health Articles<Link to="#"> <Button waves="light">View All</Button></Link></div> </div>
    <Slider className="section block multi-banner" {...settings} >           
            <div class="static-block">      
                    <Link to="#" >
                         <img src="https://res.sastasundar.com/incom/healtharticle/thumbnail/1549871096_thumb.jpg" />                  
                    </Link>
            </div>
            <div class="static-block">           
                    <Link to="#" >
                         <img src="https://res.sastasundar.com/incom/healtharticle/thumbnail/1485870401_thumb.jpg" />                  
                    </Link>
            </div>
            <div class="static-block">           
            <Link to="#" >
                         <img src="https://res.sastasundar.com/incom/healtharticle/thumbnail/1532585511_thumb.jpg" />                  
                    </Link>
            </div>
            <div class="static-block">      
                    <Link to="#" >
                         <img src="https://res.sastasundar.com/incom/healtharticle/thumbnail/1549871096_thumb.jpg" />                  
                    </Link>
            </div>
            <div class="static-block">           
                    <Link to="#" >
                         <img src="https://res.sastasundar.com/incom/healtharticle/thumbnail/1485870401_thumb.jpg" />                  
                    </Link>
            </div>            
    </Slider>
    </div>
)

export default Block