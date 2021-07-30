import './styles/styles.scss';
import 'regenerator-runtime/runtime.js'; // to bring async to babel
import formHandler from './js/formHandler';
import { storeTrip } from './js/app';

// get tomorrow's date, prepopulate the form

// auto suggest on the destination form

// add eventhandler for the form
export const runTheThings = () => {
  document.querySelector('.places-list').addEventListener('click', storeTrip);
  document.getElementById('placesForm').addEventListener('submit', formHandler);
};

document.addEventListener('DOMContentLoaded', () => runTheThings());
