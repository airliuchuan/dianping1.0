import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';

class LoadMore extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="load-more" ref='wrapper'>
                {
                    this.props.isLoadingMore
                    ? <span>正在加载...</span>
                    : <p onClick={this.loadMoreHandle.bind(this)}>加载更多</p>
                }

            </div>
        )
    }

    componentDidMount () {

        let timeoutId;//做截流,滚一次, 触发一次

        const loadMoreFn = this.props.loadMoreFn;

        //获取真实的domwrapper
        const wrapper = this.refs.wrapper;

        function callback () {
            //判断wrapper距离顶部的距离
            const top = wrapper.getBoundingClientRect().top;
            //获取屏幕高度的分辨率
            const windowHeight = window.screen.height;
            //判断条件
            if(top && top < windowHeight) {
                loadMoreFn();
            }
        }

        //监听scroll事件
        window.addEventListener('scroll', function() {
            if(this.props.isLoadingMore) {
                return;
            }
            //作截流, 一次滑动值打印一次
            if(timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(callback, 50);

        }.bind(this), false)
    }

    loadMoreHandle () {
        this.props.loadMoreFn();
    }

}

export default LoadMore;