import React, {Component} from 'react';
import {REDIRECT_DELAY} from '../../pages/NotFound';
import {withRouter} from 'react-router-dom';

/**
 * Component Error shows a page with error message and redirect to the main
 * page.
 */
class Error extends Component<any> {
    constructor(props: any) {
        super(props);

        setTimeout(() => {
            props.history.push('/');
        }, REDIRECT_DELAY);
    }

    render() {
        const {error} = this.props;
        return (
            <div className='align-items-center container d-flex flex-column h-100vh justify-content-center'>
                <h3>ERR
                    <span role='img' aria-label='face-screaming-in-fear'>
                      😱
                    </span>
                    R
                </h3>
                <h1 className='mt-2'>{error}</h1>
                <span>
                    You will be redirect to the <a href='/'>home page</a> in a few secs.
                </span>
            </div>
        );
    }
}

export default withRouter(Error);
