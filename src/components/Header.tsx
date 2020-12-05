import React from 'react';

import { NavBar, Icon } from 'antd-mobile';

import MineIcon from '../assets/images/wode.png';

import '../assets/styles/index.scss';

export default class Header extends React.Component<{ title: string }, any> {
    goBack = () => {
        console.log('back');
    };

    render() {
        const { title } = this.props;
        return (
            <NavBar
                className='navbar'
                mode='dark'
                icon={<Icon type='left' />}
                onLeftClick={this.goBack}
                rightContent={<img src={MineIcon} alt='我的' />}
            >
                {title}
            </NavBar>
        );
    }
}
