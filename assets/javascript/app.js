$(document).ready(function () {

  // Create global quiz variables

  // the timer for each question
  var questionTimer = 0;
  // track number of questions the player gets right and wrong
  var numRight = 0;
  var numWrong = 0;
  // create timer variable
  var counter = 0;
  // create variables for the various display blocks we will create and add/remove from the DOM
  var displayButton = "";
  var displayInstructions = "";  // id "instText"
  var displayTimer = "";         // id "theTimer"
  var displayQuestion = "";      // id "theQuestion"
  var displayAnswers = "";       // ul id "answerDisplay" - li id "possibleAnswer"
  var displayWinLoss = "";
  var tempDisplay = "";
  // flag to display START or PLAY AGAIN button - we will set this to true as soon as Start is pushed
  var playAgainButton = false;
  // gets the selection from the user
  var answerGuess = 0;
  // has the user made a selection yet?
  var userGuessed = false;
  // has the timer run out yet?
  var timeUp = false;
  // the current question being asked
  var currQuestion = "";

  // create quiz object
  var quiz =
    [
      { question: "Which Disney World ride is not a rollercoaster?", choices: ["Big Thunder Mountain", "Everest", "Carousel of Progress", "Seven Dwarves Mine Train"], answer: "2" },
      { question: "Which park is not a Disney park?", choices: ["Epcot", "Universal Studios", "Animal Kingdom"], answer: "1" },
      { question: "Where in Disney World will you find Spaceship Earth?", choices: ["Magic Kingdom", "Epcot"], answer: "1" },
      { question: "Which Disney park does not have fireworks?", choices: ["Magic Kingdom", "Hollywood Studios", "Epcot", "Animal Kingdom"], answer: "3" },
      { question: "Which resort can you eat at Chef Mickeys?", choices: ["Animal Kingdom Lodge", "Contemporary Resort", "Carribean Beach Resort"], answer: "1" }
    ];

  // display game instructions
  function displayGameInstructions() {
    displayInstructions = '<h1 id="instText">The game is simple - press start and you will be given 30 seconds for each question.</h1>';
    $("#gameTitle").append(displayInstructions);
  }

  // remove game instructions - used when we actually start a quiz
  function removeGameInstructions() {
    tempDisplay = document.getElementById("instText");
    tempDisplay.style.display = "none";
  }

  // evaluate the time remaining 
  function timer() {
    questionTimer = questionTimer - 1;
    // document.getElementById("theTimer").innerHTML = '<h1 id="theTimer">You B have 0 seconds remaining to answer this question.</h1>'; 
  }

  // display the question and answers
  function runTheQuiz() {
    currQuestion = "";

    // track number of questions the player gets right and wrong in the quiz
    // NOTE - all questions are right or wrong - no unanswered
    numRight = 0;
    numWrong = 0;

    // variable to capture the answer value from the option selected
    answerGuess = "";
    answerActual = "";

    // run the quiz - run through each question
    for (let i = 0; i < quiz.length; i++) {
      currQuestion = quiz[i].question;
      answerActual = quiz[i].answer;
      questionTimer = 5;
      //    console.log("currQues "+currQuestion + "actAnswer "+answerActual + "qTimer "+questionTimer);

      // display the initial timer but don't start yet
      displayTimer = '<h1 id="theTimer">You have ' + questionTimer + ' seconds remaining to answer this question.</h1>';
      $("#gameTitle").append(displayTimer);

      // display one question to the player one at a time 
      displayQuestion = '<h1 id="theQuestion">' + currQuestion + '</h1>';
      $("#theTimer").append(displayQuestion);

      // build out the list of all possible answers for display on the DOM using <ul>
      // the block below (approximately) is appended to DOM 
      // <ul>
      //   <li class="possibleAnswer" value="0">A</li>
      //   <li class="possibleAnswer" value="1">B</li>
      //   <li class="possibleAnswer" value="2">C</li>
      // </ul>
      displayAnswers = "";
      for (let j = 0; j < quiz[i].choices.length; j++) {
        displayAnswers = displayAnswers + '<li class="possibleAnswer" value="' + j + '">' + quiz[i].choices[j] + '</li>';

        console.log("i=" + i + "j=" + j + "QiCL" + quiz[i].choices.length);
      }
      console.log("Outside");
      displayAnswers = '<div id="answerDisplay"><ul class="answerFormat">' + displayAnswers + '</ul></div>';
      $("#theQuestion").append(displayAnswers);
      // console.log(displayAnswers);

      // give the user a specific amount of time to complete the question
      //    counter = setInterval(timer, 1000);

      // now we wait for the user to select an answer before we go to the next question
      answerGuess = -1;
      $(".possibleAnswer").click(function () {
        answerGuess = $(this).val();
        // stop the timer immediately 
        //    clearInterval(counter);

        // evaluate the users selection
        if (answerGuess === answerActual) {
          // user got the question correct
          numRight += 1;
          statusBlock = "You got that one right - congratulations!"
        } else {
          // user got the question wrong
          numWrong += 1;
          statusBlock = "Sorry - you got that one wrong. The answer was " + answerActual;
        }
        statusBlock = '<div id="answerDisplay"><h1>' + statusBlock + '</h1><h1>Correct Answers: ' + numRight + '</h1><h1>Wrong Answers: ' + numWrong + '</h1></div>';

        // clear the answer display area so we can display the correct answer
        tempDisplay = document.getElementById("answerDisplay");
        tempDisplay.style.display = "none";

        // now display the answer and current status
        $("#theQuestion").append(statusBlock);

        // display a next button below the then the "Next Question" button
        // change the wording on the Start button to 
        displayButton = '<button id="nextQuestion">Next Question</button>';
        $("#answerDisplay").append(displayButton);

        $("#nextQuestion").click(function () {
          // when the start button is clicked we will run the quiz
          tempDisplay = document.getElementById("nextQuestion");
          tempDisplay.style.display = "none";
          // move to the next question
        });
      });
    }
  }


  // OK lets get started - game title is already displayed and will stay displayed
  // we will key off that title to add display elements to the DOM

  // first display the game instructions
  displayGameInstructions();

  // add a button on the screen to start the quiz
  displayButton = '<button id="startQuiz">Start Quiz</button>';
  $("#gameTitle").append(displayButton);

  // when the user clicks the start button we begin quiz
  $("#startQuiz").click(function () {
    // first we remove the start button and clear the screen for other items
    tempDisplay = document.getElementById("startQuiz");
    tempDisplay.style.display = "none";
    // also remove the instructions
    removeGameInstructions();
    // now run the quiz
    runTheQuiz();
  });

});