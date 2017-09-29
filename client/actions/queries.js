export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
 
export const parseJSON = (response) => {
  return response.json();
};

export const checkCustomErrors = (data) => {
  if (!data.err) {
    return data;
  } else {
    var error = new Error(data.err);
    error.err = data.err;
    throw error;
  }
};