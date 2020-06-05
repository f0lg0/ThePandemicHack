module.exports = class WeightedGraph {
    constructor() {
        this.net = {};
    }

    addVertex(vertex) {
        if (!this.net[vertex]) {
            this.net[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        let duplicate = false;
        for (let edge of this.net[vertex1]) {
            if (edge.node === vertex2) {
                duplicate = true;
                break;
            }
        }

        if (!duplicate) {
            this.net[vertex1].push({ node: vertex2, weight });
            this.net[vertex2].push({ node: vertex1, weight });

            return true;
        } else {
            return false;
        }


    }

}