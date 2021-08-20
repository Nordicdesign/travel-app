import { createArrayOfPlaces } from './displayPlaces';

test('list is created from an array', () => {
  const list = [{
    adminCode1: "ENG",
    adminCodes1: {ISO3166_2: "ENG"},
    adminName1: "England",
    countryCode: "GB",
    countryId: "2635167",
    countryName: "United Kingdom",
    fcl: "P",
    fclName: "city, village,...",
    fcode: "PPLC",
    fcodeName: "capital of a political entity",
    geonameId: 2643743,
    lat: "51.50853",
    lng: "-0.12574",
    name: "London",
    population: 7556900,
    toponymName: "London"
  }];

  const expectedResult = [{
    name: "London",
    adminName1: "England",
    countryName: "United Kingdom"
  }];
  expect(createArrayOfPlaces(list)).toMatchObject(expectedResult);
});
