# Social distancing visualized with an undirected graph and Dijkstra Algorithm

This is a small project where I wanted to apply my newly learned knowledge on DataStructures and Javascript.  
The goal is to underline the importance of social distancing during a pandemic. 

This is the first half of the project, the second half consists in calculating the probability of getting a virus; it is coming soon.

## Requirements

* NodeJS
* npm (node package manager)
* Express

## Run

### Dependencies
[NodeJS and npm](https://nodejs.org/en/download/)

Check your installations in a terminal window with:

```
node -v
```

```
npm -v
```

Install Express

```
npm install express
```

The package.json should be already present in the "src" folder.

### Run the project

I reccomend you to start the server which is needed only if you want to land on the home page of the project with an explaination:

```
node server.js
```

and then visit http://localhost:8080

Please take a look there, you will find some documentation on the project.

#### Running your own simulation

There's some pre-compiled data in this project, which means I've already run a simulation and built the network of individuals. It is just an example with the alphabet letters, you can easily start your own by following these steps.

Modify <b>only</b> the main.js file inside the "core" folder. At line 10 you will find:

```javascript
let name_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
```

Modify this and add your own individuals of the network.

Modify:

```javascript
max_conn_number = 1;
```

If you want to add more random connections for each node.  
Note that the values is 1 by default but it doesn't mean that every node has only one connection!

Change the range in:

```javascript
connected = graph.addEdge(population[i], possible_conenctions[candidate_indx], Math.floor(Math.random() * 5) + 1);
```

If you want to modify the weight of the edges (links or connections), higher value means less frequent contact between individuals which also means a longer period of infection for the disease.


## Result

The code will generate a file called "social-net.json" and eventually "[PLOT]social-net.json" if you decide to run the convert_data function when prompted to do so.

These files represent the network of individuals with thei respective edges. The "PLOT" on is just for making a more polished data set for plotting.  
Note that the visualization on the landing page is pretty simple.