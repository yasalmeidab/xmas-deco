/* =========================================================================
   X'MAS DECO - CATÁLOGO E LOJA (js compartilhado por todas as páginas)
   -------------------------------------------------------------------------
   1. Carrinho (contador na navbar + painel lateral, salvo no localStorage)
   2. Busca da navbar (funciona em qualquer página e encontra produtos das
      4 categorias a partir dos dados de js/produtos.js)
   3. Vitrine das páginas de categoria (inicialização automática)
   Somente JavaScript puro.
   ========================================================================= */

(function () {
    "use strict";

    /* Raiz do site, descoberta a partir do endereço deste próprio script
       (.../js/catalogo.js), para que os links funcionem de qualquer pasta. */
    const scriptAtual = document.currentScript;
    const RAIZ = scriptAtual
        ? new URL("../", scriptAtual.src).href
        : new URL("../", window.location.href).href;

    const CATALOGOS = window.XMAS_CATALOGOS || {};

    const PAGINAS = {};
    const INDICE = [];
    Object.keys(CATALOGOS).forEach(function (slug) {
        const catalogo = CATALOGOS[slug];
        PAGINAS[slug] = { nome: catalogo.nome, url: catalogo.arquivo };
        catalogo.produtos.forEach(function (produto) {
            INDICE.push({ id: produto.id, pagina: slug, nome: produto.nome });
        });
    });

    const CHAVE_CARRINHO = "xmasCarrinhoAV2";

    /* ---------------------------------------------------------------------
       Utilitários
       --------------------------------------------------------------------- */

    function normalizar(texto) {
        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function escaparHtml(texto) {
        return String(texto).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
        });
    }

    function formatarPreco(valor) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    function urlAbsoluta(caminho) {
        try {
            return new URL(caminho, window.location.href).href;
        } catch (erro) {
            return caminho;
        }
    }

    /* ---------------------------------------------------------------------
       Aviso (toast)
       --------------------------------------------------------------------- */

    let temporizadorToast = null;

    function mostrarToast(texto) {
        let toast = document.getElementById("toastXmas");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toastXmas";
            toast.className = "toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }
        toast.textContent = texto;
        toast.classList.add("visivel");
        window.clearTimeout(temporizadorToast);
        temporizadorToast = window.setTimeout(function () {
            toast.classList.remove("visivel");
        }, 2800);
    }

    /* =====================================================================
       1. CARRINHO
       ===================================================================== */

    let carrinho = carregarCarrinho();

    function carregarCarrinho() {
        try {
            const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || "{}");
            const limpo = {};
            Object.keys(dados).forEach(function (chave) {
                const item = dados[chave];
                if (item && typeof item.preco === "number" && item.qtd > 0) {
                    limpo[chave] = item;
                }
            });
            return limpo;
        } catch (erro) {
            return {};
        }
    }

    function salvarCarrinho() {
        try {
            localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        } catch (erro) {
            /* sem armazenamento: o carrinho vale apenas nesta página */
        }
    }

    function contarItens() {
        return Object.keys(carrinho).reduce(function (total, chave) {
            return total + carrinho[chave].qtd;
        }, 0);
    }

    function calcularTotal() {
        return Object.keys(carrinho).reduce(function (total, chave) {
            return total + carrinho[chave].preco * carrinho[chave].qtd;
        }, 0);
    }

    function criarPainelCarrinho() {
        if (document.getElementById("carrinhoPainel")) return;
        document.body.insertAdjacentHTML("beforeend", [
            '<div class="carrinho-overlay" id="carrinhoOverlay" aria-hidden="true"></div>',
            '<aside class="carrinho-painel" id="carrinhoPainel" aria-label="Carrinho de compras" aria-hidden="true">',
            '  <header class="carrinho-cabecalho">',
            '    <div>',
            '      <span class="carrinho-sobretitulo">Sua sacola</span>',
            '      <h2>Meu carrinho</h2>',
            '    </div>',
            '    <button class="carrinho-fechar" id="fecharCarrinho" type="button" aria-label="Fechar carrinho">&times;</button>',
            '  </header>',
            '  <div class="carrinho-mensagem" id="carrinhoMensagem" role="status" hidden></div>',
            '  <div class="carrinho-itens" id="carrinhoItens"></div>',
            '  <footer class="carrinho-rodape">',
            '    <div class="carrinho-total">',
            '      <span>Total</span>',
            '      <strong id="carrinhoTotal">R$ 0,00</strong>',
            '    </div>',
            '    <p class="carrinho-aviso">Projeto escolar: a compra é apenas uma simulação.</p>',
            '    <button class="btn btn-primario btn-bloco" id="finalizarCompra" type="button">Finalizar compra</button>',
            '    <button class="btn btn-fantasma btn-bloco" id="btnContinuarComprando" type="button">Continuar comprando</button>',
            '  </footer>',
            '</aside>'
        ].join("\n"));
    }

    function abrirCarrinho() {
        const painel = document.getElementById("carrinhoPainel");
        const overlay = document.getElementById("carrinhoOverlay");
        if (!painel || !overlay) return;
        overlay.classList.add("visivel");
        painel.classList.add("aberto");
        overlay.setAttribute("aria-hidden", "false");
        painel.setAttribute("aria-hidden", "false");
        document.body.classList.add("sem-scroll");
        document.getElementById("fecharCarrinho").focus();
    }

    function fecharCarrinho() {
        const painel = document.getElementById("carrinhoPainel");
        const overlay = document.getElementById("carrinhoOverlay");
        if (!painel || !overlay) return;
        painel.classList.remove("aberto");
        overlay.classList.remove("visivel");
        painel.setAttribute("aria-hidden", "true");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("sem-scroll");
    }

    function atualizarCarrinho() {
        const itensContainer = document.getElementById("carrinhoItens");
        const totalContainer = document.getElementById("carrinhoTotal");
        const chaves = Object.keys(carrinho);

        if (itensContainer && totalContainer) {
            if (!chaves.length) {
                itensContainer.innerHTML = [
                    '<div class="carrinho-vazio">',
                    '  <h3>Seu carrinho está vazio</h3>',
                    '  <p>Escolha seus enfeites favoritos e espalhe a magia do Natal.</p>',
                    '  <a class="btn btn-primario" href="' + RAIZ + 'html/index.html#catalogo">Ver produtos</a>',
                    '</div>'
                ].join("");
            } else {
                itensContainer.innerHTML = chaves.map(function (chave) {
                    const item = carrinho[chave];
                    const chaveAttr = escaparHtml(chave);
                    return [
                        '<article class="carrinho-item">',
                        '  <img src="' + escaparHtml(item.imagem) + '" alt="' + escaparHtml(item.nome) + '">',
                        '  <div class="carrinho-item-info">',
                        '    <h3>' + escaparHtml(item.nome) + '</h3>',
                        '    <span>' + formatarPreco(item.preco) + ' / un.</span>',
                        '    <div class="carrinho-item-acoes">',
                        '      <div class="seletor-quantidade seletor-pequeno">',
                        '        <button type="button" data-carrinho-menos="' + chaveAttr + '" aria-label="Diminuir ' + escaparHtml(item.nome) + '">&minus;</button>',
                        '        <span aria-label="Quantidade">' + item.qtd + '</span>',
                        '        <button type="button" data-carrinho-mais="' + chaveAttr + '" aria-label="Aumentar ' + escaparHtml(item.nome) + '">+</button>',
                        '      </div>',
                        '      <strong>' + formatarPreco(item.preco * item.qtd) + '</strong>',
                        '    </div>',
                        '  </div>',
                        '  <button class="carrinho-remover" type="button" data-carrinho-remover="' + chaveAttr + '" aria-label="Remover ' + escaparHtml(item.nome) + '">&times;</button>',
                        '</article>'
                    ].join("");
                }).join("");
            }
            totalContainer.textContent = formatarPreco(calcularTotal());
        }

        const total = contarItens();
        document.querySelectorAll("[data-carrinho-contador]").forEach(function (el) {
            el.textContent = total;
        });
        const botao = document.getElementById("btnCarrinho");
        if (botao) {
            botao.setAttribute("aria-label", "Abrir carrinho - " + total + " item(ns)");
        }
    }

    function adicionarAoCarrinho(produto) {
        const chave = produto.pagina + "-" + produto.id;
        if (carrinho[chave]) {
            carrinho[chave].qtd = Math.min(carrinho[chave].qtd + 1, 99);
        } else {
            carrinho[chave] = {
                nome: produto.nome,
                preco: produto.preco,
                imagem: urlAbsoluta(produto.imagem),
                qtd: 1
            };
        }
        salvarCarrinho();
        atualizarCarrinho();

        const botao = document.getElementById("btnCarrinho");
        if (botao) {
            botao.classList.remove("pulsar");
            void botao.offsetWidth;
            botao.classList.add("pulsar");
        }
        mostrarToast(produto.nome + " foi adicionado ao carrinho.");
    }

    function alterarQuantidade(chave, variacao) {
        if (!carrinho[chave]) return;
        carrinho[chave].qtd = Math.min(carrinho[chave].qtd + variacao, 99);
        if (carrinho[chave].qtd <= 0) delete carrinho[chave];
        salvarCarrinho();
        atualizarCarrinho();
    }

    function finalizarCompra() {
        if (!contarItens()) {
            mostrarToast("Seu carrinho está vazio.");
            return;
        }
        const total = calcularTotal();
        carrinho = {};
        salvarCarrinho();
        atualizarCarrinho();

        const mensagem = document.getElementById("carrinhoMensagem");
        if (mensagem) {
            mensagem.hidden = false;
            mensagem.classList.add("visivel");
            mensagem.innerHTML = "<strong>Pedido registrado!</strong> Obrigado por comprar na X'mas Deco. " +
                "Este é um projeto escolar: nenhuma cobrança foi realizada.";
        }
        mostrarToast("Pedido simulado concluído. Total: " + formatarPreco(total) + ".");
    }

    function configurarCarrinho() {
        criarPainelCarrinho();

        const botao = document.getElementById("btnCarrinho");
        if (botao) botao.addEventListener("click", abrirCarrinho);

        document.getElementById("fecharCarrinho").addEventListener("click", fecharCarrinho);
        document.getElementById("carrinhoOverlay").addEventListener("click", fecharCarrinho);
        document.getElementById("btnContinuarComprando").addEventListener("click", fecharCarrinho);
        document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);

        document.getElementById("carrinhoItens").addEventListener("click", function (evento) {
            const alvo = evento.target.closest("button");
            if (!alvo) return;
            if (alvo.hasAttribute("data-carrinho-mais")) {
                alterarQuantidade(alvo.getAttribute("data-carrinho-mais"), 1);
            } else if (alvo.hasAttribute("data-carrinho-menos")) {
                alterarQuantidade(alvo.getAttribute("data-carrinho-menos"), -1);
            } else if (alvo.hasAttribute("data-carrinho-remover")) {
                alterarQuantidade(alvo.getAttribute("data-carrinho-remover"), -99);
            }
        });

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") fecharCarrinho();
        });

        /* Mantém o contador igual entre abas abertas */
        window.addEventListener("storage", function (evento) {
            if (evento.key === CHAVE_CARRINHO) {
                carrinho = carregarCarrinho();
                atualizarCarrinho();
            }
        });

        atualizarCarrinho();
    }

    /* =====================================================================
       2. BUSCA DA NAVBAR (todas as páginas -> 4 categorias)
       ===================================================================== */

    function buscarNoIndice(termo) {
        const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
        if (!palavras.length) return [];
        return INDICE.filter(function (item) {
            const nome = normalizar(item.nome);
            return palavras.every(function (palavra) { return nome.indexOf(palavra) !== -1; });
        });
    }

    function escolherMelhorPagina(resultados, termo) {
        const alvo = normalizar(termo);
        const exato = resultados.find(function (item) {
            return normalizar(item.nome) === alvo;
        });
        if (exato) return exato.pagina;

        const contagem = {};
        resultados.forEach(function (item) {
            contagem[item.pagina] = (contagem[item.pagina] || 0) + 1;
        });
        /* Página com mais resultados; empate = a primeira na ordem do menu */
        return Object.keys(PAGINAS).reduce(function (melhor, pagina) {
            if (!contagem[pagina]) return melhor;
            return !melhor || contagem[pagina] > contagem[melhor] ? pagina : melhor;
        }, null);
    }

    function configurarBusca() {
        const formulario = document.getElementById("searchForm");
        const campo = document.getElementById("searchInput");
        if (!formulario || !campo) return;

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const termo = campo.value.trim();

            if (!termo) {
                mostrarToast("Digite o nome de um produto para pesquisar.");
                campo.focus();
                return;
            }

            const resultados = buscarNoIndice(termo);
            if (!resultados.length) {
                mostrarToast("Nenhum produto encontrado para \"" + termo + "\".");
                return;
            }

            const pagina = escolherMelhorPagina(resultados, termo);
            const daPagina = resultados.filter(function (item) { return item.pagina === pagina; });
            let destino = RAIZ + PAGINAS[pagina].url + "?termo=" + encodeURIComponent(termo);
            if (daPagina.length === 1) destino += "&produto=" + daPagina[0].id;
            window.location.href = destino;
        });
    }

    /* =====================================================================
       3. VITRINE DAS PÁGINAS DE CATEGORIA
       ===================================================================== */

    function criarCard(produto, nomeCategoria) {
        return [
            '<div class="card-produto" id="produto-' + produto.id + '" data-id="' + produto.id + '">',
            '  <img src="' + escaparHtml(produto.imagem) + '" alt="' + escaparHtml(produto.nome) + '" class="produto-img" loading="lazy">',
            '  <div class="produto-info">',
            '    <span class="produto-categoria">' + escaparHtml(nomeCategoria) + '</span>',
            '    <h3 class="produto-nome">' + escaparHtml(produto.nome) + '</h3>',
            '    <p class="produto-preco">' + formatarPreco(produto.preco) + '</p>',
            '    <button class="btn-comprar" type="button" data-id="' + produto.id + '">Adicionar ao Carrinho</button>',
            '  </div>',
            '</div>'
        ].join("");
    }

    function iniciarCategoria(config) {
        const container = document.getElementById("container-produtos");
        if (!container) return;

        const lista = config.produtos.filter(function (p) { return p.disponivel !== false; });
        const parametros = new URLSearchParams(window.location.search);
        const termo = (parametros.get("termo") || "").trim();
        const idDestaque = parseInt(parametros.get("produto"), 10);
        const aviso = document.getElementById("avisoBusca");

        const campoBusca = document.getElementById("searchInput");
        if (campoBusca && termo) campoBusca.value = termo;

        let visiveis = lista;
        if (termo) {
            const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
            visiveis = lista.filter(function (p) {
                const nome = normalizar(p.nome);
                return palavras.every(function (palavra) { return nome.indexOf(palavra) !== -1; });
            });
        }

        if (visiveis.length) {
            container.innerHTML = visiveis.map(function (p) {
                return criarCard(p, config.nome);
            }).join("");
        } else {
            container.innerHTML = '<p class="mensagem-sem-produtos">Nenhum produto desta categoria corresponde à busca.</p>';
        }

        container.addEventListener("click", function (evento) {
            const botao = evento.target.closest(".btn-comprar");
            if (!botao) return;
            const id = parseInt(botao.getAttribute("data-id"), 10);
            const produto = lista.find(function (p) { return p.id === id; });
            if (produto) {
                adicionarAoCarrinho({
                    pagina: config.slug,
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    imagem: produto.imagem
                });
            }
        });

        /* Faixa de resultado: quantidade, link para limpar e outras categorias */
        if (aviso && termo) {
            const resultados = buscarNoIndice(termo);
            const contagem = {};
            resultados.forEach(function (item) {
                contagem[item.pagina] = (contagem[item.pagina] || 0) + 1;
            });
            const outras = Object.keys(PAGINAS).filter(function (pagina) {
                return pagina !== config.slug && contagem[pagina];
            }).map(function (pagina) {
                return '<a href="' + RAIZ + PAGINAS[pagina].url + '?termo=' + encodeURIComponent(termo) + '">' +
                    PAGINAS[pagina].nome + ' (' + contagem[pagina] + ')</a>';
            });

            aviso.hidden = false;
            aviso.innerHTML = '<span>' + visiveis.length + ' resultado(s) para "<strong>' + escaparHtml(termo) +
                '</strong>" nesta categoria.</span> ' +
                '<a class="aviso-limpar" href="' + window.location.pathname + '">Ver todos os produtos</a>' +
                (outras.length ? '<span class="aviso-outras">Também encontrado em: ' + outras.join(" &middot; ") + '</span>' : "");
        }

        /* Destaque do produto encontrado pela busca */
        if (idDestaque) {
            const card = document.getElementById("produto-" + idDestaque);
            if (card) {
                card.classList.add("produto-encontrado");
                window.setTimeout(function () {
                    card.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 250);
            }
        }
    }

    /* Descobre automaticamente qual catálogo deve ser exibido nesta página. */
    function iniciarCategoriaDaPagina() {
        const container = document.getElementById("container-produtos");
        if (!container) return;

        const slugAtributo = document.body.getAttribute("data-categoria");
        const slugClasse = Object.keys(CATALOGOS).find(function (slug) {
            return document.body.classList.contains("pagina-" + slug);
        });
        const slug = slugAtributo || slugClasse;

        if (slug && CATALOGOS[slug]) {
            iniciarCategoria({
                slug: slug,
                nome: CATALOGOS[slug].nome,
                produtos: CATALOGOS[slug].produtos
            });
        }
    }

    window.XmasLoja = {
        iniciarCategoria: iniciarCategoria,
        mostrarToast: mostrarToast
    };

    document.addEventListener("DOMContentLoaded", function () {
        configurarCarrinho();
        configurarBusca();
        iniciarCategoriaDaPagina();
    });
})();
