# X'mas Deco 🎄

Projeto final de Desenvolvimento Web — loja virtual de **decoração natalina** construída
exclusivamente com **HTML, CSS e JavaScript puro** (sem frameworks ou bibliotecas).

**Equipe:** Isadora Almeida, Nicolas Almeida e Yasmin Almeida.

## Estrutura de pastas

```
├── index.html        → redireciona para html/index.html (GitHub Pages)
├── html/             → páginas do site
│   ├── index.html    → página inicial (catálogo, destaques, promoções e "Nossa História")
│   ├── decoarvore.html     → categoria: Decoração de Árvore
│   ├── interno.html        → categoria: Decoração Interna
│   ├── externo.html        → categoria: Decoração Externa
│   ├── meias-e-globos.html → categoria: Meias e Globos de Neve
│   └── contato.html        → formulário de contato e informações da loja
├── css/
│   ├── style.css           → estilos principais
│   └── responsividade.css  → media queries e ajustes responsivos
├── js/
│   ├── produtos.js   → base de dados dos 40 produtos (4 categorias)
│   ├── catalogo.js   → catálogo, modal de produto e carrinho (localStorage)
│   └── script.js     → carrosséis, parallax, neve, contador, música, lightbox e formulário
├── img/              → imagens (otimizadas)
├── audio/            → música ambiente do site
```

## Funcionalidades

- Carrossel principal com **efeito parallax** e neve animada (persistente via `localStorage`);
- Catálogo por categoria com busca, filtros, ordenação e busca global pela URL (`?termo=`);
- Modal de detalhes do produto e **carrinho de compras** salvo no navegador;
- Contagem regressiva para o Natal, música ambiente e galeria com lightbox;
- Validação de formulário de contato com máscara de telefone e contador de caracteres;
- Layout totalmente responsivo (menu mobile, impressão e `prefers-reduced-motion`).

## Créditos de imagens e sons

### Imagens do acervo do grupo

Logo, fundos, ilustrações das categorias, banners de campanha (Papai Noel e menina),
imagem da equipe e fotos de produtos marcadas como "acervo" foram produzidas, editadas
ou geradas para este trabalho escolar. Podem ser usadas apenas para fins educacionais.

- `img/logo.png`, `img/fundohome.png`, `img/fundohome.jpeg` e `img/fundocontainerpropaganda.png` — identidade visual e fundos do projeto.
- `img/arvore.png`, `img/decoarvore.png`, `img/interno.png`, `img/externo.png`, `img/meias.png`, `img/peluciasdedecoracao.png` — ilustrações das categorias.
- `img/papainoelpropaganda.png`, `img/meninapropaganda.png`, `img/papainoeldesktop.png` e `img/osdevs.png` — banners e ilustração da equipe.
- `img/fundoverde.jpeg` — fundo do carrossel de ofertas.
- `img/biscoito.png` e `img/renabrilhante.png` — fotos decorativas usadas no carrossel e no catálogo.

### Fotos de produtos de lojas parceiras

Algumas fotos do catálogo foram obtidas em páginas públicas de lojas e marketplaces,
exclusivamente para ilustrar este projeto sem fins comerciais. Os direitos continuam
pertencendo aos autores e às lojas originais.

- [Bola de Natal listrada vermelha](https://cdn.awsli.com.br/1000x1000/2765/2765888/produto/295547971/bola-de-natal-listras-vermelho-10cm---4-un-0-g8ytcnsln3.jpg) — CDN AWS/Loja Integrada.
- [Laço dourado com glitter](https://cdn.leroymerlin.com.br/products/enfeite_arvore_natal_laco_dourado_com_glitter_16cm_4_unidades_1570790908_fa7e_600x600.jpg) — Leroy Merlin.
- [Papai Noel de vidro](https://http2.mlstatic.com/D_NQ_NP_845260-MLB113800350628_072026-O-1--mini-papai-noel-pendente-decorar-arvore-natal-9cm.webp) — Mercado Livre.
- [Pinha prateada](https://http2.mlstatic.com/D_NQ_NP_772924-MLB101926223611_122025-O.webp) — Mercado Livre.
- [Festão verde](https://static.welban.com.br/public/welban/imagens/produtos/festao-verde-5cm-x-5m-natalino-impulsetto-636bfc3e91828.jpg) — Welban.
- [Festão branco holográfico](https://images.tcdn.com.br/img/img_prod/388802/festo_hologrfico_branco_fino_natal_luxo_180m_x_5_1_20260506114716_b89a476c7dbd.jpg) — Loja Integrada.
- [Rena de cristal](https://cdn.awsli.com.br/761/761999/produto/373480799/1084074-nz30l97u19.jpg) — CDN AWS/Loja Integrada.
- [Bola dourada com glitter](https://http2.mlstatic.com/D_NQ_NP_914669-MLB109980993179_042026-O-bola-natalina-grande-enfeite-arvore-natal-dourada-15cm.webp) — Mercado Livre.
- [Mini presente para árvore](https://nilmaraquintela.com.br/wp-content/uploads/2019/11/IMG_2060.jpg) — Nilmara Quintela.
- [Festão dourado](https://static.welban.com.br/public/welban/imagens/produtos/festao-metaloide-dourado-9cm-x-2m-natalino-global-63694f000cf1c.jpg) — Welban.
- [Bolas brancas](https://m.media-amazon.com/images/I/71TlTP-QUXL._AC_SX522_.jpg) — Amazon.
- [Estrela de LED dourada](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcAKzyE167uRYrA0cQh1rL8o_1ZgmXtXYubvOgjipWoA&s=10) — Google Imagens.

### Música

**"Snowman" — Sia**, reproduzida em versão instrumental/remix a partir do arquivo
`audio/snowmansia.mp3`. A canção pertence à Sia e à Sony Music. O uso aqui é
apenas educacional, sem fins comerciais, como parte de um trabalho escolar.

> Se o projeto for publicado comercialmente, a faixa deve ser substituída por uma
> música livre de direitos autorais.

### Tecnologias e recursos

- HTML5 semântico, CSS3 (Flexbox, Grid, variáveis, animações e media queries) e JavaScript puro.
- Nenhum framework, biblioteca ou construtor de sites foi utilizado.
- Fontes do sistema (Georgia e Arial/Segoe UI), sem dependência de fontes externas.
- Ícones em SVG embutido (busca, carrinho, neve e vantagens).
- Imagens de globos de neve compostas a partir das fotos do catálogo para este projeto.
