import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Userinfo from '../../components/Userinfo';
import OrderList from './subpage/OrderList';

class User extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div>
                <Header title="个人中心" backRouter="/"/>
                <Userinfo userinfo={this.props.userinfo} />
                <div style={{height: '15px'}}></div>
                <OrderList username={this.props.userinfo.username}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(Dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);