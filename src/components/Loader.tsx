import React from 'react';

import '../assets/styles/index.scss';

export default class Loader extends React.Component {
    render() {
        return (
            <div className='loader-container'>
                <div className='loader-main'></div>
            </div>
        );
    }
}
