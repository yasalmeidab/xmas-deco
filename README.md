# X'mas Deco — Magia de Natal em cada detalhe

Site de uma loja fictícia de decoração natalina, desenvolvido como projeto final da disciplina de Desenvolvimento Web. O visual mistura a estética artesanal do projeto **xmas-deco** com a base e os efeitos do projeto **AV2WEB4**.

## Como abrir o site

O site é estático (HTML, CSS e JavaScript)
1. Abra a pasta `site` no terminal.
2. Inicie um servidor local:

   ```bash
   py -m http.server 8765
   ```

3. Acesse `http://localhost:8765/` no navegador. O `index.html` da raiz redireciona para `html/index.html`.

Também é possível abrir `html/index.html` diretamente, mas o servidor local garante o carregamento correto do vídeo, do áudio e das imagens.

## Estrutura do projeto

```text
site/
├── index.html                  → entrada do site (redireciona para a Home)
├── html/
│   ├── index.html              → Home
│   ├── decoarvore.html         → Decoração de Árvore
│   ├── interno.html            → Decoração Interna
│   ├── externo.html            → Decoração Externa
│   ├── meias-e-globos.html     → Meias e Globos de Neve
│   └── contato.html            → Contato
├── css/
│   ├── style.css               → estilos gerais e componentes
│   └── responsividade.css      → media queries e ajustes por tela
├── js/
│   ├── produtos.js             → dados dos quatro catálogos
│   ├── catalogo.js             → vitrine, busca da navbar e carrinho
│   └── script.js               → abertura em vídeo, carrosséis, neve, música etc.
├── img/                        → imagens do site
├── audio/
│   └── snowmansia.mp3          → música de fundo
└── video-entrada/
    └── animaçãopapainoel.mp4   → vídeo de abertura em tela cheia
```

## Páginas

| Página | Conteúdo |
| --- | --- |
| **Home** | Carrossel principal com parallax, botões das categorias, ofertas em carrossel, história da loja, missão/visão/valores e equipe. |
| **Decoração de Árvore** | Vitrine com 12 enfeites para árvore. |
| **Decoração Interna** | Vitrine com 12 itens para ambientes internos. |
| **Decoração Externa** | Vitrine com 13 itens para fachada, jardim e entrada. |
| **Meias e Globos de Neve** | Vitrine com 13 meias e globos decorativos. |
| **Contato** | Formulário validado no navegador e informações da loja. |

## Funcionalidades

- **Abertura em vídeo:** toda visita começa com o vídeo `animaçãopapainoel.mp4` cobrindo a tela inteira em computadores e celulares. A abertura é **silenciosa** e pode ser encerrada pelo botão **Pular abertura** ou automaticamente ao final do vídeo.
- **Neve animada:** efeito de neve no carrossel principal, com botão para ligar e desligar.
- **Carrosséis:** destaque da Home e ofertas, com setas, indicadores, autoplay e arraste no celular.
- **Parallax:** movimento suave das imagens do primeiro carrossel ao rolar a página.
- **Busca unificada:** a barra de pesquisa da navbar procura nos quatro catálogos e leva o usuário à página e ao produto correspondentes.
- **Carrinho:** painel lateral com adição, remoção e alteração de quantidade. O conteúdo é salvo no `localStorage`.
- **Música de fundo:** `snowmansia.mp3` com botões de tocar, pausar e parar. O áudio da abertura é sempre desativado.
- **Contagem regressiva:** dias, horas, minutos e segundos para o Natal.
- **Formulário de contato:** validação de nome, e-mail, telefone, assunto e mensagem, com máscara de telefone e contador de caracteres. O envio é uma simulação.
- **Acessibilidade:** link para pular o conteúdo, textos alternativos, foco visível, `aria-label` nos controles e respeito à preferência `prefers-reduced-motion`.
- **Responsividade:** layout adaptado para desktops, tablets e celulares, incluindo o vídeo de abertura em tela cheia.

## Tecnologias

- HTML5
- CSS3 (variáveis, Grid, Flexbox, animações e media queries)
- JavaScript puro (Vanilla JS), sem bibliotecas
- `localStorage` para persistir o carrinho

## Observações

- As imagens de produtos externos são carregadas por URLs públicas e podem deixar de responder se os sites de origem as removerem.
- O link `img/image2.png` (avatar do Nicolas) não existe no pacote original; a imagem é ocultada automaticamente pelo `onerror` da própria página.
- O projeto é acadêmico: compras, pedidos e mensagens são apenas simulações.

## Créditos

Desenvolvido por **Isadora Almeida**, **Nicolas Almeida** e **Yasmin Almeida**.

Projeto de Desenvolvimento Web — X'mas Deco, 2026.
