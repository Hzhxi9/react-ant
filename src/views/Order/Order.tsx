import React from 'react';
import QueueAnim from 'rc-queue-anim'; // 进场动画

import Navigation from '../../components/Navigation';
import Header from '../../components/Header';

import { connect } from 'react-redux';
import { imgUrl } from '../../configs/envconfig';

import './Order.scss';

class Order extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Header title={'订单'} />
                {this.props.goods.length ? (
                    <ul className='order-box'>
                        {this.props.goods.map((item: any, index: number) => {
                            return (
                                <QueueAnim key={index}>
                                    <li key={index + 1}>
                                        <div>
                                            <img src={imgUrl + item.image_path} alt='菜品' />
                                        </div>
                                        <div>
                                            <p>{item.specfoods[0].name}</p>
                                            <p>
                                                <span>{item.specfoods[0].price}</span>
                                                <span>x{item.qty}</span>
                                            </p>
                                        </div>
                                    </li>
                                </QueueAnim>
                            );
                        })}
                    </ul>
                ) : (
                    <div className='order-box order-empty'>
                        <img src='https://img.yzcdn.cn/vant/custom-empty-image.png' alt='空订单' />
                        <p>暂无订单</p>
                    </div>
                )}
                <Navigation />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        goods: state.goods,
    };
};

export default connect(mapStateToProps)(Order);
