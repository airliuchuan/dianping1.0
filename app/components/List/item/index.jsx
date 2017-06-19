import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';

import './style.less';

class ListItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    render () {
        const data = this.props.item;
        return (
            <div className="list-item clear-fix">
                <Link to={"/detail/" + data.id}>
                    <div className="item-img-container float-left">
                        <img src={data.img} alt=""/>
                    </div>
                    <div className="item-container">
                        <div className="item-title-container clear-fix">
                            <h3 className="float-left">{data.title}</h3>
                            <p className="float-right">{data.distance}</p>
                        </div>
                        <div className="item-sub-title">
                            <p>{data.subTitle}</p>
                        </div>
                        <div className="item-price-container clear-fix">
                            <p className="price float-left">¥{data.price}</p>
                            <p className="mumber float-right">已售{data.mumber}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ListItem;