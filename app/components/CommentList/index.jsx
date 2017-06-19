import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';
import Item from './item';

class CommentList extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {

        return (
            <div className="list-container">
                {
                    this.props.data.map((item, index) => {
                        return <Item key={index} data={item}/>
                    })
                }
            </div>
        )
    }
}

export default CommentList;