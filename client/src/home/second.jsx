import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Icon, Carousel} from 'react-materialize';
import { Col} from 'react-bootstrap';

const Block = () =>(
    <Col sm={12} lg={12} className="section block">
            <div class="static-block">           
                <Icon large >note_add</Icon>
                <div className="title"><Link to="/upload">Order By Prescription</Link> </div>
                <div className="subtitle">Upload prescription & order medicines</div>
            </div>
            <div class="static-block">           
                <Icon large >add_shopping_cart</Icon>
                <div className="title">Reorder Medicine</div>
                <div className="subtitle">Just click and get your medicine at home</div>
            </div>
            <div class="static-block">           
                <Icon large>face</Icon>
                <div className="title">Health & Happiness</div>
                <div className="subtitle">Bring Happiness for your home</div>
            </div>
            <div class="static-block">           
                <Icon large>accessibility</Icon>
                <div className="title">Order Household Supplies</div>
                <div className="subtitle">Also ordered Household supplies</div>
            </div>
    </Col>
    
)

export default Block