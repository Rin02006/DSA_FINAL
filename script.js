/* =========================
   1. ARRAY & BINARY SEARCH
========================= */

let arrayData = [10, 20, 30];

function renderArray() {
    const visual = document.getElementById("array-visual");
    visual.innerHTML = "";
    arrayData.forEach(val => {
        const box = document.createElement("div");
        box.className = "data-item";
        box.innerText = val;
        visual.appendChild(box);
    });
}
renderArray();

function arrayInsert() {
    const input = document.getElementById("array-input");
    const value = Number(input.value);
    if (isNaN(value)) return;

    arrayData.push(value);
    renderArray();
    document.getElementById("array-message").innerText = "Inserted: " + value;
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
    document.getElementById("array-message").innerText = "Deleted: " + value;
    input.value = "";
}

function runBinarySearch() {
    const target = Number(document.getElementById("bs-input").value);
    const sorted = [...arrayData].sort((a, b) => a - b);

    let low = 0, high = sorted.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
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
   2. STACK (LEFT → RIGHT)
========================= */

const MAX_SIZE = 5;
let stack = [];

function renderStack() {
    const visual = document.getElementById("stack-visual");
    visual.innerHTML = "";

    /* ✅ FIX: LEFT → RIGHT STACK DISPLAY */
    visual.style.display = "flex";
    visual.style.flexDirection = "row";
    visual.style.alignItems = "center";
    visual.style.gap = "8px";

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
    document.getElementById("stack-message").innerText = "Pushed: " + value;
    input.value = "";
}

function stackPop() {
    if (stack.length === 0) {
        document.getElementById("stack-message").innerText = "Stack Underflow!";
        return;
    }

    const removed = stack.pop();
    renderStack();
    document.getElementById("stack-message").innerText = "Popped: " + removed;
}

function stackPeek() {
    if (stack.length === 0) {
        document.getElementById("stack-message").innerText = "Stack is empty";
        return;
    }
    document.getElementById("stack-message").innerText =
        "Top element: " + stack[stack.length - 1];
}

function stackDisplay() {
    document.getElementById("stack-message").innerText =
        "Stack: " + stack.join(", ");
}

/* =========================
   3. QUEUE (FIFO)
========================= */

let queue = [];

function renderQueue() {
    const visual = document.getElementById("queue-visual");
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
   4 & 5. BST VISUALIZATION
========================= */

const canvas = document.getElementById("bst-canvas");
const ctx = canvas.getContext("2d");

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
    document.getElementById("bst-message").innerText = "Inserted: " + value;
}

/* ===== SEARCH ===== */

async function bstSearch() {
    if (animationRunning) return;
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
            document.getElementById("bst-message").innerText = "Found: " + value;
            animationRunning = false;
            return;
        }

        node.highlight = false;
        node = value < node.val ? node.left : node.right;
    }

    document.getElementById("bst-message").innerText = "Not found";
    animationRunning = false;
}

/* ===== TRAVERSALS ===== */

async function bstInorder() {
    if (animationRunning) return;
    animationRunning = true;
    clearStates(bstRoot);
    await inorderAnim(bstRoot);
    animationRunning = false;
}

async function inorderAnim(node) {
    if (!node) return;
    await inorderAnim(node.left);
    node.visited = true;
    drawTree();
    await sleep(600);
    await inorderAnim(node.right);
}

/* ===== DRAW TREE ===== */

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    calculatePositions(bstRoot, canvas.width / 2, 50, canvas.width / 4);
    drawConnections(bstRoot);
    drawNodes(bstRoot);
}

function calculatePositions(node, x, y, gap) {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - gap, y + 90, gap / 2);
    calculatePositions(node.right, x + gap, y + 90, gap / 2);
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
    ctx.strokeStyle = "#f4a6c1";
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
    ctx.arc(node.x, node.y, 26, 0, Math.PI * 2);
    ctx.fillStyle = node.visited || node.highlight ? "#ff9a9e" : "#ffc2d1";
    ctx.fill();
    ctx.strokeStyle = "#ff6f91";
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
}

/* ===== HELPERS ===== */

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

/* =========================
   INFIX → POSTFIX / PREFIX
========================= */

function precedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    if (op === "^") return 3;
    return 0;
}

function infixToPostfix(exp) {
    let stack = [];
    let result = "";

    for (let ch of exp.replace(/\s+/g, "")) {
        if (/[a-zA-Z0-9]/.test(ch)) result += ch;
        else if (ch === "(") stack.push(ch);
        else if (ch === ")") {
            while (stack.length && stack.at(-1) !== "(")
                result += stack.pop();
            stack.pop();
        } else {
            while (stack.length && precedence(stack.at(-1)) >= precedence(ch))
                result += stack.pop();
            stack.push(ch);
        }
    }
    while (stack.length) result += stack.pop();
    return result;
}

function infixToPrefix(exp) {
    let rev = [...exp].reverse()
        .map(c => c === "(" ? ")" : c === ")" ? "(" : c)
        .join("");
    return [...infixToPostfix(rev)].reverse().join("");
}

function convertExpression() {
    const input = document.getElementById("infix-input").value;
    document.getElementById("out-postfix").innerText = infixToPostfix(input);
    document.getElementById("out-prefix").innerText = infixToPrefix(input);
}
