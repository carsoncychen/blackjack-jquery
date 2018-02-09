Project 1 - Blackjack

===HTML===================

game landing page
    h1, title 
    h2, subtitle
    input field for name
    start button
    display starting money
    full deck
    
game page
-remove/hide following:
    h1, title
    h2, subtitle
    input field for name
    start button
-add following:
    player name
    shuffle motion for desk
    add info page/display info on the side

game win or lose
    large image pop up
    image clickable to restart the game    


===CSS====================







===JS=====================

<!-- add event listener on load -->

add function for displaying player name entry

add click event for start button that will trigger following:
    hide/remove:
        h1, title
        h2, subtitle
        input field for name
        start button
    add:
        display field for name entry
        runs shuffle motion
        info page/display info on the side         
add click event to coin image that start round and deduct money off total money

also function that runs automatically give each player two random cards 

add click event to hit button that add card to hand until 21

add check bust function for if the value on hand is over 21

add stay button to pass turn to dealer.

add function that dealer will continue draw new card until total value over 17.

if both at 21, dealer win.

add function that checks winning condition:
    total money = 0 or less, loss
        loss image will pop up
        add click event for game reset
    total money >= 5000, win
        win image will pop up
        add click event for game reset

  










