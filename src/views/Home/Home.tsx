import React from 'react';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';

import { Carousel } from 'antd-mobile';
import { getFoodTypes, getPoisSite, cityGuess } from '../../api/api';
import { type } from 'os';

type HomeState = {
    geohash: string[];
    foodsType: string[];
    title: string;
    text: string;
    imgBaseUrl: string;
};
export default class Home extends React.Component<null, HomeState> {
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
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.cityGuess();
    }

    render() {
        return (
            <div>
                <Header />

                <div className='content'>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={(index) => console.log('slide to', index)}
                    >
                        <div className='menu'></div>
                    </Carousel>
                </div>

                <Navigation />
            </div>
        );
    }
}
