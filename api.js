const axios = require('axios');
const {logger, serr} = require('@skinternal/skconnectorsdk');
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * function to Get the access token. Note - this should be called once the token cache has been checked to avoid excessive fetching of access tokens.
 *
 * @function getAccessToken
 * @override
 * @param {object} payload contains the props (tokenEndpoint, envId, clientId, clientSecret, managementTokenAuthenticationMethod) that are required by this function.
 *
 * @return {object} containing access token
 */
 const getAccessToken = async ({ tokenEndpoint, clientId, clientSecret, username, password }) => {
  
    let scope = 'https://graph.microsoft.com/.default';
    
    const body = `${encodeURIComponent('grant_type')}=${encodeURIComponent(
      'password'
    )}&${encodeURIComponent('client_id')}=${encodeURIComponent(
      clientId
    )}&${encodeURIComponent('client_secret')}=${encodeURIComponent(
      clientSecret
    )}&${encodeURIComponent('scope')}=${encodeURIComponent(
      scope
    )}&${encodeURIComponent('username')}=${encodeURIComponent(
      username
    )}&${encodeURIComponent('password')}=${encodeURIComponent(
      password
    )}`;

    console.log(body);
    
    const apiResult = async () => {
      logger.debug("GETTING ACCESS TOKEN!");
      return axios.post(
        tokenEndpoint, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: clientId,
            password: clientSecret,
          }
      });
    };
    
    const response = await apiResult();
    console.log(response);
    return response;
  };


module.exports = {
  getAccessToken
}