const request = require('supertest');
const regeneratorRuntime = require("regenerator-runtime");
const app = require('./app');

describe('Travel API', () => {
  it('GET /api/places/:place returns a list of places', () => {
    return request(app)
      .get('/api/places/rye')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.geonames).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              adminName1: expect.any(String),
              name: expect.any(String),
              countryName: expect.any(String)
            })
          ])
        );
      });
  });
  it('Returns 404 if the route is not know', () => {
    return request(app)
      .get('/api/something').expect(404);
  });
});
