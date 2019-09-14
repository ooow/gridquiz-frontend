import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './reducers';
import EnvService from '../services/EnvService';

function store() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    if (!EnvService.isProdEnv()) {
        /**
         * Redux devtools is available on dev env.
         * Please, add to your Crhome "Redux DevTools" extension.
         *
         * @link https://chrome.google.com/webstore/detail/redux-devtools
         * /lmhkpmbekcpmknklioeibfkpmmfibljd
         */
        return createStore(
            rootReducer,
            composeWithDevTools(middleWareEnhancer),
        );
    }
    return createStore(
        rootReducer,
        compose(middleWareEnhancer),
    );
}

/** The project store. */
export default store();
