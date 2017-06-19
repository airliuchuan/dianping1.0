import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './static/css/common.less';
import  './static/css/font.css';//使用css3字体图标需要配置webpack.config.js 中的module-> loader

import RouteMap from './router/routeMap';

const store = configureStore();

render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
);