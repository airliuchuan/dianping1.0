import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';
import { getListData } from '../../../fetch/home/home';//fetch方法
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

class List extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],//存储数据列表
            hasMore: false,//记录还能否加载更多数据
            page: 1,//下一页的页码
            isLoadingMore: false//记录当前状态是'加载中...' 还是 '加载更多'
        }
    }

    render () {
        const data = this.state.data;
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    data.length
                    ? <ListComponent data={data}/>
                    : <p>正在加载...</p>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreHandle.bind(this)}/>
                    : ''
                }
            </div>
        )
    }

    componentDidMount () {
        //获取首页数据
        this.loadFirstPageData();
    }
    //加载首屏数据
    loadFirstPageData () {
        const cityName = this.props.className;
        const result = getListData(cityName, 0);
        this.resultHandle(result);
    }
    //加载更多数据
    loadMoreHandle () {
        this.setState({
           isLoadingMore: true
        });
        const cityName = this.props.cityName;
        const page = this.state.page;
        const result = getListData(cityName, page);
        this.resultHandle(result);

        setTimeout(() => {
            this.setState({
                page: page + 1,
                isLoadingMore: false
            });
        },200)


    }
    //处理fetch回来的数据
    resultHandle (result) {
        result.then((res) => {
            return res.json();
        }).then((json) => {
            const data = json.data;
            const hasMore = json.hasMore;
            this.setState({
                data: this.state.data.concat(data),
                hasMore: hasMore
            })
        })
    }


}

export default List;