import React,{Component} from 'react';
// import '../node_modules/font-awesome/css/font-awesome.min.css';
class Footer extends Component {
    render() {
      return (
            <div className ="footer">
            <div className ="footer-wrapper">
                  <div className="social-icons">
                                <a href="https://www.facebook.com/" target="_blank" className="icon-facebook"><i className="fa fa-facebook-f"></i></a>
                                <a href="https://twitter.com/hashtag/" target="_blank" className="icon-twitter"><i className="fa fa-twitter"></i></a>
                                <a href="https://plus.google.com/" target="_blank" className="icon-google"><i className="fa fa-google-plus-g"></i></a>
                                <a href="https://www.linkedin.com/company/" target="_blank" className="icon-linkedin"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    
                </div>
                <div className="copyright"> copyright@2019</div>
            </div>
      );
    }
  }

  export default Footer;