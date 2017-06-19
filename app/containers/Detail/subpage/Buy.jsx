import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import * as storeActionsFromOtherFile from '../../../actions/store';

import BuyAndStore from '../../../components/BuyAndStore';

class Buy extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }

    render () {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore}
                             storeHandleFn={this.storeHandle.bind(this)}
                             buyHandleFn={this.buyHandle.bind(this)}/>
            </div>
        )
    }

    componentDidMount () {
        this.checkStoreState();
    }
    //检查保存状态
    checkStoreState () {
        const id = this.props.id;
        const store = this.props.store;

        //some方法, 只要有一个满足就可以
        store.some(item => {
            if(item.id === id) {
                this.setState({
                    isStore: true
                });
                //跳出循环(一旦返回true就跳出循环)
                return true;
            }
        })
    }

    //收藏功能实现
    storeHandle () {
        const loginFlag = this.loginCheck();
        if(!loginFlag) {
            return;
        }

        const id = this.props.id;
        const storeActions = this.props.storeActions;
        if(this.state.isStore) {
            //已经收藏, 点击取消收藏
            storeActions.fm({id: id});
        } else {
            //尚未收藏, 点击添加收藏
            storeActions.add({id: id});
        }

        //修改状态
        this.setState({
            isStore: !this.state.isStore
        })

    }

    //购买的功能实现
    buyHandle () {
        const loginFlag = this.loginCheck();
        if(!loginFlag) {
            return;
        }

        //购买流程

        //跳转到用户中心
        hashHistory.push('/user');
    }

    //验证登录
    loginCheck () {
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if(!userinfo.username) {
            hashHistory.push('/login/'+  encodeURIComponent('/detail/' + id));
            return false;
        }

        return true;

    }

}

//----------------------------------- react redux ----------------------------------------------------------------------
function mapStateToProps(state) {
    return {
        userinfo:  state.userinfo,//后边的userinfo和store要和reducers文件夹下的index.js里命名的reducer一致
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy);