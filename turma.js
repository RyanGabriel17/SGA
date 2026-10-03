const nomeDisciplina = new URLSearchParams(window.location.search).get("disciplina") || "Engenharia de Software";
const disciplinaExemplo = nomeDisciplina.toLocaleLowerCase() === "engenharia de software";

document.title = `${nomeDisciplina} - SGA`;
document.getElementById("nomeDisciplina").textContent = nomeDisciplina;
document.getElementById("resumoTurma").textContent = disciplinaExemplo
    ? "ADS 2026.1 · 4 alunos de exemplo"
    : "4 alunos de exemplo";
