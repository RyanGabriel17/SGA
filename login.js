const login = document.getElementById("formLogin");

login.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const mensagem = document.getElementById("mensagem");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(function(usuario) {

        return usuario.email === email && usuario.senha === senha;

    });

    if (usuarioEncontrado) {

        localStorage.setItem(
            "usuarioAtual",
            JSON.stringify(usuarioEncontrado)
        );

        window.location.href = "menu.html";

    } else {

        mensagem.textContent = "Email ou senha incorretos.";

    }

});
