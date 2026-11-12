/* =========================================================================
   X'MAS DECO - PRODUTOS
   -------------------------------------------------------------------------
   Catálogo completo das quatro páginas de categoria. Os dados ficam em um
   único arquivo para alimentar a vitrine, a busca da navbar e o carrinho.
   As imagens locais usam ../img/ porque as páginas ficam na pasta html/.
   ========================================================================= */

window.XMAS_CATALOGOS = {
    decoarvore: {
        nome: "Decoração de Árvore",
        arquivo: "html/decoarvore.html",
        produtos: [
            { id: 1, nome: "Bola Vermelha", categoria: "Decoração", preco: 17.90, imagem: "https://cdn.awsli.com.br/1000x1000/2765/2765888/produto/295547971/bola-de-natal-listras-vermelho-10cm---4-un-0-g8ytcnsln3.jpg", disponivel: true },
            { id: 2, nome: "Estrela árvore", categoria: "Decoração", preco: 19.99, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcAKzyE167uRYrA0cQh1rL8o_1ZgmXtXYubvOgjipWoA&s=10", disponivel: true },
            { id: 3, nome: "Laços", categoria: "Decoração", preco: 11.09, imagem: "https://cdn.leroymerlin.com.br/products/enfeite_arvore_natal_laco_dourado_com_glitter_16cm_4_unidades_1570790908_fa7e_600x600.jpg", disponivel: true },
            { id: 4, nome: "Mini Papai-noel", categoria: "Decoração", preco: 10.99, imagem: "https://http2.mlstatic.com/D_NQ_NP_845260-MLB113800350628_072026-O-1--mini-papai-noel-pendente-decorar-arvore-natal-9cm.webp", disponivel: true },
            { id: 5, nome: "Pinhas decorativas", categoria: "Decoração", preco: 8.90, imagem: "https://http2.mlstatic.com/D_NQ_NP_772924-MLB101926223611_122025-O.webp", disponivel: true },
            { id: 6, nome: "Festão de natal", categoria: "Decoração", preco: 15.50, imagem: "https://static.welban.com.br/public/welban/imagens/produtos/festao-verde-5cm-x-5m-natalino-impulsetto-636bfc3e91828.jpg", disponivel: true },
            { id: 7, nome: "Festão Branco", categoria: "Decoração", preco: 15.50, imagem: "https://images.tcdn.com.br/img/img_prod/388802/festo_hologrfico_branco_fino_natal_luxo_180m_x_5_1_20260506114716_b89a476c7dbd.jpg", disponivel: true },
            { id: 8, nome: "Mini Rena", categoria: "Decoração", preco: 10.99, imagem: "https://cdn.awsli.com.br/761/761999/produto/373480799/1084074-nz30l97u19.jpg", disponivel: true },
            { id: 9, nome: "Bola dourada", categoria: "Decoração", preco: 17.90, imagem: "https://http2.mlstatic.com/D_NQ_NP_914669-MLB109980993179_042026-O-bola-natalina-grande-enfeite-arvore-natal-dourada-15cm.webp", disponivel: true },
            { id: 10, nome: "Mini presente", categoria: "Decoração", preco: 5.99, imagem: "https://nilmaraquintela.com.br/wp-content/uploads/2019/11/IMG_2060.jpg", disponivel: true },
            { id: 11, nome: "Festão dourado", categoria: "Decoração", preco: 15.50, imagem: "https://static.welban.com.br/public/welban/imagens/produtos/festao-metaloide-dourado-9cm-x-2m-natalino-global-63694f000cf1c.jpg", disponivel: true },
            { id: 12, nome: "Bola branca", categoria: "Decoração", preco: 17.90, imagem: "https://m.media-amazon.com/images/I/71TlTP-QUXL._AC_SX522_.jpg", disponivel: true }
        ]
    },

    interno: {
        nome: "Decoração Interna",
        arquivo: "html/interno.html",
        produtos: [
            { id: 1, nome: "Árvore de Natal", categoria: "Decoração", preco: 17.90, imagem: "../img/arvore-de-natal-decorada-01.jpg", disponivel: true },
            { id: 2, nome: "Vela decorativa", categoria: "Decoração", preco: 19.99, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjqgYDEOY9wLE-FN69dCbmbaDpbfKIOkAoJYMC2EJQhQ&s", disponivel: true },
            { id: 3, nome: "Relógio Natalino", categoria: "Decoração", preco: 11.09, imagem: "../img/relogionatalino.jpg", disponivel: true },
            { id: 4, nome: "Homem de Gengibre", categoria: "Decoração", preco: 10.99, imagem: "../img/gingerbread.jpg", disponivel: true },
            { id: 5, nome: "Flocos de Neves Decorativos", categoria: "Decoração", preco: 8.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSzrL1GCtxpxrnv0rOhW3_3NY1Xlg3E_a-S0j6nAOGg&s=10", disponivel: true },
            { id: 6, nome: "Tapete Boas-vindas", categoria: "Decoração", preco: 15.50, imagem: "https://bandalheira.cdn.magazord.com.br/img/2024/10/produto/14228/tpe-579-foto-2.jpg", disponivel: true },
            { id: 7, nome: "Toalha de mesa", categoria: "Decoração", preco: 15.50, imagem: "https://cdnv2.moovin.com.br/juliplast/imagens/produtos/det/02-toalha-de-mesa-natal-xadrez-vermelho-verde-dourado.webp", disponivel: true },
            { id: 8, nome: "Vela aromática: Canela", categoria: "Decoração", preco: 10.99, imagem: "https://cdn.awsli.com.br/761/761999/produto/374709352/904806-ac-ciw0bb4j4i.jpg", disponivel: true },
            { id: 9, nome: "Almofada", categoria: "Decoração", preco: 17.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjk9d92TF0fM13VuLtY6FgP03YLyzyVPAN0qc5at9HTQ&s", disponivel: true },
            { id: 10, nome: "Relógio de parede", categoria: "Decoração", preco: 5.99, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUr8iyITInwjrc_cyCfDQVmFDcPNhNcBP8BTZE3w0GQQ&s=10", disponivel: true },
            { id: 11, nome: "Laço lareira", categoria: "Decoração", preco: 15.50, imagem: "https://img.ltwebstatic.com/v4/j/spmp/2026/08/17/2e/178694848844b02791e2ffb49a41acdfb2b7c25a87_thumbnail_750x999.jpg", disponivel: true },
            { id: 12, nome: "Presente decorativo", categoria: "Decoração", preco: 17.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9Tme94LD2hSjHPpuRmzz2M2gNTlzZn4DdtGgtMeZ4g&s=10", disponivel: true }
        ]
    },

    externo: {
        nome: "Decoração Externa",
        arquivo: "html/externo.html",
        produtos: [
            { id: 1, nome: "Rena de Led", categoria: "Decoração", preco: 17.90, imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3pnx8718nco1b", disponivel: true },
            { id: 2, nome: "Placa de Jardim", categoria: "Decoração", preco: 19.99, imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98s-llbccmtev8zg4b", disponivel: true },
            { id: 3, nome: "Guirlanda", categoria: "Decoração", preco: 11.09, imagem: "https://http2.mlstatic.com/D_NQ_NP_928588-MLB99902381644_122025-O.webp", disponivel: true },
            { id: 4, nome: "Capa de porta", categoria: "Decoração", preco: 10.99, imagem: "https://m.media-amazon.com/images/I/81zlw4TxsiL._AC_UF894,1000_QL80_.jpg", disponivel: true },
            { id: 5, nome: "Boneco de neve", categoria: "Decoração", preco: 8.90, imagem: "https://polideia.com.br/cdn/shop/files/decoracao-de-natal-boneco-de-neve-gigante-polideia-decoracao-de-natal-boneco-de-neve-gigante-branco-neve-2.webp?v=1749171755", disponivel: true },
            { id: 6, nome: "Trenó decorativo", categoria: "Decoração", preco: 15.50, imagem: "https://m.media-amazon.com/images/I/71UYe+CRgkL._AC_UF894,1000_QL80_.jpg", disponivel: true },
            { id: 7, nome: "Árvore inflável", categoria: "Decoração", preco: 15.50, imagem: "https://http2.mlstatic.com/D_NQ_NP_957684-MLB99906732174_122025-O.webp", disponivel: true },
            { id: 8, nome: "Placa com LED", categoria: "Decoração", preco: 10.99, imagem: "https://images.tcdn.com.br/img/img_prod/573228/figura_de_natal_luminosa_para_jardim_sagrada_familia_basic_202209_1_89068083831420f8fa55ae6aac5b5df1.jpg", disponivel: true },
            { id: 9, nome: "Pisca-pisca externo", categoria: "Decoração", preco: 17.90, imagem: "https://cdn.awsli.com.br/600x700/1356/1356487/produto/123604218/ee672a84bb.jpg", disponivel: true },
            { id: 10, nome: "Estrela de LED", categoria: "Decoração", preco: 5.99, imagem: "https://cdn.awsli.com.br/2500x2500/508/508091/produto/246108112/2-t9rlr33lnk.jpg", disponivel: true },
            { id: 11, nome: "Presente de LED", categoria: "Decoração", preco: 15.50, imagem: "https://images.tcdn.com.br/img/img_prod/573228/figura_de_natal_luminosa_para_jardim_caixa_de_presente_com_laco_tripla_2d_202183_1_a776f54b351a1aa2ed9e5eac050fcb8c.jpg", disponivel: true },
            { id: 12, nome: "Bolas com LED", categoria: "Decoração", preco: 17.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8Rnc0IjP3wVrUK_IflO4LIs0zgWoGEstcJxjy-YfNw&s=10", disponivel: true },
            { id: 13, nome: "Árvore LED", categoria: "Decoração", preco: 17.90, imagem: "https://cdn.awsli.com.br/2500x2500/1772/1772186/produto/254324854/whatsapp-image-2024-11-20-at-11-39-13-am-fmkug9zwao.jpeg", disponivel: true }
        ]
    },

    "meias-e-globos": {
        nome: "Meias e Globos de Neve",
        arquivo: "html/meias-e-globos.html",
        produtos: [
            { id: 1, nome: "Globo Presépio", categoria: "Decoração", preco: 17.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmP65NTHfke39u9u7jgS9ZUSRarSnwcN9DMUnibeLydQ&s=10", disponivel: true },
            { id: 2, nome: "Globo boneco de neve", categoria: "Decoração", preco: 19.99, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDAl1njtGu96eyZ9YgNwW1gCsBRQDpQ2XZs-hdbLLXI27b596oKRNwvpb7&s=10", disponivel: true },
            { id: 3, nome: "Globo trenó", categoria: "Decoração", preco: 11.09, imagem: "https://i.ebayimg.com/images/g/0pMAAeSwcXppMgls/s-l1200.webp", disponivel: true },
            { id: 4, nome: "Globo renas", categoria: "Decoração", preco: 10.99, imagem: "https://imagensra.tokstok.com.br/catalog-images/7d19c55298c7fb61c5ec6e4cfb65157b-433292_OK_V01.png", disponivel: true },
            { id: 5, nome: "Globo Papai-noel", categoria: "Decoração", preco: 8.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27N6m-2Ul0OTUogQf5XEPyAHZ-Xv74nYcC0oQZTZz1Q&s", disponivel: true },
            { id: 6, nome: "Globo castelo", categoria: "Decoração", preco: 15.50, imagem: "https://thumbs.dreamstime.com/b/globo-de-neve-elegante-com-cena-inverno-e-montanhas-cobertas-por-detalhadas-este-mostra-uma-encantadora-da-maravilha-do-pequena-386452179.jpg", disponivel: true },
            { id: 7, nome: "Globo árvore", categoria: "Decoração", preco: 15.50, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbhDtmiAC623Bk-VTiOApiknRZWgNH_hfjtnod-KyXQ&s", disponivel: true },
            { id: 8, nome: "Meia verde", categoria: "Decoração", preco: 10.99, imagem: "https://cdn.awsli.com.br/761/761999/produto/373480799/1084074-nz30l97u19.jpg", disponivel: true },
            { id: 9, nome: "Meia Papai noel", categoria: "Decoração", preco: 17.90, imagem: "https://niazi.vtexassets.com/arquivos/ids/255167/MEIA-PAPAI-NOEL-VERMELHA-VERDE-48X-26-X-2CM.jpg?v=638651093913330000", disponivel: true },
            { id: 10, nome: "Meia Rena - Grande", categoria: "Decoração", preco: 5.99, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxjg7VuDBm_sneACSwt6WobTyxYL2ewjLDmuKJO-FUMg&s=10", disponivel: true },
            { id: 11, nome: "Meia boneco de neve - Média", categoria: "Decoração", preco: 15.50, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1DN3jIKAbljltnOE1G8wYiWuUKbfTFLIpvxYOvjlpLA&s=10", disponivel: true },
            { id: 12, nome: "Meia elfo - Pequena", categoria: "Decoração", preco: 17.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2NyjMCuHL5IYwNG0Ywz5lkXuUKg8GFdwencyL1BTjpw&s=10", disponivel: true },
            { id: 13, nome: "Meia família", categoria: "Decoração", preco: 17.90, imagem: "https://m.media-amazon.com/images/I/81+0o-JfsrL._AC_UF894,1000_QL80_.jpg", disponivel: true }
        ]
    }
};
