/* =========================================
   PART 1: DATA STRUCTURES (Array, Stack, Queue)
========================================= */

/* --- ARRAY & BINARY SEARCH LOGIC --- */
let myArray = [];

function renderArray() {
    const container = document.getElementById('array-visual');
    container.innerHTML = '';
    myArray.forEach(item => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerText = item;
        container.appendChild(div);
    });
}

function arrayInsert() {
    const input = document.getElementById('array-input');
    const val = input.value;
    if (val === '') return alert("Please enter a value");
    myArray.push(parseInt(val));
    input.value = '';
    renderArray();
    document.getElementById('array-message').innerText = `Inserted ${val}`;
}

function arrayDelete() {
    const input = document.getElementById('array-input');
    const val = parseInt(input.value);
    const index = myArray.indexOf(val);
    if (index > -1) {
        myArray.splice(index, 1);
        document.getElementById('array-message').innerText = `Deleted ${val}`;
    } else {
        alert("Value not found");
    }
    input.value = '';
    renderArray();
}

function runBinarySearch() {
    const input = document.getElementById('bs-input');
    const target = parseInt(input.value);
    if (isNaN(target)) return alert("Enter number");
    if (myArray.length === 0) return alert("Array Empty");

    myArray.sort((a, b) => a - b);
    renderArray();

    let low = 0, high = myArray.length - 1, foundIndex = -1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (myArray[mid] === target) { foundIndex = mid; break; }
        else if (myArray[mid] < target) low = mid + 1;
        else high = mid - 1;
    }

    const msg = document.getElementById('array-message');
    msg.innerText = foundIndex !== -1
        ? `Binary Search: Found ${target} at index ${foundIndex}`
        : `Binary Search: ${target} Not Found`;
}

/* --- STACK LOGIC --- */
let myStack = [];
const MAX_STACK = 5;

function renderStack() {
    const container = document.getElementById('stack-visual');
    container.innerHTML = '';
    [...myStack].reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.style.width = "100%";
        div.innerText = item;
        container.appendChild(div);
    });
}

function stackPush() {
    if (myStack.length >= MAX_STACK) {
        document.getElementById('stack-message').innerText = "STACK OVERFLOW";
        return;
    }
    const input = document.getElementById('stack-input');
    const val = input.value;
    if (val === '') return alert("Enter value");
    myStack.push(val);
    input.value = '';
    renderStack();
    document.getElementById('stack-message').innerText = `Pushed: ${val}`;
}

function stackPop() {
    if (myStack.length === 0) {
        document.getElementById('stack-message').innerText = "Stack Underflow";
        return;
    }
    const popped = myStack.pop();
    renderStack();
    document.getElementById('stack-message').innerText = `Popped: ${popped}`;
}

/* --- QUEUE LOGIC --- */
let myQueue = [];

function renderQueue() {
    const c = document.getElementById('queue-visual');
    c.innerHTML = '';
    myQueue.forEach(i => {
        const d = document.createElement('div');
        d.className = 'data-item';
        d.innerText = i;
        c.appendChild(d);
    });
}

function queueEnqueue() {
    const val = document.getElementById('queue-input').value;
    if (val === '') return alert("Enter value");
    myQueue.push(val);
    document.getElementById('queue-input').value = '';
    renderQueue();
}

function queueDequeue() {
    if (myQueue.length === 0) return alert("Queue Empty");
    myQueue.shift();
    renderQueue();
}

/* =========================================
   PART 2: ALGORITHMS
========================================= */
function runAlgo(id) {
    const outputBox = document.getElementById(`output-${id}`);
    outputBox.innerText = "Running...";
    setTimeout(() => {
        outputBox.innerText = "Done";
    }, 200);
}

function runPseudo(id) {
    runAlgo(id);
}

/* =========================================
   PART 3: BST VISUALIZATION
========================================= */
const canvas = document.getElementById('bst-canvas');
const ctx = canvas.getContext('2d');
let bstRoot = null;

class VisualNode {
    constructor(val, x, y) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
    }
}

function insertNode(root, val, x, y, level) {
    if (!root) return new VisualNode(val, x, y);
    const offset = 200 / (level + 1);
    if (val < root.val)
        root.left = insertNode(root.left, val, x - offset, y + 60, level + 1);
    else
        root.right = insertNode(root.right, val, x + offset, y + 60, level + 1);
    return root;
}

function bstInsert() {
    const input = document.getElementById('bst-val');
    const val = parseInt(input.value);
    if (isNaN(val)) return alert("Enter number");
    bstRoot = insertNode(bstRoot, val, canvas.width / 2, 50, 1);
    input.value = '';
    drawTree();
}

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bstRoot) drawNode(bstRoot);
}

function drawNode(node) {
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
        drawNode(node.left);
    }
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
        drawNode(node.right);
    }
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff9a9e";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
}

