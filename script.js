url="https://economia.awesomeapi.com.br/last/USD-BRL,BRL-USD,EUR-BRL,BRL-EUR"
onload = function(){
    pegarValorDoDolar();

    // Permitir apenas números nos inputs do valor da moeda
    document.getElementById("conversor1").addEventListener("input", filtrarCaracteres);
    document.getElementById("conversor2").addEventListener("input", filtrarCaracteres);
   
    // Fazer a conversão em tempo real a cada número selecionado pelo usuário
    document.getElementById("conversor1").addEventListener("input", converterValor);
    document.getElementById("conversor2").addEventListener("input", converterValor);

    // Mudar as informações da tela para a moeda selecionada...dolar,euro etc
    document.getElementById("dolarRadio").addEventListener("click", () => {
        setTimeout(function(){
            pegarValorDoDolar();
            alterarMoedaExibidaNaTela("dolar");
        }, 1000);
    })
    document.getElementById("euroRadio").addEventListener("click", () => {
        setTimeout(function(){
            pegarValorDoEuro();
            alterarMoedaExibidaNaTela("euro");
        }, 1000);
    })
}

// valorParaConversão é o valor na váriavel global que será usada em outras funções
var valorParaConversao;
var valorDoRealParaConversao;

function alterarMoedaExibidaNaTela(moeda){
    let moedaInfo1 = document.getElementById("moedaInfo1");
    let moedaInfo2 = document.getElementById("moedaInfo2");
    
    switch(moeda) {
        case "dolar":
            moedaInfo1.innerHTML = "1 dólar americano é igual a:";
            moedaInfo2.innerHTML= "U$";
            document.getElementsByName("conversor1")[0].placeholder = "U$";
            break;
        case "euro":
            moedaInfo1.innerHTML = "1 euro é igual a:";
            moedaInfo2.innerHTML= "€";
            document.getElementsByName("conversor1")[0].placeholder = "€";
            break;



    }
}


function pegarValorDoEuro(){
    // Buscar API com os valores atuais do dólar
    fetch(url).then((response) =>{
        return response.json();
    }).then((data) =>{
        let valor = Number(data.EURBRL.ask); 
        let valor2 = Number(data.BRLEUR.ask);
        console.log(valor);
        atualizarValorDaMoedaExibidoNaTela(valor, "€");

    // valorParaConversão é o valor na váriavel global que será usada em outras funções
    valorParaConversao = valor;
    valorDoRealParaConversao = valor2;
    });

}

function pegarValorDoDolar(){
    // Buscar API com os valores atuais do dólar
    fetch(url).then((response) =>{
        return response.json();
    }).then((data) =>{
        let valor = Number(data.USDBRL.ask); 
        let valor2 = Number(data.BRLUSD.ask);
        console.log(valor);
        atualizarValorDaMoedaExibidoNaTela(valor, "U$");

    // valorParaConversão é o valor na váriavel global que será usada em outras funções
    valorParaConversao = valor;
    valorDoRealParaConversao = valor2;
    });

}
function atualizarValorDaMoedaExibidoNaTela(valorAtual, moeda){
    valorAtual = valorAtual;

    //Atualizar na telaValorDaMoeda
    let valorNaTela = document.getElementById("valorDaMoeda");
    valorNaTela.innerHTML = `${valorAtual.toFixed(2)} Reais`;

    //Atualizar na telaValorDaMoeda2
    let multiplicadores = document.getElementsByClassName("multiplicadorDaMoeda");
    console.log(multiplicadores);
    multiplicadores[0].innerHTML=`<strong>${moeda}1</strong> é igual a <strong>R$${(valorAtual * 1).toFixed(2)}</strong>`
    multiplicadores[1].innerHTML=`<strong>${moeda}10</strong> é igual a <strong>R$${(valorAtual * 10).toFixed(2)}</strong>`
    multiplicadores[2].innerHTML=`<strong>${moeda}100</strong> é igual a <strong>R$${(valorAtual * 100).toFixed(2)}</strong>`
    multiplicadores[3].innerHTML=`<strong>${moeda}500</strong> é igual a <strong>R$${(valorAtual * 500).toFixed(2)}</strong>`
    multiplicadores[4].innerHTML=`<strong>${moeda}1000</strong> é igual a <strong>R$${(valorAtual * 1000).toFixed(2)}</strong>`

}


// Permitir apenas números nos inputs para converter o valor da moeda
function filtrarCaracteres(){
    let conversor = this.value;
    let valorFiltrado = conversor.replace(/[\D]/g, "");
    this.value = valorFiltrado;
}


function converterValor(){
    let conversor1 = document.getElementById("conversor1");
    let conversor2 = document.getElementById("conversor2");

    //Se o usuário digita no primeiro input, o segundo recebe o valor multiplicado pela cotação atual e vice-versa
    if(this == conversor1){
        conversor2.value = Number(conversor1.value * valorParaConversao).toFixed(2);
    } else {
        conversor1.value = Number(conversor2.value * valorDoRealParaConversao).toFixed(2);
    }
}
