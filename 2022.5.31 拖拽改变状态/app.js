const status = document.querySelector(".status");
const card = document.querySelector(".card");

const startedPos = {
  x: 0,
};

let isStarted = false;
let statusFlag = false;

card.addEventListener("mousedown", () => {
  isStarted = true;
  startedPos.x = event.clientX;
});

card.addEventListener("mouseup", () => {
  isStarted = false;
  if (disX > 50) {
    statusFlag = !statusFlag;
    if (statusFlag) {
      status.style.background = "rgb(11, 213, 0)";
    } else {
      status.style.background = "#aaa";
    }
  }
  startedPos.x = 0;
  card.style.transform = `translateX(0px)`;
});

card.addEventListener("mousemove", () => {
  if (isStarted) {
    disX = event.clientX - startedPos.x;
    console.log(disX);
    card.style.transform = `translateX(${disX}px)`;
  }
});
