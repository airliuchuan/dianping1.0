import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化


import './style.less';
import ListItem from './item';

class ListComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="list-container">

                {
                    this.props.data.map((item, index) => {
                        return <ListItem key={index} item={item} />
                    })
                }

            </div>
        )
    }
}

export default ListComponent;