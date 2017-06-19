import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';

class BuyAndStore extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="buy-and-store clear-fix">
                <div className="store-container float-left">
                    {
                        this.props.isStore
                            ? <button onClick={this.storeClickHandle.bind(this)} className="selected">已收藏</button>
                            : <button onClick={this.storeClickHandle.bind(this)}>收藏</button>
                    }
                </div>
                <div className="buy-container float-left">
                    <button onClick={this.buyClickHandle.bind(this)}>购买</button>
                </div>
            </div>
        )
    }

    storeClickHandle () {
        const storeHandleFn = this.props.storeHandleFn;
        storeHandleFn();
    }

    buyClickHandle () {
        const buyHandleFn = this.props.buyHandleFn;
        buyHandleFn();
    }
}

export default BuyAndStore;