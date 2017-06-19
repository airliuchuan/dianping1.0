import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import { getInfoData } from '../../../fetch/detail/detai';
import DetailInfo from '../../../components/DetailInfo';

class Info extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info: false
        }
    }

    render () {
        return (
            <div>
                {
                    this.state.info
                    ? <DetailInfo info={this.state.info}/>
                    : <p>加载中...</p>
                }
            </div>
        )
    }

    componentDidMount () {
        const id = this.props.id;
        const result = getInfoData(id);
        this.resultHandle(result);
    }

    resultHandle (result) {
        result.then(res => {
            return res.json();
        }).then(json => {
            // console.log(json);
            this.setState({
                info: json
            })
        })
    }
}

export default Info;