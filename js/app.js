/*-------------------- Constants------------------------*/

// sound for clicks
// sound for passing/failing quiz
// objects for each quiz
// object for each question with answer choices 

import { hpQuestions } from "../data/hp.js";


/*---------------------- Variables --------------------*/

// Create variables for number of questions, number answered, number answered correctly

let category, score, correctAns 
let questionArray = []
let idx = 0

/*----------------- Cached Element References ---------*/

// Cached elements: question message; muliple choices 1-5; categories?; 
// categories
const titleEl = document.querySelector("#title")
const messageEl = document.querySelector("#message")
const catButtons = document.querySelector("#category-cards")
const body = document.querySelector("body")


/*---------------- Event Listeners -------------------*/

// clicks on categories and answers
catButtons.addEventListener('click', chooseCategory)

// extra 1: hover over on categories and answers
// extra 2: click on pause button
// toggle: light and dark mode
// replay quiz

function test(evt) {
   console.log(evt.target);
}
/*------------------- Functions ---------------------*/

// init to landing page
init ()

function init (){
   titleEl.innerText = "Nerd Quiz"
   messageEl.innerText = "Test Your Nerd Knowledge"
   score = 0
   idx = 0
   
}



// change between questions
// extra: shuffle questions
// extra: random quiz
// extra: difficulties


function chooseCategory(evt){
   console.log('innertext', evt.target.innerText);
   console.log('Id', evt.target.id);
   category = evt.target.id;
   renderQuiz()
   pullQuestions()
}


// render to quiz page
function renderQuiz () {
   catButtons.innerHTML = ""
   titleEl.innerHTML = `${category}`
   body.innerHTML =`
      <h2> Are you ready to begin?</h2>
      <button type="button" class="btn btn-primary" id="start-button">Begin</button>
      <button type="button" class="btn btn-primary" id="back-button">Back to Home</button>`
   const startBtn = document.querySelector("#start-button")
   startBtn.addEventListener('click', showQuestion)
   const backButton = document.querySelector('#back-button')
   backButton.addEventListener('click', init)
}


function showQuestion() {
   console.log(questionArray[idx])
   titleEl.innerHTML = `${category}`
   body.innerHTML = `
   <div class="card" style="width: 18rem;">
   <div class="card-header">
      ${questionArray[idx].question} 
   </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item" id="a">${questionArray[idx].multChoice[0]}</li>
      <li class="list-group-item" id="b">${questionArray[idx].multChoice[1]}</li>
      <li class="list-group-item" id="c">${questionArray[idx].multChoice[2]}</li>
      <li class="list-group-item" id="d">${questionArray[idx].multChoice[3]}</li>
      <li class="list-group-item" id="e">${questionArray[idx].multChoice[4]}</li>
      </ul>
   </div>
   <button type="button" class="btn btn-primary" id="back-button">Back to Home Menu</button>`
   const backButton = document.querySelector('#back-button')
   backButton.addEventListener('click', test)
   const multiChoiceItem = document.querySelectorAll(".list-group-item")
   multiChoiceItem.forEach(function(choice){
      console.log(choice);
      if (choice.innerText === questionArray[idx].correctAns) {
         correctAns = choice
         console.log(correctAns);
      }
   })
   const multiChoiceBlock = document.querySelector(".list-group")
   multiChoiceBlock.addEventListener('click', checkAnswer)
}


// check answer
function checkAnswer(evt, multiChoiceBlock) {
   let ans = evt.target.innerText;
   console.log('block', multiChoiceBlock);
   console.log("ans", ans);
   if (ans === questionArray[idx].correctAns) {
      console.log('correct');
      evt.target.classList.add("correct")
      console.log(evt.target.className);
      score++
      console.log('score', score);
   } else {
      console.log("wrong");
      evt.target.classList.add("wrong")
      correctAns.classList.add('correct')
      }
   body.appendChild()
   `<button type="button" class="btn btn-primary" id="next-button">Next Question</button>`
   const nextButton = document.querySelector('#next-button')
   nextButton.addEventListener('click', nextQuestion)
}

// totaling results
// render to result page
function renderResult () {

}

function nextQuestion () {

}


function backToHome(){
   init()
}

function pullQuestions () {
   console.log('here');
   switch (category) {
      case "harry-potter":
         questionArray = hpQuestions;
         break;
      case "lord-of-the-rings":
         questionArray = lotrQuestions;
         break;
      case "star-wars":
         quesitonArray = swQuestions;
         break;
      case "dungeons-dragons":
         questionArray = ddQuestions;
      break;
      default:
         console.log('try again');;
   }
   
}