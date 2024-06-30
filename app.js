document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;

    let randomTime = Math.random() * 4000

    console.log(dino);
    console.log(grid); // just for checking whether the element is coming or not 


    function control(e){
        // if (e.keyCode === 32) { // ye vse old tarika h but ab new js h modern hum bhi new methods use krenege
        //     console.log("Jump");
        // }

        if (e.code === "Space") {
            console.log('jump');
            if (!isJumping) { // this is becasue if dinausur is currenty jmping we must not to jump another
                
                jump() // it will do 1 jump
            }
        }    

    }

    document.addEventListener('keydown',control)

    let position = 0; // initial position of dinausour 
    function jump() {
        
        isJumping = true;
        let count = 0;
        let timerId = setInterval(function (){
            
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function() {
                    if (count == 0) {
                        clearInterval(downTimerId)
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position = position * gravity
                    dino.style.bottom = position + 'px'
                },20)
            }
            // move up
            position += 30;
            count++;
            position = position * gravity;
            dino.style.bottom = position +'px'
            
        },20)
    }


    function generateObstacles(){
        if(!isGameOver){

                let obstaclePosition = 1000;
                const obstacle = document.createElement('div')
                obstacle.classList.add('obstacle')
                grid.appendChild(obstacle);
                obstacle.style.left = obstaclePosition + 'px'
                
                let timerId = setInterval(function (){
        
                    if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                        clearInterval(timerId)
                        alert.innerHTML = 'Game Over'
                        isGameOver = true;
                        // remove all children 
                        while (grid.firstChild) {
                            grid.removeChild(grid.lastChild)
                        }
                    }
                    obstaclePosition -= 10;
                    obstacle.style.left = obstaclePosition + 'px'
                    
                }, 20 )
        
        
        
                    setTimeout(generateObstacles, 4000);
                
        }
                
    }
            generateObstacles();
})