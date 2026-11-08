
const character = {
    name: 'Snortleblat',
    class: 'Swamp Beast Diplomat',
    level: 5,
    health: 100,
    image: 'images/snortleblat.webp',

    attacked: function () {
        if (this.health > 0) {
            this.health -= 20;

            if (this.health <= 0) {
                this.health = 0;
                characterMessage = 'The character has died!';

            } else {
                characterMessage = 'The character was attacked!';
            }

            renderCharacter();
        }
    },

    levelUp: function () {
        if (this.health > 0) {
            this.level++;
            characterMessage = 'Level increased!';

            renderCharacter();
        }
    }
};

let characterMessage = '';

function renderCharacter() {
    document.querySelector('#characterName').textContent = character.name;

    document.querySelector('#characterClass').textContent = character.class;

    document.querySelector('#characterLevel').textContent = character.level;

    document.querySelector('#characterHealth').textContent = character.health;

    document.querySelector('#characterImage').setAttribute('src', character.image);

    document.querySelector('#characterImage').setAttribute('alt', character.name);

    document.querySelector('#characterMessage').textContent = characterMessage;

    document.querySelector('#attackButton').disabled = character.health === 0;

    document.querySelector('#levelUpButton').disabled = character.health === 0;
}

// Display the character information
renderCharacter();

// Attack button event
document.querySelector('#attackButton').addEventListener('click', function () {
    character.attacked();
});

// Level up button event
document.querySelector('#levelUpButton').addEventListener('click', function () {
    character.levelUp();
});
