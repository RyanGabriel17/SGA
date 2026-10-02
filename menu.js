const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

if (usuarioAtual) {
    document.getElementById("nomeUsuario").textContent = usuarioAtual.nome};