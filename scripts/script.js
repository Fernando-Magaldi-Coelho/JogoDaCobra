const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d"); //contexto
const coin = new Audio('./assents/aud/coin.wav')
const Start = new Audio('./assents/aud/start.mp3')
const perdeu = new Audio('./assents/aud/lose.wav')

const pontos = document.querySelector('.valor_pontos')
const PontosFinal = document.querySelector('.pontos_final > span')
const menu = document.querySelector(".menu")
const BtnPlay = document.querySelector(".btn-play") 


function getDificuldadeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const dificuldade = urlParams.get('dificuldade');
    return dificuldade ? parseInt(dificuldade) : 300; // Valor padrão: 300
}

// Configurar a dificuldade com base no valor da URL
const dificuldade = getDificuldadeFromURL();

// Agora você pode usar a variável 'dificuldade' conforme necessário no seu código JavaScript para o jogo.
console.log('Dificuldade configurada:', dificuldade);

const size = 30;

/*
ctx.fillStyle = "red"; //funciona como style do css em si msm
ctx.fillRect(270, 280,/*<- Do ctx */ //50, 100 /*<- Do quadrado*/ ) //metade do x e y para ficar no meio

let cobra = [ //Onde essa array vai estar posicionada 
    { x: 270, y:240 },
    { x: 300, y:240 },
    { x: 330, y:240 }
];

const MostrarPontos = () =>{
    pontos.innerText = parseInt(pontos.innerText) + 10 //Faz a operação matemática OU PODE FAZER  +pontos.innerText + 10
}


const randomNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}


const randomPosition = (max, min) => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / size) * size //Faz com que n quebre nos quadrados
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})` //sim são duas crases n me pergunte o por q mas é
}


let comida = {
    x : randomPosition(0, 570), 
    y: randomPosition(0, 570),
    color: randomColor()
}

let direction;
let LoopId;

const DrawComida = () => {

    const {x, y, color} = comida

    ctx.shadowColor = color
    ctx.shadowBlur = 10

    ctx.fillStyle = comida.color
    ctx.fillRect(comida.x, comida.y, size, size)

    ctx.shadowBlur = 0 //precisa resetar o blur apos a criação da comida se n vai em tds os elementos
}


const DrawCobra = () => {
    ctx.fillStyle = "red";
    // ctx.fillRect(cobra[0].x, cobra[0].y, size, size)

    cobra.forEach((position, index) => {

        if(index == cobra.length - 1 /*Posição se a cobra tiver com a largura -1 (cabeça) vais ser tal cor*/){
            ctx.fillStyle = "yellow";
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveCobra = () => {
    if (!direction) return; // Se direction for undefined, não permita o movimento da cobra
    const head = cobra[cobra.length - 1];

    if (direction == "right") {
        cobra.push({ x: head.x + size, y: head.y });
    }

    if (direction == "left") {
        cobra.push({ x: head.x - size, y: head.y });
    }

    if (direction == "down") {
        cobra.push({ x: head.x, y: head.y + size });
    }

    if (direction == "up") {
        cobra.push({ x: head.x, y: head.y - size });
    }

    cobra.shift();
};


const Fundo = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";

    for (let i = size; i < canvas.width; i += size) {
    
        ctx.beginPath() //Significa q quando desenhar vai começar outro
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)

        ctx.stroke()

        
        ctx.beginPath() //Significa q quando desenhar vai começar outro
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)

        ctx.stroke()

    }

}

const CheckComeu = () => {
    const head = cobra[cobra.length - 1]

    if (head.x == comida.x && head.y == comida.y){
        MostrarPontos()
        cobra.push(head)
        coin.play()

        // comida.x = randomPosition(0, 570), 
        // comida.y= randomPosition(0, 570),
        // comida.color= randomColor()

        let x = randomPosition()
        let y = randomPosition()

        while (cobra.find((position) => position.x == x && position.y == y)){
             x = randomPosition()
             y = randomPosition()
        }
        comida.x = x
        comida.y = y
        comida.color = randomColor()
    }
}


let audioReproduzido = false;

const CheckCollision = () => {
    const head = cobra[cobra.length - 1]
    const limite = canvas.width - size
    const neckLimit = cobra.length - 2
    const Parede = head.x < 0 || head.x > limite || head.y < 0 || head.y > limite  
    
    const suicidio = cobra.find((position, index) => {
        return index < neckLimit && position.x == head.x && position.y == head.y
    })

    if (Parede || suicidio){
        GameOver();
        
        // Verifique se o áudio ainda não foi reproduzido
        if (!audioReproduzido) {
            perdeu.play();
            audioReproduzido = true; // Defina a variável de controle como true para evitar a reprodução repetida
        }
    }
}

BtnPlay.addEventListener('click', () => {
    audioReproduzido = false; // Redefina a variável quando o jogo reiniciar
});



const GameOver = () =>{
    direction = undefined

   

    menu.style.display = "flex"
    PontosFinal.innerText = pontos.innerText
    canvas.style.filter = "blur(2px)"

    mover = document.addEventListener('keydown', ({key}) => {
        if(key == "ArrowRight" && direction != "left"){
            direction = undefined;
        }
    
        if(key == "ArrowLeft" && direction != "right"){
            direction = undefined;
        }
    
        if(key == "ArrowUp" && direction != "down"){
            direction = undefined;
        }
    
        if(key == "ArrowDown" && direction != "up"){
            direction = undefined;
        }
    })
}




const gameLoop = () => {

    clearInterval(LoopId)

    

    ctx.clearRect(0, 0, 600, 600) //Vai limpar do 0 até o 0 e o 600 da lagura e altura do quadrado
    
    Fundo()
    DrawComida()
    moveCobra()
    DrawCobra()
    CheckComeu()
    CheckCollision()

    

    let = LoopId = setTimeout(() => {

        gameLoop()

    }, dificuldade)

    
}


gameLoop() //COMO O FUNDO LIMPA O CANVA ELE LINPA O GAME LOOP E VICE VERSA ENTÃO O FUNDO TEM Q IR DENTRO DO LOOP DEPOIS DE LIMPAR ELE CRIA


let mover = document.addEventListener('keydown', ({key}) => {
    if(key == "ArrowRight" && direction != "left"){
        direction = "right";
    }

    if(key == "ArrowLeft" && direction != "right"){
        direction = "left";
    }

    if(key == "ArrowUp" && direction != "down"){
        direction = "up";
    }

    if(key == "ArrowDown" && direction != "up"){
        direction = "down";
    }
    
})


BtnPlay.addEventListener('click', () => {
    perdeu.pause()
    perdeu.currentTime = 0 //Faz o audio reiniciar
    
    Start.play()
    


    pontos.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    


    mover = document.addEventListener('keydown', ({key}) => {
        if(key == "ArrowRight" && direction != "left"){
            direction = "right";
        }
    
        if(key == "ArrowLeft" && direction != "right"){
            direction = "left";
        }
    
        if(key == "ArrowUp" && direction != "down"){
            direction = "up";
        }
    
        if(key == "ArrowDown" && direction != "up"){
            direction = "down";
        }
    })

    cobra = [ //Onde essa array vai estar posicionada 
    { x: 270, y:240 },
    { x: 300, y:240 },
    { x: 330, y:240 }
]

comida = {
    x : randomPosition(0, 570), 
    y: randomPosition(0, 570),
    color: randomColor()
}

})


