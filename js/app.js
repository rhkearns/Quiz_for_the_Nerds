/*-------------------- Constants------------------------*/

import { gotQuestions } from "../data/got.js";
import { hpQuestions } from "../data/hp.js";
import { lotrQuestions} from "../data/lotr.js";
import { mcuQuestions } from "../data/mcu.js";
import { swQuestions} from "../data/sw.js";
import { ddQuestions} from "../data/dd.js";

const hpSound = new Audio ("../sounds/Magic-Spell-A-Short.mp3")
const lotrSound = new Audio ("../sounds/DoubleSwordScrape.mp3")
const swSound = new Audio ("../sounds/Laser_shoot 162 (1).wav")
const gotSound = new Audio ("../sounds/Dragon-Roar-11.mp3")
const mcuSound = new Audio ("../sounds/Swipe-Punch.mp3")
const ddSound = new Audio ("../sounds/Dice-Shaking-in-Hand-2.mp3")
const sadSound = new Audio ("../sounds/Sad-Trombone.mp3")
const happySound = new Audio ("../sounds/Party-Blower.mp3")
const categoriesArray = ["harry-potter", "lord-of-the-rings", "star-wars", "dungeons-dragons", "game-of-thrones", "marvel-cinematic-universe"]

/*---------------------- Variables --------------------*/

let ans = null
let questionArray = []
let idx = 0
let category, score, correctAns, catTitle, catSound
let timerIntervalId;
let winTime, min, sec, seconds = 0

/*----------------- Cached Element References ---------*/

const body = document.querySelector("body")
const titleEl = document.querySelector("#title")
const messageEl = document.querySelector("#message")
const catButtons = document.querySelector("#category-cards")
const main = document.querySelector("main")
const nextButton = document.getElementById("next-button")
const homeNavBtn = document.getElementById("home")
const timerEl = document.querySelector(".timer")
const resultsButton = document.getElementById("results-button")
const startBtn = document.querySelector("#start-button")
const homeButton = document.querySelector("#home-button")
const lightDark = document.querySelector(".light-dark")
const switchLabel = document.querySelector('.switch-label')
const randomBtn = document.querySelector('#random-button')


/*---------------- Event Listeners -------------------*/

// clicks on categories and answers
catButtons.addEventListener('click', function(event){
   event.preventDefault()
   if (event.target.id !== "category-cards")
      chooseCategory(event)
   })
startBtn.addEventListener('click', showQuestion)
startBtn.addEventListener('click', startTimer)
homeNavBtn.addEventListener('click', init)
nextButton.addEventListener('click', nextQuestion)
resultsButton.addEventListener('click', renderResult)
homeButton.addEventListener("click", init)

// extra 1: hover over on categories and answers
catButtons.addEventListener('mouseover', function(evt){
   evt.preventDefault()
   if (evt.target.id !== "category-cards") {
      showLabel(evt)
   } 
})
catButtons.addEventListener('mouseout', function(evt){
   evt.preventDefault()
   if (evt.target.id !== "category-cards") {
      if (!evt.target.nextElementSibling.hidden) {
         hideLabel(evt)
      }
   }
})

// toggle: light and dark mode
lightDark.addEventListener('click', lightDarkToggle)

// generate random quiz
randomBtn.addEventListener('click', generateRandomQuiz)

/*------------------- Functions ---------------------*/

// init to landing page
init ()
checkDarkPref()

function init (){
   homeButton.setAttribute('hidden', true)
   nextButton.setAttribute('hidden', true)
   if (timerIntervalId) {
      clearInterval(timerIntervalId)
   }
   score = 0
   idx = 0
   category = ""
   titleEl.innerText = "Nerd Quiz"
   timerIntervalId = 0
   winTime = 0
   seconds = 0
   questionArray = []
   ans = null
   messageEl.innerText = "Test Your Nerd Knowledge"
   if (catButtons.hasAttribute("hidden")){
      catButtons.hidden = false
   }
   if (randomBtn.hasAttribute("hidden")){
      randomBtn.hidden = false
   }
   main.innerHTML = ""
   timerEl.innerText = ""
}

// populate variables with values from data
function chooseCategory(evt){
   //play sound specific to each category
   setTimeout(function(){
      catSound.volume = .20
      catSound.play();
   }, 100)
   category = evt.target.id;
   catButtons.setAttribute('hidden', true)
   randomBtn.setAttribute('hidden', true)
   pullQuestions(category)
   renderQuiz()
}

// render to quiz page
function renderQuiz () {
   titleEl.innerHTML = catTitle
   messageEl.innerHTML = `Are you ready to begin?`
   startBtn.removeAttribute('hidden')
}

// render each question
function showQuestion() {
   startBtn.setAttribute('hidden', true)
   titleEl.innerHTML = catTitle
   messageEl.innerText = ''
   main.innerHTML = `
      <div class="qCard" style="width: 100%;">
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
      <div class="progress" style="height:30px">
         <div class="progress-bar" role="progressbar" style="width: ${(idx+1) * 10}%" aria-valuenow="${idx * 10}" aria-valuemin="0" aria-valuemax="100">${idx+1}/10</div>
      </div>`
   // create variable that stores the correct answer
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


// check answer & assign class that shows the correct answer
function checkAnswer(evt) {
   ans = evt.target.innerText;
   if (ans === questionArray[idx].correctAns) {
      evt.target.classList.add("correct")
      score++
   } else {
      evt.target.classList.add("wrong")
      correctAns.classList.add('correct')
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
      setTimeout(function(){
         happySound.volume = .20
         happySound.play()
      }, 50)
      if (min < 1) {
         messageEl.innerHTML = `Congratulations! <br> You answered ${score} correct out of 10 in ${sec} seconds!`
      } else if (min < 2) {
         messageEl.innerHTML = `Congratulations! <br> You answered ${score} correct out of 10 in ${min} minute and ${sec} seconds!`
      } else {
         messageEl.innerHTML = `Congratulations! <br> You answered ${score} correct out of 10 in ${min} minutes and ${sec} seconds!`
      }
   } else {
      setTimeout(function(){
         sadSound.volume = .20
         sadSound.play()
      }, 50)
      if (min < 1) {
         messageEl.innerHTML = `Too Bad! <br> You only answered ${score} correct out of 10 in ${sec} seconds`
      } else if (min < 2) {
         messageEl.innerHTML = `Too Bad! <br> You only answered ${score} correct out of 10 in ${min} minute and ${sec} seconds`
      } else {
         messageEl.innerHTML = `Too Bad! <br> You only answered ${score} correct out of 10 in ${min} minutes and ${sec} seconds`
      }
   }
   timerEl.innerText = ''
   main.innerText = ''
   homeButton.removeAttribute('hidden')
}

// shows the next question
function nextQuestion () {
   nextButton.setAttribute('hidden', true)
   idx++
   ans = null
   showQuestion()
}

//assigns global vairables with imported information
function pullQuestions (category) {
   switch (category) {
      case "harry-potter":
         questionArray = hpQuestions;
         catTitle = "Harry Potter"
         catSound = hpSound
         break;
      case "lord-of-the-rings":
         questionArray = lotrQuestions;
         catTitle = "Lord of the Rings"
         catSound = lotrSound
         break;
      case "star-wars":
         questionArray = swQuestions;
         catTitle = "Star Wars"
         catSound = swSound
         break;
      case "dungeons-dragons":
         questionArray = ddQuestions;
         catTitle = "Dungeons & Dragons"
         catSound = ddSound
      break;
      case "game-of-thrones":
         questionArray = gotQuestions;
         catTitle = "Game of Thrones"
         catSound = gotSound
      break;
      case "marvel-cinematic-universe":
         questionArray = mcuQuestions;
         catTitle = "Marvel Cinematic Universe"
         catSound = mcuSound
      break;
      default:
      break;
   }
} 

// starts the timer
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

// increments the clock
function tick() {
   // Increment seconds by 1
   seconds++
   // Call render function
   if (!winTime) {
   renderTimer()
   }
}

// shows the timer
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

// toggles Light/Dark mode
function lightDarkToggle(){
   body.className = body.className === "dark" ? "" : "dark"
   switchLabel.innerText = body.className === "dark" ?  "🔆" : "🌙"
}

// Checks if user has a Dark Mode preference
function checkDarkPref () {
   if (
      window.matchMedia("(prefers-color-scheme:dark)").matches && body.className !== "dark"
   ) {
      lightDarkToggle()
      lightDark.setAttribute("checked", true)
   }
}

// extra: generates random quiz
function generateRandomQuiz(evt){
   let rIdx = Math.floor(Math.random() * 6)
   category = categoriesArray[rIdx]
   setTimeout(function(){
      catSound.volume = .20
      catSound.play();
   }, 100)
   catButtons.setAttribute('hidden', true)
   randomBtn.setAttribute('hidden', true)
   pullQuestions(category)
   renderQuiz()
}

// shows the category label on Mouseover
function showLabel(evt){
   evt.target.nextElementSibling.hidden = false
   evt.target.nextElementSibling.classList.remove("animate__animated", "animate__slideOutUp", "animate__faster")
   evt.target.nextElementSibling.classList.add('animate__animated', "animate__slideInDown", "animate__faster")
}

// hides the category label on Mouseout
function hideLabel(evt){
   //evt.target.nextElementSibling.hidden = true
   evt.target.nextElementSibling.classList.remove("animate__animated", "animate__slideInDown", "animate__faster")
   evt.target.nextElementSibling.classList.add("animate__animated", "animate__slideOutUp", "animate__faster")
}