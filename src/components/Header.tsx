import React from 'react';

import { NavBar, Icon } from 'antd-mobile';

import MineIcon from '../assets/images/wode.png';

import '../assets/styles/index.scss';

export default class Header extends React.Component {
    goBack = () => {
        console.log('back');
    };

    render() {
        return (
            <NavBar
                className='navbar'
                mode='dark'
                icon={<Icon type='left' />}
                onLeftClick={this.goBack}
                rightContent={<img src={MineIcon} alt='我的' />}
            >
                越秀区广州市政府(府前路北)
            </NavBar>
        );
    }
}
