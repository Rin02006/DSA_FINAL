/* =========================================
   PART 1: DATA STRUCTURES
   ========================================= */

/* --- ARRAY & BINARY SEARCH --- */
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
    const target = parseInt(document.getElementById('bs-input').value);
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
    if (foundIndex !== -1) {
        msg.innerText = `Binary Search: Found ${target} at sorted index ${foundIndex}`;
        msg.style.color = "green";
    } else {
        msg.innerText = `Binary Search: ${target} Not Found`;
        msg.style.color = "red";
    }
}

/* --- STACK --- */
let myStack = [];
const MAX_STACK = 5;

function renderStack() {
    const container = document.getElementById('stack-visual');
    container.innerHTML = '';
    [...myStack].reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.style.width = "100%";
        div.style.textAlign = "center";
        div.innerText = item;
        container.appendChild(div);
    });
}

function stackPush() {
    if (myStack.length >= MAX_STACK) {
        const msg = document.getElementById('stack-message');
        msg.innerText = "❌ STACK OVERFLOW! Limit is 5.";
        msg.style.color = "red";
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
        document.getElementById('stack-message').innerText = "Error: Stack Underflow (Empty)";
        return;
    }
    const popped = myStack.pop();
    renderStack();
    document.getElementById('stack-message').innerText = `Popped: ${popped}`;
}

function stackPeek() {
    const msg = document.getElementById('stack-message');
    msg.innerText = myStack.length === 0
        ? "Stack is Empty."
        : `Peek (Top): ${myStack[myStack.length - 1]}`;
}

function stackDisplay() {
    const msg = document.getElementById('stack-message');
    msg.innerText = myStack.length === 0
        ? "Stack is Empty."
        : `Full Stack: [ ${myStack.join(', ')} ]`;
}

/* --- QUEUE --- */
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
    if (myQueue.length === 0) return alert("Empty");
    myQueue.shift();
    renderQueue();
}

/* =========================================
   PART 2: ALGORITHMS
   ========================================= */
function runAlgo(id) {
    const outputBox = document.getElementById(`output-${id}`);
    outputBox.innerHTML = "Running...";

    setTimeout(() => {
        try {
            switch (id) {
                case 1:
                    let a = prompt("Enter num1:");
                    let b = prompt("Enter num2:");
                    outputBox.innerText = `Sum: ${Number(a) + Number(b)}`;
                    break;
                case 2:
                    let n = prompt("Enter num:");
                    outputBox.innerText = `${n} is ${n % 2 === 0 ? "Even" : "Odd"}`;
                    break;
                case 3:
                    let x = prompt("a:"), y = prompt("b:"), z = prompt("c:");
                    outputBox.innerText = `Max: ${Math.max(x, y, z)}`;
                    break;
                case 4:
                    let f = prompt("Enter num:");
                    let fact = 1;
                    for (let i = 1; i <= f; i++) fact *= i;
                    outputBox.innerText = `Factorial: ${fact}`;
                    break;
                case 5:
                    let t = prompt("Terms:");
                    let fib = [0, 1];
                    for (let i = 2; i < t; i++) fib.push(fib[i - 1] + fib[i - 2]);
                    outputBox.innerText = `Series: ${fib.slice(0, t).join(', ')}`;
                    break;
            }
        } catch {
            outputBox.innerText = "Error";
        }
    }, 200);
}

/* =========================================
   PART 3: BST
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

function logBST(msg) {
    document.getElementById('bst-message').innerText = msg;
}
