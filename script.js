let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#start-btn");

startBtn.addEventListener("click", function() {
  if (!started) {
    console.log("Game Started");
    started = true;
    levelUp();
    startBtn.style.display = "none"; // hide start button during play
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randomIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press Start to try again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.style.display = "inline-block"; // show start button again
}
