class Head {
  constructor(el) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'head');

    el.appendChild(this.node);

    /**********************************************************************
     * To slow down the game, increase this number
     * To speed up the game, decrease this number
     **********************************************************************/
    this.SPEED = 100;
    this.currentDirection = 'right';
    this.node.style.top = 0;
    this.node.style.left = 0;

    this.next = null;
    this.body = new Body(this);
  }

  // using an arrow function means we can utilise the lexical 'this'
  // meaning a function outside a class knows the object calling it
  move = () => {
    const head = this.node;
    const direction = this.currentDirection;

    this.body.updateBodyParts();

    // continually reassign topPosition and leftPosition to the current top and left of the head
    let topPosition = Number(head.style.top.replace('px', ''));
    let leftPosition = Number(head.style.left.replace('px', ''));

    let appleTopPosition = Number(apple.style.top.replace('px', ''));
    let appleLeftPosition = Number(apple.style.left.replace('px', ''));

    /**********************************************************************
     * When Mario eats the mushroom, set new coordinates for the mushroom
     * and grow Mario's body by adding a new node to the Linked List
     **********************************************************************/
    if (
      topPosition === appleTopPosition &&
      leftPosition === appleLeftPosition
    ) {
      let score = document.querySelector('.score');
      score++;

      function rand_apple(min, max) {
        return `${Math.round((Math.random() * (max - min) + min) / 50) * 50}px`;
      }
      apple.style.left = rand_apple(50, 650);
      apple.style.top = rand_apple(50, 650);

      let locations = this.body.getBodyPartsLocations();
      locations.push([this.node.style.left, this.node.style.top]);

      for (const [left, top] of locations) {
        if (apple.style.left === left && apple.style.top === top) {
          // if coordinates match, randomise the mushroom's coordinates again
          apple.style.left = rand_apple(50, 650);
          apple.style.top = rand_apple(50, 650);
        }
      }

      this.body.addBody(leftPosition, topPosition);
    }

    /**********************************************************************
     * Collision detection
     **********************************************************************/
    if (direction === 'right') {
      if (leftPosition !== 650) {
        head.style.left = `${(leftPosition += 50)}px`;
        this.left = leftPosition;
      } else {
        alert('GAME OVER');
        return;
      }
    } else if (direction === 'left') {
      if (leftPosition !== 0) {
        head.style.left = `${(leftPosition -= 50)}px`;
        this.left = leftPosition;
      } else {
        alert('GAME OVER');
        return;
      }
    } else if (direction === 'up') {
      if (topPosition !== 0) {
        head.style.top = `${(topPosition -= 50)}px`;
        this.top = topPosition;
      } else {
        alert('GAME OVER');
        return;
      }
    } else if (direction === 'down') {
      if (topPosition !== 650) {
        head.style.top = `${(topPosition += 50)}px`;
        this.top = topPosition;
      } else {
        alert('GAME OVER');
        return;
      }
    }

    /**********************************************************************
     * Game Over if Snake Head hits Body Part
     **********************************************************************/
    let locations = this.body.getBodyPartsLocations();
    for (const [left, top] of locations) {
      if (leftPosition + 'px' === left && topPosition + 'px' === top) {
        return;
      }
    }

    setTimeout(this.move, this.SPEED);
  };

  /**********************************************************************
   * Pause Functionality
   **********************************************************************/
  pause = () => {
    if (this.SPEED === 100) this.SPEED = 100000;
    else {
      this.SPEED = 100;
      this.move();
    }
  };
}
