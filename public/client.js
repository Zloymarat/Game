import { response } from "express";

let state;
let uselessCounter = 0;
let stateChange =  
function setup() {
  createCanvas(400, 400);
  state = 'start';
}

function draw() {
  background(220);
  
  if (state === 'start') {
    start();
  }
  else if(state === 'game') {
    game();
  }
  else if(state === 'over') {
    over();
  }
  
  if (state === 'start' && keyIsPressed && key === 's') {
    state = 'game';
  }
  if (state === 'over' && keyIsPressed && key === 'r') {
    /** Option 1: radical page reload */
    document.location.reload(true);
    
    /** Option 2: soft state change */
    // state = 'start';
    // uselessCounter = 0;
  }

}

function start() {
  text('Press S to start', 40, 50, 50);
}

function game() {
  // Here goes your code 
  // ...
  background(0, 112, 255);
  
  // this condition is just for holding game state for few seconds
  uselessCounter++;
  if (uselessCounter > 200) { 
    state = 'over'; // use if get rid of lives!
    stateChange =  true;
  }
}

function over() {
  background(255, 112, 112);
  text('GAME OVER', 40, 50, 50);
  text('press R to restart', 60, 80, 150);

  if (stateChange){
    stateChange = false;
    let body = document.querySelector('body');

    let form = document.createSelection('form');
    form.setAttribute('class', 'form')

    let newBtn = document.createElement('button')
    newBtn.textContent = "Save";

    let newInput = document.createElement('Input');
    newInput.textContent = ('type', 'text');

    let allBtn = document.createElement('button');
    allBtn.textContent = "Top3";

    body.appendChild(allBtn);
    body.appendChild(form);
   form.appendChild(newInput);
   form.appendChild(newBtn);

    allBtn.addEventListener('click', (e) =>{
        fetch('/top')
        .then(rest => response.json)
       .then(data => console.log(data));

    })

   form.addEventListener('submit', (e) =>{
       console.log ("Button pressed");

       fetch('/save', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json; charset=utf-8'  
           },
           body: JSON.stringify({name: newInput.value, score:50})
       })
       .then(rest => response.json)
       .then(data => console.log(data));

       // req.body.name

       e.preventDefault();
   })

  }
}