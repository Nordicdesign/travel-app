import './styles/styles.scss';
import 'regenerator-runtime/runtime.js'; // to bring async to babel
import formHandler from './js/formHandler';
import { selectDestination, storeTrip } from './js/app';
import { populateDate } from './js/dates';

// auto suggest on the destination form

// add eventhandler for the form
export const runTheThings = () => {
  document.querySelector('.places-list').addEventListener('click', selectDestination);
  document.getElementById('location').addEventListener('input', formHandler);
  document.getElementById('placesForm').addEventListener('submit', storeTrip);
};

document.addEventListener('DOMContentLoaded', () => {
  // get tomorrow's date, prepopulate the form
  populateDate();
  // add event listeners
  runTheThings();
});
