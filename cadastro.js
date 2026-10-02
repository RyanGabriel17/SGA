const cadastro = document.getElementById("formCadastro");

cadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const disciplina = document.getElementById("disciplina").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    if (!nome || !email || !disciplina || !senha || !confirmar) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    let professores = JSON.parse(localStorage.getItem("db")) || [];

    const existe = professores.find(p => p.email === email);

    if (existe) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    const usuario = { nome, email, disciplina, senha };

    professores.push(usuario);

    localStorage.setItem("db", JSON.stringify(professores));

    window.location.href = "menu.html";
});