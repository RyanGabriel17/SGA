let usuarioAtual = JSON.parse(
    localStorage.getItem("usuarioAtual")
);

const formPerfil = document.querySelector(".form-perfil");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const disciplinaInput = document.getElementById("disciplina");
const nomeLateral = document.getElementById("nomeLateral");

if (usuarioAtual) {

    nomeInput.value = usuarioAtual.nome || "";

    emailInput.value = usuarioAtual.email || "";

    disciplinaInput.value = usuarioAtual.disciplina || "";

    nomeLateral.textContent = usuarioAtual.nome || "Professor";
}

formPerfil.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const disciplina = disciplinaInput.value.trim();

    if (!nome || !email || !disciplina) {
        alert("Preencha todos os campos.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailAnterior = usuarioAtual?.email;

    if (usuarios.some(usuario => usuario.email === email && usuario.email !== emailAnterior)) {
        alert("Este email já está cadastrado.");
        return;
    }

    const indice = usuarios.findIndex(usuario => usuario.email === emailAnterior);
    const dadosAtualizados = {
        ...(indice !== -1 ? usuarios[indice] : {}),
        ...usuarioAtual,
        nome: nome,
        email: email,
        disciplina: disciplina
    };

    localStorage.setItem(
        "usuarioAtual",
        JSON.stringify(dadosAtualizados)
    );

    if (indice !== -1) {
        usuarios[indice] = dadosAtualizados;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    usuarioAtual = dadosAtualizados;

    nomeLateral.textContent = nome;

    alert("Alterações salvas com sucesso!");
});

const fotoInput = document.getElementById("foto-input");
const fotoPerfil = document.getElementById("foto-perfil");
const fotoLateral = document.getElementById("foto-lateral");
const letraPerfil = document.getElementById("letraPerfil");

const fotoSalva = localStorage.getItem("fotoPerfil");

if (fotoSalva) {

    fotoPerfil.innerHTML = `<img src="${fotoSalva}" alt="Foto de perfil">`;
    fotoLateral.innerHTML = `<img src="${fotoSalva}" alt="Foto de perfil">`;

}

fotoInput.addEventListener("change", function () {

    const arquivo = this.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione uma imagem válida.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {

        const imagem = evento.target.result;

        fotoPerfil.innerHTML = `<img src="${imagem}" alt="Foto de perfil"> `;
        fotoLateral.innerHTML = `<img src="${imagem}" alt="Foto de perfil">`;

        localStorage.setItem("fotoPerfil", imagem);
    };

    leitor.readAsDataURL(arquivo);
});
