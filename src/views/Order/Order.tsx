import React from 'react';

import { connect } from 'react-redux';

class Order extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ul>
                {this.props.goods.map((item: any, index: number) => {
                    return <li key={index}> {item.specfoods[0].name}</li>;
                })}
            </ul>
        );
    }
}

const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        goods: state.goods,
    };
};

export default connect(mapStateToProps)(Order);
