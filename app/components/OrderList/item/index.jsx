import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';

class Item extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 2 //0-未评论 1-正在评论 2-已评论
        }
    }

    render () {

        const data = this.props.data;
        console.log(data);

        return (
            <div className="clear-fix order-item-container">
                <div className="float-left order-item-img">
                    <img src={data.img} alt="data.title"/>
                </div>
                <div className="order-list-comment float-right">
                    {
                        this.state.commentState === 0
                        ? <button className="btn" onClick={this.showCommentHandle.bind(this)}>评价</button>
                        : this.state.commentState === 1
                        ? ''
                        : <button className="btn unselected">已评价</button>
                    }

                </div>
                <div className="order-item-content">
                    <span>商户: {data.title}</span>
                    <span>数量: {data.count}</span>
                    <span>价格: ¥{data.price}</span>
                </div>
                <div className="comment-content">
                    {
                        this.state.commentState === 1
                            ? <div>
                            <textarea ref="commentContent" className="text-area"></textarea>
                            <div>
                                <button onClick={this.submitComment.bind(this)} className="submit-btn">提交</button>
                                <button onClick={this.hideCommentHandle.bind(this)} className="cancel-btn">取消</button>
                            </div>
                        </div>
                            : ''
                    }
                </div>
            </div>
        )
    }

    componentDidMount () {
        this.setState({
            commentState: this.props.data.commentState
        })
    }

    submitComment () {
        const submitComment = this.props.submitComment;
        const id = this.props.data.id;//商户的id
        const commentContent = this.refs.commentContent;
        const value = commentContent.value.trim();//评论的内容
        console.log(value);
        submitComment(id, value, this.commentOk());//上传成功后的回调函数

    }
    commentOk () {
        this.setState({
            commentState: 2
        })
    }

    showCommentHandle () {
        this.setState({
            commentState: 1
        })
    }

    hideCommentHandle () {
        this.setState({
            commentState: 0
        })
    }
}

export default Item;