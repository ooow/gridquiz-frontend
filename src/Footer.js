import React, {Component} from 'react';
import GD from './img/gd-footer.svg'


class Footer extends Component {

    render() {
        return (
            <div className='footer'>
                <img src={GD} className='gd-logo' alt='Grid Dynamics'/>
                <div className='copyright'>Grid Dynamics © 2017</div>
            </div>
        )
    }
}

export default Footer;