function handleClick(e) {
  const target = e.currentTarget;
  if(!target.classList.contains("add-unit")) {
    let arr = [...document.querySelectorAll(".one-unit")];
    arr.forEach(item => {
      item.classList.remove("selected-unit");
    });
    target.classList.add("selected-unit");
  }else {
    const rootDiv = document.createElement("div");
    rootDiv.classList.add("one-unit");

    const span = document.createElement("span");
    span.classList.add("currency");
    span.innerText = "CNY";

    const div = document.createElement("div");

    const spanInner1 = document.createElement("span");
    spanInner1.classList.add("num");
    spanInner1.innerText = "75";

    const spanInner2 = document.createElement("span");
    spanInner2.classList.add("symbol");
    spanInner2.innerText = "%";

    div.appendChild(spanInner1);
    div.appendChild(spanInner2);
    rootDiv.appendChild(span);
    rootDiv.appendChild(div);

    e.currentTarget.parentNode.insertBefore(rootDiv, e.currentTarget.parentNode.lastElementChild);
    init();
  }
}


const wallet = document.querySelector(".container");
const moveBar = document.querySelector(".moveBar");
let isStarted = false;

const startedPos = {
  x: 0,
  y: 0,
};

// 因为是用transom去移动的，
// 所以就要记录每次移动之后的transform，
// 然后再在这个基础上进行下一次的计算
const baseDis = {
  x: 0,
  y: 0,
};

let disX = 0;
let disY = 0; 

moveBar.addEventListener("mousedown", () => {
  isStarted = true;
  startedPos.x = event.clientX;
  startedPos.y = event.clientY;
});

document.addEventListener("mouseup", () => {
  isStarted = false;
  baseDis.x = disX;
  baseDis.y = disY;
});

document.body.addEventListener("mousemove", () => {
  if(isStarted) {
    disX = baseDis.x + event.clientX - startedPos.x;
    disY = baseDis.y + event.clientY - startedPos.y;
    wallet.style.transform = `translate(${disX}px, ${disY}px)`;
  }

  if(blockMoving) {
    blockDisX = event.clientX - startedBlockPos.x;
    blockDisY = event.clientY - startedBlockPos.y;
    target.style.transform = `translate(${blockDisX}px, ${blockDisY}px)`;
  }
});

function changePos(arr, targetIndex, disX, moveWidth) {
  moveStep = parseInt(disX / moveWidth);
  currentPosIndex = moveStep + targetIndex;
  for(let i = 0; i < arr.length; i++) {
    if(i !== targetIndex) {
      arr[i].style.transform = "translateX(0)";
    }
  }

  if(currentPosIndex > targetIndex) {
    const needMoveCount = currentPosIndex - targetIndex;
    for(let i = 0; i < needMoveCount; i++) {
      if(targetIndex !== arr.length - 1) {
        arr[targetIndex + 1] ? (arr[targetIndex + 1].style.transform = `translateX(${-moveWidth})`) : "";
      }
    }
  }
}



let blockMoving = false;

const startedBlockPos = {
  x: 0,
  y: 0,
};

let blockDisX = 0;
let blockDisY = 0; 

let target = null;
let targetIndex = 0;
let currentPosIndex = 0;
let moveStep = 0;
let blockWidth = 0;
const gapWidth = 16;

function handleMouseDown(e) {
  if(e.currentTarget.classList.contains("add-unit")) return;
  
  let arr = [...document.querySelectorAll(".one-unit")];
  arr.forEach((item, index) => {
    if(item === e.currentTarget) {
      targetIndex = index;
      // currentTarget = index;
    }
  });

  blockMoving = true;

  startedBlockPos.x = e.clientX;
  startedBlockPos.y = e.clientY;

  target = e.currentTarget;
  target.style.transition = "none";
  target.style.zIndex = 10;

  blockWidth = target.getBoundingClientRect().width;
}

function handleMouseUp(e) {
  if(e.currentTarget.classList.contains("add-unit")) return;
  blockMoving = false;

  let arr = [...document.querySelectorAll(".one-unit")];
  if(moveStep < 0) {
    moveStep = - targetIndex;
  }else if(moveStep > arr.length - targetIndex - 2) {
    moveStep = arr.length - targetIndex - 2;
  }

  target.style.transition = "1s cubic-bezier(0.165, 0.84, 0.44, 1)";
  target.style.zIndex = 0;

  target.style.transform = `translateX(${moveStep * (blockWidth + gapWidth)}px)`
}



function init() {
  const allUnitArr = [...document.querySelectorAll(".one-unit")];
  allUnitArr.forEach(item => {
    item.addEventListener("click", handleClick);
    item.addEventListener("mousedown", handleMouseDown);
    item.addEventListener("mouseup", handleMouseUp);
  });
}

init();