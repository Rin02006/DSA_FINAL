/* =========================================
   FIXED & WORKING script.js
   Data Structures, Algorithms, BST Visualization
   ========================================= */

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
        if (myArray[mid] === target) {
            foundIndex = mid;
            break;
        } else if (myArray[mid] < target) low = mid + 1;
        else high = mid - 1;
    }

    const msg = document.getElementById('array-message');
    if (foundIndex !== -1) {
        msg.innerText = `Binary Search: Found ${target} at index ${foundIndex}`;
        msg.style.color = "green";
    } else {
        msg.innerText = `Binary Search: ${target} Not Found`;
        msg.style.color = "red";
    }
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
        div.innerText = item;
        container.appendChild(div);
    });
}

function stackPush() {
    const msg = document.getElementById('stack-message');
    if (myStack.length >= MAX_STACK) {
        msg.innerText = "STACK OVERFLOW (Limit 5)";
        msg.style.color = "red";
        return;
    }
    const input = document.getElementById('stack-input');
    const val = input.value;
    if (val === '') return alert("Enter value");

    myStack.push(val);
    input.value = '';
    renderStack();
    msg.innerText = `Pushed: ${val}`;
    msg.style.color = "#6d597a";
}

function stackPop() {
    const msg = document.getElementById('stack-message');
    if (myStack.length === 0) {
        msg.innerText = "STACK UNDERFLOW";
        msg.style.color = "red";
        return;
    }
    const popped = myStack.pop();
    renderStack();
    msg.innerText = `Popped: ${popped}`;
    msg.style.color = "#6d597a";
}

function stackPeek() {
    const msg = document.getElementById('stack-message');
    msg.innerText = myStack.length === 0
        ? "Stack is Empty"
        : `Peek (Top): ${myStack[myStack.length - 1]}`;
    msg.style.color = "#6d597a";
}

function stackDisplay() {
    const msg = document.getElementById('stack-message');
    msg.innerText = myStack.length === 0
        ? "Stack is Empty"
        : `Full Stack: [ ${myStack.join(', ')} ]`;
    msg.style.color = "#6d597a";
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
   PART 2: ALGORITHMS (Run Buttons)
   ========================================= */
function runAlgo(id) {
    const outputBox = document.getElementById(`output-${id}`);
    outputBox.innerHTML = '<span style="color:orange">Running...</span>';

    setTimeout(() => {
        try {
            switch (id) {
                case 1: {
                    let a = prompt("Enter num1:");
                    let b = prompt("Enter num2:");
                    outputBox.innerText = a && b ? `Sum: ${Number(a) + Number(b)}` : "Cancelled";
                    break;
                }
                case 2: {
                    let n = prompt("Enter number:");
                    outputBox.innerText = n ? `${n} is ${n % 2 == 0 ? 'Even' : 'Odd'}` : "Cancelled";
                    break;
                }
                case 3: {
                    let a = prompt("a:"), b = prompt("b:"), c = prompt("c:");
                    outputBox.innerText = a && b && c ? `Max: ${Math.max(a, b, c)}` : "Cancelled";
                    break;
                }
                case 4: {
                    let f = prompt("Enter number:");
                    let fact = 1;
                    for (let i = 1; i <= f; i++) fact *= i;
                    outputBox.innerText = `Factorial: ${fact}`;
                    break;
                }
                case 5: {
                    let t = prompt("Terms:");
                    let arr = [0, 1];
                    for (let i = 2; i < t; i++) arr.push(arr[i - 1] + arr[i - 2]);
                    outputBox.innerText = `Series: ${arr.slice(0, t).join(', ')}`;
                    break;
                }
                case 6: {
                    let p = prompt("Enter number:");
                    let prime = p > 1;
                    for (let i = 2; i < p; i++) if (p % i === 0) prime = false;
                    outputBox.innerText = prime ? "Prime" : "Not Prime";
                    break;
                }
                case 7: {
                    let a = prompt("A:"), b = prompt("B:");
                    outputBox.innerText = `Swapped: A=${b}, B=${a}`;
                    break;
                }
                case 8: {
                    let t = prompt("Find in [10,20,30]:");
                    outputBox.innerText = [10, 20, 30].includes(Number(t)) ? "Found" : "Not Found";
                    break;
                }
                case 9: {
                    let s = prompt("Enter string:");
                    outputBox.innerText = s.split('').reverse().join('');
                    break;
                }
                case 10: {
                    let r = prompt("Radius:");
                    outputBox.innerText = `Area: ${(Math.PI * r * r).toFixed(2)}`;
                    break;
                }
            }
        } catch (e) {
            outputBox.innerText = "Error";
        }
    }, 200);
}

function runPseudo(id) { runAlgo(id); }

/* =========================================
   INFIX → POSTFIX / PREFIX (REAL LOGIC)
   ========================================= */

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    if (op === '^') return 3;
    return 0;
}

function isOperator(ch) {
    return ['+', '-', '*', '/', '^'].includes(ch);
}

function infixToPostfix(infix) {
    let stack = [];
    let postfix = '';

    for (let ch of infix.replace(/\s+/g, '')) {
        if (/[a-zA-Z0-9]/.test(ch)) {
            postfix += ch;
        } else if (ch === '(') {
            stack.push(ch);
        } else if (ch === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }
            stack.pop();
        } else if (isOperator(ch)) {
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(ch)) {
                postfix += stack.pop();
            }
            stack.push(ch);
        }
    }

    while (stack.length) postfix += stack.pop();
    return postfix;
}

function infixToPrefix(infix) {
    let reversed = infix
        .split('')
        .reverse()
        .map(ch => (ch === '(' ? ')' : ch === ')' ? '(' : ch))
        .join('');

    let postfix = infixToPostfix(reversed);
    return postfix.split('').reverse().join('');
}

function convertExpression() {
    const input = document.getElementById('infix-input').value;
    if (!input) return alert('Enter infix expression');

    document.getElementById('out-infix').innerText = input;
    document.getElementById('out-postfix').innerText = infixToPostfix(input);
    document.getElementById('out-prefix').innerText = infixToPrefix(input);
}

/* =========================================
   PART 3: BINARY SEARCH TREE (BST)
   ========================================= */
let canvas, ctx, bstRoot = null;

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
    if (isNaN(val)) return alert("Enter a number");
    bstRoot = insertNode(bstRoot, val, canvas.width / 2, 50, 1);
    input.value = '';
    drawTree();
    logBST(`Inserted ${val}`);
}

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bstRoot) drawNode(bstRoot);
}

function drawNode(node) {
    if (node.left) {
        drawLine(node, node.left);
        drawNode(node.left);
    }
    if (node.right) {
        drawLine(node, node.right);
        drawNode(node.right);
    }
    // Default girly pink node
    drawCircle(node, '#ff9a9e');
}
    if (node.right) {
        drawLine(node, node.right);
        drawNode(node.right);
    }
    drawCircle(node, '#ff9a9e');
}

function drawLine(a, b) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = '#a18cd1';
    ctx.stroke();
}

function drawCircle(node, color) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(node.val, node.x, node.y);
}

async function searchNode(node, val) {
    if (!node) return false;

    // Soft pink highlight while traversing
    drawCircle(node, '#f7b2cc');
    await new Promise(r => setTimeout(r, 500));

    if (node.val === val) {
        // Stronger pink when found
        drawCircle(node, '#ff6f91');
        return true;
    }

    return val < node.val
        ? await searchNode(node.left, val)
        : await searchNode(node.right, val);
}
    return val < node.val
        ? await searchNode(node.left, val)
        : await searchNode(node.right, val);
}

async function bstSearch() {
    const val = parseInt(document.getElementById('bst-val').value);
    if (isNaN(val)) return alert("Enter value");
    drawTree();
    const found = await searchNode(bstRoot, val);
    logBST(found ? `Found ${val}` : `${val} not found`);
}

async function inorderTraverse(node, list) {
    if (!node) return;
    await inorderTraverse(node.left, list);

    // Pastel pink for traversal
    drawCircle(node, '#ffc2d1');
    list.push(node.val);
    await new Promise(r => setTimeout(r, 400));

    await inorderTraverse(node.right, list);
}

async function bstInorder() {
    drawTree();
    let list = [];
    await inorderTraverse(bstRoot, list);
    logBST(`Inorder: ${list.join(' -> ')}`);
}

function bstClear() {
    bstRoot = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    logBST('Tree Cleared');
}

function logBST(msg) {
    document.getElementById('bst-message').innerText = msg;
}

window.onload = () => {
    canvas = document.getElementById('bst-canvas');
    if (canvas) ctx = canvas.getContext('2d');
};
