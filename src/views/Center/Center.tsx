import React from 'react';
import QueueAnim from 'rc-queue-anim'; // 进场动画

import Header from '../../components/Header';
import UserIcon from '../../assets/images/face.png';
import PhoneIcon from '../../assets/images/phone1.png';

import { is, fromJS } from 'immutable';
import { getStore, getImgPath, clearStore } from '../../utils';
import { getUserInfo, uploadImg } from '../../api/api';
import { saveUserInfo, modifyUserInfo } from '../../actions/user';
import { connect } from 'react-redux';
import { imgUrl } from '../../configs/envconfig';
import { List, Button, WingBlank, WhiteSpace, Modal, Toast } from 'antd-mobile';

import './Center.scss';

class Center extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            files: '',
        };
    }

    getUserInfo = async () => {
        if (!getStore('user_id')) return;
        try {
            const user = await getUserInfo(getStore('user_id'));
            user.imgpath = user.avatar.indexOf('/') !== -1 ? '/img/' + user.avatar : getImgPath();
            this.props.saveUserInfo(user);
        } catch (error) {
            console.log(error);
        }
    };

    upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const files = e.target.files as FileList;
        const maxSize = 1024 * 1024 * 3;
        let fs = new FormData();

        if (files && files[0]) {
            const file = files[0];
            if (file.size > maxSize) {
                Toast.fail('图片大小不能超过3M');
                input.value = '';
                return;
            } else {
                try {
                    fs.append('file', file);
                    const res = await uploadImg(fs);
                    if (res.status === 1) {
                        Toast.success('修改头像成功');
                        this.props.modifyUserInfo('imgpath', imgUrl + res.image_path);
                    }
                } catch (error) {
                    console.log(error, 'error');
                }
            }
        }
    };

    logout = async () => {
        clearStore();
        this.props.saveUserInfo(null);
        Toast.success('登出成功');
        this.props.history.push('/home');
    };

    componentDidCatch() {
        this.getUserInfo();
    }

    // 判断是否要更新render, return true 更新  return false不更新
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    render() {
        const { user } = this.props;

        const Item = List.Item;
        const alert = Modal.alert;

        const logoutAlert = () => {
            const alertInstance = alert('', '确认退出登录吗', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确定', onPress: this.logout },
            ]);
            return alertInstance;
        };

        return (
            <div>
                <Header title={'账号信息'} leftIcon history={this.props.history} />
                <div className='content'>
                    <QueueAnim>
                        <List className='my-list' renderHeader={() => ''} key='1'>
                            <Item
                                extra={
                                    <div>
                                        <img
                                            className='user-icon'
                                            src={user && user.imgpath ? user.imgpath : UserIcon}
                                            alt='头像'
                                        />
                                        <input
                                            type='file'
                                            className='file-input'
                                            accept='image/*'
                                            onChange={this.upload}
                                        ></input>
                                    </div>
                                }
                                style={{ height: '19.467vw' }}
                                arrow='horizontal'
                            >
                                头像
                            </Item>
                            <Item extra={user && user.username} arrow='horizontal' onClick={() => {}}>
                                用户名
                            </Item>
                            <Item arrow='horizontal' onClick={() => {}}>
                                收货地址
                            </Item>
                        </List>
                        <List className='my-list' renderHeader={() => '账号绑定'} key='2'>
                            <Item
                                extra={user && user.mobile ? user.mobile : '暂未绑定手机'}
                                arrow='horizontal'
                                thumb={PhoneIcon}
                                onClick={() => {}}
                            >
                                手机
                            </Item>
                        </List>
                        <List className='my-list' renderHeader={() => '安全设置'} key='3'>
                            <Item extra='修改' arrow='horizontal' onClick={() => {}}>
                                登录密码
                            </Item>
                        </List>

                        <WingBlank>
                            <WhiteSpace />
                            <Button type='warning' onClick={logoutAlert}>
                                退出登录
                            </Button>
                        </WingBlank>
                    </QueueAnim>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user.userInfo,
    };
};

const mapPatchToProps = (patch: any) => {
    return {
        saveUserInfo: (value: any) => {
            patch(saveUserInfo(value));
        },
        modifyUserInfo: (key: string, value: string) => {
            patch(modifyUserInfo({ key, value }));
        },
    };
};

export default connect(mapStateToProps, mapPatchToProps)(Center);
