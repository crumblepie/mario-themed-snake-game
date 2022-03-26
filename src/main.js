const board = document.querySelector('#board');

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  let score = 0;
  // insert element after the board element under parent 'body' element in the DOM tree
  board.insertAdjacentHTML(
    'afterend',
    `<div class="panel">
      <h1 class="title">MARIO SNAKE GAME</h1>
      <span class='score'>Score: <strong>${score}</strong> </span>
      <br></br>
      <div id="instructions">
        <p><strong>How to Play:</strong><br><br>Press 'S' to start the game<br>Press 'P' to pause/unpause the game<br>Press 'R' to restart the game<br>Use Arrow Keys to play<p>
      </div>
      <br></br>
      <button id="reset-button">PLAY AGAIN!</button>
    <div>`
  );

  // var audioElement = new Audio('src/sounds/super-mario-medley.mp3');
  // audioElement.addEventListener('keycode', (e) => {
  //   audioElement.play();
  // });

  document.querySelector('button').addEventListener('click', (e) => {
    document.location.reload(true);
  });

  const head = new Head(board);
  let apple = new Apple(board);

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
      head.currentDirection = 'left';
    } else if (e.code === 'ArrowRight') {
      head.currentDirection = 'right';
    } else if (e.code === 'ArrowUp') {
      head.currentDirection = 'up';
    } else if (e.code === 'ArrowDown') {
      head.currentDirection = 'down';
    } else if (e.code === 'KeyS') {
      head.move();
    } else if (e.code === 'KeyP') {
      head.pause();
    } else if (e.code === 'KeyR') {
      document.location.reload(true);
    }
  });
});
