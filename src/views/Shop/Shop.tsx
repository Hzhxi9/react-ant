import React from 'react';
import classnames from 'classnames';
import ElementIcon from '../../assets/images/icon-elment-copy.png';
import CartIcon from '../../assets/images/cart.png';

import { connect } from 'react-redux';
import { imgUrl } from '../../configs/envconfig';
import { getUrlParams } from '../../utils';
import { shopDetails, getfoodMenu } from '../../api/api';
import { Icon, Tabs, Stepper, Badge } from 'antd-mobile';

import './Shop.scss';

class Shop extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            menu: [],
            detail: {},
            selectd: 0,
        };
    }

    /**
     * 初始化数据
     */
    init = async () => {
        const data = {
            id: getUrlParams('id', this.props.location.search) ?? '0',
            latitude: this.props.geohash[0],
            longitude: this.props.geohash[1],
        };
        try {
            const res = await shopDetails(data);
            let menu = await getfoodMenu({ restaurant_id: data.id });
            menu = this.setNumOfMenu(menu);
            const list = this.setFoodList(menu);
            console.log(res.activities.length);
            this.setState({
                detail: res,
                menu,
            });
        } catch (error) {
            console.log(error);
        }
    };

    setFoodList = (detail: any) => {
        let list: any[] = [];
        detail.forEach((item: any) => {
            list.push(...item.foods);
        });
        return list;
    };

    setNumOfMenu = (menu: any) => {
        let count = 0;
        menu.forEach((i: { foods: { num: number; qty: number }[] }) => {
            i.foods.forEach((item: { num: number; qty: number }) => {
                item.num = count;
                item.qty = 0;
                count++;
            });
        });
        return menu;
    };

    componentDidMount() {
        this.init();
    }

    render() {
        const tabs = [{ title: '商品' }, { title: '评价' }];
        const { detail, menu, selectd } = this.state;
        return (
            <div>
                {/* 商家信息 */}
                <header>
                    <img src={imgUrl + detail.image_path} alt='店铺Icon' />
                    <div className='header-info'>
                        <Icon
                            type='left'
                            size='lg'
                            style={{ position: 'absolute', left: '0', top: '0', zIndex: 10 }}
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        />
                        <img src={imgUrl + detail.image_path} alt='店铺Icon' />
                        <div>
                            <h3>{detail.name}</h3>
                            <p>
                                商家配送/
                                {detail.order_lead_time}分钟送达/配送费¥{detail.float_delivery_fee}
                            </p>
                            <p>{detail.promotion_info}</p>
                        </div>
                        <Icon
                            type='right'
                            size='md'
                            style={{ position: 'absolute', right: '2vw', bottom: '10.667vw' }}
                        />
                    </div>

                    {Array.isArray(detail.activities) && detail.activities.length ? (
                        <div>
                            {detail.activities.map((item: any) => {
                                return (
                                    <div className='footer-info' key={item.id}>
                                        <div>
                                            <span style={{ color: item.icon_color }}>{item.icon_name}</span>
                                            {item.description}(APP专享)
                                        </div>
                                        <div>
                                            {detail.activities.length}个活动
                                            <Icon type='right' size='xxs' />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </header>
                {/* 菜单 */}
                <main>
                    <Tabs
                        tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => {
                            console.log('onChange', index, tab);
                        }}
                        onTabClick={(tab, index) => {
                            console.log('onTabClick', index, tab);
                        }}
                    >
                        <div className='content'>
                            <ul className='nav'>
                                {Array.isArray(menu) && menu.length
                                    ? menu.map((item, index) => {
                                          return (
                                              <li
                                                  className={classnames({ active: selectd === index })}
                                                  key={item.id}
                                                  onClick={() => {
                                                      this.setState({ selectd: index });
                                                  }}
                                              >
                                                  {item.name}
                                              </li>
                                          );
                                      })
                                    : null}
                            </ul>
                            <div className='good-list'>
                                <h3>好吃</h3>
                                <ul>
                                    <li>
                                        <Badge text={'新'} corner>
                                            <img src={ElementIcon} alt='菜品' />
                                            <div>
                                                <h5>
                                                    111{' '}
                                                    <Badge
                                                        text='招牌'
                                                        hot
                                                        style={{
                                                            padding: '0 3px',
                                                            backgroundColor: '#fff',
                                                            borderRadius: '1.867vw',
                                                            color: '#f19736',
                                                            border: '1px solid #f19736',
                                                            fontSize: '2.133vw',
                                                        }}
                                                    />
                                                </h5>
                                                <p>111</p>
                                                <p>111</p>
                                                <Badge
                                                    text='招牌'
                                                    hot
                                                    style={{
                                                        padding: '0 3px',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '1.867vw',
                                                        color: '#f19736',
                                                        border: '1px solid #f19736',
                                                        fontSize: '2.133vw',
                                                    }}
                                                />
                                                <div>
                                                    <span className='good-price'>￥20</span>
                                                    <Stepper showNumber max={10} min={1} />
                                                </div>
                                            </div>
                                        </Badge>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='content'>Content of second tab</div>
                    </Tabs>
                </main>

                {/* 下单 */}
                <footer>
                    <div className='pay-price'>
                        <div className='cart'>
                            <img src={CartIcon} alt='购物车' />
                        </div>
                        <div className='pay-num'>
                            <h3>￥0</h3>
                            <p>配送费5</p>
                        </div>
                    </div>
                    <div className='pay-btn'>还差20起送</div>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        geohash: state.user.geohash,
    };
};

export default connect(mapStateToProps)(Shop);
