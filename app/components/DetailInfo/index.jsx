import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';
import Star from '../Star/';

class DetailInfo extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {

        const info = this.props.info;

        return (
            <div className="detail-info-container">
                <div className="info-container clear-fix">
                    <div className="img-container float-left">
                        <img src={info.img} alt={info.title}/>
                    </div>
                    <div className="info-content">
                        <h3>{info.title}</h3>
                        <div className="star-container">
                            <Star star={info.star}/>
                            <span className="price">¥{info.price}</span>
                        </div>
                        <p className="sub-title">{info.subTitle}</p>
                    </div>
                </div>
                <p dangerouslySetInnerHTML={{__html: info.desc}} className="info-desc"></p>
            </div>
        )
    }
}

export default DetailInfo;