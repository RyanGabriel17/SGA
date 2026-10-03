const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

if (usuarioAtual) {
    document.getElementById("nomeUsuario").textContent = usuarioAtual.nome;
}

const fotoSalva = localStorage.getItem("fotoPerfil");
if (fotoSalva) {
    document.getElementById("fotoMenu").innerHTML =
        `<img src="${fotoSalva}" alt="Foto de perfil">`;
}

const listaTurmas = document.getElementById("listaTurmas");
if (listaTurmas) {
    const nome = usuarioAtual?.disciplina?.trim() || "Engenharia de Software";
    const exemplo = nome.toLocaleLowerCase() === "engenharia de software";
    const card = document.createElement("article");
    card.className = "card turma-azul";

    const icone = document.createElement("div");
    icone.className = "card-icon";
    icone.textContent = nome.charAt(0).toLocaleUpperCase();

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const descricao = document.createElement("p");
    descricao.textContent = exemplo ? "ADS 2026.1 · exemplo" : "Diário da disciplina";

    const alunos = document.createElement("p");
    alunos.textContent = "4 alunos de exemplo";

    const link = document.createElement("a");
    link.href = `turmaES.html?disciplina=${encodeURIComponent(nome)}`;
    link.textContent = "Abrir turma  ›";

    card.append(icone, titulo, descricao, alunos, link);
    listaTurmas.append(card);
}
