import axios from 'axios';
import { apiBaseURL } from './../utils/Constants';
import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FILTER_DATA
} from './../utils/ActionTypes';

export function FetchCoinData() {
  return dispatch => {
    axios
      .get(`${apiBaseURL}/v1/ticker/?limit=50`)
      .then(res => {
        dispatch({ type: FETCHING_COIN_DATA, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: err.data });
      });
  };
}

export function FilterData(searchTerm) {
  return {
    type: FILTER_DATA,
    searchTerm: searchTerm
  };
}
