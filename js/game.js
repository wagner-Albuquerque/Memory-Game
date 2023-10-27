const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'beth', 'jerry', 'jessica', 'morty', 'pessoa-passaro',
    'pickle-rick', 'rick', 'summer', 'meeseeks', 'scroopy',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secundCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length === 20){
        clearInterval(this.loop);
        alert(`parabéns, ${spanPlayer.innerHTML}! seu tempo foi: ${timer.innerHTML}`);
    }

} 
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secundCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card');
        secundCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secundCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secundCard.classList.remove('reveal-card');

            firstCard = '';
            secundCard = '';
        }, 500);  
    }
}

const revealCard =({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
    return;
}

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode

    }else if(secundCard === ''){
        target.parentNode.classList.add('reveal-card');
        secundCard = target.parentNode
    }
        checkCards();

}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.png')`;

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character)
    return card;
}

const loadGame = () => {

    const duplicateChacaaters = [...characters, ...characters];

                                                            
    const embalhararArray = duplicateChacaaters.sort(() => Math.random() - 0.5)

    embalhararArray.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer  = () => {
    this.loop = setInterval(() => {
      const currentTime  = +timer.innerHTML;
      timer.innerHTML = currentTime+1

    },1000);
}
window.onload = () => {

    const playName = localStorage.getItem('player');
    spanPlayer.innerHTML =  playName
    
    startTimer();

    loadGame();
}

