/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
const datas = {};

let availableNodes = [];
let posX = null;
let posY = null;
let isComeBack = false;
let pathCurrent = [];

class Node {
    constructor(char, y, x) {
        this.y = y;
        this.x = x;
        this.char = char;
        this.isAccess = null;
        this.isVisited = null;
        this.isActive = true;
        this.isCommandRoom = char === 'C';
        this.neighbors = {
            left: null,
            up: null,
            down: null,
            right: null
       };
       this.gCost = 0;
       this.hCost = 0;
       this.fCost = 0;
       this.parent = null;
    }

    init() {
        this.isAccess = this.getIsAccess();
        this.isVisited = this.getIsVisited();
    }

    update() {
       this.gCost = 0;
       this.hCost = 0;
       this.fCost = 0;
       this.parent = null;
       this.isAccess = this.getIsAccess();
       this.isVisited = this.getIsVisited();
       this.isCommandRoom = this.getIsCommandRoom();
    }

    getIsAccess() {
        if(this.char === '?') {
            return null;
        }
        if(this.char === '#') {
            return false;
        }
        if(this.char === '.') {
            return true;
        }
        if(this.char === 'T') {
            return true;
        }
        if(this.char === 'C') {
            return true;
        }
    }

    getIsVisited() {
       return this.char !== '?';
    }

    getIsCommandRoom() {
        return this.char === 'C';
    }
}

function getIsAccess(node) {
    if(!node) {
        return null;
    }

    if(node.char === '#') {
        return false;
    }

    if(node.char === 'T') {
        return true;
    }

    if(node.char === '.') {
        return true;
    }

    if(node.char === 'C') {
        return true;
    }
    
    // pour avoir accées il doit avoir au moins un voisin adjacent qui est vide
    if(
        (node.neighbors.left && node.neighbors.left.char === '.') ||
        (node.neighbors.right && node.neighbors.right.char === '.') ||
        (node.neighbors.up && node.neighbors.up.char === '.') ||
        (node.neighbors.down && node.neighbors.down.char === '.')
    ) {
        return true;
    }

    return false;
}

function neighborAvailable(neighbor) {
   if(!neighbor || neighbor.char === '#' || !neighbor.isActive) {
       return null;
   }

   return neighbor;
}

function getNeighbors(node) {
    if(!node) {
        return null;
    }
    const left = datas[`${node.y}-${node.x-1}`]
    const up = datas[`${node.y-1}-${node.x}`]
    const down = datas[`${node.y+1}-${node.x}`]
    const right = datas[`${node.y}-${node.x+1}`]

    return {
       left: neighborAvailable(left),
        up: neighborAvailable(up),
        down: neighborAvailable(down),
        right: neighborAvailable(right),
    }
}

function isInclude(arr, nextNode) {
    const find = arr.find(node => node.y === nextNode.y && node.x === nextNode.x);
    if(find) {
        return true;
    }
    return false;
}

function reconstructPath(node) {
   //console.error('reconstructPath')
   const path = [node];
   while(node.parent !== null) {
       node = node.parent;
       path.unshift(node);
   }
   return path;
}

function manhattanDistance(nodeA, nodeB) {
   return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}

function aStar(start, target) {
   //console.error('aStar')

   const open = [start];
   const close = [];
 
   while(open.length !== 0) {
       open.sort((a, b) => a.fCost - b.fCost);
       // current := node in openList with lowest fCost
       const currentNode = open.pop();
       //console.error('currentNode', currentNode)
       // add current to closedSet
       close.push(currentNode);
       if(currentNode.x === target.x && currentNode.y === target.y) {
           return reconstructPath(currentNode);
       }

        //let nextNode = null;
        for(const key in currentNode.neighbors) {
           const neighbor = currentNode.neighbors[key];

           if(neighbor && neighbor.isAccess) {
               // tentativeGCost := current.gCost + distance(current, neighbor)
               const tentativeGCost = currentNode.gCost + 1;
               
               if ((!isInclude(open, neighbor) && !isInclude(close, neighbor)) || tentativeGCost < neighbor.gCost) {
                   neighbor.gCost = tentativeGCost;
                   neighbor.hCost = manhattanDistance(neighbor, target);
                   neighbor.fCost = neighbor.gCost + neighbor.hCost;
                   neighbor.parent = currentNode;
           
                   if ((!isInclude(open, neighbor) && !isInclude(close, neighbor))) {
                     open.push(neighbor);
                   }
               }
            }
        }
   }

   return null;
}

function findPath(start, nodes) {
   const paths = [];
   if(nodes.length !== 0) {
       for(let i = 0; i < nodes.length; i++) {
           const path = aStar(start, nodes[i]);
           if(path && path.length !== 0) {
               path.shift();
               paths.push(path);
           }
           //console.error('path', path);
       }
   }

   if(paths.length === 1) {
       return paths[0];
   }

   let result = null;
   paths.forEach(path => {
       if(result === null || path.length < result.length) {
           result = path;
       }
   });
   //console.error('paths', paths);

   return result;
}

function filterNodeWithOneNeighbor(availableNodes) {
   const nodeFiltered = availableNodes.filter(node => {
       let total = 0;

       if(node.char === 'T' || node.char === 'C') {
           return false;
       }

       for(const key in node.neighbors) {
           if(node.neighbors[key] !== null) {
               total++
           }
       }

       return total <= 1;
   })

   return nodeFiltered
}



function updateNodes() {
    availableNodes = [];

    for (const key in datas) {
       const nodeCurrent = datas[key];
       nodeCurrent.neighbors = getNeighbors(nodeCurrent);
       nodeCurrent.isAccess = getIsAccess(nodeCurrent);
        
       if(nodeCurrent.isAccess && nodeCurrent.isActive) {
           availableNodes.push(nodeCurrent)
       }
    }
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    const KR = parseInt(inputs[0]); // row where Rick is located.
    const KC = parseInt(inputs[1]); // column where Rick is located.
    posX = KC;
    posY = KR;

    // CREATION DES NODES
    for (let i = 0; i < R; i++) {
        const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
        //console.error('ROW', ROW);
        ROW.split('').forEach((char, index) => {
            let oldNode = datas[`${i}-${index}`];
            if(!oldNode) {
                // création du node
                const newNode = new Node(char,i,index);
                newNode.init();
                datas[`${i}-${index}`] = newNode;
            } else {
                // mise à jour du node
               oldNode.char = char;
               oldNode.update()
               datas[`${i}-${index}`] = oldNode;
            }
        });
   }

   // todo mettre àjour les cul de sac

   updateNodes();
   const filterNodesWithOneNeighbor = filterNodeWithOneNeighbor(availableNodes) || []
   //console.error('filterNodes', filterNodesWithOneNeighbor)
   if(filterNodesWithOneNeighbor.length !== 0) {
       // Mise à jour du graph en déactivant les nodes cul de sac
       // Mise à jour des availables nodes
   }
   
   const filterNodesExclamations = availableNodes.filter(node => node.char === '?')
   const commandRoomNode = availableNodes.filter(node => node.char === 'C');
   const startNode = availableNodes.filter(node => node.char === 'T');

   if(commandRoomNode.length !== 0 && posX === commandRoomNode[0].x && posY === commandRoomNode[0].y) {
       isComeBack = true;
   }

   const nodeCurrent = datas[`${KR}-${KC}`] ;
   //let path = [];
   //console.error('filterNodesExclamations', filterNodesExclamations)
   //console.error('pathCurrent.length', pathCurrent.length)
   let nextNode = null;
   if(pathCurrent.length > 0) {
       nextNode = datas[`${pathCurrent[0].y}-${pathCurrent[0].x}`];
       //console.error('nextNode', nextNode)
       if(nextNode.char === '#') pathCurrent = []
   }

   if(pathCurrent.length === 0) {
       
       if(!isComeBack && filterNodesExclamations.length !== 0) {
           // avancer vers le plus proche ?
           //console.error('filterNodesExclamations stage')
           pathCurrent = findPath(nodeCurrent, filterNodesExclamations);
       }
       //console.error('in', pathCurrent)
       if((pathCurrent === null || pathCurrent.length === 0) && !isComeBack && commandRoomNode) {
           // avancer vers la command room
           //console.error('commandRoomNode stage')
           pathCurrent = findPath(nodeCurrent, commandRoomNode);
       } else if(isComeBack) {
           // retour vers le départ
           console.error('start stage')
           pathCurrent = findPath(nodeCurrent, startNode);
           console.error('pathCurrent', pathCurrent.length)
           console.error('node last', pathCurrent[pathCurrent.length-1])
       }
   }
   //console.error('path', pathCurrent);
   //console.error('availableNodes', availableNodes);

   const vx = pathCurrent[0].x - nodeCurrent.x;
   const vy = pathCurrent[0].y - nodeCurrent.y;
   
   pathCurrent.shift();
   //pathCurrent = [];

    if(vx > 0) {
        console.log('RIGHT');
    } else if(vx < 0) {
        console.log('LEFT');
    } else if(vy > 0) {
        console.log('DOWN');
    } else if(vy < 0) {
        console.log('UP');
    }
    
   //console.error(datas);
    
   //console.log('RIGHT');
}
