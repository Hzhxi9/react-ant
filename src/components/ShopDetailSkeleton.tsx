import React from 'react';

import '../assets/styles/index.scss';

export default function ShopDetailSkeleton() {
    return (
        <div className='detail-skeleton'>
            <ul>
                {new Array(8).fill(undefined).map((_, index) => (
                    <li key={index}>
                        <div></div>
                    </li>
                ))}
            </ul>
            <div className='list-skeleton'>
                <div></div>
                <ul>
                    {new Array(3).fill(undefined).map((_, index) => {
                        return (
                            <li key={index}>
                                <div className='list-icon'></div>
                                <div className='list-detail'>
                                    {new Array(5).fill(undefined).map((_, i) => (
                                        <p key={i}></p>
                                    ))}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
