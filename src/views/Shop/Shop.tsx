import React from 'react';
import classnames from 'classnames';
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
            foods: [],
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
            this.setState({
                detail: res,
                menu,
                foods: menu[0],
            });
        } catch (error) {
            console.log(error);
        }
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

    getBadge = (value: { icon_name: string; icon_color: string }[]): boolean => {
        return !!value.find((item) => item.icon_name === '新');
    };

    onSelected = (index: number) => {
        console.log(index);
        this.setState({
            selectd: index,
            foods: this.state.menu[index],
        });
    };

    changeNum = (e: Event, index: number) => {
        const foods = this.state.foods;
        foods.foods[index].num = e;
        this.setState({
            foods,
        });
    };

    componentDidMount() {
        this.init();
    }

    render() {
        const tabs = [{ title: '商品' }, { title: '评价' }];
        const { detail, menu, selectd, foods } = this.state;
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
                                    {foods.name ?? '默认'}
                                    <span>{foods.description}</span>
                                </h3>

                                <ul>
                                    {Array.isArray(foods.foods) && foods.foods.length
                                        ? foods.foods.map((item: any, index: number) => {
                                              return (
                                                  <li key={item._id}>
                                                      <Badge text={this.getBadge(item.attributes) ? '新' : ''} corner>
                                                          <img src={imgUrl + item.image_path} alt='菜品' />
                                                          <div>
                                                              <h5>
                                                                  {item.name}
                                                                  {this.getBadge(item.attributes)
                                                                      ? null
                                                                      : Array.isArray(item.attributes) &&
                                                                        item.attributes.length
                                                                      ? item.attributes.map((i: any, index: number) => {
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
                                                                        })
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
                                                                      showNumber
                                                                      defaultValue={item.qty}
                                                                      min={0}
                                                                      onChange={(e) => {
                                                                          this.changeNum(e, index);
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
