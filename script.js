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
    if(val === '') return alert("Please enter a value");
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
    if (foundIndex !== -1) {
        msg.innerText = `Binary Search: Found ${target} at sorted index ${foundIndex}`;
        msg.style.color = "green";
    } else {
        msg.innerText = `Binary Search: ${target} Not Found`;
        msg.style.color = "red";
    }
}

/* --- STACK LOGIC (With Overflow) --- */
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
        div.style.marginBottom = "2px";
        div.innerText = item;
        container.appendChild(div);
    });
}

function stackPush() {
    if(myStack.length >= MAX_STACK) {
        const msg = document.getElementById('stack-message');
        msg.innerText = "❌ STACK OVERFLOW! Limit is 5.";
        msg.style.color = "red";
        return;
    }
    const input = document.getElementById('stack-input');
    const val = input.value;
    if(val === '') return alert("Enter value");
    
    myStack.push(val);
    input.value = '';
    renderStack();
    const msg = document.getElementById('stack-message');
    msg.innerText = `Pushed: ${val}`;
    msg.style.color = "#6d597a";
}

function stackPop() {
    if(myStack.length === 0) {
        const msg = document.getElementById('stack-message');
        msg.innerText = "Error: Stack Underflow (Empty)";
        msg.style.color = "red";
        return;
    }
    const popped = myStack.pop();
    renderStack();
    document.getElementById('stack-message').innerText = `Popped: ${popped}`;
    document.getElementById('stack-message').style.color = "#6d597a";
}

function stackPeek() {
    const msg = document.getElementById('stack-message');
    if(myStack.length === 0) { msg.innerText = "Stack is Empty."; } 
    else { msg.innerText = `Peek (Top): ${myStack[myStack.length - 1]}`; }
    msg.style.color = "#6d597a";
}

function stackDisplay() {
    const msg = document.getElementById('stack-message');
    if(myStack.length === 0) msg.innerText = "Stack is Empty."; 
    else msg.innerText = `Full Stack: [ ${myStack.join(', ')} ]`;
    msg.style.color = "#6d597a";
}

function convertExpression() {
    const input = document.getElementById('infix-input').value;
    if(!input) return alert("Enter infix");
    
    // Simple mock logic for display
    document.getElementById('out-infix').innerText = input;
    document.getElementById('out-postfix').innerText = "Converted Postfix"; 
    document.getElementById('out-prefix').innerText = "Converted Prefix";
}

/* --- QUEUE LOGIC --- */
let myQueue = [];
function renderQueue() {
    const c = document.getElementById('queue-visual');
    c.innerHTML = '';
    myQueue.forEach(i => {
        const d = document.createElement('div');
        d.className = 'data-item'; d.innerText = i; c.appendChild(d);
    });
}
function queueEnqueue() {
    const val = document.getElementById('queue-input').value;
    if(val === '') return alert("Enter value");
    myQueue.push(val);
    document.getElementById('queue-input').value = '';
    renderQueue();
}
function queueDequeue() {
    if(myQueue.length === 0) return alert("Empty");
    myQueue.shift();
    renderQueue();
}

/* =========================================
   PART 2: ALGORITHMS (Run Buttons)
   ========================================= */
function runAlgo(id) {
    let outputBox = document.getElementById(`output-${id}`);
    outputBox.innerHTML = '<span style="color: yellow;">Running...</span>';
    setTimeout(() => {
        try {
            switch(id) {
                case 1: 
                    let n1 = prompt("Enter num1:"); let n2 = prompt("Enter num2:");
                    if(n1 && n2) outputBox.innerText = `Sum: ${Number(n1)+Number(n2)}`;
                    else outputBox.innerText = "Cancelled"; break;
                case 2: 
                    let n = prompt("Enter num:");
                    if(n) outputBox.innerText = `${n} is ${n%2==0?'Even':'Odd'}`;
                    else outputBox.innerText = "Cancelled"; break;
                case 3:
                    let a=prompt("a:"), b=prompt("b:"), c=prompt("c:");
                    if(a && b && c) outputBox.innerText = `Max: ${Math.max(a,b,c)}`;
                    else outputBox.innerText = "Cancelled"; break;
                case 4:
                    let f = prompt("Enter num:");
                    let fact = 1; for(let i=1;i<=f;i++) fact*=i;
                    outputBox.innerText = `Factorial: ${fact}`; break;
                case 5:
                    let fib = prompt("Terms:"); let arr=[0,1];
                    for(let i=2;i<fib;i++) arr.push(arr[i-1]+arr[i-2]);
                    outputBox.innerText = `Series: ${arr.slice(0,fib).join(',')}`; break;
                case 6:
                    let p=prompt("Num:"); let isP=true;
                    for(let i=2;i<p;i++) if(p%i==0) isP=false;
                    outputBox.innerText = isP ? "Prime" : "Not Prime"; break;
                case 7:
                    let s1=prompt("A:"), s2=prompt("B:");
                    outputBox.innerText = `Swapped: A=${s2}, B=${s1}`; break;
                case 8:
                    let t=prompt("Find in [10,20,30]:");
                    outputBox.innerText = [10,20,30].includes(Number(t)) ? "Found" : "Not Found"; break;
                case 9:
                    let s=prompt("String:");
                    outputBox.innerText = s.split('').reverse().join(''); break;
                case 10:
                    let r=prompt("Radius:");
                    outputBox.innerText = `Area: ${(3.14*r*r).toFixed(2)}`; break;
            }
        } catch(e) { outputBox.innerText = "Error"; }
    }, 200);
}
function runPseudo(id) { runAlgo(id); } // Maps to same logic

/* =========================================
   PART 3: BINARY SEARCH TREE VISUALIZATION
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

// Insert Logic
function insertNode(root, val, x, y, level) {
    if(!root) return new VisualNode(val, x, y);
    
    // Offset gets smaller as we go deeper
    const offset = 200 / (level + 1); 
    
    if(val < root.val) {
        root.left = insertNode(root.left, val, x - offset, y + 60, level + 1);
    } else {
        root.right = insertNode(root.right, val, x + offset, y + 60, level + 1);
    }
    return root;
}

function bstInsert() {
    const input = document.getElementById('bst-val');
    const val = parseInt(input.value);
    if(isNaN(val)) return alert("Enter a number");
    
    bstRoot = insertNode(bstRoot, val, canvas.width / 2, 50, 1);
    input.value = '';
    drawTree();
    logBST(`Inserted ${val}`);
}

// Drawing Logic
function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(bstRoot) drawNode(bstRoot);
}

function drawNode(node) {
    if(node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.strokeStyle = "#a18cd1";
        ctx.stroke();
        drawNode(node.left);
    }
    if(node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.strokeStyle = "#a18cd1";
        ctx.stroke();
        drawNode(node.right);
    }

    // Draw Circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff9a9e"; // Pink Node
    ctx.fill();
    ctx.stroke();

    // Draw Text
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.val, node.x, node.y);
}

// Search Logic (Visual Animation)
async function searchNode(node, val) {
    if(!node) return false;
    
    highlightNode(node, "yellow");
    await new Promise(r => setTimeout(r, 500)); // Animation delay

    if(node.val === val) {
        highlightNode(node, "#27c93f"); // Green found
        return true;
    }
    
    if(val < node.val) return await searchNode(node.left, val);
    else return await searchNode(node.right, val);
}

async function bstSearch() {
    const val = parseInt(document.getElementById('bst-val').value);
    if(isNaN(val)) return alert("Enter value");
    drawTree(); // Reset colors
    const found = await searchNode(bstRoot, val);
    logBST(found ? `Found ${val}!` : `${val} not found.`);
}

// Inorder Traversal (Visual)
async function inorderTraverse(node, list) {
    if(!node) return;
    await inorderTraverse(node.left, list);
    
    highlightNode(node, "#00ccff"); // Blue highlight
    list.push(node.val);
    await new Promise(r => setTimeout(r, 500));
    
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
    logBST("Tree Cleared");
}

function highlightNode(node, color) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fillText(node.val, node.x, node.y);
}

function logBST(msg) {
    document.getElementById('bst-message').innerText = msg;
}