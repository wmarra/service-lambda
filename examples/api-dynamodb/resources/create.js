'use strict';

const uuid     = require('uuid');
const AWS      = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.name !== 'string' || typeof data.email !== 'string') {
    callback(new Error('Dados inválidos!'));
    return;
  }

  const obj = {
    id: uuid.v1(),
    Name: data.name,
    Email: data.email,
    CreateDate: timestamp,
    UpdateDate: timestamp
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ReturnConsumedCapacity: "TOTAL", 
    Item: obj
  };

  dynamoDb.put(params, (error, result) => {
  
    if (error) {
      console.error(error);
      callback(new Error('Erro ao tentar inserir usuário!'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    
    callback(null, response);

  });
};
