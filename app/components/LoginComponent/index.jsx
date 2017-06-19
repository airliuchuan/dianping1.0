import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';

class LoginComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            phone: ''
        }
    }

    render () {
        return (
            <div className="login-container">
                <div className="input-container">
                    <i className="icon-tablet"></i>
                    <input type="text"
                           placeholder="请输入手机号"
                           onChange={this.changeHandle.bind(this)}
                           value={this.state.phone}/>
                </div>
                <div className="input-container clear-fix">
                    <i className="icon-key"></i>
                    <input type="text"
                           placeholder="请输入验证码"/>
                    <button className="code float-right">发送验证码</button>
                </div>
                <button onClick={this.clickHandle.bind(this)} className="btn">登录</button>
            </div>
        )
    }

    changeHandle(e) {
        this.setState({
            phone: e.target.value
        })
    }

    clickHandle() {
        const username = this.state.phone;
        const loginHandleFn = this.props.loginHandleFn;
        loginHandleFn(username);
    }
}

export default LoginComponent;