import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';
import Star from '../../Star';

class Item extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        const item = this.props.data;
        return (
            <div className="comment-list-item">
                <div>
                    <i className="icon-user"></i>
                    <span>{item.username}</span>
                </div>

                <Star star={item.star}/>
                <p className="comment">{item.comment}</p>
            </div>
        )
    }
}

export default Item;