import 'whatwg-fetch';

export const queryFilterRanges = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/filter-ranges')
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('request succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('request failed', error);
        reject(error);
      })
  });
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
 
function parseJSON(response) {
  console.log(response);
  return response.json();
}