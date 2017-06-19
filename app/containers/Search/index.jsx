import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as userinfoActionsFromOtherFile from '../../actions/userinfo';

import SearchHeader from '../../components/SearchHeader';
import List from './subpage/List';

class Search extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {

        const keyword = this.props.params.keyword;
        const category = this.props.params.category;

        return (
            <div>
                <SearchHeader keyword={keyword}/>
                <List cityName={this.props.userinfo.cityName} keyword={keyword} category={category}/>
            </div>
        )
    }

    componentDidMount () {
        console.log(this.props.userinfo.cityName);
    }
}

//----------------------redux react ------------------------------------------------------------------------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);