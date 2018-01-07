import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FILTER_DATA
} from './../utils/ActionTypes';
import escapeRegExp from 'escape-string-regexp';

const initialState = {
  isFetching: null,
  data: [],
  filterData: [],
  hasError: false,
  errorMessage: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_COIN_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        filterData: [],
        hasError: false,
        errorMessage: null
      });
    case FILTER_DATA:
      const match = new RegExp(
        escapeRegExp(action.searchTerm.toLowerCase()),
        'i'
      );
      let filterData = state.data.filter(item => match.test(item.name));
      return Object.assign({}, state, {
        ...state,
        filterData: filterData
      });
    case FETCHING_COIN_DATA_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: true,
        errorMessage: action.err
      });

    default:
      return state;
  }
}
