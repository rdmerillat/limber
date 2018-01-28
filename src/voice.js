import df from 'dialogflow';

// You can find your project ID in your Dialogflow agent settings
const projectId = 'newagent-1a04e'; //https://dialogflow.com/docs/agents#settings
const sessionId = '15fd200905854d51a42048f59388b848';
const languageCode = 'en-US';
 
// Instantiate a DialogFlow client.
const sessionClient = new df.SessionsClient();
 
// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: 'what time is is?',
      languageCode: languageCode,
    },
  },
};
 
// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });