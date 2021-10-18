/*-------------------- Constants------------------------*/

// sound for clicks
// sound for passing/failing quiz
// objects for each quiz
// object for each question with answer choices 

import { gotQuestions } from "../data/got.js";
import { hpQuestions } from "../data/hp.js";
import { lotrQuestions} from "../data/lotr.js";
import { mcuQuestions } from "../data/mcu.js";
import { swQuestions} from "../data/sw.js";
import { ddQuestions} from "../data/dd.js";


/*---------------------- Variables --------------------*/

// Create variables for number of questions, number answered, number answered correctly
let ans = null
let questionArray = []
let idx = 0
let category, score, correctAns
let timerIntervalId;
let winTime, min, sec, seconds = 0

/*----------------- Cached Element References ---------*/

// Cached elements: question message; muliple choices 1-5; categories?; 
// categories
const titleEl = document.querySelector("#title")
const messageEl = document.querySelector("#message")
const catButtons = document.querySelector("#category-cards")
const main = document.querySelector("main")
const nextButton = document.getElementById("next-button")
const homeNavBtn = document.getElementById("home")
const timerEl = document.querySelector(".timer")
const resultsButton = document.getElementById("results-button")


/*---------------- Event Listeners -------------------*/

// clicks on categories and answers
catButtons.addEventListener('click', chooseCategory)
homeNavBtn.addEventListener('click', init)
nextButton.addEventListener('click', nextQuestion)
resultsButton.addEventListener('click', renderResult)
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
   category = ""
   titleEl.innerText = "Nerd Quiz"
   questionArray = []
   ans = null
   messageEl.innerText = "Test Your Nerd Knowledge"
   if (catButtons.hasAttribute("hidden")){
      catButtons.hidden = false
   }
   main.innerHTML = ""
   timerEl.innerText = ""
   if (timerIntervalId) {
      clearInterval(timerIntervalId)
   }
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
   //catButtons.innerHTML = ""
   titleEl.innerHTML = `${category}`
   main.innerHTML =`
      <h2> Are you ready to begin?</h2>
      <button type="button" class="btn btn-primary" id="start-button">Begin</button>`
   const startBtn = document.querySelector("#start-button")
   startBtn.addEventListener('click', showQuestion)
   startBtn.addEventListener('click', startTimer)
   
}


function showQuestion() {
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
      console.log('choice', choice);
      console.log(questionArray[idx].correctAns);
      if (choice.innerText === questionArray[idx].correctAns) {
         correctAns = choice
         console.log('correctAns', correctAns);
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
   console.log('here 1');
   if (ans === questionArray[idx].correctAns) {
      evt.target.classList.add("correct")
      score++
      console.log('here 2');
   } else {
      evt.target.classList.add("wrong")
      correctAns.classList.add('correct')
      console.log('here 3');
      }
   if (idx === 9) {
      resultsButton.removeAttribute("hidden")
   } else {
      nextButton.removeAttribute("hidden")
   }
}

// totaling results
// render to result page
function renderResult () {
   resultsButton.setAttribute("hidden", true)
   winTime = seconds
   if (score >= 6){
      if (min < 1) {
         messageEl.innerText = `Congratulations, you answered ${score} correct out of 10 in ${sec} seconds!`
      } else if (min < 2) {
         messageEl.innerText = `Congratulations, you answered ${score} correct out of 10 in ${min} minute and ${sec} seconds!`
      } else {
         winMsg.innerText = `Congratulations, you answered ${score} correct out of 10 in ${min} minutes and ${sec} seconds!`
      }
   } else {
      if (min < 1) {
         messageEl.innerText = `Too Bad, you only answered ${score} correct out of 10 in ${sec} seconds`
      } else if (min < 2) {
         messageEl.innerText = `Too Bad, you only answered ${score} correct out of 10 in ${min} minute and ${sec} seconds`
      } else {
         messageEl.innerText = `Too Bad, you only answered ${score} correct out of 10 in ${min} minutes and ${sec} seconds`
      }
   }
   timerEl.innerText = ''
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
   switch (category) {
      case "harry-potter":
         questionArray = hpQuestions;
         break;
      case "lord-of-the-rings":
         questionArray = lotrQuestions;
         break;
      case "star-wars":
         questionArray = swQuestions;
         break;
      case "dungeons-dragons":
         questionArray = ddQuestions;
      break;
      case "game-of-thrones":
         questionArray = gotQuestions;
      break;
      case "marvel-cinematic-universe":
         questionArray = mcuQuestions;
      break;
      default:
         console.log('try again');;
   }
   console.log(questionArray);
} 

function startTimer() {
   // Check for an active timer interval
   if (timerIntervalId){
      // If interval exists, clear it and reset seconds to zero
      seconds = 0
      clearInterval(timerIntervalId)
   }
   // Start a new timer interval
   timerIntervalId = setInterval(tick, 1000)
}

function tick() {
   // Increment seconds by 1
   seconds++
   // Call render function
   if (!winTime) {
   renderTimer()
   }
}

function renderTimer() {
   // Calculate min/sec
   min = Math.floor(seconds / 60)
   sec = seconds % 60
	// Display current min/sec in the timerEl element
   if (sec < 10) {
      timerEl.innerText = `${min}:0${sec}`
   } else {
      timerEl.innerText = `${min}:${sec}`
   }
}

// extra: shuffle questions
// extra: random quiz
// extra: difficulties