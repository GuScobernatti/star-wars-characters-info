let urlRickAndMorty = `https://rickandmortyapi.com/api/character`;
window.onload = async () => {
  try {
    document.body.classList.add("loading");
    await fetchApi(urlRickAndMorty);
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
    console.log(data);

    const section = document.querySelector(".section1");
    section.innerHTML = "";

    dataResult.map((element) => {
      section.innerHTML += `<div
      class="cards"
      style="
      background-image: url(${element.image});" onclick="showModal('${element.image}', '${element.name}', '${element.gender}', '${element.status}', '${element.species}', '${element.origin.name}')">
        <div class="name-bg">
        <span class="character-name">${element.name}</span>
        </div>
        </div>`;
    });

    urlRickAndMorty = url;
    const btnNext = document.getElementById("btnNext");
    const btnBack = document.getElementById("btnBack");

    data.info.prev === null
      ? btnBack.classList.add("hidden")
      : btnBack.classList.remove("hidden");

    data.info.next === null
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
    const response = await fetch(urlRickAndMorty);
    const data = await response.json();
    await fetchApi(data.info.next);
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
    const response = await fetch(urlRickAndMorty);
    const data = await response.json();
    await fetchApi(data.info.prev);
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
const spanGender = document.createElement("span");
const spanStatus = document.createElement("span");
const spanSpecies = document.createElement("span");
const spanOrigin = document.createElement("span");

const showModal = (
  elementImage,
  elementName,
  elementGender,
  elementStatus,
  elementSpecies,
  elementOrigin
) => {
  sectionInfoPeople.classList.add("active");
  darkOverlay.classList.add("active");

  characterImage.style.backgroundImage = `url(${elementImage}`;
  spanName.textContent = `Nome: ${elementName}`;
  spanGender.textContent = `Gênero: ${elementGender}`;
  spanStatus.textContent = `Status: ${elementStatus}`;
  spanSpecies.textContent = `Espécie: ${elementSpecies}`;
  spanOrigin.textContent = `Origem: ${elementOrigin}`;

  if (sectionInfoPeople.classList.contains("active")) {
    container.appendChild(spanName);
    container.appendChild(spanGender);
    container.appendChild(spanStatus);
    container.appendChild(spanSpecies);
    container.appendChild(spanOrigin);
  } else {
    container.innerHTML = "";
    container.appendChild(spanName);
    container.appendChild(spanGender);
    container.appendChild(spanStatus);
    container.appendChild(spanSpecies);
    container.appendChild(spanOrigin);
    spanName.textContent = "";
    spanGender.textContent = "";
    spanStatus.textContent = "";
    spanSpecies.textContent = "";
    spanOrigin.textContent = "";
  }
};

darkOverlay.addEventListener("click", () => {
  sectionInfoPeople.classList.remove("active");
  darkOverlay.classList.remove("active");

  if (!sectionInfoPeople.classList.contains("invisible")) {
    container.appendChild(spanName);
    container.appendChild(spanGender);
    container.appendChild(spanStatus);
    container.appendChild(spanSpecies);
    container.appendChild(spanOrigin);
  } else {
    container.innerHTML = "";
    container.appendChild(spanName);
    container.appendChild(spanGender);
    container.appendChild(spanStatus);
    container.appendChild(spanSpecies);
    container.appendChild(spanOrigin);
    spanName.textContent = "";
    spanGender.textContent = "";
    spanStatus.textContent = "";
    spanSpecies.textContent = "";
    spanOrigin.textContent = "";
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
