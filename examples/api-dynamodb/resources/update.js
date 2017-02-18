'use strict';

const AWS      = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {

  const timestamp = new Date().getTime();
  const data      = JSON.parse(event.body);

  if (typeof data.name !== 'string' || typeof data.email !== 'string') {
    callback(new Error('Dados inválidos!'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':Name': data.name,
      ':Email': data.email,
      ':UpdateDate': timestamp,
    },
    UpdateExpression: 'SET Name = :Name, Email = :Email, UpdateDate = :UpdateDate',
    ReturnValues: 'ALL_NEW',
  };

  dynamoDb.update(params, (error, result) => {

    if (error) {
      console.error(error);
      callback(new Error('Erro ao atualizar cadastro!'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };

    callback(null, response);

  });
};
