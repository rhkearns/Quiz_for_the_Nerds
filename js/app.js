/*-------------------- Constants------------------------*/

// sound for clicks
// sound for passing/failing quiz
// objects for each quiz
// object for each question with answer choices 

import { hpQuestions } from "../data/hp.js";


/*---------------------- Variables --------------------*/

// Create variables for number of questions, number answered, number answered correctly
let ans = null
let questionArray = []
let idx = 0
let category, score, correctAns

/*----------------- Cached Element References ---------*/

// Cached elements: question message; muliple choices 1-5; categories?; 
// categories
const titleEl = document.querySelector("#title")
const messageEl = document.querySelector("#message")
const catButtons = document.querySelector("#category-cards")
// const body = document.querySelector("body")
const main = document.querySelector("main")
const nextButton = document.getElementById("next-button")
// const questionContainer = document.querySelector('.question-container')
const homeNavBtn = document.getElementById("home")

/*---------------- Event Listeners -------------------*/

// clicks on categories and answers
catButtons.addEventListener('click', chooseCategory)
homeNavBtn.addEventListener('click', init)
nextButton.addEventListener('click', nextQuestion)
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
   score = 0
   idx = 0
   titleEl.innerText = "Nerd Quiz"
   messageEl.innerText = "Test Your Nerd Knowledge"
   // if (catButtons.hasAttribute("hidden")){
   //    catButtons.setAttribute('hidden', false)
   //}
}

function chooseCategory(evt){
   // console.log('innertext', evt.target.innerText);
   // console.log('Id', evt.target.id);
   category = evt.target.id;
   catButtons.setAttribute('hidden', true)
   pullQuestions(category)
   renderQuiz()
}


// render to quiz page
function renderQuiz () {
   catButtons.innerHTML = ""
   titleEl.innerHTML = `${category}`
   main.innerHTML =`
      <h2> Are you ready to begin?</h2>
      <button type="button" class="btn btn-primary" id="start-button">Begin</button>`
   const startBtn = document.querySelector("#start-button")
   startBtn.addEventListener('click', showQuestion)
   
}


function showQuestion() {
   console.log('here');
   titleEl.innerHTML = `${category}`
   main.innerHTML = `
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
   </div>`
   const multiChoiceItem = document.querySelectorAll(".list-group-item")
   multiChoiceItem.forEach(function(choice){
      if (choice.innerText === questionArray[idx].correctAns) {
         correctAns = choice
      }
   })
   const multiChoiceBlock = document.querySelector(".list-group")
   multiChoiceBlock.addEventListener('click', function(evt){
      if (ans === null){
         checkAnswer(evt)
      }
   })
}


// check answer
function checkAnswer(evt) {
   ans = evt.target.innerText;
   if (ans === questionArray[idx].correctAns) {
      evt.target.classList.add("correct")
      score++
      console.log('score', score);
   } else {
      evt.target.classList.add("wrong")
      correctAns.classList.add('correct')
      }
   if (idx === 9) {
      renderResult()
   } else {
      nextButton.removeAttribute("hidden")
   }
}

// totaling results
// render to result page
function renderResult () {
   if (score >= 6){
      messageEl.innerText = `Congratulations, you answered ${score} correct out of 10!`
   } else {
      messageEl.innerText = `Too bad, you only answered ${score} correct out of 10`
   }
   main.innerHTML = `<button type="button" class="btn btn-primary" id="home-button">Back to Home</button>`
   const homeButton = document.querySelector("#home-button")
   homeButton.addEventListener("click", init)
}

function nextQuestion () {
   nextButton.setAttribute('hidden', true)
   idx++
   ans = null
   showQuestion()
}


function pullQuestions (category) {
   console.log('here');
   switch (category) {
      case "harry-potter":
         questionArray = hpQuestions;
         break;
      case "lord-of-the-rings":
         questionArray = lotrQuestions;
         break;
      // case "star-wars":
      //    quesitonArray = swQuestions;
      //    break;
      // case "dungeons-dragons":
      //    questionArray = ddQuestions;
      // break;
      default:
         console.log('try again');;
   }
   console.log(questionArray);
} 

   
   
// extra: shuffle questions
// extra: random quiz
// extra: difficulties