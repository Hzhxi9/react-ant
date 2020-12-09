import React from 'react';
import shopImg from '../assets/images/shop.png';
import Rate from 'rc-rate';

import 'rc-rate/assets/index.css';

import * as ResTypes from '../types/response';

import { imgUrl } from '../configs/envconfig';
import { History } from 'history';

class ShopList extends React.Component<{ list: ResTypes.ShopData[]; history: History }, any> {
    constructor(
        props:
            | { list: ResTypes.ShopData[]; history: History }
            | Readonly<{ list: ResTypes.ShopData[]; history: History }>
    ) {
        super(props);
        this.state = {};
    }

    render() {
        const { list } = this.props;

        return (
            <div className='shop-box'>
                <h3>
                    <img src={shopImg} alt='shop' />
                    附近商家
                </h3>
                <ul className='shop-list'>
                    {list.map((element, index) => {
                        return (
                            <li
                                className='shop-item'
                                key={index}
                                onClick={() => {
                                    this.props.history.push(`/shop?id=${element.id}`);
                                }}
                            >
                                <div>
                                    <img src={imgUrl + element.image_path} alt='shop' />
                                </div>
                                <div>
                                    <div>
                                        <p>
                                            <span>品牌</span>
                                            {element.name}
                                        </p>
                                        <div>
                                            {element.supports.map((item, index) => {
                                                return <span key={index}>{item.icon_name}</span>;
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <Rate value={element.rating} />
                                            <span>{element.rating}</span>
                                            <span>月销{element.rating_count}单</span>
                                        </div>
                                        <div>
                                            <span>蜂鸟专送</span>
                                            <span>准时达</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span>
                                            ¥{element.float_minimum_order_amount}起送/配送费约¥
                                            {element.float_delivery_fee}
                                        </span>
                                        <span>
                                            {element.distance}/{element.order_lead_time}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ShopList;
