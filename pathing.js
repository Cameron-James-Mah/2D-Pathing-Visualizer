//0 is default //1 is wall //2 is start //3 is goal
let board = [];
for(let i = 0; i < 9; i++){
    board[i] = [];
    for(let j = 0; j < 21; j++){
        board[i][j] = 0;
    }
}

let selected = "";
visitedSet = new Set();
let searchCache = []; //algorithm searched path from start to goal
let found = false;
let pathCache = []; //Direct playback path from start to goal
let lockout = false; //Disable all buttons and user input during this state, causes issues if during visualization something like reset is pressed
let speed = 200; //Speed selected in selection box, affects visualize speed of algorithm. Used in setTimeout call so higher value = slower speed.
let speed2 = 100;
let pathBFS = []; //Path for BFS, I think just have an arr of objects with ref to current cell value and prev cell value


//User will click button to select what the cell will be then click the cell, default will be passable
//maybe deal only in colors, default is white(passable) if bg color is white then turn
//Validate cell value
function validate(val){
    if(val.value.toString().length > 0){
        val.value = val.value.substr(1,2);
        return;
    }
    //alert(val);
    //val.style.backgroundColor = "green";
    //val.value = "";
}

function colorChanger(e){
    //alert(1);
    if(selected == "default"){//white
        e.style.backgroundColor = 'white';
    }
    else if(selected == "wall"){//black
        e.style.backgroundColor = 'black';
    }
    else if(selected == "start"){//green
        e.style.backgroundColor = 'green';
    }
    else if(selected == "goal"){//red
        e.style.backgroundColor = 'red';
    }
    validate(e);
    
    
}

function btnSelect(e){
    if(lockout){
        return;
    }
    selected = e.id;
    document.getElementById("default").style.backgroundColor = "white";
    document.getElementById("wall").style.backgroundColor = "white";
    document.getElementById("start").style.backgroundColor = "white";
    document.getElementById("goal").style.backgroundColor = "white";
    
    e.style.backgroundColor = "grey";
}

function reset(){
    if(lockout){
        return;
    }
    //alert(lockout);
    for(let i = 0; i < 9; i++){
        board[i] = [];
        for(let j = 0; j < 21; j++){
            document.getElementById(String(i)+"x"+String(j)).style.backgroundColor = 'white';
        }
    }
}

function redo(){//Reset board except walls
    if(lockout){
        return;
    }
    //alert(lockout);
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 21; j++){
            if(board[i][j] != 1){
                document.getElementById(String(i)+"x"+String(j)).style.backgroundColor = 'white';
            }
        }
    }
}

function solve(){
    //populate board array with the proper values
    //Determine the selected algo
    if(lockout){
        return;
    }
    //alert(document.getElementById("speed").value);
    speed = 200;
    speed = speed/document.getElementById("speed").value;
    speed2 = 100;
    speed2 = speed2/document.getElementById("speed").value;
    lockout = true;
    let y = 0;
    let x = 0;
    let start = 0;
    let end = 0;
    for(let i = 0; i < 9; i++){
        board[i] = [];
        for(let j = 0; j < 21; j++){
            if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor == 'white'){
                //alert(String(i)+"x"+String(j));
                board[i][j] = 0; 
            }
            else if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor == 'black'){
                //alert(String(i)+"x"+String(j));
                board[i][j] = 1;
            }
            else if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor == 'green'){
                //alert(String(i)+"x"+String(j));
                board[i][j] = 2;
                y = i;
                x = j;
                start++;
            }
            else if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor == 'red'){
                //alert(String(i)+"x"+String(j));
                board[i][j] = 3;
                end++;
            }
            
        }
    }
    if(start == 0){
        alert("No start");
        return;
    }
    if(start > 1){
        alert("Too many starts");
        return;
    }
    if(end == 0){
        alert("No goal");
        return;
    }
    if(end > 1){
        alert("Too many goals");
        return;
    }
    //Reset for next search
    visitedSet.clear();
    clearArr(searchCache);
    clearArr(pathCache);
    found = false;
    if(document.getElementById("algo").value == "DFS"){
        DFS(y, x);
    }
    else if(document.getElementById("algo").value == "BFS"){
        BFS(y, x);
    }
    else if(document.getElementById("algo").value == "A*"){
        
    }
    else if(document.getElementById("algo").value == "Dijkstra"){
        
    }
    //DFS(y, x);
    if(found){//playback visualization
        //alert(1);
        visualize(0);
        //alert(showPath.length);
        //setTimeout(() => showPath(pathCache.length-1), 200);
    }
    else{
        alert("No valid path");
    }
}

function clearArr(arr){
    while(arr.length > 0){
        arr.pop();
    }
}
function copyArr(arr1, arr2){
    for(let i = 0; i < arr2.length; i++){
        arr1.push(arr2[i]);
    }
}
function visualize(index){//Show path traversed by the algorithm
    if(index >= searchCache.length){
        setTimeout(() => showPath(pathCache.length-1), speed);
        return;
    }
    setTimeout(() => visualize(index+1), speed);
    document.getElementById(searchCache[index]).style.backgroundColor = "DodgerBlue";
}


function cacheBFS(){
    
}
function showPath(index){ //Show path from start to goal without branches
    if(index < 0){
        lockout = false;
        return;
    }
    setTimeout(() => showPath(index-1), speed2);
    document.getElementById(pathCache[index]).style.backgroundColor = "MediumSeaGreen";
}

//Maybe objects into queue that hold ref to parent cord
function BFS(y, x){
    //alert(1);
    let que = [];
    let obj = {
        path: [],
        curr: y.toString()+"x"+x.toString(),
        y: y,
        x: x
    }
    //visitedSet.add()
    que.push(obj);
    while(que.length > 0){
        let qSize = que.length;
        for(let i = 0; i < qSize; i++){
            //visitedSet.add(que[i].curr);
            searchCache.push(que[i].curr);
            if(board[que[i].y][que[i].x] == 3){
                found = true;
                pathCache = que[i].path;
                //Append to playback arr, i think that que[i].path should have an arr of the path
                return;
            }
            //Kind of choppy way to do things below but I will fix later
            let temp = que[i].x;
            temp += 1;
            let tempPath = [];
            //tempPath = que[i].path;
            copyArr(tempPath, que[i].path);
            //Search adjacent cells
            if(que[i].x <= 19 && !visitedSet.has(que[i].y.toString()+"x"+temp.toString()) && board[que[i].y][temp] != 1){//right
                let tempObj = {
                    path: tempPath,
                    curr: que[i].y.toString()+"x"+temp.toString(),
                    y: que[i].y,
                    x: temp
                }
                visitedSet.add(tempObj.curr);
                tempObj.path.push(tempObj.curr);
                que.push(tempObj);
            }
            temp = que[i].y;
            temp += 1;
            if(que[i].y <= 7 && !visitedSet.has(temp.toString()+"x"+que[i].x.toString()) && board[temp][que[i].x] != 1){//down
                let tempObj = {
                    path: tempPath,
                    curr: temp.toString()+"x"+que[i].x.toString(),
                    y: temp,
                    x: que[i].x
                }
                visitedSet.add(tempObj.curr);
                tempObj.path.push(tempObj.curr);
                que.push(tempObj);
            }
            temp = que[i].x;
            temp -= 1;
            if(que[i].x >= 1 && !visitedSet.has(que[i].y.toString()+"x"+temp.toString()) && board[que[i].y][temp] != 1){//left
                let tempObj = {
                    path: tempPath,
                    curr: que[i].y.toString()+"x"+temp.toString(),
                    y: que[i].y,
                    x: temp
                }
                visitedSet.add(tempObj.curr);
                tempObj.path.push(tempObj.curr);
                que.push(tempObj);
            }
            temp = que[i].y;
            temp -= 1;
            if(que[i].y >= 1 && !visitedSet.has(temp.toString()+"x"+que[i].x.toString()) && board[temp][que[i].x] != 1){//up
                let tempObj = {
                    path: tempPath,
                    curr: temp.toString()+"x"+que[i].x.toString(),
                    y: temp,
                    x: que[i].x
                }
                visitedSet.add(tempObj.curr);
                tempObj.path.push(tempObj.curr);
                que.push(tempObj);
            }
        }
        que = que.slice(qSize);
        //alert(que.length);
    }
}



function DFS(y, x){
    //alert(visitedSet.size);
    let cord = y.toString()+"x"+x.toString();
    //alert(y+"."+x);
    if(y < 0 || x < 0 || y >= 9 || x >= 21 || visitedSet.has(cord) || board[y][x] == 1 || found){
        //alert(y+"."+x);
        return;
    }
    pathCache.push(cord);
    searchCache.push(cord);
    if(board[y][x] == 3){//solved
        //alert(1);
        found = true;
        //maybe call my visualization here
        return;
    }
    visitedSet.add(cord);
    //Search adjacent cells
    DFS(y, x+1);
    DFS(y+1, x);
    DFS(y, x-1);
    DFS(y-1, x);
    if(!found){//If reached here and not found goal then branch leads nowhere
        pathCache.pop();
    }
    

}

