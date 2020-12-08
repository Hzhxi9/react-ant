import React, { Dispatch } from 'react';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import ShopList from '../../components/ShopList';
import Loader from '../../components/Loader';
import FoodTypeSkeleton from '../../components/FoodTypeSkeleton';
import ShopListSkeleton from '../../components/ShopListSkeleton';

import { connect } from 'react-redux';
import { Carousel } from 'antd-mobile';
import { saveAttrInfo } from '../../actions/user';
import { is, fromJS } from 'immutable';
import { getFoodTypes, getPoisSite, cityGuess, getShopList } from '../../api/api';

import { History } from 'history';

import * as ResType from '../../types/response';

import './Home.scss';

type HomeState = {
    geohash: string[];
    foodsType: ResType.FootTypeData[][];
    shopList: ResType.ShopData[];
    title: string;
    imgBaseUrl: string;
};
class Home extends React.Component<
    { saveAttrInfo: Dispatch<{ dataType: string; value: string[] }>; history: History },
    HomeState
> {
    constructor(
        props:
            | { saveAttrInfo: React.Dispatch<{ dataType: string; value: string[] }>; history: History }
            | Readonly<{
                  saveAttrInfo: React.Dispatch<{ dataType: string; value: string[] }>;
                  history: History;
              }>
    ) {
        super(props);
        this.state = {
            geohash: [],
            foodsType: [],
            shopList: [],
            title: '正在获取...',
            imgBaseUrl: 'https://fuss10.elemecdn.com',
        };
    }

    /**
     * 获取食物种类
     */
    getFoodTypes = async () => {
        try {
            const data = {
                geohash: this.state.geohash.join(),
                'flag[]': 'F',
                group_type: 1,
            };
            const res = await getFoodTypes(data);

            const resLength = res.length;
            const resArr = [...res];
            const foodArr = [];

            for (let i = 0, j = 0; i < resLength; i += 8, j++) {
                foodArr[j] = resArr.splice(0, 8);
            }
            this.setState({
                foodsType: foodArr,
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 根据经纬度获取地点信息
     */
    getPoisSite = async (geohash: string) => {
        try {
            const res = await getPoisSite(geohash);
            this.setState({
                title: res.name,
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 获取经纬度
     */
    cityGuess = async () => {
        try {
            const res = await cityGuess({ type: 'guess' });
            this.setState({
                geohash: [res.latitude, res.longitude],
            });
            this.props.saveAttrInfo({ dataType: 'geohash', value: [res.latitude, res.longitude] });
            this.getPoisSite(this.state.geohash.join());
            this.getFoodTypes();
            this.getShopList(this.state.geohash);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 获取商家列表
     */
    getShopList = async (geohash: string[]) => {
        try {
            const data = {
                latitude: geohash[0],
                longitude: geohash[1],
            };
            const res = await getShopList(data);
            this.setState({
                shopList: res,
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
     */
    componentDidMount() {
        this.cityGuess();
    }

    /**
     * 判断是否要更新render, return true 更新  return false不更新
     */
    shouldComponentUpdate(nextProps: any, nextState: any): boolean {
        let refresh = !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
        return refresh;
    }

    render() {
        const { title, foodsType, imgBaseUrl, shopList } = this.state;

        return (
            <div>
                <Header title={title} rightIcon history={this.props.history} />

                <div className='content'>
                    {foodsType.length ? (
                        <Carousel autoplay={false} infinite>
                            {foodsType.map((element, index) => {
                                return (
                                    <ul className='food-list' key={index}>
                                        {element.map((item, i) => {
                                            return (
                                                <li className='food-item' key={i}>
                                                    <img src={imgBaseUrl + item.image_url} alt={item.title} />
                                                    <p>{item.title}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            })}
                        </Carousel>
                    ) : (
                        <FoodTypeSkeleton />
                    )}

                    <div className='shop'>{shopList.length ? <ShopList list={shopList} /> : <ShopListSkeleton />}</div>

                    {!foodsType.length ? (
                        <div className='loader-box'>
                            <Loader />
                        </div>
                    ) : null}
                </div>

                <Navigation />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveAttrInfo: ({ dataType, value }: { dataType: string; value: string[] }) =>
            dispatch(saveAttrInfo({ dataType, value })),
    };
};

export default connect(null, mapDispatchToProps)(Home);
