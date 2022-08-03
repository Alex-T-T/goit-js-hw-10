import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    event.preventDefault();

    const searchValue = input.value;
    console.log(searchValue);

    fetchCountries(searchValue)
    .then(renderCountry)
    .catch(ifFetchError)
    .finally(() => input.value = '');
}

function fetchCountries(value) {
    const url = `https://restcountries.com/v3.1/name/${value}?fields=name,capital,flag,population,languages`;

    return fetch(url).then(response => response.json());
}

function renderCountry(countries) {
    const size = Object.keys(countries).length;
    
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  
    console.log(size)
    for (const country of countries) {

        const {flag, name, capital, population, languages} = country

        const elementSymbols = `<li><h2 class="country-mame">${flag} ${name.official}</h2></li>`
        
        const elementInfo = `<p class="counry-capital">Capital: ${capital}</p>
        <p class="counry-population">Population: ${population}</p>
        <p class="counry-laguages">Languages: ${Object.values(languages)}</p>`


        if (size <= 1) {
            countryList.insertAdjacentHTML('beforeend', elementSymbols);
            countryInfo.insertAdjacentHTML('beforeend', elementInfo);
        }
        else {
            countryList.insertAdjacentHTML('beforeend', elementSymbols);
        }
        
    }
}

// function countryCard() {
//     return `<h2 class="country-mame">${name.official}</h2>
//       <p class="counry-capital">Capital: ${capital}</p>
//       <p class="counry-population">Population: {{population}}</p>
//       <p class="counry-laguages">Laguages: {{laguages}}</p>`
// }

function ifFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

