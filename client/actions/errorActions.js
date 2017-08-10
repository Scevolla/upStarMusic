import {
  CREATE_ERROR,
  CLEAR_ERROR
} from './types';

export const clearError = () => {
  return { type: CLEAR_ERROR };
};