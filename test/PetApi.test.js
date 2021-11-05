const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

var petId = 0;

describe('Pet Store API Tests - Pet API', () => {
  
  it('Create a new Pet', async () => {
    const body = {
        "id": 420000000,
        "category": {
          "id": 1,
          "name": "canine"
        },
        "name": "Magic",
        "status": "available"
      }

    const response = await agent
      .post('https://petstore.swagger.io/v2/pet')
      .send(body);

    expect(response.status).to.equal(statusCode.StatusCodes.OK);
    petId = await response.body.id;

  });

  it('Get an existing Pet', async () => {

      var url = 'https://petstore.swagger.io/v2/pet/' + petId;

      const response = await agent.get(url);

      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(response.body.name).to.equal('Magic');
      expect(response.body.status).to.equal('available');
  });

  it('Query a non existent pet', async () => {
    var url = 'https://petstore.swagger.io/v2/pet/' + 1111111;
    agent
   .get(url)
   .then(response => {
      // res.body, res.headers, res.status
   })
   .catch(err => {
      expect(err.status).to.equal(statusCode.StatusCodes.NOT_FOUND);
      expect(err.text.message).to.equal('Pet not found');
   });

  })

  
});