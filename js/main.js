const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let maze = [];
let rows, cols;
let cellSize;
let solution = [];
let isAnimating = false;

// Initialize canvas size
function initCanvas() {
    const container = canvas.parentElement;
    const maxSize = Math.min(container.clientWidth - 40, 700);
    canvas.width = maxSize;
    canvas.height = maxSize;
}

// Update slider display values
function updateSliderValue(slider) {
    const value = document.getElementById(slider).value;
    document.getElementById(slider + 'Value').textContent = value;
}

// Make function global
window.updateSliderValue = updateSliderValue;

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.walls = { top: true, right: true, bottom: true, left: true };
    }
}

function generateMaze() {
    rows = parseInt(document.getElementById('rows').value);
    cols = parseInt(document.getElementById('cols').value);
    
    // Dynamically resize canvas based on maze dimensions
    const container = canvas.parentElement;
    const maxSize = Math.min(container.clientWidth - 40, 700);
    const aspectRatio = cols / rows;
    
    if (aspectRatio > 1) {
        canvas.width = maxSize;
        canvas.height = maxSize / aspectRatio;
    } else {
        canvas.height = maxSize;
        canvas.width = maxSize * aspectRatio;
    }
    
    maze = [];
    solution = [];
    
    for (let r = 0; r < rows; r++) {
        maze[r] = [];
        for (let c = 0; c < cols; c++) {
            maze[r][c] = new Cell(r, c);
        }
    }

    cellSize = Math.min(canvas.width / cols, canvas.height / rows);
    
    // Generate using recursive backtracking
    const stack = [];
    const start = maze[0][0];
    start.visited = true;
    stack.push(start);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbors = getUnvisitedNeighbors(current);

        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            removeWall(current, next);
            next.visited = true;
            stack.push(next);
        } else {
            stack.pop();
        }
    }

    drawMaze();
    document.getElementById('mazeSize').textContent = `${rows}×${cols}`;
    document.getElementById('algorithm').textContent = '-';
    document.getElementById('solveTime').textContent = '-';
}

function getUnvisitedNeighbors(cell) {
    const neighbors = [];
    const { row, col } = cell;

    if (row > 0 && !maze[row - 1][col].visited) neighbors.push(maze[row - 1][col]);
    if (col < cols - 1 && !maze[row][col + 1].visited) neighbors.push(maze[row][col + 1]);
    if (row < rows - 1 && !maze[row + 1][col].visited) neighbors.push(maze[row + 1][col]);
    if (col > 0 && !maze[row][col - 1].visited) neighbors.push(maze[row][col - 1]);

    return neighbors;
}

function removeWall(current, next) {
    const dx = next.col - current.col;
    const dy = next.row - current.row;

    if (dx === 1) {
        current.walls.right = false;
        next.walls.left = false;
    } else if (dx === -1) {
        current.walls.left = false;
        next.walls.right = false;
    } else if (dy === 1) {
        current.walls.bottom = false;
        next.walls.top = false;
    } else if (dy === -1) {
        current.walls.top = false;
        next.walls.bottom = false;
    }
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = maze[r][c];
            const x = c * cellSize;
            const y = r * cellSize;

            ctx.beginPath();
            if (cell.walls.top) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellSize, y);
            }
            if (cell.walls.right) {
                ctx.moveTo(x + cellSize, y);
                ctx.lineTo(x + cellSize, y + cellSize);
            }
            if (cell.walls.bottom) {
                ctx.moveTo(x + cellSize, y + cellSize);
                ctx.lineTo(x, y + cellSize);
            }
            if (cell.walls.left) {
                ctx.moveTo(x, y + cellSize);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }

    // Draw start and end
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(cellSize * 0.25, cellSize * 0.25, cellSize * 0.5, cellSize * 0.5);
    
    ctx.fillStyle = '#f87171';
    ctx.fillRect((cols - 1) * cellSize + cellSize * 0.25, (rows - 1) * cellSize + cellSize * 0.25, cellSize * 0.5, cellSize * 0.5);
}

function solveMaze(algorithm) {
    if (maze.length === 0) {
        alert('Please generate a maze first!');
        return;
    }

    if (isAnimating) {
        return;
    }

    // Clear stats at the start
    document.getElementById('algorithm').textContent = '-';
    document.getElementById('solveTime').textContent = '-';

    const startTime = performance.now();
    solution = algorithm === 'dfs' ? solveDFS() : solveBFS();
    const endTime = performance.now();
    const solveTimeMs = (endTime - startTime).toFixed(3);
    
    if (solution.length > 0) {
        animateSolution(algorithm, solveTimeMs);
    } else {
        document.getElementById('algorithm').textContent = algorithm.toUpperCase();
        document.getElementById('solveTime').textContent = `${solveTimeMs}ms`;
    }
}

function animateSolution(algorithm, solveTimeMs) {
    isAnimating = true;
    drawMaze();
    
    let currentStep = 0;
    const animationSpeed = Math.max(10, Math.min(50, 1000 / solution.length));

    function drawStep() {
        if (currentStep >= solution.length) {
            isAnimating = false;
            document.getElementById('algorithm').textContent = algorithm.toUpperCase();
            document.getElementById('solveTime').textContent = `${solveTimeMs}ms`;
            return;
        }

        // Draw path up to current step
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        for (let i = 0; i <= currentStep; i++) {
            const { row, col } = solution[i];
            const x = col * cellSize + cellSize / 2;
            const y = row * cellSize + cellSize / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Draw current position marker
        const current = solution[currentStep];
        const x = current.col * cellSize + cellSize / 2;
        const y = current.row * cellSize + cellSize / 2;
        
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x, y, cellSize * 0.2, 0, Math.PI * 2);
        ctx.fill();

        currentStep++;
        setTimeout(drawStep, animationSpeed);
    }

    drawStep();
}

function solveDFS() {
    const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
    const path = [];
    
    function dfs(row, col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col]) {
            return false;
        }

        visited[row][col] = true;
        path.push({ row, col });

        if (row === rows - 1 && col === cols - 1) {
            return true;
        }

        const cell = maze[row][col];
        
        if (!cell.walls.top && dfs(row - 1, col)) return true;
        if (!cell.walls.right && dfs(row, col + 1)) return true;
        if (!cell.walls.bottom && dfs(row + 1, col)) return true;
        if (!cell.walls.left && dfs(row, col - 1)) return true;

        path.pop();
        return false;
    }

    dfs(0, 0);
    return path;
}

function solveBFS() {
    const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
    const queue = [{ row: 0, col: 0, path: [{ row: 0, col: 0 }] }];
    visited[0][0] = true;

    while (queue.length > 0) {
        const { row, col, path } = queue.shift();

        if (row === rows - 1 && col === cols - 1) {
            return path;
        }

        const cell = maze[row][col];
        const directions = [
            { dr: -1, dc: 0, wall: 'top' },
            { dr: 0, dc: 1, wall: 'right' },
            { dr: 1, dc: 0, wall: 'bottom' },
            { dr: 0, dc: -1, wall: 'left' }
        ];

        for (const { dr, dc, wall } of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                !visited[newRow][newCol] && !cell.walls[wall]) {
                visited[newRow][newCol] = true;
                queue.push({
                    row: newRow,
                    col: newCol,
                    path: [...path, { row: newRow, col: newCol }]
                });
            }
        }
    }

    return [];
}

function drawSolution() {
    drawMaze();

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    for (let i = 0; i < solution.length; i++) {
        const { row, col } = solution[i];
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

function clearSolution() {
    if (isAnimating) {
        return;
    }
    solution = [];
    if (maze.length > 0) {
        drawMaze();
        document.getElementById('algorithm').textContent = '-';
        document.getElementById('solveTime').textContent = '-';
    }
}

// Initialize and generate initial maze
initCanvas();
generateMaze();

// Handle window resize
window.addEventListener('resize', () => {
    if (maze.length > 0) {
        const oldRows = rows;
        const oldCols = cols;
        initCanvas();
        rows = oldRows;
        cols = oldCols;
        cellSize = Math.min(canvas.width / cols, canvas.height / rows);
        
        if (solution.length > 0) {
            drawSolution();
        } else {
            drawMaze();
        }
    }
});