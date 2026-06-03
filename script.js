document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // SISTEMA DE ACCORDIONS (EXPANSÍVEIS)
    // ==========================================================================
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const estaAtivo = item.classList.contains("ativo");

            // Fecha todos os itens antes de abrir o atual (efeito sanfona single-open)
            document.querySelectorAll(".accordion-item").forEach(i => {
                i.classList.remove("ativo");
                i.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
            });

            if (!estaAtivo) {
                item.classList.add("ativo");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });

    // ==========================================================================
    // SEÇÃO DE INTERAÇÃO (COMENTÁRIOS DINÂMICOS)
    // ==========================================================================
    const formComentario = document.getElementById("formComentario");
    const txtComentario = document.getElementById("txtComentario");
    const listaComentarios = document.getElementById("listaComentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const texto = txtComentario.value.trim();
        if (texto === "") return;

        // Cria elemento de comentário moderno
        const card = document.createElement("div");
        card.classList.add("card-comentario");
        
        const infoTexto = document.createElement("p");
        infoTexto.textContent = texto;
        
        card.appendChild(infoTexto);
        listaComentarios.prepend(card); // Adiciona no topo da lista

        // Limpa e reseta
        txtComentario.value = "";
    });

    // ==========================================================================
    // MENU DE ACESSIBILIDADE FLUTUANTE
    // ==========================================================================
    const btnAcessibilidade = document.getElementById("btnAcessibilidade");
    const menuAcessibilidade = document.getElementById("menuAcessibilidade");
    const btnAumentarFonte = document.getElementById("btnAumentarFonte");
    const btnDiminuirFonte = document.getElementById("btnDiminuirFonte");
    const btnAlternarTema = document.getElementById("btnAlternarTema");
    const btnIniciarLeitura = document.getElementById("btnIniciarLeitura");
    const btnPararLeitura = document.getElementById("btnPararLeitura");

    let tamanhoFonteAtual = 100; // Porcentagem base

    // Exibir / Ocultar Menu Flutuante
    btnAcessibilidade.addEventListener("click", () => {
        menuAcessibilidade.classList.toggle("id-oculto");
    });

    // Controle de Tamanho de Fonte
    btnAumentarFonte.addEventListener("click", () => {
        if (tamanhoFonteAtual < 140) {
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    document.getElementById("formSeminario").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Inscrição efetuada com sucesso! Em breve você receberá o link de acesso no e-mail informado.");
        e.target.reset();
    });

    btnDiminuirFonte.addEventListener("click", () => {
        if (tamanhoFonteAtual > 80) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // Alternar Modo Escuro / Claro
    btnAlternarTema.addEventListener("click", () => {
        document.body.classList.toggle("modo-claro");
    });

    // ==========================================================================
    // SISTEMA DE LEITURA POR VOZ (SpeechSynthesis API)
    // ==========================================================================
    let sinteseVoz = window.speechSynthesis;
    let utterance = null;

    btnIniciarLeitura.addEventListener("click", () => {
        // Evita múltiplas leituras simultâneas
        sinteseVoz.cancel();

        // Captura apenas o conteúdo textual do artigo principal (ignora menus, inputs e btns)
        const conteudoParaLer = document.getElementById("conteudoLeitura").innerText;

        utterance = new SpeechSynthesisUtterance(conteudoParaLer);
        utterance.lang = "pt-BR";
        utterance.rate = 1.1; // Velocidade natural

        sinteseVoz.speak(utterance);
    });

    btnPararLeitura.addEventListener("click", () => {
        sinteseVoz.cancel();
    });
});








