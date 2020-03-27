

const directionNames = {
    'u': 'up',
    'd': 'down',
    'l': 'left',
    'r': 'right',
  }
  
  const pointChange = {
    'u': [0, -1],
    'd': [0, 1],
    'l': [-1, 0],
    'r': [1, 0],
  }
  
  function Turtle(x, y) {
    this.dir = 'r';
    this.x = x || 0;
    this.y = y || 0;
    this.grid = [];
    this.gridSize = 20;

    // assumed gridSize = 20
  
    return this;
  }
  
  Turtle.prototype.right = function () {
    if (this.dir == 'r') {
      this.dir = 'd';
    } else if (this.dir == 'd') {
      this.dir = 'l';
    } else if (this.dir == 'l') {
      this.dir = 'u';
    } else if (this.dir == 'u') {
      this.dir = 'r';
    }
  
    return this;
  }
  
  Turtle.prototype.left = function () {
    if (this.dir == 'r') {
      this.dir = 'u';
    } else if (this.dir == 'd') {
      this.dir = 'r';
    } else if (this.dir == 'l') {
      this.dir = 'd';
    } else if (this.dir == 'u') {
      this.dir = 'l';
    }
  
    return this;
  }
  
  Turtle.prototype.forward = function (steps) {
    for (let i = 0; i < steps; i++) {
      const change = pointChange[this.dir];
      this.x = change[0] + this.x;
      this.y = change[1] + this.y;
  
      // console.log('going ' + 1 + ' step in direction ' + directionNames[this.dir]);
      //console.log(this.x, this.y)
      if ((this.grid[this.y]) == undefined) {
        this.grid[this.y] = Array(this.gridSize).fill(' ')
        //y = row number , x = cell number (-)
      }
      this.grid[this.y][this.x] = '*';

      // x = cell number (*)
    }
  
    return this;
  }
  
  Turtle.prototype.print = function () {
    const gridString = this.grid.map(x => x.join('')).join('\n')
    console.log(gridString);
  
    return this;
  }
  
  // const t = new Turtle(3, 3)
  //     .forward(10)
  //     .right()
  //     .forward(5)
  //     .right()
  //     .forward(2)
  //     .right()
  //     .forward(8)
  //     .print()


      /// const input = 't5,5-f10-r-f5-r-f10-r-f5'
// const input = 'f10-r-f5-r-f10-r-f5'
const input = process.argv[2];
const orders = input.split("-"); // ['t5,5', 'f10', 'r','f5', 'r', 'f10', 'r', 'f5']
 
const firstOrder = orders[0]; // 't'
 
let turtle;
if (firstOrder[0] === 't') {
  // extract x, y
  const sizeString = firstOrder.substring(1, firstOrder.length); // '5,5'
  const sizeArray = sizeString.split(','); // ['5', '5']
  const [x, y] = sizeArray.map(Number); // [5, 5]
  turtle = new Turtle(x, y);
  orders.shift(0);
} else {
  turtle = new Turtle(0, 0);
}
 
for (let order of orders) {
  const command = order[0];
  if (command === 'r') {
    turtle.right();
  } else if (command === 'l') {
    turtle.left();
  } else if (command === 'f') {
    const steps = Number(order.substring(1, order.length));
    turtle.forward(steps);
  }
}
turtle.print();