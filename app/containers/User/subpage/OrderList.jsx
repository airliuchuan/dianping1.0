import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import { getOrderListData, postComment } from '../../../fetch/user/orderlist';

import './style.less';

import OrderListComponent from '../../../components/OrderList'

class OrderList extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }

    render () {
        return (
            <div className="order-list-container">
                <h2>我的订单</h2>
                {
                    this.state.data
                    ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                    : <p>加载中...</p>
                }

            </div>
        )
    }

    componentDidMount() {
        this.loadOrderListData();
    }

    //fetch获取已购买订单信息
    loadOrderListData() {
        const username = this.props.username;
        const result = getOrderListData(username);
        this.resultHandle(result);
    }

    //提交评论处理函数将这个函数传到component=>item
    submitComment (id, value, callback) {
        postComment(id, value).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            if(json.erron === 0) {
                callback()
            }
        })
    }

    //处理fetch获取的数据
    resultHandle (result) {
        result.then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                data: json
            })
        })
    }
}

export default OrderList;