import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase , ref , set ,push ,onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyApj5odkRad55j8w1pGwYzGAZTY6mCxvGo",
    authDomain: "quiz-app-911c3.firebaseapp.com",
    projectId: "quiz-app-911c3",
    storageBucket: "quiz-app-911c3.appspot.com",
    messagingSenderId: "281454579117",
    appId: "1:281454579117:web:088531c2ebfd9259bca524",
    measurementId: "G-KK86NWTSFT"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log(app);
console.log(database);
// Quiz App js Start
var questions = [
    {
        question:"Html Stands For _______________________",
        options: ["Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language"
        ],
        correctAns: "Hypertext markup language",
    },
    {
        question:"Css Stands For _______________________",
        options: [
            "Casecading Style Sheet",
            "Java",
            "Ram",
            "Hypertext markup language"
        ],
        correctAns: "Casecading Style Sheet",
    },
    {
        question:"Js Stands For _______________________",
        options: [
            "Java Style",
            "Java Script",
            "Script",
            "Script Src"
        ],
        correctAns: "Java Script",
    },
    {
        question:"Dom Stands For _______________________",
        options: [
            "Document Object Model",
            "html",
            "Css",
            "Java"
        ],
        correctAns: "Document Object Model",
    },
    {
        question:"Ram Stands For _______________________",
        options: [
            "Read Only Memory",
            "Dom",
            "Random Acccess Memory",
            "For Pc"
        ],
        correctAns: "Random Acccess Memory",
    },
    {
        question:"Rom Stands For _______________________",
        options: [
            "Hyper Text Markup Language",
            "html",
            "HTml",
            "Read Only Memory"
        ],
        correctAns: "Read Only Memory",
    },
];
var main1 = document.getElementById('main');
var showquestionnum = document.getElementById('show-question-number');
var totalQuestion = document.getElementById('Total-Qustion');
var ShowQuestion = document.getElementById('Show-Question');
var mainoption = document.getElementById('main-option');
var disa = document.getElementById('dis')
var percentage = document.getElementById('per');

var index = 0;
var result = 0;

function ShowQue() {
    let refv = push(ref(database, "Questions"));
    let refkey = refv.key;

    let obj = {
        question: questions[index].question,
        options: questions[index].options,
        correctAnswer: questions[index].correctAns
    };

    set(ref(database, `Questions/${refkey}`) , obj)
    .then(function () {
        ShowQuestion.innerHTML = questions[index].question;
        totalQuestion.innerHTML = questions.length;
        showquestionnum.innerHTML = index + 1;
    })
    .catch(function (err){
        console.log("ShowQuestion error: " + err)
    })

    for (var i = 0; i < questions[index].options.length; i++) {
        var options = questions[index].options[i];
        var correctAns = questions[index].correctAns;
        mainoption.innerHTML += `
            <div class="col-md-6">
                <button class="optionbtn" onclick="checkop('${options}', '${correctAns}')">${questions[index].options[i]}</button>
            </div>
        `;
    }
}

ShowQue();

window.checkop = function(opt, corr) {
    mainoption.innerHTML = "";
    if (opt === corr) {
        result++;
    }   
    index++;
    if(index === questions.length){
        main1.style.display = "none";
        disa.style.display = "block";
        var per = (result / questions.length) * 100;
        percentage.innerHTML = `Your Percentage is ${per.toFixed(2)} %`;
           }
    else {
        ShowQue();
    }   
}
window.str = function() {
    main1.style.display = "block";
    disa.style.display = "none";
    index = 0;
    result = 0;
    ShowQue()   
}