/* Appels au DOM */

const charactersHtml = document.body.querySelector(".characters");
const housesHtml = document.body.querySelectorAll(".houses div");

/* Fonctions */

async function getCharacters()
{
    return await fetch('https://hp-api.onrender.com/api/characters')
                                .then(res => res.json())
                                .catch(err => console.error(err));
}

function filterFirst12Characters(characters)
{
    return characters.slice(0, 12);
}

function display12firstCharacters(characters)
{
    characters.forEach(element => {
        charactersHtml.innerHTML += `
            <div>
                <img src="${element.image}" class="${element.house.toLowerCase()}" alt="${element.name}" />
                <p>${element.name}</p>
            </div>
        `;
    });
}

function filterCharactersByHouse(characters, house)
{
    return characters.filter(character => character.house === house);
}


/* Appels */

const characters = await getCharacters();
const first12Characters = filterFirst12Characters(characters);
display12firstCharacters(first12Characters);

housesHtml.forEach(house => {
    house.addEventListener("click", () => {
        charactersHtml.innerHTML = "";
        const houseName = house.firstChild.nextSibling.alt;
        const charactersByHouse = filterCharactersByHouse(first12Characters, houseName);
        display12firstCharacters(charactersByHouse);
    });
});