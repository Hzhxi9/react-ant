import React from 'react';

import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

import HomeIcon from '../assets/images/elment.png';
import HomeActiveIcon from '../assets/images/icon-elment-copy.png';
import FindIcon from '../assets/images/faxian.png';
import FindActiveIcon from '../assets/images/icon-faxian-copy.png';
import OrderIcon from '../assets/images/icon.png';
import OrderActiveIcon from '../assets/images/icon-icon-copy.png';
import MineIcon from '../assets/images/ziyuan.png';
import MineActiveIcon from '../assets/images/icon-ziyuan-copy.png';

import '../assets/styles/index.scss';
import { fromJS } from 'immutable';

class Navigation extends React.Component<
    any,
    {
        selectedTab: number;
        fullScreen: boolean;
        TabBarList: { icon: any; activeIcon: any; title: string; path: string }[];
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTab: 0,
            fullScreen: true,
            TabBarList: [
                {
                    icon: <img src={HomeIcon} alt='饿了么' />,
                    activeIcon: <img src={HomeActiveIcon} alt='饿了么' />,
                    title: '饿了么',
                    path: '/home',
                },
                {
                    icon: <img src={FindIcon} alt='搜索' />,
                    activeIcon: <img src={FindActiveIcon} alt='搜索' />,
                    title: '搜索',
                    path: '/',
                },
                {
                    icon: <img src={OrderIcon} alt='订单' />,
                    activeIcon: <img src={OrderActiveIcon} alt='订单' />,
                    title: '订单',
                    path: '/',
                },
                {
                    icon: <img src={MineIcon} alt='我的' />,
                    activeIcon: <img src={MineActiveIcon} alt='我的' />,
                    title: '我的',
                    path: '/mine',
                },
            ],
        };
    }

    render() {
        const { TabBarList } = this.state;
        return (
            <div className='tabbar'>
                <TabBar unselectedTintColor='#949494' tintColor='#33A3F4' barTintColor='white'>
                    {TabBarList.map((item) => (
                        <TabBar.Item
                            title={item.title}
                            key={item.title}
                            icon={item.icon}
                            selectedIcon={item.activeIcon}
                            selected={this.props.location.pathname === item.path}
                            onPress={() => {
                                this.props.history.push(item.path);
                            }}
                            data-seed='logId'
                        />
                    ))}
                </TabBar>
            </div>
        );
    }
}

export default withRouter(Navigation);
