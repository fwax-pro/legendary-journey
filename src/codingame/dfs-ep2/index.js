/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways
const nodes = {}
const exits = []
//console.error('------------')

for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2 = parseInt(inputs[1]);
    //console.error('N', N1, N2);
    if(!nodes.hasOwnProperty(N1)) {
        nodes[N1] = { id: N1, neighbors: [], cost: 0, parent: null};
    }

    if(!nodes.hasOwnProperty(N2)) {
        nodes[N2] = {id: N2, neighbors: [], cost: 0, parent: null};
    }
    
    nodes[N1].neighbors.push(N2);
    nodes[N1].cost = 0;
    nodes[N1].parent = null;
    nodes[N1].id = N1;
    nodes[N2].neighbors.push(N1);
    nodes[N2].cost = 0;
    nodes[N2].parent = null;
    nodes[N2].id = N2;
}
//console.error(nodes);

for (let i = 0; i < E; i++) {
    const EI = parseInt(readline()); // the index of a gateway node
    const node = nodes[EI];
    exits.push(EI)
}
//console.error('exits',exits)
// game loop

function isInclude(arr, node) {
    const finded = arr.find(nodeTemp => nodeTemp.id === node.id)
    if(finded) {
        return true;
    }
    return false;
}

function getNeighbors(node, close, open) {
    for(let i = 0; i < nodes[node.id].neighbors.length; i++) {
        const neighbor = {
            id: nodes[node.id].neighbors[i],
            cost: node.cost + 1,
            parent: node
        };
        
        if(!isInclude(close, neighbor) && !isInclude(open, neighbor)) {
            open.push(neighbor);
        }
    }
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

function aStart(start, end) {
    console.error('aStart')
    //console.error('start', start)
    //console.error('end', end)

    const open = [start];
    const close = [];

    while(open.length !== 0) {
        //let currentNode = open.shift();
        let currentNode = open[0];
        let index = 0;
        for (let i = 0; i < open.length; i++)
        {
            // On regarde si le cout F est plus grand ou plus petit du node actuelle
            if (open[i].cost < currentNode.cost)
            {
                index = i;
                currentNode = open[i];   
            }
        }
        open.splice(index,1);
        close.push(currentNode);
        //console.error('currentNode', currentNode)
        if(currentNode.id === end.id) {
            return reconstructPath(currentNode);
        }
        getNeighbors(currentNode, close, open);
    }
}

while (true) {
   const SI = parseInt(readline()); // The index of the node on which the Bobnet agent is positioned this turn 
   const target = nodes[SI];
   // todo on souhaite savoir si ce tour-ci il peut sortir
   let nodeToCloseExist = null;
   const gateways = exits.map(exit => nodes[exit])
   console.error('gateways', gateways)
   for(let j = 0; j < target.neighbors.length; j++) {
       //console.error('target.neighbors', target.neighbors[j])
       if(exits.includes(target.neighbors[j])) {
           nodeToCloseExist = nodes[target.neighbors[j]];
           break;
       }
   }
   
   console.error('nodeToCloseExist', nodeToCloseExist)
   if(nodeToCloseExist !== null) {
       console.log('' + SI + ' ' + nodeToCloseExist.id);
       nodes[SI].neighbors = nodes[SI]
        .neighbors.filter(neighbor => neighbor !== nodeToCloseExist.id);
       nodes[nodeToCloseExist.id].neighbors = nodes[nodeToCloseExist.id]
        .neighbors.filter(neighbor => neighbor !== SI);
       
        
       continue;
   }

   // todo on souhaite supprimer le node qui a 2 ou plus de connexion vers une gateway et qui est le plus proche
   const nodesClosedToGateway = [];
   const olds = []
   let total = 0;
   for(let j = 0; j < gateways.length; j++) {
       const gateway = gateways[j];
       for(let i = 0; i < gateway.neighbors.length; i++) {
           const node = nodes[gateway.neighbors[i]];
           total = 0;
           for(let m = 0; m < node.neighbors.length; m++) {
               const neighbor = node.neighbors[m];
               if(exits.includes(neighbor)) {
                   total++;
               }
           }
           if(total > 0 && !olds.includes(node.id)) {
               olds.push(node.id);
               nodesClosedToGateway.push({cost: total, start: node, target: gateway})
           }
       }
   }
   //nodesClosedToGateway.sort((a,b) => a.cost - b.cost)
   let filtered = nodesClosedToGateway.filter(el => el.cost > 1)
   if(filtered.length === 0) filtered = nodesClosedToGateway
   console.error('filtered', filtered)
   
   // j'ai le chemin. le plus court

   const paths = [];
   for(let i = 0; i < filtered.length; i++) {
       //const start = nodes[nodesClosedToGateway[i].id];
       const path = aStart(filtered[i].start, target);
       paths.push({ path, start: filtered[i].start, target: filtered[i].target});
   }
   if(paths.length > 1) {
       paths.sort((a,b) => a.path.length - b.path.length);
   }
   console.error('paths', paths);

  
   nodes[paths[0].start.id].neighbors = nodes[paths[0].start.id]
        .neighbors.filter(neighbor => neighbor !== paths[0].target.id);
    
   nodes[paths[0].target.id].neighbors = nodes[paths[0].target.id]
        .neighbors.filter(neighbor => neighbor !== paths[0].start.id);
    
   console.log('' + paths[0].start.id + ' ' + paths[0].target.id)
}