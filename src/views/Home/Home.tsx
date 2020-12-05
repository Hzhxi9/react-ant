import React, { Dispatch } from 'react';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';

import { connect } from 'react-redux';
import { Carousel } from 'antd-mobile';
import { getFoodTypes, getPoisSite, cityGuess } from '../../api/api';
import { saveAttrInfo } from '../../actions/user';

import * as ResType from '../../types/response';

type HomeState = {
    geohash: string[];
    foodsType: ResType.FootTypeData[][];
    title: string;
    text: string;
    imgBaseUrl: string;
};
class Home extends React.Component<{ saveAttrInfo: Dispatch<{ dataType: string; value: string[] }> }, HomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            geohash: [],
            foodsType: [],
            title: '',
            text: '',
            imgBaseUrl: '',
        };
    }

    /**
     * 获取食物种类
     */
    getFoodTypes = async () => {
        try {
            const data = {
                geohash: this.state.geohash,
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

    render() {
        const { title, foodsType } = this.state;

        return (
            <div>
                <Header title={title} />

                <div className='content'>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={(index) => console.log('slide to', index)}
                    >
                        {foodsType.map((element, index) => {
                            return (
                                <div className='menu' key={index}>
                                    {element.map((item, i) => {
                                        return <div key={i}>{item.title}</div>;
                                    })}
                                </div>
                            );
                        })}
                    </Carousel>
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
