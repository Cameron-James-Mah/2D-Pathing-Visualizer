# 2D_Pathing_Visualizer
 
 
# Introduction
This is a 2d pathing algorithm visualizer made using html/css/javascript. This project is similar to my sudoku solver webpage project. It uses a similar grid and the same method of visualization. Algorithms implemented include DFS(Depth first search), BFS(Breadth first search), and A*. I have also included a couple other joke algorithms for fun. RFS(Random first search) and WFS(Worst first search). 

# Algorithms Implemented:
- DFS(Depth First Search):
DFS is an algorithm that follows a branch until it reaches a dead end or the goal cell. When reaching a dead end it will then backtrack its path until it can branch out again. This is a recursive algorithm.

- BFS(Breadth First Search): 
BFS is an algorithm that spreads from the start evenly flowing out. Visually I like to think of this like if you were to spill water on a flat surface or in a maze with a flat surface. The water would evenly flood out similar to how BFS would. 

- A*: 
A* is an algorithm that tries to be smarter about its path as oppose to BFS/DFS. A* considers an estimated cost from cells to the goal(this means the goal cell location must be known) and prioritzes traversing the lowest cost cells. Since this is a non-weighted graph I used the "Manhattan Distance" which is just simply cost = Δx+Δy.
The implementation of A* is similar to BFS except with a priority with lower cost cells.

- RFS(Random first search):
RFS is a joke algorithm that is similar to BFS but floods out randomly instead of evenly.

- WFS(Worst first search)
WFS is a joke algorithm that is the opposite of A*, prioritzing the highest cost cells.

# Algorithm Explanations:
- DFS
```
function DFS(y, x){
    let cord = y.toString()+"x"+x.toString();
    if(y < 0 || x < 0 || y >= 9 || x >= 21 || visitedSet.has(cord) || board[y][x] == 1 || found){//Boundary check
        return;
    }
    pathCache.push(cord);
    searchCache.push(cord);
    if(board[y][x] == 3){//solved
        found = true;
        return;
    }
    visitedSet.add(cord);
    DFS(y, x+1);
    DFS(y+1, x);
    DFS(y, x-1);
    DFS(y-1, x);
    if(!found){//If reached here and not found goal then branch leads nowhere
        pathCache.pop();
    }
  }
 ```
 DFS is a recursive algorithm often used in backtracking. Sometimes optimizations can be made to DFS depending on the situation but this is just a brute force DFS function.
 DFS functions are often very similar. They usually go as follows(with some variance of course steps 2 and 3 can be interchangeable)
 1. Boundary check
 2. Goal check
 3. Some operations
 4. Recursive calls

My function can be broken down as follows:
1. Boundary check(If cell is out of bounds of grid or has been visited or goal found)
2. Add cell to visited cells set and cache the coordinate(To be shown later in visualization).
3. Goal check
4. Recursive calls

If there is any confusion with this function then watching videos on recursion would be suggested. 
- BFS
```
function BFS(y, x){
    //alert(1);
    let que = [];
    let obj = {
        path: [y.toString()+"x"+x.toString()],
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
            copyArr(tempPath, que[i].path);
            //Search adjacent cells
            if(que[i].x <= 19 && !visitedSet.has(que[i].y.toString()+"x"+temp.toString()) && board[que[i].y][temp] != 1){//right
                let tempPath = [];
                copyArr(tempPath, que[i].path);
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
                let tempPath = [];
                copyArr(tempPath, que[i].path);
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
                let tempPath = [];
                copyArr(tempPath, que[i].path);
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
                let tempPath = [];
                copyArr(tempPath, que[i].path);
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
    }
}
```
BFS works by iterating through cells wave by wave as you expand further from the original cell. You can do this by 


# Conclousion

# Resources that helped
