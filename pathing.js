let board = [];
for(let i = 0; i < 9; i++){
    board[i] = [];
    for(let j = 0; j < 9; j++){
        board[i][j] = 0;
    }
}

let selected = "";




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
    
    
}

function btnSelect(e){
    selected = e.id;
}

