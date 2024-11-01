const frm = document.querySelector("form")
const respErros = document.querySelector("#outErros")
const respChances = document.querySelector("#outChances")
const respDica = document.querySelector("#outDica")

const erros = []
const sorteado = Math.floor(Math.random()*100)+1
const CHANCES = 6

frm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const numero = Number(frm.inNumero.value)
    if(numero == sorteado){
        respDica.innerText = `Parabéns!!! Número sorteado: ${sorteado}`
        frm.btSubmit.disabled = true //troca status dos botões
        frm.btNovo.className = "exibe"
    }else{
        if(erros.includes(numero)){
            alert(`Voce já apaostou o numero ${numero}. Tente outro...`)
        }else{
            erros.push(numero) //adicionanumero ao vetor
            const numErros = erros.length //obtem o tramanaho deo vetor
            const numChances = CHANCES - numErros //calculo numero de chances
            //exibe numero de erros, conteudoi do vetor e numero de chances
            respErros.innerText = `${numErros} (${erros.join(", ")})`
            respChances.innerText = numChances
            if(numChances == 0){
                alert('Suas chances acabaram...')
                frm.btSubmit.disabled = true
                frm.btNovo.className = "exibe"
                respDica.innerText = `Game over!! Número Sorteador: ${sorteado}`
            }else{
                //usa opeador ternário para mensagem da dica
                const dica = numero < sorteado ? "maior" : "menor"
                respDica.innerText = `Dica: Tente um número ${dica} que ${numero}`
            }
        }
    }

    frm.inNumero.value = ""
    frm.inNumero.focus()
})

frm.btNovo.addEventListener("click", () =>{
    location.reload()
})