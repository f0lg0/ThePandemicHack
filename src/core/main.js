const fs = require('fs');
const readline = require('readline');

let WeightedGraph = require('./weightedGraph.js');
let dijkstra = require('./dijkstra.js');
let convertDataForPlotting = require('./convert_data.js');

let graph = new WeightedGraph();

let name_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let population = [];

// adding individuals to population
for (let name of name_set) {
    population.push(name);
}

// adding individuals to social net
for (let individual of population) {
    graph.addVertex(individual);
}

// connecting individuals randomly at least 2 times each
let possible_conenctions, candidate_indx, connected, max_conn_number;

for (let i = 0; i < population.length; i++) {
    max_conn_number = 1; // more connections = higher possibility of infection = less ETA

    possible_conenctions = population.slice();
    possible_conenctions.splice(i, 1);

    if (i === 0) {
        possible_conenctions.splice(possible_conenctions.length - 1, 1);
    } else if (i === population.length - 1) {
        possible_conenctions.splice(0, 1);
    }

    while (max_conn_number !== 0) {
        connected = false;

        while (!connected) {
            candidate_indx = Math.floor(Math.random() * possible_conenctions.length);
            connected = graph.addEdge(population[i], possible_conenctions[candidate_indx], Math.floor(Math.random() * 5) + 1);
        }

        max_conn_number--;
    }

}


console.log("Population:");
console.log(graph);

let data = JSON.stringify(graph);

fs.writeFile("../data/social-net.json", data, 'utf8', function(err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
});

/* 
+-----------------SOCIAL DISTANCING-----------------+
|                 range from 1 to 5                 |
|         * 1 is a strong edge, the individuals     |
|           with a strong edge are more exposed     |
|           to the virus. 5 is the weakest          |
|                                                   |
|         * Every number represent even the         |
|           amount of days passed                   |
|                                                   |
+---------------------------------------------------+
        
*/

let path = dijkstra(graph, population[0], population[population.length - 1]);

console.log(`Final path ${path.finalPath}, days passed ${path.totalDistance}`);

// asking for data conversion
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\nDo you want to make a cleaner version of the data for plotting? [y/n] ', (answer) => {
    if (answer === "y") {
        convertDataForPlotting()
        console.log("Data successfully polished.")
    } else {
        console.log("if you want to plot make sure to have the right format!");
    }


    rl.close();
});