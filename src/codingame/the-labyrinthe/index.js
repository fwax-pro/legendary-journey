/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
const DIRS = ['RIGHT', 'DOWN', 'LEFT', 'UP'];
const datas = {};
const nodes = {};
let indexDir = 0;
let start = null;
let end = null;
let pathCurrent = null;
let isComeBack = false;

function isInArray(arr, node) {
    const finded = arr.find(tempNode => tempNode.x === node.x && tempNode.y === node.y);
    if(finded) {
        return true;
    }
    return false;
}

function getNeighbors(datas, node, close, open) {
    const neightbors = [];
    // RIGHT
    if(datas[`${node.y}-${node.x+1}`] &&
        datas[`${node.y}-${node.x+1}`].char !== '#' && 
        !isInArray(close, datas[`${node.y}-${node.x+1}`]) &&
        !isInArray(open, datas[`${node.y}-${node.x+1}`])) {
        
        const tempNode = datas[`${node.y}-${node.x+1}`];
        tempNode.cost = node.cost + 1;
        neightbors.push(tempNode);
    }

    // DOWN
    if(datas[`${node.y+1}-${node.x}`] &&
        datas[`${node.y+1}-${node.x}`].char !== '#' && 
        !isInArray(close, datas[`${node.y+1}-${node.x}`]) && 
        !isInArray(open, datas[`${node.y+1}-${node.x}`])) {

        const tempNode = datas[`${node.y+1}-${node.x}`];
        tempNode.cost = node.cost + 1;
        neightbors.push(tempNode);
    }

    // LEFT
    if(datas[`${node.y}-${node.x-1}`] &&
        datas[`${node.y}-${node.x-1}`].char !== '#' && 
        !isInArray(close, datas[`${node.y}-${node.x-1}`]) &&
        !isInArray(open, datas[`${node.y}-${node.x-1}`])) {

        const tempNode = datas[`${node.y}-${node.x-1}`];
        tempNode.cost = node.cost + 1;
        neightbors.push(tempNode);
    }

    // UP
    if(datas[`${node.y-1}-${node.x}`] &&
        datas[`${node.y-1}-${node.x}`].char !== '#' && 
        !isInArray(close, datas[`${node.y-1}-${node.x}`]) &&
        !isInArray(open, datas[`${node.y-1}-${node.x}`])) {
        const tempNode = datas[`${node.y-1}-${node.x}`];
        tempNode.cost = node.cost + 1;
        neightbors.push(tempNode);
    }

    return neightbors
}

function manhattanDistance(nodeA, nodeB) {
   const deltaX = Math.abs(nodeB.x - nodeA.x);
   const deltaY = Math.abs(nodeB.y - nodeA.y);
   return deltaX + deltaY; // Chaque étape a un coût de 1
}

function getNeighborsForAStar(datas, node, target, close, open, strict) {
   const neightbors = [];
   const tentativeGCost = node.gCost + 1;
   
   // RIGHT
   if(datas[`${node.y}-${node.x+1}`] &&
       datas[`${node.y}-${node.x+1}`].char !== '#' && 
       (!isInArray(close, datas[`${node.y}-${node.x+1}`]) || tentativeGCost < datas[`${node.y}-${node.x+1}`].gCost) &&
       !isInArray(open, datas[`${node.y}-${node.x+1}`])) {
       
       
       const tempNode = datas[`${node.y}-${node.x+1}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   // DOWN
   if(datas[`${node.y+1}-${node.x}`] &&
       datas[`${node.y+1}-${node.x}`].char !== '#' && 
       (!isInArray(close, datas[`${node.y+1}-${node.x}`]) || tentativeGCost < datas[`${node.y+1}-${node.x}`].gCost) && 
       !isInArray(open, datas[`${node.y+1}-${node.x}`])) {

       const tempNode = datas[`${node.y+1}-${node.x}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   // LEFT
   if(datas[`${node.y}-${node.x-1}`] &&
       datas[`${node.y}-${node.x-1}`].char !== '#' && 
       (!isInArray(close, datas[`${node.y}-${node.x-1}`]) || tentativeGCost < datas[`${node.y}-${node.x-1}`].gCost) &&
       !isInArray(open, datas[`${node.y}-${node.x-1}`])) {

       const tempNode = datas[`${node.y}-${node.x-1}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   // UP
   if(datas[`${node.y-1}-${node.x}`] &&
       datas[`${node.y-1}-${node.x}`].char !== '#' && 
       (!isInArray(close, datas[`${node.y-1}-${node.x}`]) || tentativeGCost < datas[`${node.y-1}-${node.x}`].gCost) &&
       !isInArray(open, datas[`${node.y-1}-${node.x}`])) {
       const tempNode = datas[`${node.y-1}-${node.x}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   return neightbors
}

function getNeighborsForAStarV2(datas, node, target, close, open) {
   const neightbors = [];
   const tentativeGCost = node.gCost + 1;
   
   // RIGHT
   if(datas[`${node.y}-${node.x+1}`] &&
       datas[`${node.y}-${node.x+1}`].char !== '#' && 
       datas[`${node.y}-${node.x+1}`].char !== '?' &&
       (!isInArray(close, datas[`${node.y}-${node.x+1}`]) || tentativeGCost < datas[`${node.y}-${node.x+1}`].gCost) &&
       !isInArray(open, datas[`${node.y}-${node.x+1}`])) {
       const tempNode = datas[`${node.y}-${node.x+1}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   // DOWN
   if(datas[`${node.y+1}-${node.x}`] &&
       datas[`${node.y+1}-${node.x}`].char !== '#' &&
       datas[`${node.y+1}-${node.x}`].char !== '?' && 
       (!isInArray(close, datas[`${node.y+1}-${node.x}`]) || tentativeGCost < datas[`${node.y+1}-${node.x}`].gCost) && 
       !isInArray(open, datas[`${node.y+1}-${node.x}`])) {

       const tempNode = datas[`${node.y+1}-${node.x}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   // LEFT
   if(datas[`${node.y}-${node.x-1}`] &&
       datas[`${node.y}-${node.x-1}`].char !== '#' && 
       datas[`${node.y}-${node.x-1}`].char !== '?' && 
       (!isInArray(close, datas[`${node.y}-${node.x-1}`]) || tentativeGCost < datas[`${node.y}-${node.x-1}`].gCost) &&
       !isInArray(open, datas[`${node.y}-${node.x-1}`])) {

       const tempNode = datas[`${node.y}-${node.x-1}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   // UP
   if(datas[`${node.y-1}-${node.x}`] &&
       datas[`${node.y-1}-${node.x}`].char !== '#' && 
       datas[`${node.y-1}-${node.x}`].char !== '?' && 
       (!isInArray(close, datas[`${node.y-1}-${node.x}`]) || tentativeGCost < datas[`${node.y-1}-${node.x}`].gCost) &&
       !isInArray(open, datas[`${node.y-1}-${node.x}`])) {
       const tempNode = datas[`${node.y-1}-${node.x}`];
       tempNode.gCost = tentativeGCost;
       tempNode.hCost = manhattanDistance(tempNode, target);
       tempNode.fCost = tempNode.gCost + tempNode.hCost;
       tempNode.parent = node;
       neightbors.push(tempNode);
   }

   return neightbors
}

function reconstructPath(node) {
   console.error('reconstructPath')
   const path = [node];
   while(node.parent !== null) {
       node = node.parent;
       path.unshift(node);
   }
   return path;
}

function aStar(start, target, datas, strict = false) {
   console.error('aStar')
   //console.error('target', target)
   start.gCost = 0;
   start.hCost = manhattanDistance(start, target);
   start.fCost = start.gCost + start.hCost;
   start.parent = null;

   let open = [start];
   const close = [];
 
   while(open.length !== 0) {
       let currentNode = open[0];
       let index = 0;
       for (let i = 0; i < open.length; i++)
       {
           // On regarde si le cout F est plus grand ou plus petit du node actuelle
           if (open[i].fCost < currentNode.fCost)
           {
               index = i;
               currentNode = open[i];
           }
       }
       open.splice(index,1);
       console.error('currentNode', currentNode)
       // add current to closedSet
       close.push(currentNode);
       if(currentNode.x === target.x && currentNode.y === target.y) {
           //console.error('end', currentNode)
           return reconstructPath(currentNode);
       }
       
       if(currentNode.char !== '?') {
           let neighbors = [];
           if(strict) {
               neighbors = getNeighborsForAStarV2(datas, currentNode, target, close, open)
           } else {
               neighbors = getNeighborsForAStar(datas, currentNode, target, close, open);
           }
           open = open.concat(neighbors);
       }
   }

   return [];
}

function BFS(start, datas) {
    start.cost = 0;
    let open = [start];
    const close = [];

    while(open.length !== 0) {
        const currentNode = open.pop();
        close.push(currentNode);
        if(currentNode.char !== '?') {
            const neighbors = getNeighbors(datas, currentNode, close, open);
            open = open.concat(neighbors);
        }
    }

    return close;
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    const KR = parseInt(inputs[0]); // row where Rick is located.
    const KC = parseInt(inputs[1]); // column where Rick is located.
    
    for (let i = 0; i < R; i++) {
       const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
       //console.error('ROW', ROW);
       ROW.split('').forEach((char, index) => {
            datas[`${i}-${index}`] = {
                char,
                y: i,
                x: index
            };
        });
    }

   // CR2ATION DU GRAPH 
   const currentNode = datas[`${KR}-${KC}`];
   let nextNode = null;
   const nodes = BFS(currentNode, datas);
   nodes.sort((a,b) => a.cost - b.cost);
   //console.error('BFS', nodes)
   
   const exclamationMark = nodes.find(node => node.char === '?');
   console.error('exclamationMark', exclamationMark)
   const commandRoom = nodes.find(node => node.char === 'C');
   const start = nodes.find(node => node.char === 'T');
   
   if(!exclamationMark && commandRoom && currentNode.x === commandRoom.x && currentNode.y === commandRoom.y) {
       isComeBack = true;
       pathCurrent = [];
   }

   if(pathCurrent && pathCurrent.length > 0) {
       nextNode = datas[`${pathCurrent[0].y}-${pathCurrent[0].x}`];
       if(nextNode.char === '#') pathCurrent = []
   }

   if(pathCurrent === null || pathCurrent.length === 0) {
       if(!isComeBack && exclamationMark) {
           console.error('exclamationMark')
           pathCurrent = aStar(currentNode, exclamationMark, datas);
       } 
       else if(!exclamationMark && commandRoom && !isComeBack) {
           console.error('commandRoom')
           pathCurrent = aStar(currentNode, commandRoom, datas);
       }  
       else {
           console.error('start')
           pathCurrent = aStar(currentNode, start, datas, true);
       }
       //console.error('start', start);
       //console.error('currentNode', currentNode);
       console.error('pathCurrent', pathCurrent);
       pathCurrent.shift();
    }
   
   const vx = pathCurrent[0].x - currentNode.x;
   const vy = pathCurrent[0].y - currentNode.y;
    
   pathCurrent.shift();
    
   if(vx > 0) {
       console.log('RIGHT');
   } else if(vx < 0) {
       console.log('LEFT');
   } else if(vy > 0) {
       console.log('DOWN');
   } else if(vy < 0) {
       console.log('UP');
   }
}