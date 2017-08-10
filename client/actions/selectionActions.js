import {
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from './types';

export const selectArtist = (id) => {
  return { type: SELECT_ARTIST, payload: id };
};

export const deselectArtist = (id) => {
  return { type: DESELECT_ARTIST, payload: id };
};