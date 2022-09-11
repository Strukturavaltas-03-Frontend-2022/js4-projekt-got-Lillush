"use strict";

import characterInfo from "../json/got.json" assert { type: "json" };

const iconContainer = document.querySelector(".container__pictures");
const searchBtn = document.querySelector(".search");
const inputField = document.querySelector(".input__field");
const bioImage = document.querySelector(".charImage");
const bioName = document.querySelector(".bioname");
const bioBadge = document.querySelector(".badge");
const bioText = document.querySelector(".bio");
const notFoundText = document.querySelector(".notfound");
let iconImages;

const filteredCharacterInfo = Array.from(characterInfo)
  .filter((char) => !char?.dead)
  .sort((a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

(() => {
  const iconTemplate = `
          <div class="characterIcon">
              <img class="characterImage" src="" />
              <div class="name"></div>
          </div>`;

  for (let i = 0; i < 48; i++) {
    iconContainer.innerHTML += iconTemplate;
  }

  const iconNames = document.querySelectorAll(".name");
  iconImages = document.querySelectorAll(".characterImage");
  iconImages.forEach((img, i) => {
    img.setAttribute("src", `${filteredCharacterInfo[i].portrait}`);
  });
  iconNames.forEach((name, i) => {
    name.innerHTML = filteredCharacterInfo[i].name;
  });
})();

const showBio = (i) => {
  inputField.value = "";
  bioName.innerHTML = `${filteredCharacterInfo[i].name}`;
  bioText.innerHTML = `${filteredCharacterInfo[i].bio}`;

  if (filteredCharacterInfo[i]?.house) {
    bioBadge.setAttribute(
      "src",
      `./assets/houses/${filteredCharacterInfo[i].house}.png`
    );
  } else if (filteredCharacterInfo[i]?.organization) {
    bioBadge.setAttribute(
      "src",
      `./assets/houses/${filteredCharacterInfo[i].organization}.png`
    );
  } else {
    bioBadge.setAttribute("src", `./assets/houses/noimage.svg`);
  }

  if (filteredCharacterInfo[i]?.picture.includes("jpg")) {
    bioImage.setAttribute("src", `./${filteredCharacterInfo[i].picture}`);
  } else {
    bioImage.setAttribute("src", `./assets/pictures/noimage.jpeg`);
  }
};

iconImages.forEach((pic, i) => {
  pic.addEventListener("click", () => {
    showBio(i);
  });
});

const searchResultShow = () => {
  let searchValue = inputField.value.toLowerCase();
  notFoundText.innerHTML = "";

  for (let i = 0; i < filteredCharacterInfo.length; i++) {
    if (
      filteredCharacterInfo[i].name.toLowerCase().includes(searchValue) &&
      inputField.value !== ""
    ) {
      showBio(i);
      inputField.value = "";
      notFoundText.innerHTML = "";
      break;
    } else {
      notFoundText.innerHTML = "Character Not Found";
      inputField.value = "";
    }
  }
};

searchBtn.addEventListener("click", () => {
  searchResultShow();
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchResultShow();
  }
});

// elhalt próbálkozás... ez nagyon nem megy
// const generateIcons = () => {
//   for (let i = 0; i < filteredCharacterInfo.length; i++) {
//     const icon = document.createElement("div");
//     icon.innerHTML = iconTemplate;
//     icon.classList.add("characterIcon");
//     iconContainer[i].appendChild(icon);
//   }
// };
// generateIcons();
