import { hashHistory } from 'react-router';
import 'whatwg-fetch';
import * as queries from './queries.js';
import {
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  ARTISTS_NEXT_PAGE,
  ARTISTS_PREV_PAGE,
  RESET_SELECTION,
  CREATE_ERROR
} from './types';

export const resetArtist = () => {
  return { type: RESET_ARTIST };
};

export const showArtistsNextPage = () => {
  return { type: ARTISTS_NEXT_PAGE };
};

export const showArtistsPrevPage = () => {
  return { type: ARTISTS_PREV_PAGE };
};

export const changeRetired = (aIDs, bSetRetired) => (dispatch, getState) =>
  fetch('/api/artists?retired=' + (bSetRetired ? 'on' : 'off'), {
    method: 'POST',
    body: JSON.stringify(aIDs),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then((data) => dispatch({ type: RESET_SELECTION }))
  .then(() => dispatch(searchArtists(getState().filterForm)))
  .catch((error) => {
    console.log('changeRetired actionCreator error: ', error);
  });

export const searchArtists = (oFilters) => (dispatch) =>
  fetch('/api/artists', {
    method: 'POST',
    body: JSON.stringify(oFilters),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then((data = []) => dispatch({ type: SEARCH_ARTISTS, payload: data }))
  .catch((error) => {
    console.log('searchArtists actionCreator error: ', error);
  });

export const findArtist = (id) => (dispatch) =>
  fetch('/api/artists/' + id)
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then((oArtist) => dispatch({ type: FIND_ARTIST, payload: oArtist }))
  .catch((error) => {
    console.log('findArtist actionCreator error: ', error);
  });

export const createArtist = (oProps) => (dispatch) =>
  fetch('/api/artists', {
    method: 'PUT',
    body: JSON.stringify(oProps),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then((id) => hashHistory.push(`artists/${id}`))
  .catch((error) => {
    console.log('createArtist actionCreator error: ', error);
    dispatch({ type: CREATE_ERROR, payload: error });
  });

export const editArtist = (id, oProps) => (dispatch) =>
  fetch('/api/artists/' + id, {
    method: 'PUT',
    body: JSON.stringify(oProps),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then((data) => hashHistory.push(`artists/${id}`))
  .catch(error => {
    console.log('editArtist actionCreator error: ', error);
    dispatch({ type: CREATE_ERROR, payload: error });
  });   

export const deleteArtist = (id) => (dispatch) =>
  fetch('/api/artists/' + id, {
    method: 'DELETE'
  })
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then(() => hashHistory.push('/'))
  .catch(error => {
    console.log('deleteArtist actionCreator error: ', error);
    dispatch({ type: CREATE_ERROR, payload: error });
  });
