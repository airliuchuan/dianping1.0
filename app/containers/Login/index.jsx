import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import * as useinfoActionsFromOtherFile from '../../actions/userinfo';

import Header from '../../components/Header';
import LoginComponent from '../../components/LoginComponent';

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }

    render () {
        return (
            <div>
                <Header title="登录"/>
                {
                    this.state.checking
                    ? <p>检测中...</p>
                    : <LoginComponent loginHandleFn={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }

    componentDidMount () {
        this.onCheck()
    }

    //登录成功后的处理
    loginHandle (username) {
        //业务逻辑不要在component里写, component里值实现功能

        //保存用户名
        const actions = this.props.userinfoActions;
        let userinfo = this.props.userinfo;
        userinfo.username = username;
        actions.update(userinfo);
        console.log(userinfo);
        //跳转路由
        const router = this.props.params.router;

        if(router) {
            hashHistory.push(router);
        } else {
            this.goUserPage();
        }
    }

    onCheck () {
        const userinfo = this.props.userinfo;
        if( userinfo.username) {
            //显示用户中心
            this.goUserPage();
        } else {
            //显示登录界面
            this.setState({
                checking: false
            })
        }
    }

    goUserPage() {
        hashHistory.push('/user');
    }

}

//----------------------------------------------react redux----------------------------------------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(useinfoActionsFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);