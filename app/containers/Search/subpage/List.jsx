import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import { getSearchData } from '../../../fetch/search/search';

import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

const initialState = {
    data: [],
    hasMore: false,
    page: 1,
    isLoadingMore: false
};

class List extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState
    }

    render () {
        return (
            <div>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    : <p>正在加载...</p>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : ''
                }


            </div>
        )
    }

    //加载首页list用这个钩子
    componentDidMount() {
        console.log(this.props.category);
        this.loadFirstPageData();
    }

    //这个钩子用来搜索关键字
    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword;
        const category = this.props.category;
        if(keyword === prevProps.keyword && category === prevProps.category ) {
            return;
        }

        //重置state
        this.setState(initialState);
        //加载首页
        this.loadFirstPageData();
    }

    //加载首页列表
    loadFirstPageData () {
        const cityName = this.props.cityName;
        const category = this.props.category;
        const keyword = this.props.keyword;
        const result = getSearchData(0, cityName, category, keyword);
        this.resultHandle(result);
    }


    //加载更多
    loadMoreData () {
        //更改加载中状态
        this.setState({
            isLoadingMore: true
        });
        //获取数据
        const cityName = this.props.cityName;
        const category = this.props.category;
        const keyword = this.props.keyword;
        const page = this.state.page;
        const result = getSearchData(page, cityName, category, keyword);
        //处理数据
        this.resultHandle(result);
        this.setState({
            isLoadingMore: false,
            page: page + 1
        })
    }

    //fetch结果处理
    resultHandle(result){
        result.then(res => {
            return res.json()
        }).then(json => {
            console.log(json, 'search');
            const hasMore = json.hasMore;
            const data = json.data;
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })
        })
    }

}

export default List;