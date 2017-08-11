import 'whatwg-fetch';

export const queryFilterRanges = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/filter-ranges')
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('queryFilterRanges succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('queryFilterRanges failed: ', error);
        reject(error);
      })
  });
};

export const queryChangeRetired = (aIDs, bSetRetired) => {
  return new Promise((resolve, reject) => {
    fetch('/api/artists?retired=' + (bSetRetired ? 'on' : 'off'), {
      method: 'POST',
      body: JSON.stringify(aIDs),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('queryChangeRetired succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('queryChangeRetired failed: ', error);
        reject(error);
      })
  });
};

export const querySearchArtists = (oFilters) => {
  return new Promise((resolve, reject) => {
    fetch('/api/artists', {
      method: 'POST',
      body: JSON.stringify(oFilters),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('querySearchArtists succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('querySearchArtists failed: ', error);
        reject(error);
      })
  });
};

export const queryFindArtist = (id) => {
  return new Promise((resolve, reject) => {
    fetch('/api/artists/' + id)
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('queryFindArtist succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('queryFindArtist failed: ', error);
        reject(error);
      })
  });
};

export const queryCreateArtist = (oProps) => {
  return new Promise((resolve, reject) => {
    fetch('/api/artists', {
      method: 'PUT',
      body: JSON.stringify(oProps),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('queryCreateArtist succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('queryCreateArtist failed: ', error);
        reject(error);
      })
  });
};

export const queryEditArtist = (id, oProps) => {
  return new Promise((resolve, reject) => {
    fetch('/api/artists/' + id, {
      method: 'PUT',
      body: JSON.stringify(oProps),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('queryEditArtist succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('queryEditArtist failed: ', error);
        reject(error);
      })
  });
};

export const queryDeleteArtist = (id) => {
  return new Promise((resolve, reject) => {
    fetch('/api/artists/' + id, {
      method: 'DELETE'
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('queryDeleteArtist succeeded with JSON response', data);
        resolve(data);
      }).catch(function(error) {
        console.log('queryDeleteArtist failed: ', error);
        reject(error);
      })
  });
};

//////////////////////////////////////////////
// helper functions
//////////////////////////////////////////////

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
  return response.json();
}