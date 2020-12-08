import React from 'react';
import Header from '../../components/Header';
import Animate from 'rc-animate';

import { List, InputItem, WhiteSpace, WingBlank, Button, Switch, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getCaptchaCode, login } from '../../api/api';
import { setStore, getImgPath } from '../../utils';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../actions/user';
import { withRouter } from 'react-router-dom';

import './Login.scss';
import '../../assets/styles/animate.scss';

type StateType = {
    isPassword: boolean;
    code: string; // 验证码地址
    captcha_code: number | undefined; //验证码
    username: string;
    password: string;
};

class Login extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            isPassword: true,
            code: '',
            captcha_code: undefined,
            username: 'login@123.com',
            password: '111',
        };
    }

    getCode = async () => {
        try {
            const res = await getCaptchaCode();
            this.setState({
                code: res.code,
            });
        } catch (error) {
            console.log(error);
        }
    };

    login = async () => {
        try {
            const { captcha_code, username, password } = this.state;
            if (!username.length || !password.length || !captcha_code) {
                Toast.fail('请填写信息');
                return;
            }
            const data = {
                username,
                password,
                captcha_code: captcha_code ?? 0,
            };
            const user = await login(data);

            if (user.status === 0) {
                Toast.fail(user.message);
            } else {
                Toast.success('登录成功');
                setStore('user_id', user.user_id);
                user.imgpath = user.avatar.indexOf('/') !== -1 ? '/img/' + user.avatar : getImgPath();
                this.props.saveUserInfo(user);
                this.props.history.push('/mine');
            }
        } catch (error) {
            if (error.status) {
                Toast.fail(error.message);
            }
        }
    };

    componentDidMount() {
        this.getCode();
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { isPassword, captcha_code, username, password, code } = this.state;

        return (
            <div>
                <Header title={'密码登录'} leftIcon history={this.props.history} />
                <Animate transitionName='fadeIn'>
                    <div className='content'>
                        <WhiteSpace />
                        <WingBlank>
                            <List>
                                <InputItem
                                    {...getFieldProps('autofocus')}
                                    clear
                                    placeholder='账号'
                                    value={username}
                                    onChange={(value: string) => this.setState({ username: value })}
                                ></InputItem>
                                <InputItem
                                    {...getFieldProps('focus')}
                                    clear
                                    placeholder='密码'
                                    type={isPassword ? 'password' : 'text'}
                                    value={password}
                                    onChange={(value: string) => this.setState({ password: value })}
                                    extra={
                                        <Switch
                                            {...getFieldProps('Switch8', {
                                                initialValue: true,
                                                valuePropName: 'checked',
                                            })}
                                            onClick={(checked: boolean) => {
                                                this.setState({ isPassword: checked });
                                            }}
                                        />
                                    }
                                ></InputItem>
                                <InputItem
                                    {...getFieldProps('focus')}
                                    clear
                                    placeholder='验证码'
                                    value={captcha_code}
                                    type='number'
                                    maxLength='6'
                                    onChange={(value: number) => this.setState({ captcha_code: value })}
                                    extra={
                                        <div className='code'>
                                            <img src={code} alt='验证码' />
                                            <div onClick={this.getCode}>
                                                <p>看不清</p>
                                                <p>换一张</p>
                                            </div>
                                        </div>
                                    }
                                ></InputItem>
                            </List>
                            <Button type='primary' style={{ marginTop: '10px' }} onClick={this.login}>
                                登录
                            </Button>
                        </WingBlank>
                    </div>
                </Animate>
            </div>
        );
    }
}
const LoginWrapper = createForm()(Login);

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveUserInfo: (value: any) => {
            dispatch(saveUserInfo(value));
        },
    };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginWrapper));
