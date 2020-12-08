import React from 'react';

import { NavBar, Icon } from 'antd-mobile';
import { History } from 'history';
import { getStore } from '../utils';
import MineIcon from '../assets/images/wode.png';

import '../assets/styles/index.scss';

class Header extends React.Component<
    { title: string; rightIcon?: boolean; leftIcon?: boolean; history?: History },
    any
> {
    goBack = () => {
        this.props.history && this.props.history.goBack();
    };

    render() {
        console.log(this.props);
        const { title, rightIcon, leftIcon, history } = this.props;
        return (
            <NavBar
                className='navbar'
                mode='dark'
                icon={leftIcon ? <Icon type='left' /> : null}
                onLeftClick={this.goBack}
                rightContent={
                    rightIcon ? (
                        <img
                            src={MineIcon}
                            alt='我的'
                            onClick={() => {
                                getStore('user_id')
                                    ? history && history.push('/mine')
                                    : history && history.push('/login');
                            }}
                        />
                    ) : null
                }
            >
                {title}
            </NavBar>
        );
    }
}

export default Header;
