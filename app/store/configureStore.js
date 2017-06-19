import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initalState) {
    const store = createStore(rootReducer, initalState,
        //redux的Chrome插件可以自动生成redux-devtools开发者界面
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );
    return store;
}