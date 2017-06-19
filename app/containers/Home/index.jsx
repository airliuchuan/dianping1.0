import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { connect } from 'react-redux';

import HomeHeader from '../../components/HomeHeader';
import Category from '../../components/Category';
import Ad from '../Home/subpage/ad';
import List from './subpage/List';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height: '15px'}}></div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        userinfo: state.userinfo//state后边的userinfo是reducer名字
    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);