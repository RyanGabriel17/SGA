const cadastro = document.getElementById("formCadastro");

cadastro.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const disciplina = document.getElementById("disciplina").value
    const senha = document.getElementById("senha").value
    const confirmarSenha = document.getElementById("confirmarSenha").value

    const mensagem = document.getElementById("mensagem");

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const usuarioExistente = usuarios.find(usuario => usuario.email === email);

    if (usuarioExistente) {
        mensagem.textContent = "Este email já está cadastrado.";
        return;
    }
    const novoUsuario = {
        nome: nome,
        email: email,
        disciplina: disciplina,
        senha: senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.setItem("usuarioAtual", JSON.stringify(novoUsuario));

    mensagem.textContent = "Cadastro realizado com sucesso!";

    cadastro.reset();

    setTimeout(function() {
        window.location.href = "menu.html";
    }, 1350);
});
