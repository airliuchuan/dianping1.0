import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';

class Userinfo extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        const userinfo = this.props.userinfo;
        return (
            <div className="userinfo-container">
                <p>
                    <i className="icon-user"></i>
                    &nbsp;
                    <span>{userinfo.username}</span>
                </p>
                <p>
                    <i className="icon-map-marker"></i>
                    &nbsp;
                    <span>{userinfo.cityName}</span>
                </p>
            </div>
        )
    }
}

export default Userinfo;