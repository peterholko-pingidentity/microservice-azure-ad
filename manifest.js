const azureADConnector = {
    connectorId: "azureADConnector",
    name: "Azure AD Connector",
      serviceName: 'microservice-azure-ad',
    connectorType: "policy",
      description:"Azure AD Connector",
      connectorDetails: null,
      detailImage: null,
      connectorCategories: [{name: 'Identity Verification',value: 'identityVerification'}],
      metadata: {
        colors: {
          canvas: '#6AC15C',
          dark: '#171D21',
        },
        logos: {
          canvas: {
            imageFileName: 'microsoft.svg',
          },
        },
      },
      sections: [{ name: 'General', value: 'general', default: true }],
      flowSections: [{ name: 'General', value: 'general' }],
      properties: {
        clientId: {
          displayName: 'Application ID',
          preferredControlType: 'textField',
          info: `The id for your SingularKey application found in Azure AD's App Registration`,
          required: true
        },
        clientSecret: {
          displayName: 'Client Secret',
          preferredControlType: 'textField',
          info: `Client Secret from your SingularKey App in Azure AD's App Registration`,
          hashedVisibility: true,
          required: true
        },
        tokenEndpoint: {
          displayName: 'Token Endpoint',
          preferredControlType: 'textField',
          info: `The token endpoint for your Azure AD Tenant`,
          required: true
        },
        username: {
          displayName: 'Username',
          preferredControlType: 'textField',
          info: 'Username',
          enableParameters: true,
        },
        password: {
          displayName: 'Password',
          preferredControlType: 'textField',
          info: 'Password',
          enableParameters: true,
        }
      },
      capabilities: {
        checkUsernamePassword: {
          type: 'action',
          title: 'Check username and password',
          subTitle: `Validates an Azure AD username and password`,
          respondToUser: true,
          apiEnabled: true,
          inputs: ['*'],
          userViews: [],
          flowConfigView: {
            items: [
              { propertyName: 'username' },
              { propertyName: 'password' }
            ],
          },          
          payloadInputSchema: {
            default: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                      description: "The username"
                    },
                    password: {
                      type: "string",
                      description: "The password"
                    }
                  },
                  required: [
                    "username",
                    "password"
                  ]
                }
              },
              example: {
                properties: {
                  username: "joesmith",
                  password: "password"
                }
              }
            },
          },
          localOutputSchema: {
            output: {
              type: 'object',
              properties: {
                rawResponse: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                    },
                    text: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },

        },
      },
      accountConfigView: {
        items: [
          { propertyName: 'tokenEndpoint' },
          { propertyName: 'clientId' },
          { propertyName: 'clientSecret' }
        ],
      },
    };
  
  module.exports = azureADConnector;
  