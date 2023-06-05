// // import { fetchBreeds } from './cat-api.js';

// // fetchBreeds().then(breeds => {
  
// //   console.log(breeds);
// // });


// import { fetchBreeds } from "./cat-api.js";


// const breedSelect = document.querySelector(".breed-select");
// const loader = document.querySelector(".loader");
// const error = document.querySelector(".error");
// const catInfo = document.querySelector(".cat-info");


// document.addEventListener("DOMContentLoaded", () => {
//   loader.style.display = "block";
//   error.style.display = "none";

//   fetchBreeds()
//     .then((breeds) => {
//       breeds.forEach((breed) => {
//         const option = document.createElement("option");
//         option.value = breed.id;
//         option.textContent = breed.name;
//         breedSelect.appendChild(option);
//       });
//       loader.style.display = "none";
//     })
//     .catch(() => {
//       error.style.display = "block";
//       loader.style.display = "none";
//     });
// });
// breedSelect.addEventListener("change", () => {
//     const breedId = breedSelect.value;
//     catInfo.innerHTML = "";
//     catInfo.style.display = "none";
//     loader.style.display = "block";
  
//     fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const catImage = document.createElement("img");
//         catImage.src = data[0].url;
//         catInfo.appendChild(catImage);
  
//         return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`);
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       const textContainer = document.createElement("div");
//       textContainer.classList.add("text-container");
//       const breedName = document.createElement("h2");
//       breedName.textContent = data.name;
//       textContainer.appendChild(breedName);

//       const description = document.createElement("p");
//       description.textContent = data.description;
//       textContainer.appendChild(description);

//       const temperament = document.createElement("p");
//       temperament.innerHTML =`Temperament: <span class="temperament-word">${data.temperament}</span>`;
//       textContainer.appendChild(temperament);
//       catInfo.appendChild(textContainer);

//       catInfo.style.display = "block";
//       loader.style.display = "none";
//     })
//     .catch((error) => {
//       console.error("Error fetching cat breed details:", error);
//       error.style.display = "block";
//       loader.style.display = "none";
//     });
// });
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
select.addEventListener('change', onChangeSelect);

const divPicture = document.querySelector('.cat-info-picture');
const divInfo = document.querySelector('.cat-info-desc');
const loader = document.querySelector('.loader');

fetchAndRenderBreeds();

function fetchAndRenderBreeds() {
    loader.classList.remove('invisible');
    fetchBreeds()
    .then(cats => updateSelect(cats))
    .catch(error => {
        Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
        );
        select.classList.add('hidden-select');
    })
    .finally(() => {
        loader.classList.add('invisible');
        select.classList.remove('invisible');
    });
}

function onChangeSelect(e) {
    loader.classList.remove('invisible');
    divPicture.innerHTML = '';
    divInfo.innerHTML = '';
    const breedId = e.target.value;

    fetchCatByBreed(breedId)
    .then(breed => updateCatInfo(breed))
    .catch(error => {
        Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
        );
    })
    .finally(() => loader.classList.add('invisible'));
}

function updateSelect(cats) {
    const markupBreeds = cats
    .map(({ reference_image_id, name }) => {
        return `<option value =${reference_image_id}>${name}</option>`;
    })
    .join('');
    select.insertAdjacentHTML('beforeend', markupBreeds);
    new SlimSelect({
    select: '#single',
});
}

function updateCatInfo(breed) {
    const markupPicture = `<img src='${breed.url}' alt='${breed.id}' width='400'>`;
    const markupDesc = `<h1 class="cat-info-desc">${breed.breeds[0].name}</h1><p class="cat-info-desc">${breed.breeds[0].description}</p><p class="cat-info-desc"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
    divPicture.insertAdjacentHTML('beforeend', markupPicture);
    divInfo.insertAdjacentHTML('beforeend', markupDesc);}