import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { Link, hashHistory } from 'react-router';

import './style.less';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="common-header clear-fix">
                <span  className="float-left" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <p>{this.props.title}</p>
            </div>
        )
    }

    clickHandle () {
        const backRouter = this.props.backRouter;
        if(backRouter) {
            hashHistory.push(backRouter);
        } else {
            window.history.back();
        }

    }
}

export default Header;