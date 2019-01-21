const questions = [
    {
        question: "What is 2 * 8?",
        options: ["10", "28", "16"],
        answer: "16"
    }
];

let tot_question = 10;
let question_number = 0;
let correct = 0;

document.addEventListener("DOMContentLoaded", () => {
    load_question();
});

function load_question() {
    ques = generate();
    document.querySelector("#question").innerHTML = ques.question;
    const options = document.querySelector("#options");
    options.innerHTML = "";
    for (const option of ques.options) {
        options.innerHTML += `<button class="option">${option}</button>`;
    }

    document.querySelectorAll(".option").forEach(option => {
        option.onclick = () => {
            if (option.innerHTML == ques.answer) {
                correct ++;
            }
            question_number ++;
            document.querySelector("#correct").innerHTML = correct + " out of " + question_number;
            if (question_number == tot_question) {
                end_quiz();
            }
            else {
                load_question();
            }
        }
    });
}

function end_quiz() {
    document.querySelector("#question").innerHTML = "";
    document.querySelector("#options").innerHTML = "";
    document.querySelector("h1").innerHTML = "Quiz Complete!";
    document.querySelector("#reset").innerHTML = `<button id="startOver">START OVER</button>`;
    document.querySelector("#startOver").onclick = reset;
}

function reset() {
    document.querySelector("h1").innerHTML = "Quiz";
    document.querySelector("#correct").innerHTML = "0 out of 0";
    question_number = 0;
    correct = 0;
    document.querySelector("#reset").innerHTML = "";
    load_question();
}

function generate() {
    let a = Math.floor((Math.random() * 30) + 1);
    let b = Math.floor((Math.random() * 30) + 1);
    const operators = ["+", "-", "*"];
    let op = operators[Math.floor(Math.random() * operators.length)];
    let q = "What is " + a +" "+ op + " "+ b + "?";
    let inc1 = 0;
    let inc2 = 0;
    do {
      inc1 = Math.floor(Math.random() * 30 - 15);
      inc2 = Math.floor(Math.random() * 30 - 15);
    }
    while (inc1 == inc2 || inc1 == 0 || inc2 == 0);
    let ans = 0;
    if (op == "+") {
        ans = a + b;
    }
    else if (op == "-") {
        ans = a - b;
    }
    else if (op == "*") {
        ans = a * b;
    }
    let o = [ans, ans + inc1, ans + inc2].sort()
    return {question: q, options: o, answer: ans};
}
