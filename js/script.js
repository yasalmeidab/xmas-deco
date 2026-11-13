/* =========================================================================
   X'MAS DECO — INTERAÇÕES GERAIS
   -------------------------------------------------------------------------
   Carrosséis, neve, contagem regressiva, música, menu mobile, animações de
   rolagem, lightbox da galeria e validação do formulário de contato.
   Somente JavaScript puro (Vanilla JS), sem bibliotecas.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =====================================================================
       0. ABERTURA EM VÍDEO (TELA CHEIA)
       ===================================================================== */

    const intro = document.getElementById("introVideo");

    if (intro) {
        const videoIntro = document.getElementById("introVideoMidia");
        const botaoPularIntro = document.getElementById("introVideoPular");
        let introEncerrada = false;
        let temporizadorFimIntro = null;

        document.body.classList.add("intro-ativa");

        function encerrarIntro() {
            if (introEncerrada) return;
            introEncerrada = true;
            window.clearTimeout(temporizadorFimIntro);

            if (videoIntro) {
                try { videoIntro.pause(); } catch (erro) { /* ignora */ }
            }

            document.body.classList.remove("intro-ativa");
            intro.classList.add("saindo");
            window.setTimeout(function () {
                intro.remove();
            }, 500);

            /* A música de fundo só começa depois que a abertura termina. */
            document.dispatchEvent(new CustomEvent("xmas:introEncerrada"));
        }

        function programarFimDaIntro() {
            if (!videoIntro || introEncerrada) return;
            window.clearTimeout(temporizadorFimIntro);
            const duracao = Number.isFinite(videoIntro.duration) ? videoIntro.duration : 15;
            temporizadorFimIntro = window.setTimeout(encerrarIntro, Math.max(3000, duracao * 1000 + 1200));
        }

        function iniciarVideoIntro() {
            if (!videoIntro) {
                encerrarIntro();
                return;
            }

            /* A abertura é sempre silenciosa. O áudio do site continua
               disponível nos controles de música, fora do vídeo. */
            videoIntro.muted = true;
            videoIntro.volume = 0;

            const tentativa = videoIntro.play();
            if (tentativa && typeof tentativa.catch === "function") {
                tentativa.catch(function () {
                    /* Autoplay bloqueado: o usuário pode usar "Pular abertura". */
                });
            }
        }

        if (videoIntro) {
            videoIntro.addEventListener("playing", programarFimDaIntro);
            videoIntro.addEventListener("ended", encerrarIntro);
            videoIntro.addEventListener("error", encerrarIntro);
        }

        botaoPularIntro?.addEventListener("click", encerrarIntro);
        iniciarVideoIntro();

        window.setTimeout(function () {
            if (!introEncerrada) botaoPularIntro?.focus({ preventScroll: true });
        }, 120);
    }

    /* =====================================================================
       1. MENU MOBILE E NAVEGAÇÃO
       ===================================================================== */

    const botaoMenu = document.querySelector(".nav-toggle");
    const listaMenu = document.querySelector(".nav-links");

    if (botaoMenu && listaMenu) {
        botaoMenu.addEventListener("click", function () {
            const aberto = listaMenu.classList.toggle("aberto");
            botaoMenu.classList.toggle("aberto", aberto);
            botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
        });

        listaMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                listaMenu.classList.remove("aberto");
                botaoMenu.classList.remove("aberto");
                botaoMenu.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Sombra suave na navbar ao rolar a página */
    const cabecalho = document.querySelector(".site-nav");
    function atualizarCabecalho() {
        if (!cabecalho) return;
        cabecalho.classList.toggle("rolada", window.scrollY > 12);
    }
    window.addEventListener("scroll", atualizarCabecalho, { passive: true });
    atualizarCabecalho();

    /* =====================================================================
       2. NEVE DENTRO DO PRIMEIRO CARROSSEL
       ===================================================================== */

    const areaNeve = document.getElementById("neve-carrossel");
    const botaoNeve = document.getElementById("btnNeve");
    let intervaloNeve = null;
    let neveLigada = false;
    let temporizadorInicioNeve = null;
    const temporizadoresFlocos = [];

    function criarFloco() {
        if (!areaNeve || !neveLigada) return;
        if (areaNeve.childElementCount > 70) return;

        const floco = document.createElement("span");
        floco.className = "floco-neve";
        floco.textContent = ["❄", "❅", "❆"][Math.floor(Math.random() * 3)];
        floco.setAttribute("aria-hidden", "true");
        floco.style.left = Math.random() * 100 + "%";
        floco.style.opacity = (0.35 + Math.random() * 0.6).toFixed(2);
        floco.style.fontSize = (9 + Math.random() * 15).toFixed(0) + "px";
        floco.style.animationDuration = (5 + Math.random() * 5).toFixed(1) + "s";
        floco.style.animationDelay = (Math.random() * 1.2).toFixed(1) + "s";
        floco.style.setProperty("--deriva", (Math.random() * 90 - 45).toFixed(0) + "px");
        areaNeve.appendChild(floco);

        floco.addEventListener("animationend", function () {
            floco.remove();
        });
    }

    function ligarNeve() {
        if (!areaNeve || !botaoNeve) return;
        neveLigada = true;
        areaNeve.classList.add("ativa");
        areaNeve.setAttribute("aria-hidden", "false");
        botaoNeve.classList.add("ativo");
        botaoNeve.setAttribute("aria-pressed", "true");
        botaoNeve.setAttribute("title", "Desativar neve");

        for (let i = 0; i < 12; i++) {
            temporizadoresFlocos.push(window.setTimeout(criarFloco, i * 140));
        }
        window.clearInterval(intervaloNeve);
        intervaloNeve = window.setInterval(criarFloco, 260);

        try { localStorage.setItem("xmasNeve", "ligada"); } catch (erro) { /* ignora */ }
    }

    function desligarNeve() {
        if (!areaNeve || !botaoNeve) return;
        neveLigada = false;
        window.clearTimeout(temporizadorInicioNeve);
        while (temporizadoresFlocos.length) {
            window.clearTimeout(temporizadoresFlocos.pop());
        }
        areaNeve.classList.remove("ativa");
        areaNeve.setAttribute("aria-hidden", "true");
        botaoNeve.classList.remove("ativo");
        botaoNeve.setAttribute("aria-pressed", "false");
        botaoNeve.setAttribute("title", "Ativar neve");
        window.clearInterval(intervaloNeve);
        intervaloNeve = null;
        areaNeve.innerHTML = "";

        try { localStorage.setItem("xmasNeve", "desligada"); } catch (erro) { /* ignora */ }
    }

    if (areaNeve && botaoNeve) {
        botaoNeve.addEventListener("click", function () {
            if (neveLigada) {
                desligarNeve();
            } else {
                ligarNeve();
            }
        });

        let prefereNeve = "ligada";
        try { prefereNeve = localStorage.getItem("xmasNeve") || "ligada"; } catch (erro) { /* ignora */ }

        const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefereNeve === "ligada" && !movimentoReduzido) {
            temporizadorInicioNeve = window.setTimeout(ligarNeve, 700);
        } else {
            botaoNeve.classList.remove("ativo");
            botaoNeve.setAttribute("aria-pressed", "false");
            botaoNeve.setAttribute("title", "Ativar neve");
        }
    }

    /* =====================================================================
       3. CARROSSEL PRINCIPAL (DESTAQUES)
       ===================================================================== */

    const trilhaPrincipal = document.querySelector(".carousel-track");
    const slidesPrincipais = Array.from(document.querySelectorAll(".carousel-slide"));
    const setaAnterior = document.querySelector(".prev-btn");
    const setaProxima = document.querySelector(".next-btn");
    const pontosPrincipais = document.getElementById("heroDots");

    if (trilhaPrincipal && slidesPrincipais.length > 1 && setaAnterior && setaProxima) {
        let indicePrincipal = 0;
        let temporizadorPrincipal = null;

        if (pontosPrincipais) {
            slidesPrincipais.forEach(function (_, indice) {
                const ponto = document.createElement("button");
                ponto.type = "button";
                ponto.className = "dot";
                ponto.setAttribute("aria-label", "Ir para o destaque " + (indice + 1));
                ponto.addEventListener("click", function () {
                    irParaSlidePrincipal(indice);
                    reiniciarAutoplay();
                });
                pontosPrincipais.appendChild(ponto);
            });
        }

        function atualizarPontosPrincipais() {
            if (!pontosPrincipais) return;
            Array.from(pontosPrincipais.children).forEach(function (ponto, indice) {
                ponto.classList.toggle("active", indice === indicePrincipal);
                ponto.setAttribute("aria-current", indice === indicePrincipal ? "true" : "false");
            });
        }

        function irParaSlidePrincipal(indice) {
            indicePrincipal = (indice + slidesPrincipais.length) % slidesPrincipais.length;
            trilhaPrincipal.scrollTo({
                left: indicePrincipal * trilhaPrincipal.clientWidth,
                behavior: "smooth"
            });
            atualizarPontosPrincipais();
        }

        function proximoSlidePrincipal() {
            irParaSlidePrincipal(indicePrincipal + 1);
        }

        function reiniciarAutoplay() {
            window.clearInterval(temporizadorPrincipal);
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            temporizadorPrincipal = window.setInterval(proximoSlidePrincipal, 6500);
        }

        setaProxima.addEventListener("click", function () {
            proximoSlidePrincipal();
            reiniciarAutoplay();
        });

        setaAnterior.addEventListener("click", function () {
            irParaSlidePrincipal(indicePrincipal - 1);
            reiniciarAutoplay();
        });

        trilhaPrincipal.addEventListener("scroll", function () {
            window.requestAnimationFrame(function () {
                const largura = trilhaPrincipal.clientWidth || 1;
                const calculado = Math.round(trilhaPrincipal.scrollLeft / largura);
                if (calculado !== indicePrincipal) {
                    indicePrincipal = calculado;
                    atualizarPontosPrincipais();
                }
            });
        }, { passive: true });

        window.addEventListener("resize", function () {
            trilhaPrincipal.scrollTo({
                left: indicePrincipal * trilhaPrincipal.clientWidth,
                behavior: "auto"
            });
        });

        const areaHero = document.querySelector(".banner-carousel-container");
        if (areaHero) {
            areaHero.addEventListener("mouseenter", function () {
                window.clearInterval(temporizadorPrincipal);
            });
            areaHero.addEventListener("mouseleave", reiniciarAutoplay);
            areaHero.addEventListener("focusin", function () {
                window.clearInterval(temporizadorPrincipal);
            });
            areaHero.addEventListener("focusout", reiniciarAutoplay);
        }

        atualizarPontosPrincipais();
        reiniciarAutoplay();
    }

    /* =====================================================================
       4. PARALLAX DAS IMAGENS DO CARROSSEL
       ===================================================================== */

    const bannerPrincipal = document.querySelector(".banner-carousel-container");
    const imagensParallax = document.querySelectorAll(".imagem-parallax");

    if (bannerPrincipal && imagensParallax.length) {
        let agendado = false;

        function atualizarParallax() {
            const posicao = bannerPrincipal.getBoundingClientRect();
            if (posicao.bottom < 0 || posicao.top > window.innerHeight) {
                agendado = false;
                return;
            }
            /* Valores originais do AV2WEB4: deslocamento de até 50px, fator 0,25 */
            const movimento = Math.max(-50, Math.min(50, -posicao.top * 0.25));
            imagensParallax.forEach(function (imagem) {
                imagem.style.transform = "translate3d(0, " + movimento.toFixed(1) + "px, 0)";
            });
            agendado = false;
        }

        window.addEventListener("scroll", function () {
            if (!agendado) {
                window.requestAnimationFrame(atualizarParallax);
                agendado = true;
            }
        }, { passive: true });

        window.addEventListener("resize", atualizarParallax);
        atualizarParallax();
    }

    /* =====================================================================
       5. CARROSSEL DE PROMOÇÕES (SEGUNDO CARROSSEL)
       ===================================================================== */

    const trilhaPromo = document.getElementById("slide");
    const slidesPromo = trilhaPromo
        ? Array.from(trilhaPromo.querySelectorAll(".slide-item"))
        : [];
    const botaoPromoAnterior = document.getElementById("btnPrev");
    const botaoPromoProxima = document.getElementById("btnNext");
    const pontosPromo = document.getElementById("dotsContainer");

    if (trilhaPromo && slidesPromo.length && botaoPromoAnterior && botaoPromoProxima && pontosPromo) {
        let indicePromo = 0;
        let temporizadorPromo = null;

        pontosPromo.innerHTML = "";
        const listaPontos = slidesPromo.map(function (_, indice) {
            const ponto = document.createElement("button");
            ponto.type = "button";
            ponto.className = "dot";
            ponto.setAttribute("aria-label", "Ir para a promoção " + (indice + 1));
            ponto.addEventListener("click", function () {
                irParaPromo(indice);
                reiniciarPromo();
            });
            pontosPromo.appendChild(ponto);
            return ponto;
        });

        function irParaPromo(indice, reiniciar) {
            indicePromo = (indice + slidesPromo.length) % slidesPromo.length;
            trilhaPromo.style.transform = "translateX(-" + indicePromo * 100 + "%)";
            listaPontos.forEach(function (ponto, i) {
                ponto.classList.toggle("active", i === indicePromo);
                ponto.setAttribute("aria-current", i === indicePromo ? "true" : "false");
            });
            if (reiniciar !== false) reiniciarPromo();
        }

        function proximaPromo() {
            irParaPromo(indicePromo + 1, false);
        }

        function reiniciarPromo() {
            window.clearInterval(temporizadorPromo);
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            temporizadorPromo = window.setInterval(proximaPromo, 5500);
        }

        botaoPromoProxima.addEventListener("click", function () {
            irParaPromo(indicePromo + 1);
        });
        botaoPromoAnterior.addEventListener("click", function () {
            irParaPromo(indicePromo - 1);
        });

        const areaPromo = document.getElementById("acomodacoes");
        if (areaPromo) {
            areaPromo.addEventListener("mouseenter", function () {
                window.clearInterval(temporizadorPromo);
            });
            areaPromo.addEventListener("mouseleave", reiniciarPromo);
            areaPromo.addEventListener("focusin", function () {
                window.clearInterval(temporizadorPromo);
            });
            areaPromo.addEventListener("focusout", reiniciarPromo);
        }

        /* Arrastar para os lados no celular */
        let inicioToque = 0;
        trilhaPromo.addEventListener("touchstart", function (evento) {
            inicioToque = evento.changedTouches[0].clientX;
        }, { passive: true });
        trilhaPromo.addEventListener("touchend", function (evento) {
            const fimToque = evento.changedTouches[0].clientX;
            const diferenca = inicioToque - fimToque;
            if (Math.abs(diferenca) > 45) {
                irParaPromo(indicePromo + (diferenca > 0 ? 1 : -1));
            }
        }, { passive: true });

        irParaPromo(0, false);
        reiniciarPromo();
    }

    /* =====================================================================
       6. CONTAGEM REGRESSIVA PARA O NATAL
       ===================================================================== */

    const contadorNatal = document.getElementById("contadorNatal");
    const contadorOfertas = document.getElementById("contadorOfertas");
    const unidadesTempo = document.querySelectorAll("[data-tempo]");

    function calcularNatal() {
        const agora = new Date();
        let natal = new Date(agora.getFullYear(), 11, 25, 0, 0, 0);
        if (agora >= natal) {
            natal = new Date(agora.getFullYear() + 1, 11, 25, 0, 0, 0);
        }
        return natal - agora;
    }

    function doisDigitos(valor) {
        return String(valor).padStart(2, "0");
    }

    function atualizarContagem() {
        if (!contadorNatal && !contadorOfertas && !unidadesTempo.length) return;

        const diferenca = calcularNatal();
        const dias = Math.floor(diferenca / 86400000);
        const horas = Math.floor((diferenca / 3600000) % 24);
        const minutos = Math.floor((diferenca / 60000) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        if (contadorNatal) {
            contadorNatal.textContent = "Faltam " + dias + "d " + doisDigitos(horas) + "h " +
                doisDigitos(minutos) + "min " + doisDigitos(segundos) + "s para o Natal";
        }

        if (contadorOfertas) {
            unidadesTempo.forEach(function (elemento) {
                const chave = elemento.getAttribute("data-tempo");
                const valores = { dias: dias, horas: horas, minutos: minutos, segundos: segundos };
                elemento.textContent = doisDigitos(valores[chave] || 0);
            });
        }
    }

    atualizarContagem();
    window.setInterval(atualizarContagem, 1000);

    /* =====================================================================
       7. MÚSICA
       ===================================================================== */

    const musica = document.getElementById("musicaNatal");
    const botaoTocar = document.getElementById("btnTocar");
    const botaoParar = document.getElementById("btnParar");

    if (musica && botaoTocar && botaoParar) {
        musica.volume = 0.14;

        function atualizarBotoesMusica() {
            const tocando = !musica.paused;
            botaoTocar.classList.toggle("tocando", tocando);
            botaoTocar.innerHTML = tocando ? "❚❚" : "▶";
            botaoTocar.setAttribute("title", tocando ? "Pausar música" : "Tocar música");
            botaoTocar.setAttribute("aria-label", tocando ? "Pausar música" : "Tocar música");
            botaoParar.disabled = musica.paused && musica.currentTime === 0;
        }

        function tocarMusica() {
            const promessa = musica.play();
            if (promessa && typeof promessa.catch === "function") {
                promessa.catch(function () {
                    /* O navegador pode bloquear o autoplay; o usuário pode usar o botão. */
                });
            }
            atualizarBotoesMusica();
        }

        function pausarMusica() {
            musica.pause();
            atualizarBotoesMusica();
        }

        function pararMusica() {
            musica.pause();
            musica.currentTime = 0;
            atualizarBotoesMusica();
        }

        botaoTocar.addEventListener("click", function () {
            if (musica.paused) {
                tocarMusica();
            } else {
                pausarMusica();
            }
        });

        botaoParar.addEventListener("click", pararMusica);
        musica.addEventListener("play", atualizarBotoesMusica);
        musica.addEventListener("pause", atualizarBotoesMusica);
        musica.addEventListener("ended", atualizarBotoesMusica);

        /* Só tenta tocar depois de uma interação do usuário, como exigem os navegadores.
           Durante a abertura em vídeo, espera a intro terminar para não misturar os áudios. */
        function tentarTocarDepoisDeInteragir(evento) {
            if (evento.target.closest && evento.target.closest(".music-controls")) return;
            if (document.body.classList.contains("intro-ativa")) return;
            document.removeEventListener("click", tentarTocarDepoisDeInteragir);
            document.removeEventListener("keydown", tentarTocarDepoisDeInteragir);
            tocarMusica();
        }

        document.addEventListener("click", tentarTocarDepoisDeInteragir);
        document.addEventListener("keydown", tentarTocarDepoisDeInteragir);
        atualizarBotoesMusica();
    }

    /* =====================================================================
       8. BOTÃO VOLTAR AO TOPO
       ===================================================================== */

    const botaoInicio = document.getElementById("btnInicio");
    if (botaoInicio) {
        function verificarBotaoInicio() {
            botaoInicio.classList.toggle("visivel", window.scrollY > 420);
        }
        window.addEventListener("scroll", verificarBotaoInicio, { passive: true });
        window.addEventListener("resize", verificarBotaoInicio);
        botaoInicio.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        verificarBotaoInicio();
    }

    /* =====================================================================
       9. ANIMAÇÕES AO ROLAR A PÁGINA
       ===================================================================== */

    const elementosRevelar = document.querySelectorAll(".revelar");

    if (elementosRevelar.length) {
        if ("IntersectionObserver" in window) {
            const observador = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visivel");
                        observador.unobserve(entrada.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

            elementosRevelar.forEach(function (elemento) {
                observador.observe(elemento);
            });
        } else {
            elementosRevelar.forEach(function (elemento) {
                elemento.classList.add("visivel");
            });
        }
    }

    /* =====================================================================
       11. FORMULÁRIO DE CONTATO
       ===================================================================== */

    const formularioContato = document.getElementById("formContato");

    if (formularioContato) {
        const campos = {
            nome: document.getElementById("nome"),
            email: document.getElementById("email"),
            telefone: document.getElementById("telefone"),
            assunto: document.getElementById("assunto"),
            mensagem: document.getElementById("mensagem")
        };
        const retorno = document.getElementById("formRetorno");

        function mostrarErro(campo, mensagem) {
            if (!campo) return false;
            const grupo = campo.closest(".campo");
            const aviso = grupo ? grupo.querySelector(".mensagem-erro") : null;
            if (grupo) grupo.classList.toggle("invalido", Boolean(mensagem));
            if (aviso) aviso.textContent = mensagem || "";
            campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
            return !mensagem;
        }

        function validarNome() {
            const valor = campos.nome.value.trim();
            if (valor.length < 3) {
                return mostrarErro(campos.nome, "Digite seu nome completo (mínimo 3 letras).");
            }
            return mostrarErro(campos.nome, "");
        }

        function validarEmail() {
            const valor = campos.email.value.trim();
            const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!padrao.test(valor)) {
                return mostrarErro(campos.email, "Informe um e-mail válido, como nome@exemplo.com.");
            }
            return mostrarErro(campos.email, "");
        }

        function validarAssunto() {
            if (!campos.assunto.value) {
                return mostrarErro(campos.assunto, "Escolha um assunto para a mensagem.");
            }
            return mostrarErro(campos.assunto, "");
        }

        function validarMensagem() {
            const valor = campos.mensagem.value.trim();
            if (valor.length < 10) {
                return mostrarErro(campos.mensagem, "Escreva pelo menos 10 caracteres.");
            }
            return mostrarErro(campos.mensagem, "");
        }

        function validarTelefone() {
            const valor = campos.telefone.value.trim();
            if (!valor) return mostrarErro(campos.telefone, "");
            const digitos = valor.replace(/\D/g, "");
            if (digitos.length < 10 || digitos.length > 11) {
                return mostrarErro(campos.telefone, "Informe um telefone com DDD (10 ou 11 dígitos).");
            }
            return mostrarErro(campos.telefone, "");
        }

        campos.nome?.addEventListener("blur", validarNome);
        campos.email?.addEventListener("blur", validarEmail);
        campos.telefone?.addEventListener("blur", validarTelefone);
        campos.assunto?.addEventListener("change", validarAssunto);
        campos.mensagem?.addEventListener("blur", validarMensagem);

        /* Máscara simples de telefone: (19) 99999-9999 */
        campos.telefone?.addEventListener("input", function (evento) {
            let valor = evento.target.value.replace(/\D/g, "").slice(0, 11);
            if (valor.length > 2) valor = "(" + valor.slice(0, 2) + ") " + valor.slice(2);
            if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);
            evento.target.value = valor;
        });

        const contadorMensagem = document.getElementById("contadorMensagem");
        if (contadorMensagem && campos.mensagem) {
            function atualizarContadorMensagem() {
                contadorMensagem.textContent = campos.mensagem.value.length + "/600";
            }
            campos.mensagem.addEventListener("input", atualizarContadorMensagem);
            atualizarContadorMensagem();
        }

        formularioContato.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const valido = [
                validarNome(),
                validarEmail(),
                validarTelefone(),
                validarAssunto(),
                validarMensagem()
            ].every(Boolean);

            if (!valido) {
                if (retorno) {
                    retorno.className = "form-retorno erro";
                    retorno.textContent = "Confira os campos destacados antes de enviar.";
                }
                const primeiroInvalido = formularioContato.querySelector(".campo.invalido input, .campo.invalido select, .campo.invalido textarea");
                primeiroInvalido?.focus();
                return;
            }

            if (retorno) {
                retorno.className = "form-retorno sucesso";
                retorno.innerHTML = "<strong>Mensagem enviada!</strong> Obrigada pelo contato, " +
                    campos.nome.value.trim().split(" ")[0] +
                    ". Responderemos em até 2 dias úteis. (Envio simulado para o projeto escolar.)";
            }

            formularioContato.reset();
            formularioContato.querySelectorAll(".campo").forEach(function (campo) {
                campo.classList.remove("invalido");
            });
            formularioContato.querySelectorAll(".mensagem-erro").forEach(function (aviso) {
                aviso.textContent = "";
            });
            if (contadorMensagem) contadorMensagem.textContent = "0/600";
        });
    }

    /* =====================================================================
       12. RODAPÉ — ANO AUTOMÁTICO
       ===================================================================== */

    document.querySelectorAll("[data-ano]").forEach(function (elemento) {
        elemento.textContent = new Date().getFullYear();
    });
});
