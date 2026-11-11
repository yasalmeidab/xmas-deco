/* =========================================================================
   X'MAS DECO — BASE DE DADOS DOS PRODUTOS
   -------------------------------------------------------------------------
   Todos os produtos ficam neste único array de objetos (requisito do
   trabalho). São 40 produtos em 4 categorias (10 por categoria):
   Decoração de Árvore, Decoração Interna, Decoração Externa e
   Meias e Globos de Neve.
   Para cadastrar um produto novo, basta copiar um objeto e alterar os dados.
   ========================================================================= */

const CATEGORIAS = [
    {
        id: "arvore",
        nome: "Decoração de Árvore",
        pagina: "decoarvore.html",
        imagem: "../img/arvore.png",
        descricao: "Bolas, estrelas, laços e tudo para deixar sua árvore inesquecível."
    },
    {
        id: "interna",
        nome: "Decoração Interna",
        pagina: "interno.html",
        imagem: "../img/produtos/casinha-relogio.jpg",
        descricao: "Peças de mesa, aparadores e detalhes que aquecem a casa."
    },
    {
        id: "externa",
        nome: "Decoração Externa",
        pagina: "externo.html",
        imagem: "../img/externo.png",
        descricao: "Luzes, guirlandas e enfeites resistentes para fachadas e jardins."
    },
    {
        id: "meias",
        nome: "Meias e Globos de Neve",
        pagina: "meias-e-globos.html",
        imagem: "../img/meias.png",
        descricao: "Globos de neve artesanais e meias para pendurar na lareira."
    },
    /* A loja é de decoração: a categoria "presentes" foi desativada.
       O bloco permanece comentado abaixo, preservado para uso futuro. */
    /*{
        id: "presentes",
        nome: "Presentes e Pelúcias",
        pagina: "presentes.html",
        imagem: "../img/peluciasdedecoracao.png",
        descricao: "Kits prontos, pelúcias e lembranças para presentear com carinho."
    }*/
];

const PRODUTOS = [
    /* ------------------------- DECORAÇÃO DE ÁRVORE ------------------------- */
    {
        id: 1,
        nome: "Bola de Natal Vermelha Listrada",
        categoria: "arvore",
        preco: 24.90,
        precoAntigo: 29.90,
        imagem: "../img/produtos/bola-vermelha.jpg",
        descricao: "Conjunto com 4 bolas vermelhas listradas de 10 cm, com acabamento fosco e brilho suave.",
        destaque: true
    },
    {
        id: 2,
        nome: "Estrela de Natal Dourada",
        categoria: "arvore",
        preco: 34.90,
        imagem: "../img/produtos/estrela-dourada.jpg",
        descricao: "Estrela de ponteira com glitter dourado e mola para fixar no topo da árvore.",
        destaque: false
    },
    {
        id: 3,
        nome: "Laço Dourado com Glitter (4 un.)",
        categoria: "arvore",
        preco: 18.90,
        imagem: "../img/produtos/laco-dourado.jpg",
        descricao: "Quatro laços de 16 cm com glitter, ideais para árvores, coroas e arranjos.",
        destaque: false
    },
    {
        id: 4,
        nome: "Festão Dourado 2 m",
        categoria: "arvore",
        preco: 22.90,
        imagem: "../img/produtos/festao-dourado.jpg",
        descricao: "Festão metaloide dourado com 2 metros, perfeito para contornar a árvore.",
        destaque: false
    },
    {
        id: 5,
        nome: "Pinha Prateada Decorativa",
        categoria: "arvore",
        preco: 14.90,
        imagem: "../img/produtos/pinha-prateada.webp",
        descricao: "Pinha natural com pontas prateadas e alça de metal para pendurar.",
        destaque: false
    },
    {
        id: 6,
        nome: "Mini Presente para Árvore",
        categoria: "arvore",
        preco: 12.90,
        imagem: "../img/produtos/mini-presente.jpg",
        descricao: "Mini caixinha de presente vermelha com laço creme, ótima para complementar a decoração.",
        destaque: false
    },
    {
        id: 7,
        nome: "Bolas Brancas Fosco (6 un.)",
        categoria: "arvore",
        preco: 39.90,
        imagem: "../img/produtos/bolas-brancas.jpg",
        descricao: "Seis bolas brancas de 8 cm com acabamento fosco e detalhes delicados.",
        destaque: true
    },
    {
        id: 8,
        nome: "Papai Noel de Vidro",
        categoria: "arvore",
        preco: 44.90,
        imagem: "../img/produtos/papai-noel-vidro.webp",
        descricao: "Enfeite de vidro soprado com Papai Noel vermelho e detalhes em glitter prata.",
        destaque: false
    },
    {
        id: 9,
        nome: "Rena de Cristal",
        categoria: "arvore",
        preco: 29.90,
        imagem: "../img/produtos/rena-cristal.jpg",
        descricao: "Rena em acrílico transparente facetado, com fita de cetim para pendurar.",
        destaque: false
    },
    {
        id: 10,
        nome: "Árvore de Natal Decorada 1,80 m",
        categoria: "arvore",
        preco: 389.90,
        precoAntigo: 449.90,
        imagem: "../img/produtos/arvore-decorada.jpg",
        descricao: "Árvore artificial de 1,80 m já montada com bolas, laços, luzes e presente na base.",
        destaque: true
    },

    /* --------------------------- DECORAÇÃO INTERNA -------------------------- */
    {
        id: 11,
        nome: "Casinha-Relógio Natalina",
        categoria: "interna",
        preco: 159.90,
        imagem: "../img/produtos/casinha-relogio.jpg",
        descricao: "Casinha decorativa com relógio funcional, iluminação interna e acabamento artesanal.",
        destaque: true
    },
    {
        id: 12,
        nome: "Biscoito de Gengibre Decorativo",
        categoria: "interna",
        preco: 27.90,
        imagem: "../img/produtos/biscoito-gengibre.jpg",
        descricao: "Boneco de gengibre em resina, com detalhes pintados à mão e alça para pendurar.",
        destaque: false
    },
    {
        id: 13,
        nome: "Estrela de LED Dourada",
        categoria: "interna",
        preco: 64.90,
        imagem: "../img/produtos/estrela-led.jpg",
        descricao: "Estrela de 40 cm com fios de LED dourados, base espiral e luz quente.",
        destaque: true
    },
    {
        id: 14,
        nome: "Pinheiro de Natal 1,50 m",
        categoria: "interna",
        preco: 269.90,
        imagem: "../img/produtos/pinheiro.jpg",
        descricao: "Pinheiro artificial de 1,50 m com galhos densos e base de metal reforçada.",
        destaque: false
    },
    {
        id: 15,
        nome: "Quebra-Nozes 40 cm",
        categoria: "interna",
        preco: 99.90,
        imagem: "../img/produtos/quebra-nozes.jpg",
        descricao: "Quebra-nozes decorativo de 40 cm, com pintura detalhada e acabamento brilhante.",
        destaque: false
    },
    {
        id: 16,
        nome: "Guirlanda Verde 30 cm",
        categoria: "interna",
        preco: 59.90,
        imagem: "../img/produtos/guirlanda.jpg",
        descricao: "Guirlanda de pinheiro artificial com 30 cm de diâmetro, ideal para portas e paredes.",
        destaque: false
    },
    {
        id: 17,
        nome: "Bola Peruana Branca",
        categoria: "interna",
        preco: 32.90,
        imagem: "../img/produtos/bola-peruana.jpg",
        descricao: "Bola de 15 cm com pintura peruana delicada em tons de dourado e verde.",
        destaque: false
    },
    {
        id: 18,
        nome: "Festão Branco Holográfico",
        categoria: "interna",
        preco: 26.90,
        imagem: "../img/produtos/festao-branco.jpg",
        descricao: "Festão branco com reflexos holográficos, com 1,80 m de comprimento.",
        destaque: false
    },
    {
        id: 19,
        nome: "Bola Dourada com Glitter",
        categoria: "interna",
        preco: 24.90,
        imagem: "../img/produtos/bola-dourada.webp",
        descricao: "Bola dourada de 15 cm coberta por glitter fino, com brilho intenso.",
        destaque: false
    },
    {
        id: 20,
        nome: "Pisca-Pisca Flocos de Neve",
        categoria: "interna",
        preco: 49.90,
        imagem: "../img/produtos/pisca-flocos.jpg",
        descricao: "Fio de luzes com 20 flocos de neve, luz branca quente e 3 metros de comprimento.",
        destaque: false
    },

    /* --------------------------- DECORAÇÃO EXTERNA -------------------------- */
    {
        id: 21,
        nome: "Guirlanda Iluminada 40 cm",
        categoria: "externa",
        preco: 89.90,
        imagem: "../img/produtos/guirlanda.jpg",
        descricao: "Guirlanda externa de 40 cm com luzes de LED e galhos resistentes à umidade.",
        destaque: false
    },
    {
        id: 22,
        nome: "Estrela de LED para Fachada",
        categoria: "externa",
        preco: 119.90,
        imagem: "../img/produtos/estrela-led.jpg",
        descricao: "Estrela luminosa de 60 cm para fachadas, com luz branca quente e baixo consumo.",
        destaque: true
    },
    {
        id: 23,
        nome: "Rena Luminosa 60 cm",
        categoria: "externa",
        preco: 149.90,
        precoAntigo: 179.90,
        imagem: "../img/produtos/rena-brilhante.png",
        descricao: "Rena decorativa iluminada, com estrutura em metal e acabamento brilhante.",
        destaque: false
    },
    {
        id: 24,
        nome: "Pinheiro Externo 1,20 m",
        categoria: "externa",
        preco: 219.90,
        imagem: "../img/produtos/pinheiro.jpg",
        descricao: "Pinheiro artificial para varandas e jardins, resistente ao sol e à chuva.",
        destaque: false
    },
    {
        id: 25,
        nome: "Pisca-Pisca 100 LEDs",
        categoria: "externa",
        preco: 69.90,
        imagem: "../img/produtos/pisca-flocos.jpg",
        descricao: "Pisca-pisca com 100 LEDs e 8 efeitos de iluminação, ideal para áreas externas.",
        destaque: false
    },
    {
        id: 26,
        nome: "Festão Dourado Externo 3 m",
        categoria: "externa",
        preco: 34.90,
        imagem: "../img/produtos/festao-dourado.jpg",
        descricao: "Festão dourado reforçado com 3 metros, próprio para portões e fachadas.",
        destaque: false
    },
    {
        id: 27,
        nome: "Estrela Dourada para Porta",
        categoria: "externa",
        preco: 39.90,
        imagem: "../img/produtos/estrela-dourada.jpg",
        descricao: "Estrela dourada de 35 cm com suporte para pendurar na porta de entrada.",
        destaque: false
    },
    {
        id: 28,
        nome: "Árvore de Natal para Varanda",
        categoria: "externa",
        preco: 299.90,
        imagem: "../img/produtos/arvore-decorada.jpg",
        descricao: "Árvore de 1,50 m já decorada, com estrutura resistente para áreas cobertas.",
        destaque: false
    },
    {
        id: 29,
        nome: "Pinha Prateada Grande",
        categoria: "externa",
        preco: 19.90,
        imagem: "../img/produtos/pinha-prateada.webp",
        descricao: "Pinha grande de 20 cm com acabamento prateado, para arranjos e jardins.",
        destaque: false
    },
    {
        id: 30,
        nome: "Festão Branco para Varanda",
        categoria: "externa",
        preco: 29.90,
        imagem: "../img/produtos/festao-branco.jpg",
        descricao: "Festão branco holográfico de 2 metros, resistente e leve para varandas.",
        destaque: false
    },

    /* ------------------------ MEIAS E GLOBOS DE NEVE ------------------------ */
    {
        id: 31,
        nome: "Kit de Meias Natalinas",
        categoria: "meias",
        preco: 89.90,
        imagem: "../img/produtos/kit-meias.png",
        descricao: "Conjunto com 4 meias de feltro bordadas para pendurar na lareira ou na parede.",
        destaque: true
    },
    {
        id: 32,
        nome: "Globo de Neve Casinha",
        categoria: "meias",
        preco: 84.90,
        imagem: "../img/produtos/globos/globo-casinha.png",
        descricao: "Globo de neve com casinha de Natal, base vermelha e neve que gira ao agitar.",
        destaque: false
    },
    {
        id: 33,
        nome: "Globo de Neve Biscoito",
        categoria: "meias",
        preco: 74.90,
        imagem: "../img/produtos/globos/globo-biscoito.png",
        descricao: "Globo de neve com biscoito de gengibre, base verde e detalhes dourados.",
        destaque: false
    },
    {
        id: 34,
        nome: "Globo de Neve Estrela",
        categoria: "meias",
        preco: 79.90,
        imagem: "../img/produtos/globos/globo-estrela.png",
        descricao: "Globo de neve com estrela dourada, base clássica e acabamento fosco.",
        destaque: false
    },
    {
        id: 35,
        nome: "Globo de Neve Pinheiro",
        categoria: "meias",
        preco: 94.90,
        imagem: "../img/produtos/globos/globo-pinheiro.png",
        descricao: "Globo de neve com pinheiro, base verde e neve artificial em suspensão.",
        destaque: true
    },
    {
        id: 36,
        nome: "Globo de Neve Quebra-Nozes",
        categoria: "meias",
        preco: 89.90,
        imagem: "../img/produtos/globos/globo-quebra-nozes.png",
        descricao: "Globo de neve com quebra-nozes, base vermelha e aro dourado.",
        destaque: false
    },
    {
        id: 37,
        nome: "Meia Natalina Bordada 45 cm",
        categoria: "meias",
        preco: 39.90,
        imagem: "../img/produtos/meia-bordada.png",
        descricao: "Meia de veludo vermelho com bordado de flocos de neve e acabamento em pelúcia.",
        destaque: false
    },
    {
        id: 38,
        nome: "Globo de Neve Árvore",
        categoria: "meias",
        preco: 99.90,
        imagem: "../img/produtos/globos/globo-arvore.png",
        descricao: "Globo de neve com árvore decorada, base dourada e efeito de neve.",
        destaque: false
    },
    {
        id: 39,
        nome: "Globo de Neve Rena",
        categoria: "meias",
        preco: 87.90,
        imagem: "../img/produtos/globos/globo-rena.png",
        descricao: "Globo de neve com rena de cristal, base vermelha e aro dourado.",
        destaque: false
    },
    {
        id: 40,
        nome: "Globo de Neve Presente",
        categoria: "meias",
        preco: 76.90,
        imagem: "../img/produtos/globos/globo-presente.png",
        descricao: "Globo de neve com caixinha de presente, base verde e neve prateada.",
        destaque: false
    },

    /* ------------------------------------------------------------------------
       PRESENTES E PELÚCIAS — desativado: a X'mas Deco é loja de decoração.
       Os produtos 41 a 50 permanecem preservados (comentados) para uso futuro.
       ------------------------------------------------------------------------ */
    /*{
        id: 41,
        nome: "Kit Decoração de Árvore",
        categoria: "presentes",
        preco: 249.90,
        precoAntigo: 289.90,
        imagem: "../img/produtos/kit-arvore.png",
        descricao: "Kit completo com bolas, estrela, laços e festão para decorar toda a árvore.",
        destaque: true
    },
    {
        id: 42,
        nome: "Kit Sala Natalina",
        categoria: "presentes",
        preco: 199.90,
        imagem: "../img/produtos/kit-interna.png",
        descricao: "Conjunto de mesa com centro de mesa, velas e pequenos enfeites coordenados.",
        destaque: false
    },
    {
        id: 43,
        nome: "Kit Fachada Natalina",
        categoria: "presentes",
        preco: 229.90,
        imagem: "../img/produtos/kit-externa.png",
        descricao: "Kit para fachada com guirlanda, luzes e enfeites resistentes à intempérie.",
        destaque: false
    },
    {
        id: 44,
        nome: "Kit Meias e Globos",
        categoria: "presentes",
        preco: 159.90,
        imagem: "../img/produtos/kit-meias.png",
        descricao: "Combinação de meias natalinas e um globo de neve para presentear.",
        destaque: false
    },
    {
        id: 45,
        nome: "Kit Pelúcias Decorativas",
        categoria: "presentes",
        preco: 179.90,
        imagem: "../img/produtos/kit-pelucias.png",
        descricao: "Trio de pelúcias natalinas macias, ideal para quartos e salas infantis.",
        destaque: true
    },
    {
        id: 46,
        nome: "Caixa de Presente Natalina",
        categoria: "presentes",
        preco: 19.90,
        imagem: "../img/produtos/mini-presente.jpg",
        descricao: "Caixa rígida com laço de cetim, disponível em vermelho e dourado.",
        destaque: false
    },
    {
        id: 47,
        nome: "Biscoito Decorativo Artesanal",
        categoria: "presentes",
        preco: 14.90,
        imagem: "../img/produtos/biscoito-decorado.jpg",
        descricao: "Biscoito decorativo artesanal, perfeito para árvores e embalagens de presente.",
        destaque: false
    },
    {
        id: 48,
        nome: "Rena Brilhante Decorativa",
        categoria: "presentes",
        preco: 39.90,
        imagem: "../img/produtos/rena-brilhante.png",
        descricao: "Rena com acabamento brilhante e base estável, para mesas e aparadores.",
        destaque: false
    },
    {
        id: 49,
        nome: "Conjunto Árvore Completa",
        categoria: "presentes",
        preco: 429.90,
        imagem: "../img/produtos/arvore-decorada.jpg",
        descricao: "Árvore de 1,80 m com enfeites, luzes e presentes coordenados para montar em minutos.",
        destaque: false
    },
    {
        id: 50,
        nome: "Papai Noel de Vidro Colecionável",
        categoria: "presentes",
        preco: 49.90,
        imagem: "../img/produtos/papai-noel-vidro.webp",
        descricao: "Peça de coleção em vidro soprado, com pintura manual e embalagem para presente.",
        destaque: false
    }
*/
];

/* -------------------------------------------------------------------------
   Funções auxiliares compartilhadas por todas as páginas.
   ------------------------------------------------------------------------- */

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function obterCategoria(id) {
    return CATEGORIAS.find(function (categoria) {
        return categoria.id === id;
    });
}

function obterProdutosDaCategoria(idCategoria) {
    return PRODUTOS.filter(function (produto) {
        return produto.categoria === idCategoria;
    });
}

function obterProduto(id) {
    return PRODUTOS.find(function (produto) {
        return produto.id === Number(id);
    });
}

function normalizarTexto(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
