# Maze Generator 🌀

An **interactive, browser-based maze generator and solver** built with **HTML5 Canvas** and **vanilla JavaScript**.

This project visualizes procedural maze generation using the **Recursive Backtracking** algorithm. It includes two classic maze-solving methods — **Depth-First Search (DFS)** and **Breadth-First Search (BFS)** — complete with real-time animation.

**💡 This project is a complete conversion and extension of my previous [JavaFX Maze Generator](https://github.com/himynameismoose/MazeGeneration), redesigned as a clean, performant web application.**

---

## Table of Contents

* [About](#about)
* [Features](#features)
* [Demo / Screenshots](#demo--screenshots)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
* [How it Works](#how-it-works)
* [Configuration / Options](#configuration--options)
* [Contributing](#contributing)
* [Roadmap](#roadmap)

---

## About

This project started as a fun experiment to visualize **maze generation algorithms** and evolved into an educational and visually engaging tool. The maze is drawn dynamically on a responsive HTML5 canvas, adapting to screen size, and can be solved using two selectable algorithms.

It’s a clean, self-contained JavaScript project designed for learning, teaching, and demonstrating how algorithms like DFS and BFS explore space differently.

---

## Features

* 🧩 **Maze Generation** — Uses the **Recursive Backtracking (Depth-First Search)** algorithm to carve a perfect maze (a maze with exactly one path between any two points).
* ⚙️ **Maze Solvers** — Solve the maze using either **Depth-First Search (DFS)** or **Breadth-First Search (BFS)**, each animated step-by-step.
* 🎨 **Canvas Rendering** — Dynamic drawing that scales with grid size and browser window.
* 🖱️ **Interactive Controls** — Adjustable maze dimensions via sliders.
* 📱 **Responsive Design** — Automatically resizes the maze when the browser window changes.
* 🕒 **Performance Metrics** — Displays solving algorithm and elapsed time.

---

## Demo / Screenshots

View the project [here](https://himynameismoose.github.io/maze-generator/)
<video src="https://github.com/user-attachments/assets/fa213d27-c825-453d-abd0-b4aab4c2e477" controls muted loop width="100%" />

---

## Getting Started

### Prerequisites

* A modern web browser (Chrome, Firefox, Edge, Safari).
* (Optional) A local web server if you prefer to host the files instead of opening `index.html` directly.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/himynameismoose/maze-generator.git
   ```
2. Navigate into the folder:

   ```bash
   cd maze-generator
   ```
3. Open `index.html` in your browser, or run a lightweight local server (e.g., `python3 -m http.server`).

### Usage

* Adjust **Rows** and **Columns** using the sliders.
* Click **Generate Maze** to create a new maze.
* Choose **Solve (DFS)** or **Solve (BFS)** to visualize each algorithm’s approach.
* Observe the **algorithm name** and **solve time** displayed under the canvas.

---

## How it Works

### 🔹 Maze Generation — Recursive Backtracking

The maze is generated using a **recursive backtracking algorithm** (a form of depth-first search). Starting from the top-left cell, it randomly selects unvisited neighbors, removes walls between them, and continues until all cells are visited. The result is a *perfect maze* with one valid path between any two points.

### 🔹 Maze Solving — DFS & BFS

You can visualize two different solving strategies:

* **DFS (Depth-First Search)** — Explores as far as possible along each path before backtracking. Produces one valid path quickly but not necessarily the shortest.
* **BFS (Breadth-First Search)** — Explores all neighboring paths level-by-level, guaranteeing the *shortest path* solution.

Both algorithms are timed, so you can compare their performance and path characteristics in real time.

---

## Configuration / Options

You can tweak or extend the behavior by editing `main.js`:

* `rows` and `cols`: number of grid cells.
* `cellSize`: dynamically calculated to fit the canvas.
* `drawMaze()`: adjust line color, thickness, or start/end markers.
* `animateSolution()`: change animation speed or path color.
* `solveMaze()`: hook in additional algorithms (like A*, Dijkstra, or Greedy Best-First Search).

---

## Contributing

Contributions are very welcome — whether you want to add algorithms, improve visuals, or refactor the code!

### How to Contribute

1. Fork the repository.
2. Create a new branch (e.g., `feature/add-prim-algorithm`).
3. Commit and push your changes.
4. Open a Pull Request explaining your contribution.

### Ideas for Contributions

* 🧠 Add new algorithms (Prim’s, Kruskal’s, Eller’s, Wilson’s).
* 🔎 Add heuristic solvers (A*, Dijkstra’s).
* 💡 Add UI elements (buttons, sliders, dark mode).
* 📸 Export maze or solution as image.
* 🧮 Add performance stats comparison for algorithms.

---

## Roadmap

* [ ] Add additional maze generation algorithms (Prim’s, Eller’s).
* [ ] Implement pathfinding comparison (A*, Dijkstra).
* [ ] Add export/download feature.
* [ ] Improve UI (sliders, themes, animation control).
* [ ] Add sound or haptic feedback for steps.
* [ ] Include performance charts for algorithm comparisons.

---

*Created with ❤️ by [himynameismoose](https://github.com/himynameismoose).*
