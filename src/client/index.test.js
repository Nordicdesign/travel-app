/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime.js'; // to bring async to babel
import { runTheThings } from './index'; // contains the addEventListener
const $ = require('jquery');

const formHandler = jest.fn();

test('formHandler is called when form is submitted', () => {
  const html = require('fs').readFileSync('src/client/views/index.html').toString();
  document.documentElement.innerHTML = html;
  $('placesForm').submit();

  expect(formHandler).toBeCalled();
});
