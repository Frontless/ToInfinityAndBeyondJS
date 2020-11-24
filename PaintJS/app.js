const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const init = document.getElementById("jsInit");
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;


const INITIAL_COLOR = "#2c2c2c"
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
}
function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}
function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";        
    }
}
function handleCanvasClick(){
    if(filling)
    {
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();

}
function handleInitClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
if(init){
    init.addEventListener("click", handleInitClick);
}