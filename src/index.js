// ==============================
// imports libraries

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// ==============================
// imporn fetchCoutries function

import { fetchCountries } from './fetchCountries'

// ==============================

const DEBOUNCE_DELAY = 300;

// ==============================
// work with DOM

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// ==============================
// add event listener

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

// ==============================
// search input value

function searchCountries(event) {
    event.preventDefault();

    const searchValue = input.value;
    let trimedSearchValue = searchValue.trim();

    if (trimedSearchValue === '') {

        removeHTML();

        Notiflix.Notify.info('Please enter a name.');
    return
    }

    fetchCountries(trimedSearchValue)
    .then(renderCountry)
    .catch(ifFetchError);
}

// ==============================
// render HTML

function renderCountry(countries) {
    
    const size = Object.keys(countries).length;

    removeHTML();

    for (const country of countries) {

        
        const { flags, name, capital, population, languages } = country;

        const elementSymbols = `<li class = 'country-item'> <a class = 'country-flag' href = '${flags.svg}'>
        <img src = '${flags.svg}' alt = '${name.official}' width = '30' > </a>
        <h2 class="country-name">  ${name.official}</h2>
        </li>`;
        
        const elementInfo = `<p class="counry-capital"> <b>Capital:</b> <i>${capital}</i></p>
        <p class="counry-population"><b>Population:</b> <i>${population}</i></p>
        <p class="counry-laguages"><b>Languages:</b> <i>${Object.values(languages)}</i></p>`;

        if (size > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            return;
        }

        checkSizeForRender(size, elementSymbols, elementInfo);
    }
}

// // ==============================
// // check size answer object for render

function checkSizeForRender(size, elementSymbols, elementInfo) {

    if (size <= 1) {
            countryList.insertAdjacentHTML('beforeend', elementSymbols);
            countryInfo.insertAdjacentHTML('beforeend', elementInfo);
        }
        else {
            countryList.insertAdjacentHTML('beforeend', elementSymbols);
        }
}

// ==============================
// fetch error

function ifFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

// ==============================
// remove HTML before rendering

function removeHTML () {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}





