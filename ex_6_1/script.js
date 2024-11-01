const frm = document.querySelector("form");
const respNome = document.querySelector("span");
const respLista = document.querySelector("pre");

const pacientes = [];

frm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita envio do form
    const nome = frm.inPaciente.value; // obtém nome do paciente
    pacientes.push(nome); // adiciona o nome no final do vetor
    atualizarLista(); // atualiza a lista de pacientes
    frm.inPaciente.value = ""; // limpa o campo de formulário
    frm.inPaciente.focus(); // posiciona o cursor no campo
});

frm.btUrgencia.addEventListener("click", () => {
    if (!frm.checkValidity()) {
        alert("Informe o nome do paciente a ser atendido em caráter de urgência");
        frm.inPaciente.focus();
        return;
    }

    const nome = frm.inPaciente.value; // obtém o nome do paciente
    pacientes.unshift(nome); // adiciona paciente no início do vetor
    atualizarLista(); // atualiza a lista de pacientes
    frm.inPaciente.value = ""; // limpa o campo de formulário
    frm.inPaciente.focus(); // posiciona o cursor no campo
});

frm.btAtender.addEventListener("click", () => {
    if (pacientes.length === 0) {
        alert("Não há pacientes na lista de espera");
        frm.inPaciente.focus();
        return;
    }

    const atender = pacientes.shift(); // remove o primeiro da fila
    respNome.innerText = atender; // exibe nome do paciente em atendimento
    atualizarLista(); // atualiza a lista de pacientes
});

// Função para atualizar a lista de pacientes na tela
function atualizarLista() {
    let lista = ""; // string para concatenar pacientes
    pacientes.forEach((paciente, i) => (lista += `${i + 1}. ${paciente}\n`));
    respLista.innerText = lista; // exibe a lista de pacientes na página
}