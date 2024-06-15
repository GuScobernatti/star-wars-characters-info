let urlAPiStarWars = `https://swapi.dev/api/people/`;
window.onload = async () => {
  try {
    document.body.classList.add("loading");
    await fetchApi(urlAPiStarWars);
    document.body.classList.remove("loading");
  } catch (error) {
    console.error(error);
  }
};

async function fetchApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const dataResult = data.results;

    const section = document.querySelector(".section1");
    section.innerHTML = "";

    dataResult.map((element) => {
      section.innerHTML += `<div
      class="cards"
      style="
      background-image: url(https://starwars-visualguide.com/assets/img/characters/${element.url.replace(
        /\D/g,
        ""
      )}.jpg);" onclick="showModal('${element.url.replace(/\D/g, "")}', '${
        element.name
      }', '${element.height}', '${element.mass}', '${element.eye_color}', '${
        element.birth_year
      }')">
        <div class="name-bg">
        <span class="character-name">${element.name}</span>
        </div>
        </div>`;
    });

    urlAPiStarWars = url;
    const btnNext = document.getElementById("btnNext");
    const btnBack = document.getElementById("btnBack");

    data.previous === null
      ? btnBack.classList.add("hidden")
      : btnBack.classList.remove("hidden");

    data.next === null
      ? btnNext.classList.add("hidden")
      : btnNext.classList.remove("hidden");
  } catch (error) {
    console.error(error);
  }
}

const btnNext = document.getElementById("btnNext");

const nextPage = async () => {
  try {
    document.body.classList.add("loading");
    const response = await fetch(urlAPiStarWars);
    const data = await response.json();
    await fetchApi(data.next);
    document.body.classList.remove("loading");
  } catch (error) {
    console.error(error);
  }
};

btnNext.addEventListener("click", nextPage);

const btnBack = document.getElementById("btnBack");

const backPage = async () => {
  try {
    document.body.classList.add("loading");
    const response = await fetch(urlAPiStarWars);
    const data = await response.json();
    await fetchApi(data.previous);
    document.body.classList.remove("loading");
  } catch (error) {
    console.error(error);
  }
};

btnBack.addEventListener("click", backPage);

const sectionInfoPeople = document.getElementById("sectionInfoPeople");
const darkOverlay = document.getElementById("dark-overlay");

const characterImage = document.getElementById("character-image");
const container = document.querySelector(".container");
const spanName = document.createElement("span");
const spanHeight = document.createElement("span");
const spanWeight = document.createElement("span");
const spanEyeColor = document.createElement("span");
const spanBirth = document.createElement("span");

const showModal = (
  elementImage,
  elementName,
  elementHeight,
  elementWeight,
  elementEyeColor,
  elementBirth
) => {
  sectionInfoPeople.classList.add("active");
  darkOverlay.classList.add("active");

  characterImage.style.backgroundImage = `url(https://starwars-visualguide.com/assets/img/characters/${elementImage}.jpg`;
  spanName.textContent = `Nome: ${elementName}`;
  spanHeight.textContent = `Altura: ${elementHeight / 100}`;
  spanWeight.textContent = `Massa: ${elementWeight} KG`;
  spanEyeColor.textContent = `Cor dos olhos: ${elementEyeColor}`;
  spanBirth.textContent = `Nascimento: ${elementBirth}`;

  if (sectionInfoPeople.classList.contains("active")) {
    container.appendChild(spanName);
    container.appendChild(spanHeight);
    container.appendChild(spanWeight);
    container.appendChild(spanEyeColor);
    container.appendChild(spanBirth);
  } else {
    container.innerHTML = "";
    container.appendChild(spanName);
    container.appendChild(spanHeight);
    container.appendChild(spanWeight);
    container.appendChild(spanEyeColor);
    container.appendChild(spanBirth);
    spanName.textContent = "";
    spanHeight.textContent = "";
    spanWeight.textContent = "";
    spanEyeColor.textContent = "";
    spanBirth.textContent = "";
  }
};

darkOverlay.addEventListener("click", () => {
  sectionInfoPeople.classList.remove("active");
  darkOverlay.classList.remove("active");

  if (!sectionInfoPeople.classList.contains("invisible")) {
    container.appendChild(spanName);
    container.appendChild(spanHeight);
    container.appendChild(spanWeight);
    container.appendChild(spanEyeColor);
    container.appendChild(spanBirth);
  } else {
    container.innerHTML = "";
    container.appendChild(spanName);
    container.appendChild(spanHeight);
    container.appendChild(spanWeight);
    container.appendChild(spanEyeColor);
    container.appendChild(spanBirth);
    spanName.textContent = "";
    spanHeight.textContent = "";
    spanWeight.textContent = "";
    spanEyeColor.textContent = "";
    spanBirth.textContent = "";
  }
});

const loading = () => {
  const boxLoad = document.getElementById("box-load");
  const mainContent = document.querySelector(".mainContent");
  const footer = document.querySelector("footer");
  boxLoad.style.display = "none";
  mainContent.style.display = "block";
  footer.style.display = "flex";
};
