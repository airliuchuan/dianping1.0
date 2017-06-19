import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { hashHistory } from 'react-router';

import './style.less';
import SearchInput from '../../components/SearchInput';

class SearchHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="clear-fix search-header">
                <div className="float-left search-header-left" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </div>
                <div className="search-header-right">
                    <i className="icon-search"></i>
                    <SearchInput value={this.props.keyword || ''} enterUrlHandle={this.enterUrlHandle.bind(this)}/>
                </div>
            </div>
        )
    }

    clickHandle () {
        window.history.back();
    }

    enterUrlHandle (value) {
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }

}

export default SearchHeader;