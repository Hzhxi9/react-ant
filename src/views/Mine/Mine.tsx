import React from 'react';
import QueueAnim from 'rc-queue-anim'; // 进场动画

import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import UserIcon from '../../assets/images/face.png';
import PhoneIcon from '../../assets/images/phone.png';
import OrderIcon from '../../assets/images/icon-icon-copy.png';
import ShopIcon from '../../assets/images/shop-icon.png';
import VipIcon from '../../assets/images/VIP.png';
import ServerIcon from '../../assets/images/fuwu.png';
import ElementIcon from '../../assets/images/icon-elment-copy.png';

import { connect } from 'react-redux';
import { History } from 'history';
import { getUserInfo } from '../../api/api';
import { getStore } from '../../utils/index';
import { saveUserInfo } from '../../actions/user';
import { Icon, List } from 'antd-mobile';
import { getImgPath } from '../../utils';
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

class Mine extends React.Component<
    { user: ResTyps.loginData; saveUserInfo: any; proData: any; history: History },
    stateType
> {
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
                    icon: ServerIcon,
                    name: '服务中心',
                },
                {
                    icon: ElementIcon,
                    name: '下载饿了么APP',
                },
            ],
        };
    }

    getUserInfo = async () => {
        try {
            if (!getStore('user_id')) return;
            const user = await getUserInfo({ user_id: getStore('user_id') });
            user.imgpath = user.avatar.indexOf('/') !== -1 ? '/img/' + user.avatar : getImgPath();
            this.props.saveUserInfo(user);
        } catch (error) {
            console.log('user', error);
        }
    };

    componentDidMount() {
        this.getUserInfo();
    }

    // componentWillReceiveProps(nextProps: any) {
    //     if (!is(fromJS(this.props.proData), fromJS(nextProps.proData))) {
    //         this.props.saveUserInfo(null);
    //     }
    // }

    // 判断是否要更新render, return true 更新  return false不更新
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    render() {
        const { navList } = this.state;
        const { user } = this.props;

        return (
            <div>
                <Header title={'我的'} />
                <div className='content'>
                    <QueueAnim type='top'>
                        {/* 用户信息 */}
                        <div
                            className='user-info'
                            key='1'
                            onClick={() => {
                                user ? this.props.history.push('/center') : this.props.history.push('/login');
                            }}
                        >
                            <div className='user-icon'>
                                <img src={user ? user.imgpath : UserIcon} alt='头像' />
                            </div>
                            <div>
                                <div>
                                    <h3>{user ? user.username : '登录/注册'}</h3>
                                    <p>
                                        <img src={PhoneIcon} alt='phone' />
                                        {user && user.mobile ? user.mobile : '暂无绑定手机'}
                                    </p>
                                </div>
                                <Icon type='right' />
                            </div>
                        </div>

                        {/* 积分信息 */}
                        <ul className='integration' key='2'>
                            <li>
                                <h3 style={{ color: '#f90' }}>
                                    {user ? user.balance.toFixed(2) : '0.00'}
                                    <span>元</span>
                                </h3>
                                <p>我的余额</p>
                            </li>
                            <li>
                                <h3 style={{ color: '#ff5f3e' }}>
                                    {user ? user.gift_amount : 0}
                                    <span>个</span>
                                </h3>
                                <p>我的优惠</p>
                            </li>
                            <li>
                                <h3 style={{ color: '#6ac20b' }}>
                                    {user ? user.point : 0}
                                    <span>分</span>
                                </h3>
                                <p>我的积分</p>
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

const mapStateToProps = (state: any) => {
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveUserInfo: (user: any) => {
            dispatch(saveUserInfo(user));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
