import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import { getCommentData } from '../../../fetch/detail/detai';

import './style.less';
import CommentList from '../../../components/CommentList';
import LoadMore from '../../../components/LoadMore';

class Comment extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            page: 1,
            hasMore: false,
            isLoadingMore: false
        }

    }

    render () {

        return (
            <div className="comment-list-container">
                <h2>用户评价</h2>
                {
                    this.state.data.length
                    ? <CommentList data={this.state.data}/>
                    : ''
                }
                {
                    this.state.isLoadingMore
                    ? <p>加载中</p>
                    : <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                }

            </div>
        )
    }

    //加载首屏数据
    componentDidMount() {
        this.loadFristPageData();
    }

    //加载首屏处理函数
    loadFristPageData () {
        const id = this.props.id;
        const result = getCommentData(0, id);
        this.resultHandle(result);
    }

    //加载更多处理函数
    loadMoreData () {
        //更改加载状态
        this.setState({
            isLoadingMore: true
        });

        const page = this.state.page;
        const id = this.props.id;
        const result = getCommentData(page, id);
        this.resultHandle(result);
        //增加页数,并更改加载状态
        this.setState({
            isLoadingMore: false,
            page: page + 1
        })
    }

    //fetch救过处理函数
    resultHandle (result) {
        result.then(res => {
            return res.json();
        }).then(json => {
            const hasMore = json.hasMore;
            const data = json.data;

            this.setState({
               hasMore: hasMore,
                data: this.state.data.concat(data)
            });
        })
    }


}

export default Comment;