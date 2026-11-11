/* =========================================================================
   X'MAS DECO — CATÁLOGO, MODAL DE PRODUTO E CARRINHO
   -------------------------------------------------------------------------
   Este arquivo é usado em todas as páginas:
   • gera os cards dos produtos a partir do array PRODUTOS (produtos.js);
   • controla a busca, os filtros por categoria e a ordenação;
   • abre o modal de detalhes ao clicar em um produto;
   • mantém o carrinho no localStorage, com painel lateral (aside).
   Nada aqui depende de bibliotecas externas: apenas JavaScript puro.
   ========================================================================= */

(function () {
    "use strict";

    const CHAVE_CARRINHO = "xmasDecoCarrinho";
    let carrinho = carregarCarrinho();
    let temporizadorToast = null;

    /* ---------------------------------------------------------------------
       Utilidades
       --------------------------------------------------------------------- */

    function carregarCarrinho() {
        try {
            const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
            if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
                return {};
            }
            const limpo = {};
            Object.keys(dados).forEach(function (id) {
                const quantidade = parseInt(dados[id], 10);
                if (obterProduto(id) && quantidade > 0) {
                    limpo[id] = Math.min(quantidade, 99);
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
            console.warn("Não foi possível salvar o carrinho:", erro);
        }
    }

    function escaparHtml(texto) {
        return String(texto)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function contarItens() {
        return Object.keys(carrinho).reduce(function (total, id) {
            return total + carrinho[id];
        }, 0);
    }

    function calcularTotal() {
        return Object.keys(carrinho).reduce(function (total, id) {
            const produto = obterProduto(id);
            return produto ? total + produto.preco * carrinho[id] : total;
        }, 0);
    }

    /* ---------------------------------------------------------------------
       Estruturas fixas: painel do carrinho, modal e aviso (toast)
       --------------------------------------------------------------------- */

    function criarEstruturas() {
        if (!document.getElementById("carrinhoPainel")) {
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
                '</aside>',
                '<div class="modal-produto" id="modalProduto" role="dialog" aria-modal="true" aria-labelledby="modalProdutoNome" aria-hidden="true">',
                '  <div class="modal-fundo" data-fechar-modal="true"></div>',
                '  <div class="modal-caixa">',
                '    <button class="modal-fechar" id="fecharModalProduto" type="button" aria-label="Fechar detalhes">&times;</button>',
                '    <div class="modal-imagem">',
                '      <img id="modalProdutoImagem" src="" alt="">',
                '    </div>',
                '    <div class="modal-conteudo">',
                '      <span class="produto-categoria" id="modalProdutoCategoria"></span>',
                '      <h2 id="modalProdutoNome"></h2>',
                '      <p class="modal-preco" id="modalProdutoPreco"></p>',
                '      <p class="modal-descricao" id="modalProdutoDescricao"></p>',
                '      <div class="modal-compra">',
                '        <div class="seletor-quantidade" aria-label="Quantidade">',
                '          <button type="button" id="modalDiminuir" aria-label="Diminuir quantidade">&minus;</button>',
                '          <input id="modalQuantidade" type="number" min="1" max="99" value="1" aria-label="Quantidade">',
                '          <button type="button" id="modalAumentar" aria-label="Aumentar quantidade">+</button>',
                '        </div>',
                '        <button class="btn btn-primario" id="modalAdicionar" type="button">Adicionar ao carrinho</button>',
                '      </div>',
                '      <p class="modal-frete">Frete grátis para compras acima de R$ 199,00.</p>',
                '    </div>',
                '  </div>',
                '</div>',
                '<div class="toast" id="toastXmas" role="status" aria-live="polite"></div>'
            ].join("\n"));
        }
    }

    /* ---------------------------------------------------------------------
       Cards de produto
       --------------------------------------------------------------------- */

    function criarCard(produto) {
        const categoria = obterCategoria(produto.categoria);
        const nomeCategoria = categoria ? categoria.nome : "Decoração";
        const selo = produto.precoAntigo
            ? '<span class="selo selo-promocao">Oferta</span>'
            : (produto.destaque ? '<span class="selo selo-destaque">Destaque</span>' : "");

        return [
            '<article class="card-produto" data-produto-id="' + produto.id + '" tabindex="0"',
            '  aria-label="Ver detalhes de ' + escaparHtml(produto.nome) + '">',
            '  <div class="produto-figura">',
            selo,
            '    <img src="' + produto.imagem + '" alt="' + escaparHtml(produto.nome) + '" class="produto-img" loading="lazy">',
            '  </div>',
            '  <div class="produto-info">',
            '    <span class="produto-categoria">' + escaparHtml(nomeCategoria) + '</span>',
            '    <h2 class="produto-nome">' + escaparHtml(produto.nome) + '</h2>',
            '    <p class="produto-preco">',
            produto.precoAntigo
                ? '<s>' + formatarPreco(produto.precoAntigo) + '</s> ' + formatarPreco(produto.preco)
                : formatarPreco(produto.preco),
            '    </p>',
            '    <button class="btn btn-comprar" type="button" data-produto-id="' + produto.id + '">',
            '      <span aria-hidden="true">+</span> Adicionar',
            '    </button>',
            '  </div>',
            '</article>'
        ].join("");
    }

    function renderizarLista(container, lista, mensagemVazia) {
        if (!container) return;

        if (!lista.length) {
            container.innerHTML = [
                '<div class="mensagem-sem-produtos">',
                '  <h2>Nenhum produto encontrado</h2>',
                '  <p>' + (mensagemVazia || "Tente outro nome ou escolha outra categoria.") + '</p>',
                '</div>'
            ].join("");
            return;
        }

        container.innerHTML = lista.map(criarCard).join("");
    }

    /* ---------------------------------------------------------------------
       Modal de detalhes do produto
       --------------------------------------------------------------------- */

    let produtoModalAtual = null;

    function abrirModalProduto(id) {
        const produto = obterProduto(id);
        if (!produto) return;

        const modal = document.getElementById("modalProduto");
        const categoria = obterCategoria(produto.categoria);
        if (!modal) return;

        produtoModalAtual = produto;

        document.getElementById("modalProdutoImagem").src = produto.imagem;
        document.getElementById("modalProdutoImagem").alt = produto.nome;
        document.getElementById("modalProdutoCategoria").textContent = categoria ? categoria.nome : "Decoração";
        document.getElementById("modalProdutoNome").textContent = produto.nome;
        document.getElementById("modalProdutoPreco").innerHTML = produto.precoAntigo
            ? '<s>' + formatarPreco(produto.precoAntigo) + '</s> ' + formatarPreco(produto.preco)
            : formatarPreco(produto.preco);
        document.getElementById("modalProdutoDescricao").textContent = produto.descricao || "";
        document.getElementById("modalQuantidade").value = 1;

        modal.classList.add("aberto");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("sem-scroll");
        document.getElementById("fecharModalProduto").focus();
    }

    function fecharModalProduto() {
        const modal = document.getElementById("modalProduto");
        if (!modal) return;
        modal.classList.remove("aberto");
        modal.setAttribute("aria-hidden", "true");
        if (!document.getElementById("carrinhoPainel").classList.contains("aberto")) {
            document.body.classList.remove("sem-scroll");
        }
        produtoModalAtual = null;
    }

    /* ---------------------------------------------------------------------
       Carrinho
       --------------------------------------------------------------------- */

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
        if (!document.getElementById("modalProduto").classList.contains("aberto")) {
            document.body.classList.remove("sem-scroll");
        }
    }

    function adicionarAoCarrinho(id, quantidade) {
        const produto = obterProduto(id);
        if (!produto) return;

        const qtd = Math.max(1, Math.min(99, parseInt(quantidade, 10) || 1));
        const atual = carrinho[produto.id] || 0;
        carrinho[produto.id] = Math.min(atual + qtd, 99);

        salvarCarrinho();
        atualizarCarrinho();
        mostrarToast(produto.nome + " foi adicionado ao carrinho.");
        const botao = document.getElementById("btnCarrinho");
        if (botao) {
            botao.classList.remove("pulsar");
            void botao.offsetWidth;
            botao.classList.add("pulsar");
        }
    }

    function alterarQuantidade(id, variacao) {
        if (!carrinho[id] && variacao <= 0) return;
        carrinho[id] = (carrinho[id] || 0) + variacao;

        if (carrinho[id] <= 0) {
            delete carrinho[id];
        } else {
            carrinho[id] = Math.min(carrinho[id], 99);
        }

        salvarCarrinho();
        atualizarCarrinho();
    }

    function removerDoCarrinho(id) {
        delete carrinho[id];
        salvarCarrinho();
        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        const itensContainer = document.getElementById("carrinhoItens");
        const totalContainer = document.getElementById("carrinhoTotal");
        if (!itensContainer || !totalContainer) return;

        const ids = Object.keys(carrinho);

        if (!ids.length) {
            itensContainer.innerHTML = [
                '<div class="carrinho-vazio">',
                '  <h3>Seu carrinho está vazio</h3>',
                '  <p>Escolha seus enfeites favoritos e espalhe a magia do Natal.</p>',
                '  <a class="btn btn-primario" href="index.html#catalogo">Ver produtos</a>',
                '</div>'
            ].join("");
        } else {
            itensContainer.innerHTML = ids.map(function (id) {
                const produto = obterProduto(id);
                if (!produto) return "";
                const quantidade = carrinho[id];
                const subtotal = produto.preco * quantidade;

                return [
                    '<article class="carrinho-item">',
                    '  <img src="' + produto.imagem + '" alt="' + escaparHtml(produto.nome) + '">',
                    '  <div class="carrinho-item-info">',
                    '    <h3>' + escaparHtml(produto.nome) + '</h3>',
                    '    <span>' + formatarPreco(produto.preco) + ' / un.</span>',
                    '    <div class="carrinho-item-acoes">',
                    '      <div class="seletor-quantidade seletor-pequeno">',
                    '        <button type="button" data-carrinho-menos="' + produto.id + '" aria-label="Diminuir ' + escaparHtml(produto.nome) + '">&minus;</button>',
                    '        <span aria-label="Quantidade">' + quantidade + '</span>',
                    '        <button type="button" data-carrinho-mais="' + produto.id + '" aria-label="Aumentar ' + escaparHtml(produto.nome) + '">+</button>',
                    '      </div>',
                    '      <strong>' + formatarPreco(subtotal) + '</strong>',
                    '    </div>',
                    '  </div>',
                    '  <button class="carrinho-remover" type="button" data-carrinho-remover="' + produto.id + '" aria-label="Remover ' + escaparHtml(produto.nome) + '">&times;</button>',
                    '</article>'
                ].join("");
            }).join("");
        }

        totalContainer.textContent = formatarPreco(calcularTotal());
        document.querySelectorAll("[data-carrinho-contador]").forEach(function (elemento) {
            elemento.textContent = contarItens();
        });

        const botao = document.getElementById("btnCarrinho");
        if (botao) {
            botao.setAttribute(
                "aria-label",
                "Abrir carrinho — " + contarItens() + " item(ns)"
            );
        }
    }

    function finalizarCompra() {
        if (!contarItens()) {
            mostrarToast("Seu carrinho está vazio.");
            return;
        }

        const mensagem = document.getElementById("carrinhoMensagem");
        const total = calcularTotal();

        carrinho = {};
        salvarCarrinho();
        atualizarCarrinho();

        if (mensagem) {
            mensagem.hidden = false;
            mensagem.innerHTML =
                "<strong>Pedido registrado!</strong> Obrigada por comprar na X'mas Deco. " +
                "Este é um projeto escolar: nenhuma cobrança foi realizada.";
            mensagem.classList.add("visivel");
        }
        mostrarToast("Pedido simulado concluído. Total: " + formatarPreco(total) + ".");
    }

    function mostrarToast(texto) {
        const toast = document.getElementById("toastXmas");
        if (!toast) return;

        toast.textContent = texto;
        toast.classList.add("visivel");

        window.clearTimeout(temporizadorToast);
        temporizadorToast = window.setTimeout(function () {
            toast.classList.remove("visivel");
        }, 2600);
    }

    /* ---------------------------------------------------------------------
       Busca, filtros e ordenação
       --------------------------------------------------------------------- */

    function configurarCatalogo() {
        const container = document.getElementById("container-produtos");
        if (!container) return;

        const categoriaFixa = container.getAttribute("data-categoria") || "";
        const busca = document.querySelector("[data-busca-catalogo]");
        const ordenar = document.getElementById("ordenarProdutos");
        const contador = document.getElementById("contadorResultados");
        const chips = Array.from(document.querySelectorAll("[data-filtro]"));

        const parametros = new URLSearchParams(window.location.search);
        const termoInicial = parametros.get("termo") || "";
        const categoriaInicial = parametros.get("categoria") || "";

        let estado = {
            termo: termoInicial,
            /* O parâmetro "categoria" da URL tem prioridade sobre a categoria
               fixa da página — assim a busca global pode listar todas as
               categorias (?categoria=todas) mesmo partindo de uma página de
               categoria. */
            categoria: categoriaInicial || categoriaFixa,
            ordem: "relevancia"
        };

        if (busca && termoInicial) {
            busca.value = termoInicial;
        }

        function aplicarAtivoChips() {
            chips.forEach(function (chip) {
                const ativo = chip.getAttribute("data-filtro") === (estado.categoria || "todas");
                chip.classList.toggle("ativo", ativo);
                chip.setAttribute("aria-pressed", ativo ? "true" : "false");
            });
        }

        function filtrar() {
            let lista = PRODUTOS.slice();

            if (estado.categoria && estado.categoria !== "todas") {
                lista = lista.filter(function (produto) {
                    return produto.categoria === estado.categoria;
                });
            }

            if (estado.termo) {
                const termo = normalizarTexto(estado.termo);
                lista = lista.filter(function (produto) {
                    return normalizarTexto(produto.nome + " " + produto.descricao).indexOf(termo) !== -1;
                });
            }

            if (estado.ordem === "preco-asc") {
                lista.sort(function (a, b) { return a.preco - b.preco; });
            } else if (estado.ordem === "preco-desc") {
                lista.sort(function (a, b) { return b.preco - a.preco; });
            } else if (estado.ordem === "nome") {
                lista.sort(function (a, b) { return a.nome.localeCompare(b.nome, "pt-BR"); });
            }

            renderizarLista(container, lista);

            if (contador) {
                const rotulo = lista.length === 1 ? "produto encontrado" : "produtos encontrados";
                contador.textContent = lista.length + " " + rotulo;
            }
        }

        if (busca) {
            let temporizador = null;
            busca.addEventListener("input", function (evento) {
                estado.termo = evento.target.value.trim();
                window.clearTimeout(temporizador);
                temporizador = window.setTimeout(filtrar, 180);
            });
        }

        chips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                estado.categoria = chip.getAttribute("data-filtro");
                aplicarAtivoChips();
                filtrar();
            });
        });

        if (ordenar) {
            ordenar.addEventListener("change", function (evento) {
                estado.ordem = evento.target.value;
                filtrar();
            });
        }

        aplicarAtivoChips();
        filtrar();
    }

    /* ---------------------------------------------------------------------
       Destaques da página inicial
       --------------------------------------------------------------------- */

    function configurarDestaques() {
        const container = document.getElementById("destaques-grid");
        if (!container) return;

        const destaques = PRODUTOS.filter(function (produto) {
            return produto.destaque;
        }).slice(0, 8);

        renderizarLista(container, destaques);
    }

    /* ---------------------------------------------------------------------
       Eventos gerais
       --------------------------------------------------------------------- */

    function configurarEventos() {
        document.addEventListener("click", function (evento) {
            const botaoComprar = evento.target.closest(".btn-comprar");
            if (botaoComprar) {
                evento.preventDefault();
                evento.stopPropagation();
                adicionarAoCarrinho(botaoComprar.getAttribute("data-produto-id"), 1);
                return;
            }

            const card = evento.target.closest(".card-produto");
            if (card && !evento.target.closest(".btn-comprar")) {
                abrirModalProduto(card.getAttribute("data-produto-id"));
            }
        });

        document.addEventListener("keydown", function (evento) {
            const card = evento.target.closest(".card-produto");
            if (card && (evento.key === "Enter" || evento.key === " ")) {
                evento.preventDefault();
                abrirModalProduto(card.getAttribute("data-produto-id"));
            }
        });

        const btnCarrinho = document.getElementById("btnCarrinho");
        if (btnCarrinho) btnCarrinho.addEventListener("click", abrirCarrinho);

        const fechar = document.getElementById("fecharCarrinho");
        if (fechar) fechar.addEventListener("click", fecharCarrinho);

        const overlay = document.getElementById("carrinhoOverlay");
        if (overlay) overlay.addEventListener("click", fecharCarrinho);

        const continuar = document.getElementById("btnContinuarComprando");
        if (continuar) continuar.addEventListener("click", fecharCarrinho);

        const finalizar = document.getElementById("finalizarCompra");
        if (finalizar) finalizar.addEventListener("click", finalizarCompra);

        const itens = document.getElementById("carrinhoItens");
        if (itens) {
            itens.addEventListener("click", function (evento) {
                const menos = evento.target.closest("[data-carrinho-menos]");
                const mais = evento.target.closest("[data-carrinho-mais]");
                const remover = evento.target.closest("[data-carrinho-remover]");

                if (menos) alterarQuantidade(menos.getAttribute("data-carrinho-menos"), -1);
                if (mais) alterarQuantidade(mais.getAttribute("data-carrinho-mais"), 1);
                if (remover) removerDoCarrinho(remover.getAttribute("data-carrinho-remover"));
            });
        }

        const fecharModal = document.getElementById("fecharModalProduto");
        if (fecharModal) fecharModal.addEventListener("click", fecharModalProduto);

        const modal = document.getElementById("modalProduto");
        if (modal) {
            modal.addEventListener("click", function (evento) {
                if (evento.target.getAttribute("data-fechar-modal") === "true") {
                    fecharModalProduto();
                }
            });
        }

        const modalMenos = document.getElementById("modalDiminuir");
        const modalMais = document.getElementById("modalAumentar");
        const modalQuantidade = document.getElementById("modalQuantidade");

        if (modalMenos && modalQuantidade) {
            modalMenos.addEventListener("click", function () {
                modalQuantidade.value = Math.max(1, parseInt(modalQuantidade.value, 10) - 1 || 1);
            });
        }
        if (modalMais && modalQuantidade) {
            modalMais.addEventListener("click", function () {
                modalQuantidade.value = Math.min(99, parseInt(modalQuantidade.value, 10) + 1 || 1);
            });
        }

        const modalAdicionar = document.getElementById("modalAdicionar");
        if (modalAdicionar && modalQuantidade) {
            modalAdicionar.addEventListener("click", function () {
                if (!produtoModalAtual) return;
                adicionarAoCarrinho(produtoModalAtual.id, modalQuantidade.value);
                fecharModalProduto();
                abrirCarrinho();
            });
        }

        document.addEventListener("keydown", function (evento) {
            if (evento.key !== "Escape") return;

            if (modal && modal.classList.contains("aberto")) {
                fecharModalProduto();
            } else if (document.getElementById("carrinhoPainel").classList.contains("aberto")) {
                fecharCarrinho();
            }
        });
    }

    /* ---------------------------------------------------------------------
       Inicialização
       --------------------------------------------------------------------- */

    document.addEventListener("DOMContentLoaded", function () {
        criarEstruturas();
        configurarEventos();
        atualizarCarrinho();
        configurarCatalogo();
        configurarDestaques();
    });
})();
