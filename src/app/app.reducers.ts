import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import {
  History,
  newHistory,
  undoable
} from '../../projects/ngrx-history/src/public_api';
import * as AppActions from './app.actions';

export interface State {
  counter: History<number>;
}

export const initialState: State = {
  counter: newHistory([], 0, [])
};

export const counterReducer: ActionReducer<number, AppActions.UnionAction> = (
  state = 0,
  action
) => {
  switch (action.type) {
    case AppActions.ActionTypes.INCREMENT:
      return state + 1;
    case AppActions.ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export const undoableCounterReducer: ActionReducer<
  History<number>,
  AppActions.UnionAction
> = (state = initialState.counter, action) => {
  return undoable(counterReducer, {
    limit: 3
  })(state, action);
};

export const reducer: ActionReducerMap<State, AppActions.UnionAction> = {
  counter: undoableCounterReducer
};

export const selectCounter = (state: State) => state.counter.present;
