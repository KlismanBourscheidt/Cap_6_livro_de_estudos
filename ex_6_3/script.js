//linka o html com js
const frm = document.querySelector("form");
const resp = document.querySelector("pre");

const carros = [];

frm.addEventListener("submit", (e) =>{
    e.preventDefault(); // Evita o envio do form
    const modelo = frm.inModelo.value; // recebe o valor de HTML
    const preco = Number(frm.inPreco.value); //recebe valor tipo number de HTML
    carros.push({modelo, preco}); //adiciona dados ao vetor de objetos
    frm.inModelo.value = "" ; //limpa campos em form
    frm.inPreco.value = "" ;
    inModelo.focus() ; //posiciona cursor em inModelo
    // dispara um evento de click em btListar (equivale a um click no botao da pagina)
    frm.btListar.dispatchEvent(new Event("click"));
})

frm.btListar.addEventListener("click", () =>{ //"escuta" o clique em btListar
    if(carros.lenght == 0){         //se tamanho do vetor é igual a 0
        alert("Não há carros na lista")
        return
    }

    //Metodo reduce() cocatena uma string,obtendo modelo e preco de cada veiculo
    const lista = carros.reduce((acumulador, carro) => acumulador + carro.modelo + " - R$: " + carro.preco.toFixed(2) + "\n", "")
    resp.innerText = `Lista dos Carros Cadastrados \n${"-".repeat(40)}\n${lista}`
})

frm.btFiltrar.addEventListener("click",()=>{
    const maximo = Number(prompt("Qual o valor máximo que o cliente deseja pagar? "))
    if(maximo == 0 || isNaN(maximo)){ // se nao informar um valor valido vai retornar
        return
    }
    //cria um novo vetor com os objetos que atendem a condicao de filtro
    const carrosFilter = carros.filter(carro => carro.preco <= maximo)
    if(carrosFilter.lenght == 0){
        alert('Não há carros com preco inferior ou igual ao solicitado')
        return
    }

    let lista = ""
    for(carro of carrosFilter){
        lista += `${carro.modelo} - R$ ${carro.preco.toFixed(2)}\n`
    }

    resp.innerText = `Carros até R$: ${maximo.toFixed(2)}\n${'-'.repeat(40)}\n${lista}`
})

frm.btSimular.addEventListener("click",() =>{
    const desconto = Number(prompt("Qual o percentual de desconto: "))
    if(desconto == 0 || isNaN(desconto)){
        return
    }
    const carrosDesc = carros.map(aux => ({
        modelo: aux.modelo,
        preco: aux.preco - (aux.preco * desconto / 100)
    }))
    let lista = ""
    for(const carro of carrosDesc){
        lista += `${carro.modelo} - R$ ${carro.preco.toFixed(2)}\n`
    }
    resp.innerText = `Carros com desconto de até R$ ${desconto}%\n${"-".repeat(40)}\n${lista}`
})