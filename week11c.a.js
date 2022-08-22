// arrays to hold winning combination with empty arrays to hold player combinations 
const squares = Array.from(document.querySelectorAll(".square"));
const winner = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
let firstPlayer = [], secondPlayer = [], count = 0;

// function to check array to determine winning combination 
function check(array){
  let finalResult = false;
  for(let item of winner){
    let result = item.every(val => array.indexOf(val) !== -1);
    if(result){
      finalResult = true;
    }
  } return finalResult;
}

// function to create restart button
function winningPlayer(wp){
  const game = document.createElement("div");
  const player = document.createTextNode(wp);
  const replay = document.createElement("button");
  game.classList.add("winner");
  game.appendChild(player);
  replay.appendChild(document.createTextNode("Restart"));
  replay.onclick = function() { restart() };
  game.appendChild(replay);
  document.body.appendChild(game);
}

// function to add x's, o's and display game winner
function turn(){
  if(this.classList == "square"){
    count++;
    if(count%2 !== 0){
      this.classList.add("X");
      firstPlayer.push(Number(this.dataset.index));
      if(check(firstPlayer)){        
        winningPlayer("Congrats player one you win");
        return true;
      }
    } else{
      this.classList.add("O");
      secondPlayer.push(Number(this.dataset.index));
      if(check(secondPlayer)){
        winningPlayer("Congrats player two you win");
        return true;
      }
    }
    if(count === 9){
        winningPlayer("Draw");
    }
  }
}

// function to add x's and o's with a mouse click
squares.forEach(square => square.addEventListener("click", turn));

// function to clear board and restart
function restart(){
  const newBoard = document.querySelector(".winner");
  firstPlayer = [];
  secondPlayer = [];
  count = 0;
  newBoard.remove();
  [].forEach.call(squares, function(reset) {
    reset.classList.remove("X");
    reset.classList.remove("O");
  });
}