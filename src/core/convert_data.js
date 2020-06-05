let fs = require('fs');

module.exports = function convertDataForPlotting() {
    let data = JSON.parse(fs.readFileSync('../data/social-net.json', 'utf8'));

    let name_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let converted = { nodes: [], links: [] };


    for (let letter of name_set) {
        // adding nodes
        if (letter === "A") {
            converted.nodes.push({ id: letter, group: 3 });
        } else if (letter === "Z") {
            converted.nodes.push({ id: letter, group: 3 });
        } else {
            converted.nodes.push({ id: letter, group: 1 });

        }

        // adding edges
        for (let edge of data.net[letter]) {
            converted.links.push({ source: letter, target: edge.node, weight: edge.weight });
        }

    }

    let final = JSON.stringify(converted);

    fs.writeFile("../data/[PLOT]social-net.json", final, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });

    return converted;
}