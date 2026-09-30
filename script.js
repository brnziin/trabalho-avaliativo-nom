const ver = document.querySelectorAll('.ver');
const navegarBtns = document.querySelectorAll('.navegar-btn');
const escuroBtn = document.querySelector('#escuro');

const btnBuscar = document.querySelector('#btn-buscar');
const filaTempo = document.querySelector('#fila-tempo');
const cronometroDisplay = document.querySelector('#cronometro');
const modoBtns = document.querySelectorAll('.modo-btn');

const lojaItems = document.querySelectorAll('.loja-item');
const creditDisplay = document.querySelector('#creditos');
const msgCompra = document.querySelector('#mensagem-compra');

const carroGaragem = document.querySelector('#carro-garagem');
const itensGaragem = document.querySelectorAll('.item-garagem');
const inputName = document.querySelector('#input-name');
const displayNome = document.querySelector('#display-nome');
const inputSenha = document.querySelector('#input-senha');
const btnMostrarSenha = document.querySelector('#btn-mostrar-senha');



navegarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ver.forEach(v => {
            v.classList.remove('active');
            v.classList.add('hidden');
        });
        
        const targetId = btn.getAttribute('clicar');
        const targetView = document.querySelector(`#${targetId}`);
        
        targetView.classList.remove('hidden');
        targetView.classList.add('active');
    });
});

escuroBtn.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
});

modoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modoBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});

lojaItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('neon-hover');
    });
    
    item.addEventListener('mouseout', () => {
        item.classList.remove('neon-hover');
    });
});

inputName.addEventListener('input', () => { 
    const nomeDigitado = inputName.value;
    
    if(nomeDigitado.trim() === '') {
        displayNome.innerText = 'Jogador';
    } else {
        displayNome.innerText = nomeDigitado;
    }
});

itensGaragem.forEach(item => {
    item.addEventListener('click', () => {
        const novaImagem = item.getAttribute('data-img');
        carroGaragem.src = novaImagem; 
    });
});

btnMostrarSenha.addEventListener('click', () => {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
        btnMostrarSenha.innerText = 'Ocultar Senha';
    } else {
        inputSenha.type = 'password';
        btnMostrarSenha.innerText = 'Mostrar Senha';
    }
});

let creditos = 1500;

function verificarCreditos() {
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    botoesComprar.forEach(btn => {
        const precoItem = parseInt(btn.parentElement.getAttribute('data-price'));
        
        if (creditos < precoItem) {
            btn.disabled = true;
            btn.innerText = 'Sem Saldo';
        } else {
            btn.disabled = false;
            btn.innerText = 'Comprar';
        }
    });
}
verificarCreditos();

const botoesComprar = document.querySelectorAll('.btn-comprar');
botoesComprar.forEach(btn => {
    btn.addEventListener('click', () => {
        const preco = parseInt(btn.parentElement.getAttribute('data-price'));
        
        if(creditos >= preco) {
            creditos -= preco;
            creditDisplay.innerText = creditos;
            verificarCreditos();

            msgCompra.classList.remove('hidden');
            msgCompra.innerText = `Compra finalizada! Você gastou ${preco} CR.`;

            setTimeout(() => {
                msgCompra.classList.add('hidden');
            }, 3000);
        }
    });
});

let tempoFila = 0;
let cronometroInterval;
let buscando = false;

btnBuscar.addEventListener('click', () => {
    if (buscando === false) {
        buscando = true;
        btnBuscar.innerText = 'Cancelar Busca';
        btnBuscar.style.background = '#ff0000';
        filaTempo.classList.remove('hidden');
        
        cronometroInterval = setInterval(() => {
            tempoFila++;
            cronometroDisplay.innerText = tempoFila;
        }, 1000);

    } else {
        buscando = false;
        btnBuscar.innerText = 'Procurar Partida';
        btnBuscar.style.background = '#e94560';
        filaTempo.classList.add('hidden');
        
        clearInterval(cronometroInterval);
        tempoFila = 0;
        cronometroDisplay.innerText = tempoFila;
    }
});