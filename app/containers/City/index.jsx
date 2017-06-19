import React, { Component } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userinfoActionsFromOtherFile from '../../actions/userinfo';
import localStorage from '../../util/localstorage';
import { CITYNAME } from '../../config/localStorageKey';
import { hashHistory } from 'react-router';

import Header from '../../components/Header';
import CurrentCity from '../../components/CurrentCity';
import CityList from '../../components/CityList';

class City extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div>
                <Header title='选择城市'/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }

    changeCity (newCity) {
        if(newCity == null) {
            return;
        }
        console.log(newCity, 'containers => City')
        //修改redux
        const userinfo = this.props.userinfo;
        userinfo.cityName = newCity;
        this.props.userinfoActions.update(userinfo);

        //修改localstorage
        localStorage.setItem(CITYNAME, newCity);

        //跳转到首页
        hashHistory.push('/');
    }
}

//------------------------------------redux react 绑定-----------------------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City);