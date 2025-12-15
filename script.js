/* =========================================
   FINAL FIXED script.js
   Data Structures, Algorithms, BST (Girly Theme)
   ========================================= */

/* =========================================
   PART 1: ARRAY + BINARY SEARCH
   ========================================= */
let myArray = [];

function renderArray() {
    const c = document.getElementById('array-visual');
    c.innerHTML = '';
    myArray.forEach(v => {
        const d = document.createElement('div');
        d.className = 'data-item';
        d.innerText = v;
        c.appendChild(d);
    });
}

function arrayInsert() {
    const i = document.getElementById('array-input');
    if (!i.value) return alert("Enter value");
    myArray.push(Number(i.value));
    i.value = '';
    renderArray();
}

function arrayDelete() {
    const i = document.getElementById('array-input');
    const idx = myArray.indexOf(Number(i.value));
    if (idx === -1) return alert("Not found");
    myArray.splice(idx, 1);
    i.value = '';
    renderArray();
}

function runBinarySearch() {
    const t = Number(document.getElementById('bs-input').value);
    if (isNaN(t)) return alert("Enter number");

    myArray.sort((a, b) => a - b);
    renderArray();

    let l = 0, r = myArray.length - 1;
    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        if (myArray[m] === t) return alert("Found!");
        myArray[m] < t ? l = m + 1 : r = m - 1;
    }
    alert("Not found");
}

/* =========================================
   PART 2: STACK
   ========================================= */
let stack = [];
const MAX_STACK = 5;

function renderStack() {
    const c = document.getElementById('stack-visual');
    c.innerHTML = '';
    [...stack].reverse().forEach(v => {
        const d = document.createElement('div');
        d.className = 'data-item';
        d.innerText = v;
        c.appendChild(d);
    });
}

function stackPush() {
    if (stack.length >= MAX_STACK) return alert("Stack Overflow");
    const i = document.getElementById('stack-input');
    if (!i.value) return;
    stack.push(i.value);
    i.value = '';
    renderStack();
}

function stackPop() {
    if (!stack.length) return alert("Stack Underflow");
    stack.pop();
    renderStack();
}

function stackPeek() {
    alert(stack.length ? stack[stack.length - 1] : "Stack Empty");
}

/* =========================================
   PART 3: QUEUE
   ========================================= */
let queue = [];

function renderQueue() {
    const c = document.getElementById('queue-visual');
    c.innerHTML = '';
    queue.forEach(v => {
        const d = document.createElement('div');
        d.className = 'data-item';
        d.innerText = v;
        c.appendChild(d);
    });
}

function queueEnqueue() {
    const i = document.getElementById('queue-input');
    if (!i.value) return;
    queue.push(i.value);
    i.value = '';
    renderQueue();
}

function queueDequeue() {
    if (!queue.length) return alert("Queue Empty");
    queue.shift();
    renderQueue();
}

/* =========================================
   PART 4: ALGORITHMS (RUN BUTTONS)
   ========================================= */
function runAlgo(id) {
    const out = document.getElementById(`output-${id}`);
    out.innerText = "Running...";

    setTimeout(() => {
        switch (id) {
            case 1: {
                let a = +prompt("A"), b = +prompt("B");
                out.innerText = `Sum: ${a + b}`; break;
            }
            case 2: {
                let n = +prompt("Number");
                out.innerText = n % 2 === 0 ? "Even" : "Odd"; break;
            }
            case 3: {
                let a = +prompt("A"), b = +prompt("B"), c = +prompt("C");
                out.innerText = `Max: ${Math.max(a, b, c)}`; break;
            }
            case 4: {
                let f = +prompt("Number"), fact = 1;
                for (let i = 1; i <= f; i++) fact *= i;
                out.innerText = `Factorial: ${fact}`; break;
            }
            case 5: {
                let t = +prompt("Terms"), arr = [0, 1];
                for (let i = 2; i < t; i++) arr.push(arr[i - 1] + arr[i - 2]);
                out.innerText = arr.slice(0, t).join(", "); break;
            }
            case 6: {
                let p = +prompt("Number"), prime = p > 1;
                for (let i = 2; i < p; i++) if (p % i === 0) prime = false;
                out.innerText = prime ? "Prime" : "Not Prime"; break;
            }
            case 7: {
                let a = prompt("A"), b = prompt("B");
                out.innerText = `A=${b}, B=${a}`; break;
            }
            case 8: {
                let t = +prompt("Find in [10,20,30]");
                out.innerText = [10, 20, 30].includes(t) ? "Found" : "Not Found"; break;
            }
            case 9: {
                let s = prompt("String");
                out.innerText = s.split('').reverse().join(''); break;
            }
            case 10: {
                let r = +prompt("Radius");
                out.innerText = `Area: ${(Math.PI * r * r).toFixed(2)}`; break;
            }
        }
    }, 200);
}
function runPseudo(id) { runAlgo(id); }

/* =========================================
   PART 5: INFIX → POSTFIX / PREFIX
   ========================================= */
function prec(o) { return { '+':1,'-':1,'*':2,'/':2,'^':3 }[o] || 0; }

function infixToPostfix(exp) {
    let s = [], out = '';
    for (let c of exp.replace(/\s+/g,'')) {
        if (/[a-zA-Z0-9]/.test(c)) out += c;
        else if (c === '(') s.push(c);
        else if (c === ')') {
            while (s.length && s.at(-1) !== '(') out += s.pop();
            s.pop();
        } else {
            while (s.length && prec(s.at(-1)) >= prec(c)) out += s.pop();
            s.push(c);
        }
    }
    while (s.length) out += s.pop();
    return out;
}

function infixToPrefix(exp) {
    let r = [...exp].reverse().map(c => c === '(' ? ')' : c === ')' ? '(' : c).join('');
    return [...infixToPostfix(r)].reverse().join('');
}

function convertExpression() {
    const i = document.getElementById('infix-input').value;
    document.getElementById('out-postfix').innerText = infixToPostfix(i);
    document.getElementById('out-prefix').innerText = infixToPrefix(i);
}

/* =========================================
   PART 6: BST (PINK THEME)
   ========================================= */
let canvas, ctx, root = null, busy = false;

class Node {
    constructor(v, x, y) {
        this.v = v; this.x = x; this.y = y;
        this.l = null; this.r = null;
    }
}

function insert(n, v, x, y, l) {
    if (!n) return new Node(v, x, y);
    const o = 180 / l;
    v < n.v ? n.l = insert(n.l, v, x - o, y + 60, l + 1)
            : n.r = insert(n.r, v, x + o, y + 60, l + 1);
    return n;
}

function bstInsert() {
    const v = +document.getElementById('bst-val').value;
    if (isNaN(v)) return;
    root = insert(root, v, canvas.width / 2, 50, 1);
    draw();
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (root) drawNode(root);
}

function drawNode(n) {
    if (n.l) { line(n,n.l); drawNode(n.l); }
    if (n.r) { line(n,n.r); drawNode(n.r); }
    circle(n, '#ff9a9e');
}

function line(a,b) {
    ctx.strokeStyle = '#f4a6c1';
    ctx.beginPath();
    ctx.moveTo(a.x,a.y);
    ctx.lineTo(b.x,b.y);
    ctx.stroke();
}

function circle(n,c) {
    ctx.fillStyle=c;
    ctx.beginPath();
    ctx.arc(n.x,n.y,20,0,Math.PI*2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle='white';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(n.v,n.x,n.y);
}

async function search(n,v) {
    if (!n) return false;
    circle(n,'#f7b2cc');
    await new Promise(r=>setTimeout(r,400));
    if (n.v === v) { circle(n,'#ff6f91'); return true; }
    return v < n.v ? search(n.l,v) : search(n.r,v);
}

async function bstSearch() {
    if (busy) return;
    busy = true;
    draw();
    await search(root, +document.getElementById('bst-val').value);
    busy = false;
}

async function inorder(n, list) {
    if (!n) return;
    await inorder(n.l, list);
    circle(n, '#ffc2d1');
    list.push(n.v);
    await new Promise(r=>setTimeout(r,300));
    await inorder(n.r, list);
}

async function bstInorder() {
    draw();
    let list = [];
    await inorder(root, list);
    document.getElementById('bst-message').innerText =
        `Inorder: ${list.join(' -> ')}`;
}

window.onload = () => {
    canvas = document.getElementById('bst-canvas');
    ctx = canvas.getContext('2d');
};
