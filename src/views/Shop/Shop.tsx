import React from 'react';
import classnames from 'classnames';
import CartIcon from '../../assets/images/cart.png';
import Loader from '../../components/Loader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ShopHeaderSkeleton from '../../components/ShopHeaderSkeleton';
import ShopDetailSkeleton from '../../components/ShopDetailSkeleton';

import { connect } from 'react-redux';
import { saveGoods } from '../../actions/goods';
import { imgUrl } from '../../configs/envconfig';
import { getUrlParams } from '../../utils';
import { fromJS, is } from 'immutable';
import { shopDetails, getfoodMenu } from '../../api/api';
import { Icon, Tabs, Stepper, Badge, Drawer } from 'antd-mobile';

import * as ResTypes from '../../types/response';

import './Shop.scss';

type StateType = {
    menu: ResTypes.MenuData[];
    foods: ResTypes.MenuData | null;
    detail: ResTypes.ShopData | null;
    initList: ResTypes.ShopData[];
    foodList: ResTypes.ShopData[];
    selectList: ResTypes.ShopData[];
    selected: number;
    totalPrice: number;
    miniPrice: number;
    count: number;
    open: boolean;
    animate: string;
    timer: number | null;
};

class Shop extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false, // 弹窗
            timer: null,
            foods: null, // 菜单信息
            detail: null, // 商家信息
            menu: [], // 菜单类型
            initList: [], // 初始化列表
            foodList: [],
            selectList: [],
            selected: 0,
            totalPrice: 0, // 总价
            miniPrice: 0,
            count: 0,
            animate: 'cart',
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
            const foodList = this.setFoodList(menu);
            this.setState({
                detail: res,
                menu,
                foodList,
                foods: menu[0],
                count: 0,
                initList: fromJS(foodList).toJS(),
                miniPrice: res.float_minimum_order_amount,
            });
        } catch (error) {
            console.log(error);
        }
    };

    setNumOfMenu = (menu: ResTypes.MenuData[]) => {
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

    setFoodList = (menu: ResTypes.MenuData[]): ResTypes.ShopData[] => {
        let list: ResTypes.ShopData[] = [];
        menu.forEach((item) => {
            list.push(...item.foods);
        });
        return list;
    };

    getBadge = (value: { icon_name: string; icon_color: string }[]): boolean => {
        return !!value.find((item) => item.icon_name === '新');
    };

    onSelected = (index: number) => {
        this.setState({
            selected: index,
            foods: this.state.menu[index],
        });
    };

    changeNum = (e: number, item: ResTypes.ShopData) => {
        const foods = this.state.foodList;
        const index = foods.findIndex((e) => e._id === item._id);
        foods[index].qty = e;

        console.log('e', e);
        let list = [];
        list = foods.filter((item) => item.qty > 0);

        let total = 0;
        list.forEach((item) => {
            total = total + item.specfoods[0].price * item.qty;
        });

        this.props.saveGoods(list);

        if (!list.length) {
            this.clear();
        }

        this.setState({
            foodList: foods,
            selectList: list,
            totalPrice: total,
            animate: this.state.animate + ' cart-animate',
            miniPrice: (this.state.detail && this.state.detail.float_minimum_order_amount - total) ?? 20,
        });
        const timer = setTimeout(() => {
            this.setState({
                animate: 'cart',
            });
        }, 200);
        this.setState({
            timer,
        });
    };

    clear = () => {
        this.setState({
            foodList: fromJS(this.state.initList).toJS(),
            totalPrice: 0,
            miniPrice: this.state.detail ? this.state.detail.float_minimum_order_amount : 20,
            count: 0,
            selectList: [],
            open: false,
        });
        this.props.saveGoods([])
    };

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        this.state.timer && clearTimeout(this.state.timer);
        this.setState({
            timer: null,
        });
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    render() {
        const tabs = [{ title: '商品' }, { title: '评价' }];
        const { detail, menu, selected, foods, miniPrice, selectList, totalPrice, animate, foodList } = this.state;

        const sidebar = (
            <div>
                <div className='title-box'>
                    <span>购物车</span>
                    <span onClick={this.clear}>清空</span>
                </div>
                <ul>
                    {selectList.length
                        ? selectList.map((element, index) => {
                              return (
                                  <li key={index}>
                                      <div>{element.specfoods[0].name}</div>
                                      <div>
                                          <span>¥{element.specfoods[0].price}</span>
                                          <Stepper
                                              showNumber
                                              value={foodList[element.num].qty}
                                              defaultValue={foodList[element.num].qty}
                                              min={0}
                                              onChange={(e) => {
                                                  this.changeNum(e, element);
                                              }}
                                          />
                                      </div>
                                  </li>
                              );
                          })
                        : null}
                </ul>
                <div className='block'></div>
            </div>
        );

        return (
            <div>
                {/* 商家信息 */}
                {detail && Object.keys(detail).length ? (
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
                ) : (
                    <ShopHeaderSkeleton history={this.props.history} />
                )}

                {/* load页面 */}
                {menu && !menu.length ? (
                    <div className='detail-loader-box'>
                        <Loader />
                    </div>
                ) : null}

                {/* 选中弹窗 */}
                <Drawer
                    className='order-drawer'
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    position='bottom'
                    open={this.state.open}
                >
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
                            {menu && menu.length ? (
                                <div className='content'>
                                    <ul className='nav'>
                                        {Array.isArray(menu) && menu.length
                                            ? menu.map((item, index) => {
                                                  return (
                                                      <li
                                                          className={classnames({ active: selected === index })}
                                                          key={item.id}
                                                          onClick={() => {
                                                              this.onSelected(index);
                                                          }}
                                                      >
                                                          {item.name}
                                                      </li>
                                                  );
                                              })
                                            : null}
                                    </ul>
                                    <div className='good-list'>
                                        <h3>
                                            {foods && (foods.name ?? '默认')}
                                            <span>{foods && foods.description}</span>
                                        </h3>

                                        <ul>
                                            {foods && Array.isArray(foods.foods) && foods.foods.length
                                                ? foods.foods.map((item: any, index: number) => {
                                                      return (
                                                          <li key={item._id}>
                                                              <Badge
                                                                  text={this.getBadge(item.attributes) ? '新' : ''}
                                                                  corner
                                                              >
                                                                  <img src={imgUrl + item.image_path} alt='菜品' />
                                                                  <div>
                                                                      <h5>
                                                                          {item.name}
                                                                          {this.getBadge(item.attributes)
                                                                              ? null
                                                                              : Array.isArray(item.attributes) &&
                                                                                item.attributes.length
                                                                              ? item.attributes.map(
                                                                                    (i: any, index: number) => {
                                                                                        return (
                                                                                            <span
                                                                                                style={{
                                                                                                    color: `#${i.icon_color}`,
                                                                                                }}
                                                                                                key={index}
                                                                                            >
                                                                                                {i.icon_name}
                                                                                            </span>
                                                                                        );
                                                                                    }
                                                                                )
                                                                              : null}
                                                                      </h5>
                                                                      <p>{item.description}</p>
                                                                      <p>{item.tips}</p>
                                                                      <span
                                                                          style={{
                                                                              color: `#${
                                                                                  item.activity &&
                                                                                  item.activity.image_text_color
                                                                              }`,
                                                                          }}
                                                                      >
                                                                          {item.activity && item.activity.image_text}
                                                                      </span>
                                                                      <div>
                                                                          <span className='good-price'>
                                                                              ￥{item.specfoods[0].price}
                                                                              {Array.isArray(item.specifications) &&
                                                                              item.specifications.length
                                                                                  ? '起'
                                                                                  : ''}
                                                                          </span>
                                                                          <Stepper
                                                                              defaultValue={foodList[item.num].qty}
                                                                              value={foodList[item.num].qty}
                                                                              showNumber
                                                                              min={0}
                                                                              onChange={(e) => {
                                                                                  this.changeNum(e, item);
                                                                              }}
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </Badge>
                                                          </li>
                                                      );
                                                  })
                                                : null}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className='content'>
                                    <ShopDetailSkeleton />
                                </div>
                            )}

                            <div className='content'>Content of second tab</div>
                        </Tabs>
                    </main>
                </Drawer>

                {/* 下单 */}
                <footer>
                    <div className='pay-price'>
                        <div
                            className={animate}
                            style={{ backgroundColor: selectList.length ? '#3190e8' : '#3d3d3f' }}
                            onClick={() => {
                                selectList.length && this.setState({ open: !this.state.open });
                            }}
                        >
                            {selectList.length ? (
                                <Badge
                                    text={selectList.length}
                                    style={{ position: 'absolute', top: '-11.2vw', left: '6.4vw' }}
                                />
                            ) : null}
                            <img src={CartIcon} alt='购物车' />
                        </div>
                        <div className='pay-num'>
                            <h3>￥{totalPrice}</h3>
                            <p>配送费¥{detail && detail.float_delivery_fee}</p>
                        </div>
                    </div>
                    {miniPrice <= 0 ? (
                        <div className='pay-btn gopay-btn' onClick={() => {this.props.history.push('/order')}}>去结算</div>
                    ) : (
                        <div className='pay-btn'>还差¥{miniPrice}起送</div>
                    )}
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

const mapDiatchToProps = (dispatch: any) => {
    return {
        saveGoods: (data: any) => {
            dispatch(saveGoods(data));
        },
    };
};

export default connect(mapStateToProps, mapDiatchToProps)(Shop);
