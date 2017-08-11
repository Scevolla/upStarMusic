import { hashHistory } from 'react-router';
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
  queries.queryChangeRetired(aIDs, bSetRetired)
    .then(() =>
      dispatch({ type: RESET_SELECTION })
    )
    .then(() =>
      dispatch(searchArtists(getState().filterForm))
    )
    .catch(error => {
      console.log('changeRetired actionCreator error: ', error);
    });

export const searchArtists = (oFilters) => (dispatch) =>
  queries.querySearchArtists(oFilters)
    .then((result = []) =>
      dispatch({ type: SEARCH_ARTISTS, payload: result })
    )
    .catch(error => {
      console.log('searchArtists actionCreator error: ', error);
    });

export const findArtist = (id) => (dispatch) =>
  queries.queryFindArtist(id)
    .then(oArtist =>
      dispatch({ type: FIND_ARTIST, payload: oArtist })
    )
    .catch(error => {
      console.log('findArtist actionCreator error: ', error);
    });

export const createArtist = (oProps) => (dispatch) =>
  queries.queryCreateArtist(oProps)
    .then(id => {
      hashHistory.push(`artists/${id}`);
    })
    .catch(error => {
      console.log('createArtist actionCreator error: ', error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

export const editArtist = (id, oProps) => (dispatch) =>
  queries.queryEditArtist(id, oProps)
    .then(() => {
      hashHistory.push(`artists/${id}`);
    })
    .catch(error => {
      console.log('editArtist actionCreator error: ', error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

export const deleteArtist = (id) => (dispatch) =>
  queries.queryDeleteArtist(id)
    .then(() => {
      hashHistory.push('/')
    })
    .catch(error => {
      console.log('deleteArtist actionCreator error: ', error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });


//
// Faux Proxies

const ChangeRetiredProxy = (aIDs, bSetRetired) => {
  return new Promise(() => {});
};