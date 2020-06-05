class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority; // adding priority to elements
    }
}

// it's a minBinarySearchTree
module.exports = class PriorityQueue {
    constructor() {
        this.values = [];
    }

    // [UTILITY METHOD]
    swap(idx1, idx2) {
        let temp = this.values[idx1];
        this.values[idx1] = this.values[idx2];
        this.values[idx2] = temp;
    }

    // [UTILITY METHOD]
    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];

        let parentIndex, parent;

        while (index > 0) {
            parentIndex = Math.floor((index - 1) / 2);
            parent = this.values[parentIndex];

            if (element.priority >= parent.priority) break;
            this.values[parentIndex] = element;
            this.values[index] = parent;

            index = parentIndex;
        }
    }

    // [UTILITY METHOD]
    bubbleDown() {
        let index = 0;
        const length = this.values.length;
        const element = this.values[0];

        let leftChildIndex, rightChildIndex, leftChild, rightChild, swap;

        while (true) {
            leftChildIndex = (2 * index) + 1;
            rightChildIndex = (2 * index) + 2;

            swap = null;

            if (leftChildIndex < length) {
                leftChild = this.values[leftChildIndex];

                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.values[rightChildIndex];

                if ((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.values[index] = this.values[swap];
            this.values[swap] = element;

            index = swap;
        }
    }

    // add to the end and bubble app the value
    enqueue(val, priority) {
        let node = new Node(val, priority);

        this.values.push(node);
        this.bubbleUp();

        return true;
    }

    dequeue() {
        if (this.values.length > 0) {
            this.swap(0, this.values.length - 1);
            let min = this.values.pop();
            this.bubbleDown();

            return min;
        } else {
            return undefined;
        }

    }
}