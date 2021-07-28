import './styles/styles.scss';
import 'regenerator-runtime/runtime.js'; // to bring async to babel
import formHandler from './js/formHandler';


// get tomorrow's date, prepopulate the form

// auto suggest on the destination form

// add eventhandler for the form
(function() {
  console.log("starting");
  document.getElementById('placesForm').addEventListener('submit', formHandler);
}());
