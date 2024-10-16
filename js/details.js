/* Appel au DOM */

const characterId = new URLSearchParams(window.location.search).get('id');

const characterHtml = document.body.querySelector("main");


/* Fonctions */

async function getCharacterById(id) {
    const result = await fetch(`https://hp-api.onrender.com/api/character/${id}`)
        .then(res => res.json())
        .catch(err => console.error(err));

    return result[0];
}

function displayCharacter(character) {
    characterHtml.innerHTML = `
    <section>
      <h3>${character.name}</h3>
      <div class="perso">
        <figure class="perso__left">
          <img src="${character.image}" alt="${character.name}" onerror="this.src='../images/logo/logo.png'" />
          <figcaption>${character.name}</figcaption>
        </figure>
        <div class="perso__right">
          <table>
            <tr>
              <th>Gender</th>
              <td>${character.gender}</td>
            </tr>
            <tr>
              <th>Eye</th>
              <td>${character.eyeColour}</td>
            </tr>
            <tr>
              <th>Hair</th>
              <td>${character.hairColour}</td>
            </tr>
            <tr>
              <th>Date of birth</th>
              <td>${character.dateOfBirth}</td>
            </tr>
            <tr>
              <th>Patronous</th>
              <td>${character.patronus}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
    <section class="house__perso">
      <img src="./images/logo/${character.house}.png" alt="${character.house}" onerror="this.src='../images/logo/logo.png'" />
    </section>
    `;
}

/* Appels */


const character = await getCharacterById(characterId);

displayCharacter(character);