import React from 'react';
import Header from '../../components/Header';

import { List, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

class Login extends React.Component<any, any> {
    [x: string]: any;
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.autoFocusInst.focus();
    }
    handleClick = () => {
        this.inputRef.focus();
    };
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <Header title={'密码登录'} />
                <div className='content'>
                    <WhiteSpace />
                    <WingBlank>
                        <List>
                            <InputItem
                                {...getFieldProps('autofocus')}
                                clear
                                placeholder='auto focus'
                                ref={(el: any) => (this.autoFocusInst = el)}
                            >
                                账号
                            </InputItem>
                            <InputItem
                                {...getFieldProps('focus')}
                                clear
                                placeholder='click the button below to focus'
                                ref={(el: any) => (this.inputRef = el)}
                            >
                                密码
                            </InputItem>
                            <InputItem
                                {...getFieldProps('focus')}
                                clear
                                placeholder='click the button below to focus'
                                ref={(el: any) => (this.inputRef = el)}
                            >
                                验证码
                            </InputItem>
                            <List.Item>
                                <div
                                    style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                                    onClick={this.handleClick}
                                >
                                    click to focus
                                </div>
                            </List.Item>
                        </List>
                    </WingBlank>
                </div>
            </div>
        );
    }
}
const LoginWrapper = createForm()(Login);
export default LoginWrapper;
