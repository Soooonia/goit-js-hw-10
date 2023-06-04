// import { fetchBreeds } from './cat-api.js';

// fetchBreeds().then(breeds => {
  
//   console.log(breeds);
// });


import { fetchBreeds } from "./cat-api.js";


const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");


document.addEventListener("DOMContentLoaded", () => {
  loader.style.display = "block";
  error.style.display = "none";

  fetchBreeds()
    .then((breeds) => {
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      loader.style.display = "none";
    })
    .catch(() => {
      error.style.display = "block";
      loader.style.display = "none";
    });
});
breedSelect.addEventListener("change", () => {
    const breedId = breedSelect.value;
    catInfo.innerHTML = "";
    catInfo.style.display = "none";
    loader.style.display = "block";
  
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then((response) => response.json())
      .then((data) => {
        const catImage = document.createElement("img");
        catImage.src = data[0].url;
        catInfo.appendChild(catImage);
  
        return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`);
    })
    .then((response) => response.json())
    .then((data) => {
      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");
      const breedName = document.createElement("h2");
      breedName.textContent = data.name;
      textContainer.appendChild(breedName);

      const description = document.createElement("p");
      description.textContent = data.description;
      textContainer.appendChild(description);

      const temperament = document.createElement("p");
      temperament.innerHTML =`Temperament: <span class="temperament-word">${data.temperament}</span>`;
      textContainer.appendChild(temperament);
      catInfo.appendChild(textContainer);

      catInfo.style.display = "block";
      loader.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching cat breed details:", error);
      error.style.display = "block";
      loader.style.display = "none";
    });
});