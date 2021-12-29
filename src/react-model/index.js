import { useCallback } from 'react';
import { createStore, useModel, Provider } from 'react-model';

import {
  reducer,
  initialState,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const Store = createStore(() => {
  const [state, setState] = useModel(initialState);
  const dispatch = (action) => {
    setState((s) => reducer(s, action));
  };
  return {
    count: state.count,
    dispatch,
  };
});

const useCount = () => {
  const { count } = Store.useStore();
  return count;
};

const useIncrement = () => {
  const { dispatch } = Store.getState();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const { dispatch } = Store.getState();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

export default createApp(useCount, useIncrement, useDouble, Provider);
