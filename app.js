const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");


let painting = false;

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
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function init(){
    canvas.width = 700;
    canvas.height = 700; // pixel modifier에 size를 줘야 함

    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 2.5;

    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
    }
}

init();