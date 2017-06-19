import React, { Component } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import localStorage from '../util/localstorage';
import { CITYNAME } from '../config/localStorageKey';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../actions/userinfo';

class App extends Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            initDone: false
        }
    }

    render () {

        return (
            <div>
                {
                    this.state.initDone
                        ? this.props.children
                        : <div>正在加载...</div>
                }
            </div>
        )
    }

    componentDidMount () {
        let cityName = localStorage.getItem(CITYNAME);

        if(cityName == null) {
            cityName = '北京';
        }

        this.props.userinfoActions.update({
            cityName: cityName
        });

        this.setState({
            initDone: true
        });
    }

}

function mapStateToProps (state) {
    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {
        userinfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);