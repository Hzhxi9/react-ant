import React from 'react';

/**
 * 异步加载模块
 */

export default function asyncComponent(importComponent: () => PromiseLike<{ default: any }> | { default: any }) {
    class AsyncComponent extends React.Component<any, { component: any }> {
        constructor(props: any) {
            super(props);

            this.state = {
                component: null,
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({ component });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}
