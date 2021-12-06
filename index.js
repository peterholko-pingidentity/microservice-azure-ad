const sdk = require('@skinternal/skconnectorsdk')
const {serr, compileErr, logger} = require('@skinternal/skconnectorsdk')
const redisList = 'azureADConnector'
const api = require('./api')

/**
 * Initialize is the main function to start this service. It initializes sdk with name of the connector.
 */
const initialize = async () =>{
  try {
    const response = await sdk.initalize(redisList)
    console.log(response)
    logger.info('Started microservice-azure-ad');
  } catch(err){
    console.log(err);
    logger.error('Error starting microservice-azure-ad');
  }
}

sdk.methods.handle_capability_checkUsernamePassword = async ({properties}) => {
  logger.info('overriding handle_capability_checkUsernamePassword');
  try {  
    console.log(properties);

    const {tokenEndpoint, clientId, clientSecret, username, password} = properties;

    const response = await api.getAccessToken({ tokenEndpoint, clientId, clientSecret, username, password});

    return {
      output: {
        rawResponse: response.data,
        statusCode: response.status
      },
      eventName: 'continue',
    };
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return {
        output: {
          rawResponse: {},
        },
        eventName: 'continue',
      };
    }
    throw compileErr('checkUsernamePassword', err);
  }
}

initialize();
