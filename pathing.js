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
let pathCache = []; //Direct path from start to goal
let lockout = false; //Disable all buttons and user input during this state, causes issues if during visualization something like reset is pressed


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
    selected = e.id;
}

function reset(){
    for(let i = 0; i < 9; i++){
        board[i] = [];
        for(let j = 0; j < 21; j++){
            document.getElementById(String(i)+"x"+String(j)).style.backgroundColor = 'white';
        }
    }
}

function solve(){
    //populate board array with the proper values
    //Determine the selected algo
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
    if(document.getElementById("algo").value.toString == "DFS"){
        DFS(y, x);
    }
    else if(document.getElementById("algo").value.toString == "BFS"){

    }
    else if(document.getElementById("algo").value.toString == "A*"){
        
    }
    else if(document.getElementById("algo").value.toString == "Dijkstra"){
        
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

function visualize(index){//Show path traversed by the algorithm
    if(index >= searchCache.length){
        setTimeout(() => showPath(pathCache.length-1), 200);
        return;
    }
    setTimeout(() => visualize(index+1), 100);
    document.getElementById(searchCache[index]).style.backgroundColor = "DodgerBlue";
}

function showPath(index){ //Show path from start to goal without branches
    if(index < 0){
        return;
    }
    setTimeout(() => showPath(index-1), 100);
    document.getElementById(pathCache[index]).style.backgroundColor = "MediumSeaGreen";
}

function BFS(){

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
    DFS(y, x+1);
    DFS(y+1, x);
    DFS(y, x-1);
    DFS(y-1, x);
    if(!found){
        pathCache.pop();
    }
    

}

