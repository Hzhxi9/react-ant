import React from 'react';

import { Icon } from 'antd-mobile';

import { History } from 'history';

import '../assets/styles/index.scss';

export default function ShopHeaderSkeleton(props: { history: History }) {
    return (
        <div className='header-skeleton'>
            <Icon
                type='left'
                size='lg'
                color='#FFF'
                style={{ position: 'absolute', left: '0', top: '0', zIndex: 10 }}
                onClick={() => {
                    props.history.goBack();
                }}
            />
            <div>
                <div className='img-skeleton'></div>
                <div className='text-skeleton'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <Icon
                    type='right'
                    color='#FFF'
                    size='md'
                    style={{ position: 'absolute', right: '2vw', bottom: '10.667vw' }}
                />
            </div>
        </div>
    );
}
