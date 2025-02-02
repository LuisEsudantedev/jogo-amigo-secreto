//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Criamos um array vazio para armazenar os nomes dos amigos
let listaDeAmigos = [];

// Função para adicionar o nome à lista
function adicionarAmigo() {
    // Pegamos o input do usuário 
    let inputNome = document.getElementById("amigo");
    let nome = inputNome.value.trim(); // Pegamos o valor digitado e removemos espaços extras

    // Verificamos se o nome tem pelo menos 2 caracteres
    if (nome.length < 2) {
        alert("O nome precisa ter pelo menos 2 caracteres");
        return; // Se for menor, paramos a função aqui
    }

    // Verificamos se o nome já está na lista
    if (listaDeAmigos.includes(nome)) {
        alert("Este nome já foi adicionado");
        return; // Se o nome já estiver na lista, também paramos a função
    }

    // Se passou pela validações, adicionamos o nome ao array/lista
    listaDeAmigos.push(nome);

    // Chamamos a função para atualizar a lista na tela
    atualizarLista();

    // Limpamos o campo de input para facilitar a próxima entrada
    inputNome.value = "";
}

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    let ul = document.getElementById("listaAmigos"); // Pegamos a lista no HTML
    ul.innerHTML = ""; // Limpamos o conteúdo anterior pra evitar duplicações

    // Percorremos o array/lista de amigos e criamos um <li> para cada nome
    listaDeAmigos.forEach((amigo) => {
        let li = document.createElement("li"); // Criamos um novo elemento <li>
        li.textContent = amigo;  // Definimos o texto do <li> com o nome do amigo
        ul.appendChild(li); // Adicionamos o <li> à lista <ul>
    });
}

// Evento para permitir adicionar o nome ao pressionar o Enter
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Se a tecla pressionada for Enter
        adicionarAmigo(); // Chamamos a função para adicionar amigo
    }
});


// Função para realizar o sorteio
function sortearAmigo() {
    // Verificamos se há pelo menos 3 nomes na lista
    if (listaDeAmigos.length < 3) {
        alert("Adicione pelo menos 3 nomes para sortear.");
        return; // Se não houver, paramos a função aqui
    }

    // Criamos uma cópia da lista de amigos para embaralhar
    let listaSorteio = [...listaDeAmigos];
    let resultado = []; // Array para armazenar o resultado do sorteio

    // Enquanto a lista de sorteio não estiver vazia, continuamos sorteando
    for (let i = 0; i < listaDeAmigos.length; i++) {
        // Sorteia um amigo da lista (sem pegar o próprio nome)
        let sorteado = [];
        do {
            sorteado = listaSorteio[Math.floor(Math.random() * listaSorteio.length)];
        } while (sorteado === listaDeAmigos[i]); // Garantimos que a pessoa não tire a si mesma

        // Adicionamos o sorteio no resultado
        resultado.push({ amigo: listaDeAmigos[i], amigoSorteado: sorteado });

        // Removemos o nome do sorteado para não repetir
        listaSorteio = listaSorteio.filter(nome => nome !== sorteado);
    }

    // Exibimos o resultado na tela
    exibirResultado(resultado);

    // Desabilitamos o input
    document.getElementById("amigo").disabled = true;

    // Escondemos os botões "Adicionar" e "Sortear amigo"
    document.querySelector(".button-add").style.display = "none";
    document.querySelector(".button-draw").style.display = "none";

    // Criamos o botão "Novo Jogo" (se ele ainda não existir)
    let buttonContainer = document.querySelector(".button-container");
    let buttonNovoJogo = document.createElement("button");
    buttonNovoJogo.textContent = "Novo Jogo";
    buttonNovoJogo.classList.add("button-draw"); // Adiciona a mesma classe do botão "Sortear amigo"
    buttonNovoJogo.onclick = reiniciarJogo; // Define a função ao clicar

    // Adicionamos o botão "Novo Jogo" ao container
    buttonContainer.appendChild(buttonNovoJogo);
}

// Função para exibir resultado na tela
function exibirResultado(resultado) {
    let ul = document.getElementById("resultado"); // Pegamos a lista de resultado no HTML
    ul.innerHTML = ""; // Limpamos o conteúdo anterior

    // Percorremos o array de resultados e criamos um <li> para cada par de amigo
    resultado.forEach(par => {
        let li = document.createElement("li");
        li.textContent = `${par.amigo} tirou ${par.amigoSorteado}`; // Exibimos o par
        ul.appendChild(li); // Adicionamos o <li> à lista <ul>
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Limpa o array de amigos
    listaDeAmigos = [];

    // Limpa a lista de amigos na tela
    let ulAmigos = document.getElementById("listaAmigos");
    ulAmigos.innerHTML = "";

    // Limpa a lista de resultados na tela
    let ulResultado = document.getElementById("resultado");
    ulResultado.innerHTML = "";

    // Reabilita o input
    document.getElementById("amigo").disabled = false;

    // Mostra os botões "Adicionar" e "Sortear amigo"
    document.querySelector(".button-add").style.display = "inline-block";
    document.querySelector(".button-draw").style.display = "inline-block";

    // Remove o botão "Novo Jogo"
    let buttonNovoJogo = document.querySelector(".button-container button:last-child");
    if (buttonNovoJogo && buttonNovoJogo.textContent === "Novo Jogo") {
        buttonNovoJogo.remove();
    }

    // Limpa o campo de input
    document.getElementById("amigo").value = "";
}