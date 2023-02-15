// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP get method to display a Hello message
 */
export const helloWorldHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id from pathParameters from APIGateway because of `/{name}` at template.yaml
  const name = event.pathParameters.name;

  const response = {
    statusCode: 200,
    body: JSON.stringify({'greeting': `Hello, ${name}`})
  };

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
