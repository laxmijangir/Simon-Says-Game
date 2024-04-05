let gameSeq = [];
let userSeq = [];

let btns = ["lavender","olive","red","blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let maxVal = 0;
h3.innerText = `Highest level reached: ${maxVal}`;

document.addEventListener("keypress",function(){
    if(started == false) {
        // console.log("strtd");
        started = true;
    }

    levelup();
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranClr = btns[ranIdx];
    let ranbtn = document.querySelector(`.${ranClr}`);
    gameSeq.push(ranClr);
    console.log(gameSeq);
    btnFlash(ranbtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelup,1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart:)`;
        
        if(level>maxVal) {
            maxVal=level;
            h3.innerText = `Highest level reached: ${maxVal}`;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },250);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    btnFlash(btn);

    userClr = btn.getAttribute("id");
    userSeq.push(userClr);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}