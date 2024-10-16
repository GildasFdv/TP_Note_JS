/* Appels au DOM */

const charactersHtml = document.body.querySelector(".characters");


/* Fonctions */

async function getCharacters()
{
    return await fetch('https://hp-api.onrender.com/api/characters')
                                .then(res => res.json())
                                .catch(err => console.error(err));
}

function display12firstCharacters(characters)
{
    characters.slice(0, 12).forEach(element => {
        charactersHtml.innerHTML += `
            <div>
                <img src="${element.image}" class="${element.house.toLowerCase()}" alt="${element.name}" />
                <p>${element.name}</p>
            </div>
        `;
    });
}


/* Appels */

const characters = await getCharacters();
display12firstCharacters(characters);