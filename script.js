/* =========================
   1. ARRAY & BINARY SEARCH
========================= */

let arrayData = [];

function renderArray() {
    const visual = document.getElementById("array-visual");
    if (!visual) return;
    visual.innerHTML = "";
    arrayData.forEach(val => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = val;
        visual.appendChild(box);
    });
}

function arrayInsert() {
    const input = document.getElementById("array-input");
    const value = Number(input.value);
    if (isNaN(value)) return;

    arrayData.push(value);
    renderArray();
    document.getElementById("array-message").innerText = `Inserted: ${value}`;
    input.value = "";
}

function arrayDelete() {
    const input = document.getElementById("array-input");
    const value = Number(input.value);
    const index = arrayData.indexOf(value);

    if (index === -1) {
        document.getElementById("array-message").innerText = "Value not found";
        return;
    }

    arrayData.splice(index, 1);
    renderArray();
    document.getElementById("array-message").innerText = `Deleted: ${value}`;
    input.value = "";
}

function runBinarySearch() {
    const target = Number(document.getElementById("bs-input").value);
    if (isNaN(target)) return;

    const sorted = [...arrayData].sort((a, b) => a - b);
    let low = 0, high = sorted.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sorted[mid] === target) {
            document.getElementById("array-message").innerText =
                `Found ${target} at index ${mid} (sorted array)`;
            return;
        }
        sorted[mid] < target ? low++ : high--;
    }
    document.getElementById("array-message").innerText = "Not found";
}

/* =========================
   2. STACK
========================= */

const MAX_SIZE = 5;
let stack = [];

function renderStack() {
    const visual = document.getElementById("stack-visual");
    if (!visual) return;
    visual.innerHTML = "";
    stack.forEach(item => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = item;
        visual.appendChild(box);
    });
}

function stackPush() {
    const input = document.getElementById("stack-input");
    const value = input.value.trim();
    if (!value) return;

    if (stack.length >= MAX_SIZE) {
        document.getElementById("stack-message").innerText = "Stack Overflow!";
        return;
    }

    stack.push(value);
    renderStack();
    document.getElementById("stack-message").innerText = `Pushed: ${value}`;
    input.value = "";
}

function stackPop() {
    if (stack.length === 0) {
        document.getElementById("stack-message").innerText = "Stack Underflow!";
        return;
    }

    const removed = stack.pop();
    renderStack();
    document.getElementById("stack-message").innerText = `Popped: ${removed}`;
}

/* =========================
   3. QUEUE
========================= */

let queue = [];

function renderQueue() {
    const visual = document.getElementById("queue-visual");
    if (!visual) return;
    visual.innerHTML = "";
    queue.forEach(item => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = item;
        visual.appendChild(box);
    });
}

function queueEnqueue() {
    const input = document.getElementById("queue-input");
    const value = input.value.trim();
    if (!value) return;

    queue.push(value);
    renderQueue();
    input.value = "";
}

function queueDequeue() {
    if (queue.length === 0) return;
    queue.shift();
    renderQueue();
}

/* =========================
   4. BST VISUALIZATION
========================= */

const canvas = document.getElementById("bst-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let bstRoot = null;
let animationRunning = false;

function BSTNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.visited = false;
    this.highlight = false;
}

function insertBST(node, val) {
    if (!node) return new BSTNode(val);
    if (val < node.val) node.left = insertBST(node.left, val);
    else node.right = insertBST(node.right, val);
    return node;
}

function bstInsert() {
    const value = Number(document.getElementById("bst-val").value);
    if (isNaN(value)) return;

    bstRoot = insertBST(bstRoot, value);
    clearStates(bstRoot);
    drawTree();
    document.getElementById("bst-message").innerText = `Inserted: ${value}`;
}

/* ===== BST SEARCH ===== */

async function bstSearch() {
    if (animationRunning || !bstRoot) return;
    animationRunning = true;

    clearStates(bstRoot);
    const value = Number(document.getElementById("bst-val").value);
    let node = bstRoot;

    while (node) {
        node.highlight = true;
        drawTree();
        await sleep(600);

        if (node.val === value) {
            node.visited = true;
            drawTree();
            document.getElementById("bst-message").innerText = `Found: ${value}`;
            animationRunning = false;
            return;
        }

        node.highlight = false;
        node = value < node.val ? node.left : node.right;
    }

    drawTree();
    document.getElementById("bst-message").innerText = "Not found";
    animationRunning = false;
}

/* ===== DRAWING ===== */

function drawTree() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    calculatePositions(bstRoot, canvas.width / 2, 40, canvas.width / 4);
    drawConnections(bstRoot);
    drawNodes(bstRoot);
}

function calculatePositions(node, x, y, gap) {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - gap, y + 70, gap / 2);
    calculatePositions(node.right, x + gap, y + 70, gap / 2);
}

function drawConnections(node) {
    if (!node) return;
    if (node.left) drawLine(node, node.left);
    if (node.right) drawLine(node, node.right);
    drawConnections(node.left);
    drawConnections(node.right);
}

function drawLine(p, c) {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(c.x, c.y);
    ctx.strokeStyle = "#a18cd1";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawNodes(node) {
    if (!node) return;
    drawCircle(node);
    drawNodes(node.left);
    drawNodes(node.right);
}

function drawCircle(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2); // ✅ radius 20

    ctx.fillStyle = node.visited || node.highlight ? "#ff9a9e" : "#b56576";
    ctx.fill();
    ctx.strokeStyle = "#6d597a";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial"; // ✅ font size 14
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
}

function clearStates(node) {
    if (!node) return;
    node.visited = false;
    node.highlight = false;
    clearStates(node.left);
    clearStates(node.right);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function bstClear() {
    bstRoot = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("bst-message").innerText = "Tree cleared";
}

/* =========================
   5. ALGORITHMS (algorithm.html)
========================= */

function runAlgo(id) {
    const outputBox = document.getElementById(`output-${id}`);
    if (!outputBox) return;

    outputBox.innerText = "Running...";

    setTimeout(() => {
        switch (id) {
            case 1: {
                const a = prompt("Enter first number:");
                const b = prompt("Enter second number:");
                outputBox.innerText = a && b ? `Sum: ${Number(a) + Number(b)}` : "Cancelled";
                break;
            }
            case 2: {
                const n = prompt("Enter number:");
                outputBox.innerText = n ? `${n} is ${n % 2 === 0 ? "Even" : "Odd"}` : "Cancelled";
                break;
            }
            case 3: {
                const a = prompt("a:"), b = prompt("b:"), c = prompt("c:");
                outputBox.innerText = a && b && c ? `Max: ${Math.max(a, b, c)}` : "Cancelled";
                break;
            }
            case 4: {
                const n = prompt("Enter number:");
                let f = 1;
                for (let i = 1; i <= n; i++) f *= i;
                outputBox.innerText = `Factorial: ${f}`;
                break;
            }
            case 5: {
                const t = prompt("Terms:");
                let fib = [0, 1];
                for (let i = 2; i < t; i++) fib.push(fib[i - 1] + fib[i - 2]);
                outputBox.innerText = fib.join(", ");
                break;
            }
            case 6: {
                const n = prompt("Number:");
                let prime = n > 1;
                for (let i = 2; i < n; i++) if (n % i === 0) prime = false;
                outputBox.innerText = prime ? "Prime" : "Not Prime";
                break;
            }
            case 7: {
                const a = prompt("A:"), b = prompt("B:");
                outputBox.innerText = `Swapped: A=${b}, B=${a}`;
                break;
            }
            case 8: {
                const n = prompt("Find (10,20,30):");
                outputBox.innerText = [10, 20, 30].includes(Number(n)) ? "Found" : "Not Found";
                break;
            }
            case 9: {
                const s = prompt("String:");
                outputBox.innerText = s.split("").reverse().join("");
                break;
            }
            case 10: {
                const r = prompt("Radius:");
                outputBox.innerText = `Area: ${(Math.PI * r * r).toFixed(2)}`;
                break;
            }
        }
    }, 200);
}

function runPseudo(id) {
    runAlgo(id);
}
