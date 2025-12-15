/* =========================================
   FULLY CORRECTED script.js
   ========================================= */

/* ---------- ARRAY + BINARY SEARCH ---------- */
let myArray = [];

function renderArray() {
    const c = document.getElementById("array-visual");
    c.innerHTML = "";
    myArray.forEach(v => {
        const d = document.createElement("div");
        d.className = "data-item";
        d.textContent = v;
        c.appendChild(d);
    });
}

function arrayInsert() {
    const i = document.getElementById("array-input");
    if (!i.value) return;
    myArray.push(Number(i.value));
    i.value = "";
    renderArray();
}

function arrayDelete() {
    const i = document.getElementById("array-input");
    const idx = myArray.indexOf(Number(i.value));
    if (idx >= 0) myArray.splice(idx, 1);
    i.value = "";
    renderArray();
}

function runBinarySearch() {
    const t = Number(document.getElementById("bs-input").value);
    myArray.sort((a,b)=>a-b);
    renderArray();
    let l=0,r=myArray.length-1;
    while(l<=r){
        let m=Math.floor((l+r)/2);
        if(myArray[m]===t){
            alert("Found!");
            return;
        }
        myArray[m]<t?l=m+1:r=m-1;
    }
    alert("Not found");
}

/* ---------- STACK ---------- */
let stack=[];
function renderStack(){
    const c=document.getElementById("stack-visual");
    c.innerHTML="";
    [...stack].reverse().forEach(v=>{
        const d=document.createElement("div");
        d.className="data-item";
        d.textContent=v;
        c.appendChild(d);
    });
}
function stackPush(){
    const i=document.getElementById("stack-input");
    if(i.value){stack.push(i.value);i.value="";renderStack();}
}
function stackPop(){
    stack.pop();renderStack();
}

/* ---------- QUEUE ---------- */
let queue=[];
function renderQueue(){
    const c=document.getElementById("queue-visual");
    c.innerHTML="";
    queue.forEach(v=>{
        const d=document.createElement("div");
        d.className="data-item";
        d.textContent=v;
        c.appendChild(d);
    });
}
function queueEnqueue(){
    const i=document.getElementById("queue-input");
    if(i.value){queue.push(i.value);i.value="";renderQueue();}
}
function queueDequeue(){
    queue.shift();renderQueue();
}

/* ---------- INFIX → POSTFIX / PREFIX ---------- */
function prec(o){return {"+":1,"-":1,"*":2,"/":2,"^":3}[o]||0;}

function infixToPostfix(exp){
    let s=[],out="";
    for(let c of exp.replace(/\s+/g,"")){
        if(/[a-zA-Z0-9]/.test(c)) out+=c;
        else if(c==="(") s.push(c);
        else if(c===")"){
            while(s.length&&s.at(-1)!=="(") out+=s.pop();
            s.pop();
        } else {
            while(s.length&&prec(s.at(-1))>=prec(c)) out+=s.pop();
            s.push(c);
        }
    }
    while(s.length) out+=s.pop();
    return out;
}

function infixToPrefix(exp){
    let r=[...exp].reverse().map(c=>c==="("?")":c===")"?"(":c).join("");
    return [...infixToPostfix(r)].reverse().join("");
}

function convertExpression(){
    const i=document.getElementById("infix-input").value;
    document.getElementById("out-postfix").textContent=infixToPostfix(i);
    document.getElementById("out-prefix").textContent=infixToPrefix(i);
}

/* ---------- GIRLY BST VISUALIZATION ---------- */
let canvas,ctx,root=null,busy=false;

class Node{
    constructor(v,x,y){this.v=v;this.x=x;this.y=y;this.l=null;this.r=null;}
}

function insert(n,v,x,y,l){
    if(!n) return new Node(v,x,y);
    const o=180/l;
    v<n.v?n.l=insert(n.l,v,x-o,y+60,l+1):n.r=insert(n.r,v,x+o,y+60,l+1);
    return n;
}

function bstInsert(){
    const v=+document.getElementById("bst-val").value;
    if(isNaN(v))return;
    root=insert(root,v,canvas.width/2,40,1);
    draw();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(root) drawNode(root);
}

function drawNode(n){
    if(n.l){line(n,n.l);drawNode(n.l);}
    if(n.r){line(n,n.r);drawNode(n.r);}
    circle(n,"#ff9a9e");
}

function line(a,b){
    ctx.strokeStyle="#f4a6c1";
    ctx.beginPath();
    ctx.moveTo(a.x,a.y);
    ctx.lineTo(b.x,b.y);
    ctx.stroke();
}

function circle(n,c){
    ctx.fillStyle=c;
    ctx.beginPath();
    ctx.arc(n.x,n.y,20,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle="white";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(n.v,n.x,n.y);
}

async function search(n,v){
    if(!n) return false;
    circle(n,"#f7b2cc");
    await new Promise(r=>setTimeout(r,400));
    if(n.v===v){circle(n,"#ff6f91");return true;}
    return v<n.v?search(n.l,v):search(n.r,v);
}

async function bstSearch(){
    if(busy) return;
    busy=true;
    draw();
    await search(root,+document.getElementById("bst-val").value);
    busy=false;
}

window.onload=()=>{
    canvas=document.getElementById("bst-canvas");
    ctx=canvas.getContext("2d");
};
