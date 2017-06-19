import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';//react的性能优化

import './style.less';

class SearchInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: ''
        }
    }

    render () {
        // console.log(this.props.value)
        return (
            <input  type="text"
                    className="search-input"
                    placeholder="请输入关键字"
                    value={this.state.value}
                    onChange={this.changeHandle.bind(this)}
                    onKeyUp={this.keyUpHandle.bind(this)}/>
        )
    }

    componentDidMount () {
        this.setState({
            value: this.props.value || ''
        })
    }

    changeHandle (e) {
        this.setState({
            value: e.target.value
        })
    }

    keyUpHandle (e) {

        if(e.keyCode !== 13) {
            return;
        }

        this.props.enterUrlHandle(this.state.value);

    }
}

export default SearchInput;