# Age-of-Empires-4-Unit-Counter-Calculator

This app is designed to help Age of Empires 4 players simulate a battle between two teams of units to see which side would defeat the other without the rigorous, difficult and tedious setup it takes to create a true simulation in the game.

**Link to project:** https://gleaming-puce-parrot.cyclic.app/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Node, Express, MongoDB

The app is built by using Javascript, EJS and CSS on the frontend with a Node.js backend. Each select element a different set on information from the MongoDB database based on the values of the other select elements to show the correct stats for the unit specified. Once the user has chosed two teams and they hit the submit button, the form is sent to the Node.js server and a series of calculations are used to determine a team's true damage (damage minus armor, etc.) and time to kill the other team. Once the calculations are complete a response is sent back and the page is updated with javascript. 

## Optimizations

include the resource value of each team and compare them
use the units pictures during the selection process
be able to include one than one unit type on each team (challenge: how to determine which unit is attacking on the other to correctly apply bonuses.)
integrate civ attack speed bonuses, Abbasid Camel Unease bonus, etc.
update with new civs

## Lessons Learned:

Ejs cannot be is ummutable after it is rendered. Javascript is needed to manipulate the generated html to add information to the DOM
targeting elements that are not intially rendered (result section)
running a script to change the documents in the database to better fit my use for them


![7w7p2l](https://github.com/tdjohnson7/Age-of-Empires-4-Unit-Counter-Calculator/assets/102444625/9b62ddc3-a7db-45de-826c-f6c79dcfdafa)
