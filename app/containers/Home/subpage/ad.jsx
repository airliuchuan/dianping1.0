import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import { getAdData } from '../../../fetch/home/home';
import HomeAd from '../../../components/HomeAd'

class Ad extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }

    render () {

        return (
            <div>
                <ul>
                    {
                        this.state.data.length
                        ? <HomeAd data={this.state.data}/>
                        : <p>正在加载...</p>
                    }
                </ul>
            </div>
        )
    }

    componentDidMount () {
        const result = getAdData();
        result.then(res => {
            return res.json();
        }).then((json) => {
            // console.log(json);
            const data = json;
            this.setState({
                data: data
            })
        });
    }
}

export default Ad;