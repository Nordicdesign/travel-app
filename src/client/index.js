import './styles/styles.scss';
import 'regenerator-runtime/runtime.js'; // to bring async to babel
import formHandler from './js/formHandler';
import { selectDestination } from './js/app';

// get tomorrow's date, prepopulate the form

// auto suggest on the destination form

// add eventhandler for the form
export const runTheThings = () => {
  document.querySelector('.places-list').addEventListener('click', selectDestination);
  document.getElementById('location').addEventListener('input', formHandler);
};

document.addEventListener('DOMContentLoaded', () => runTheThings());
