import React from 'react';

export default class FoodTypeSkeleton extends React.Component {
    render() {
        return (
            <ul className='food-skeleton'>
                {new Array(8).fill(undefined).map((_, index) => {
                    return (
                        <li key={index}>
                            <div></div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
