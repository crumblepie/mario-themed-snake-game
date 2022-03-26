class Apple {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'apple');
    this.node.setAttribute('src', 'src/assets/mushroom.jpg');

    el.appendChild(this.node);

    function rand_apple(min, max){
      return `${Math.round((Math.random()*(max-min)+min)/50)*50}px`;
    }

    this.node.style.left = rand_apple(50,650);
    this.node.style.top = rand_apple(50,650);

  }
}

