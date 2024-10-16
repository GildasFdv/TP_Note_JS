/* Appels au DOM */

const charactersHtml = document.body.querySelector(".characters");
const housesHtml = document.body.querySelectorAll(".houses div");
const filterHtml = document.body.querySelector("main .h3container img");

const sortingDiv = document.createElement("div");

/* Fonctions */

async function getCharacters() {
    return await fetch('https://hp-api.onrender.com/api/characters')
        .then(res => res.json())
        .catch(err => console.error(err));
}

function filterFirst12Characters(characters) {
    return characters.slice(0, 12);
}

function displayCharacters(characters) {
    characters.forEach(element => {
        charactersHtml.innerHTML += `
            <a href="./details.html?id=${element.id}">
                <div>
                    <img src="${element.image}" class="${element.house.toLowerCase()}" alt="${element.name}" onerror="this.src='../images/logo/logo.png'" />
                    <p>${element.name}</p>
                </div>
            </a>
        `;
    });
}

function filterCharactersByHouse(characters, house) {
    return characters.filter(character => character.house === house);
}

function configureDisplaySortOption() {
    sortingDiv.style.backgroundColor = "white";
    sortingDiv.style.position = "absolute";
    sortingDiv.style.width = "200px";
    sortingDiv.style.height = "200px";
    sortingDiv.style.border = "1px solid black";
    sortingDiv.style.borderRadius = "5px";
    sortingDiv.style.display = "flex";
    sortingDiv.style.flexDirection = "column";
    sortingDiv.style.alignItems = "center";
    sortingDiv.style.justifyContent = "space-around";
    sortingDiv.style.zIndex = "1000";

    sortingDiv.onclick = (e) => {
        e.stopPropagation();
    };
    document.body.addEventListener("click", () => {
        sortingDiv.remove();
    });
    const sortByAgeButton = document.createElement("button");
    sortByAgeButton.textContent = "Trier par age";
    sortByAgeButton.onclick = () => {
        charactersHtml.innerHTML = "";
        const charactersSortedByAge = filterFirst12Characters(characters).sort((a, b) => a.age - b.age);
        displayCharacters(charactersSortedByAge);
    };
    const sortByNameButton = document.createElement("button");
    sortByNameButton.textContent = "Trier par nom";
    sortByNameButton.onclick = () => {
        charactersHtml.innerHTML = "";
        const charactersSortedByName = filterFirst12Characters(characters).sort((a, b) => a.name.localeCompare(b.name));
        displayCharacters(charactersSortedByName);
    };

    sortingDiv.appendChild(sortByAgeButton);
    sortingDiv.appendChild(sortByNameButton);

    filterHtml.addEventListener("click", (e) => {
        e.stopPropagation();
        sortingDiv.style.top = `${e.clientY}px`;
        sortingDiv.style.left = `${e.clientX}px`;
        document.body.appendChild(sortingDiv);
    });
}


/* Appels */
configureDisplaySortOption();

const characters = await getCharacters();
const first12Characters = filterFirst12Characters(characters);
displayCharacters(first12Characters);

housesHtml.forEach(house => {
    house.addEventListener("click", () => {
        charactersHtml.innerHTML = "";
        const houseName = house.firstChild.nextSibling.alt;
        const charactersByHouse = filterCharactersByHouse(characters, houseName);
        displayCharacters(charactersByHouse);
    });
});