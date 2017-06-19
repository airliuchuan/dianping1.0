import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { hashHistory } from 'react-router';
import { Link } from 'react-router';

import './style.less';
import SearchInput from '../searchInput';

class HomeHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            kwd: ''
        }
    }

    render () {

        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to="/login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className=" icon-search"></i>
                        <SearchInput value="" enterUrlHandle={this.enterUrlHandle.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }

    enterUrlHandle (value) {
        hashHistory.push('/search/all/' + encodeURIComponent(value));
    }

}

export default HomeHeader;