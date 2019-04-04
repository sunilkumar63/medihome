import React from 'react';
import Slider from './home/slider'
import Second from './home/second'
import Third from './home/third'
class Home extends React.Component {
constructor(props){
    super(props);
    this.handleNavigation = this.handleNavigation.bind(this)
}

handleNavigation(path) {
}
render() {
    return (  <>
        <div className="index" >
            <Slider />
            <Second />
            <Third />
        </div>
        {/* <div className="home view">
                 <div className="banner">  
                    <div className="title width30"> 
                             <h3>  If you know the name of your desired medinice, click below to visit Fazaldin family's website </h3>
                            <button className="">Go to Partner Website</button>
                    </div>
                    <div className="title-right width30"> 
                            <h3> Don't Know your medicine In case you are unable to read the prescription, or just don't feel like ordering yourself, just send us your prescription and we'll do the rest</h3>
                            <button className="" onClick ={ this.handleNavigation('/upload')}>Upload Prescription</button>
                    </div>
                  </div>
        </div> */}
        </> 
    )
}
}
export default Home;