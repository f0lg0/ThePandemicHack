var PriorityQueue = require('./priorityQueue.js');

module.exports = function dijkstra(graph, start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {}; // storing the quickest paths

    let shortestPath = [];

    let smallest;

    // initial state
    for (let vertex in graph.net) {
        if (vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
        }

        previous[vertex] = null;
    }

    // as long as there's something to visit
    while (nodes.values.length) {
        smallest = nodes.dequeue().val; // value with lowest priority

        if (smallest === finish) {
            // found shortest path
            while (previous[smallest]) {
                // traversing
                shortestPath.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }

        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in graph.net[smallest]) {
                // find neighboring node
                let nextNode = graph.net[smallest][neighbor];

                // calculate new distance to neighoring node (distances[smallest] = current known distance)
                let candidate = distances[smallest] + nextNode.weight;

                if (candidate < distances[nextNode.node]) {
                    // updating new smallest distance
                    distances[nextNode.node] = candidate;
                    // updating how we got to the node
                    previous[nextNode.node] = smallest;

                    nodes.enqueue(nextNode.node, candidate);
                }
            }
        }
    }

    let finalPath = shortestPath.concat(smallest).reverse(); // putting everything in order and adding the starting node
    let totalDistance = distances[finalPath[finalPath.length - 1]]; // getting the distance between A and Z, this represent the total ETA of the simulation

    return { finalPath, totalDistance };

}