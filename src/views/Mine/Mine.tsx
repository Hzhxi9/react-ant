import React from 'react';
import QueueAnim from 'rc-queue-anim'; // 进场动画

import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import UserIcon from '../../assets/images/face.png';
import PhoneIcon from '../../assets/images/phone.png';
import OrderIcon from '../../assets/images/icon-icon-copy.png';
import ShopIcon from '../../assets/images/shop-icon.png';
import VipIcon from '../../assets/images/VIP.png';
import ServerrIcon from '../../assets/images/fuwu.png';
import ElementIcon from '../../assets/images/icon-elment-copy.png';

import { connect } from 'react-redux';
import { getUserInfo } from '../../api/api';
import { Icon, List } from 'antd-mobile';
import { is, fromJS } from 'immutable';

import './Mine.scss';

import * as ResTyps from '../../types/response';

const Item = List.Item;

type stateType = {
    navList: {
        icon: string;
        name: string;
    }[];
};

class Mine extends React.Component<any, stateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            navList: [
                {
                    icon: OrderIcon,
                    name: '我的订单',
                },
                {
                    icon: ShopIcon,
                    name: '积分商城',
                },
                {
                    icon: VipIcon,
                    name: '饿了么会员卡',
                },
                {
                    icon: ServerrIcon,
                    name: '服务中心',
                },
                {
                    icon: ElementIcon,
                    name: '下载饿了么APP',
                },
            ],
        };
    }

    render() {
        const { navList } = this.state;

        return (
            <div>
                <Header title={'我的'} />
                <div className='content'>
                    <QueueAnim>
                        {/* 用户信息 */}
                        <div className='user-info' key='1'>
                            <div className='user-icon'>
                                <img src={UserIcon} alt='头像' />
                            </div>
                            <div>
                                <div>
                                    <h3>登录/注册</h3>
                                    <p>
                                        <img src={PhoneIcon} alt='phone' />
                                        暂无绑定手机
                                    </p>
                                </div>
                                <Icon type='right' />
                            </div>
                        </div>

                        {/* 积分信息 */}
                        <ul className='integration' key='2'>
                            <li>
                                <h3>
                                    0.00<span>元</span>
                                </h3>
                                <p>我的余额</p>
                            </li>
                            <li>
                                <h3>
                                    0.00<span>元</span>
                                </h3>
                                <p>我的余额</p>
                            </li>
                            <li>
                                <h3>
                                    0.00<span>元</span>
                                </h3>
                                <p>我的余额</p>
                            </li>
                        </ul>

                        {/* 导航列表 */}

                        <List key='3'>
                            <QueueAnim>
                                {navList.map((item, i) => {
                                    return (
                                        <Item key={i} thumb={item.icon} arrow='horizontal' onClick={() => {}}>
                                            {item.name}
                                        </Item>
                                    );
                                })}
                            </QueueAnim>
                        </List>
                    </QueueAnim>
                </div>
                <Navigation />
            </div>
        );
    }
}

export default Mine;
