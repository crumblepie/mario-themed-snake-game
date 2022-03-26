function Body(val) {
  this.head = val;
  this.tail = val;
  this.length = 0;
  const board = document.querySelector('#board');
}

/**********************************************************************
 * Linked List Node
 **********************************************************************/
function BodyPart(left, top) {
  this.node = document.createElement('div');
  this.node.setAttribute('class', 'snakeBody');
  this.node.style.position = 'absolute';
  this.node.style.top = top + 'px';
  this.node.style.left = left + 'px';

  this.currentDirection = null;
  board.appendChild(this.node);
  this.next = null;
}

/**********************************************************************
 * Method to add node to head of the Linked List
 * Note, Mario's Head is the tail of the Linked List
 **********************************************************************/
Body.prototype.addBody = function (left, top) {
  const newBody = new BodyPart(left, top);

  newBody.next = this.head;
  newBody.currentDirection = this.head.currentDirection;
  this.head = newBody;
  this.length++;
};

/**********************************************************************
 * Method to update the coordinates on each node
 * with the coordinates of the subsequent node
 * beginning from the back of Mario which is the head of the Linked List
 **********************************************************************/
Body.prototype.updateBodyParts = function () {
  let current = this.head;

  while (current.next) {
    current.node.style.left = current.next.node.style.left;
    current.node.style.top = current.next.node.style.top;
    current.currentDirection = current.next.currentDirection;
    current = current.next;
  }
};

/**********************************************************************
 * Method to retrieve the coordinates of all nodes of the Linked List
 **********************************************************************/
Body.prototype.getBodyPartsLocations = function () {
  const locations = [];
  let currentBody = this.head;
  while (currentBody.next !== null) {
    locations.push([currentBody.node.style.left, currentBody.node.style.top]);
    currentBody = currentBody.next;
  }
  return locations;
};
