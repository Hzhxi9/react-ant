import React from 'react';

export default class ShopListSkeleton extends React.Component {
    render() {
        return (
            <div className='shop-skeleton'>
                <h3></h3>
                <ul>
                    {new Array(4).fill(undefined).map((_, index) => {
                        return (
                            <li key={index}>
                                <div></div>
                                <div>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
