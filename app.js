const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.querySelector(".js-range");
const mode = document.querySelector(".js-mode");
const saveBtn = document.querySelector(".js-save");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

function startPainting(){
    const x = event.offsetX;
    const y = event.offsetY;
    
    ctx.moveTo(x, y);
    ctx.beginPath();

    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    if(!painting){
        //
    } else {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }


}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL(); // "image/jpeg"
    const link = document.createElement("a");
    link.href = image; // href: link
    link.download = "PaintJS[🎨]"; // download: filename
    link.click();
}

function init(){
    // console.log(Array.from(colors)); // change type to array
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
        );

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE; // pixel modifier에 size를 줘야 함

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;

    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    }

    if(range){
        range.addEventListener("input", handleRangeChange);
    }

    if(mode){
        mode.addEventListener("click", handleModeClick);
    }

    if(saveBtn){
        saveBtn.addEventListener("click", handleSaveClick);
    }
}

init();