$(document).ready(() => {
  function Rank(name, value) {
    this.name = name;
    this.value = value;
  }

  const ranks = [
    new Rank('2', 2),
    new Rank('3', 3),
    new Rank('4', 4),
    new Rank('5', 5),
    new Rank('6', 6),
    new Rank('7', 7),
    new Rank('8', 8),
    new Rank('9', 9),
    new Rank('10', 10),
    new Rank('jack', 10),
    new Rank('queen', 10),
    new Rank('king', 10),
    new Rank('ace', 11),
  ];

  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];

  let playerHandValue = 0;
  let playerCardCount = 0;
  let playerHandArray = [];
  let dealerHandValue = 0;
  let dealerCardCount = 0;
  let dealerHandArray = [];
  let playerName;
  let playerWallet = 3000;

  $('.show').hide();
  // game interface will be hidden when the page loads.

  const getRandomIndex = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // functions returns a random number between min and max, depending on the argument that pass in.

  const drawCard = function () {
    const currentCard = ranks[getRandomIndex(0, 12)];
    const randomSuit = suits[getRandomIndex(0, 3)];
    currentCard.suit = randomSuit;
    return currentCard;
  };
  /* this function is access the ranks array and suits array.
  Pull random card and suit, and combine them.
  */

  const dealerDraw = function () {
    const currentCard = drawCard();
    dealerHandArray.push(currentCard.name);
    dealerHandValue += currentCard.value;
    const cardImg = `img-asset/${currentCard.name}-${currentCard.suit}.png`;
    $('.dealercards').append(`<img src="${cardImg}"/>`);
    dealerCardCount += 1;
  };
  // draws a card and append to dealer's hand.

  const playerDraw = function () {
    const currentCard = drawCard();
    playerHandArray.push(currentCard.name);
    playerHandValue += currentCard.value;
    const cardImg = `img-asset/${currentCard.name}-${currentCard.suit}.png`;
    $('.playercards').append(`<img src="${cardImg}"/>`);
    playerCardCount += 1;
  };
  // draws a card and append to player's hand.

  const checkBust = function (value) {
    if (value > 21) {
      setTimeout(() => {
        $('#resultdisplay').text('Bust!');
        $('#playerwallet').html(playerWallet -= 100);
      }, 250);
      $('#hitbutton').off('click');
      $('#standbutton').off('click');
    }
  };
  // check if hand is over 21.

  const compareValue = function () {
    if (dealerHandValue > 21) {
      $('#resultdisplay').text(`Dealer Bust! ${playerName} Won!`);
      $('#playerwallet').html(playerWallet += 100);
    } else if (dealerHandValue > playerHandValue) {
      $('#resultdisplay').text('Dealer Won!');
      $('#playerwallet').html(playerWallet -= 100);
    } else if (dealerHandValue < playerHandValue) {
      $('#resultdisplay').text(`${playerName} Won!`);
      $('#playerwallet').html(playerWallet += 100);
    } else if (dealerHandValue === playerHandValue) {
      $('#resultdisplay').text('Push!');
    }
  };
  // compare for winner.


  const dealerTurn = function () {
    $('#deck-back').remove();
    $('#hitbutton').off('click');
    $('#standbutton').off('click');
    if (dealerCardCount < 5 && dealerHandValue < 17) {
      dealerDraw();
      setTimeout(dealerTurn(), 10000);
    } else if (dealerCardCount >= 4 || dealerHandValue >= 17) {
      compareValue();
    }
  };
  // dealer draws cards and add to hand until meeting certain condition.

  const hitButton = function () {
    playerDraw();
    if (playerCardCount > 4) {
      $('#hitbutton').off('click');
      $('#standbutton').off('click');
      dealerTurn();
    }
    checkBust(playerHandValue);
  };
  // add hit button that add new card to player hand.
  // check if player's has 5 card, then will move to dealer's turn

  const standButton = function () {
    dealerTurn();
  };
  // function that will pass to dealer's turn

  const startDeal = function () {
    for (let i = 0; i < 2; i += 1) {
      playerDraw();
    }
    dealerDraw();
    $('.dealercards').append('<img id="deck-back" src="img-asset/deck-back.png"/>');
  };

  // Get the modal
  const modal = document.getElementById('myModal');

  // Get the button that opens the modal
  const btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  /*
  this function will run when game start.
  will draw two cards for player, and 1 face up and 1 face down card for dealer
  */
  $('#dealbutton').click(() => {
    $('.hide').remove();
    $('.show').show();
    $('#resultdisplay').text('Deal!');
    dealerHandValue = 0;
    dealerCardCount = 0;
    playerHandValue = 0;
    playerCardCount = 0;
    $('img').remove();
    $('#hitbutton').click(hitButton);
    $('#standbutton').click(standButton);
    playerHandArray = [];
    dealerHandArray = [];
    startDeal();
  });
  // add button allow to move to next.
  // revert all to default values.

  $('#startbutton').click(() => {
    $('.hide').remove();
    $('.show').show();
    $('#hitbutton').click(hitButton);
    $('#standbutton').click(standButton);
    $('#playerwallet').html(playerWallet);
    playerName = prompt('Please enter your name.');
    if (playerName != null) {
      $('#nameinput').text(playerName);
    }
    startDeal();
  });
  // clicking start button, game interface will show, and hide the title and start button.
});
