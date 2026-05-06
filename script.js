// Menu responsivo para telas menores aqui eu travei um pouco e precisei de ajuda
const btnMenu = document.getElementById("btnMenu");
const listaMenu = document.getElementById("listaMenu");
const btnTema = document.getElementById("btnTema");

//aqui e a parte do tema da tela, escuro e claro, essa parte foi complicada, precisei de ajuda mas consegui
function salvarTema(tema) {
  try {
    localStorage.setItem("tema", tema);
  } catch (erro) {
    return;
  }
}

function buscarTemaSalvo() {
  try {
    return localStorage.getItem("tema") || "claro";
  } catch (erro) {
    return "claro";
  }
}

function aplicarTema(tema) {
  const temaEscuro = tema === "escuro";

  document.body.classList.toggle("tema-escuro", temaEscuro);
  if (btnTema) {
    btnTema.textContent = temaEscuro ? "\u263e" : "\u2600";
    btnTema.setAttribute("aria-label", temaEscuro ? "Tema escuro" : "Tema claro");
    btnTema.setAttribute("title", temaEscuro ? "Tema escuro" : "Tema claro");
  }
  salvarTema(tema);
}

const temaSalvo = buscarTemaSalvo();
aplicarTema(temaSalvo);

if (btnTema) {
  btnTema.addEventListener("click", function () {
    const temaAtual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
    aplicarTema(temaAtual === "escuro" ? "claro" : "escuro");
  });
}

if (btnMenu && listaMenu) {
  btnMenu.addEventListener("click", function () {
    listaMenu.classList.toggle("ativo");
  });
}

// Fecha o menu ao clicar em um link
const linksMenu = document.querySelectorAll("#listaMenu a");

linksMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    listaMenu.classList.remove("ativo");
  });
});

// Validação do formulário de contato, me lembrou as atividades do semestre passado, achei divertido
const formContato = document.getElementById("formContato");
const mensagemRetorno = document.getElementById("mensagemRetorno");

if (formContato && mensagemRetorno) {
  formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nome === "" || email === "" || mensagem === "") {
      mensagemRetorno.textContent = "Por favor, preencha todos os campos.";
      mensagemRetorno.style.color = "red";
      return;
    }

 //aqui aparece se a pessoa nao colocar um email valido, aparece a mensagem de erro   
    if (!emailValido.test(email)) {
      mensagemRetorno.textContent = "Digite um e-mail válido.";
      mensagemRetorno.style.color = "red";
      return;
    }

//se estiver tudo certo aparece a mensagem que foi enviado com sucesso    
    mensagemRetorno.textContent = "Mensagem enviada com sucesso!";
    mensagemRetorno.style.color = "green";

    formContato.reset();
  });
}
