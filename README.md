# **App Name**: Moto Clube Ro
 # 🏍️ MotoClube RO

## Core Features:
Bem-vindo ao repositório do **MotoClube RO**, uma aplicação web moderna construída para uma comunidade de entusiastas de motocicletas. O site serve como um ponto central para compartilhar aventuras, conectar-se com outros pilotos e mergulhar no mundo das duas rodas.

- Blog Post Creation: Allow admins to create and publish blog posts about motorcycle rides, events, or news. The app will make use of the Open AI tool to automatically suggest engaging titles and descriptions for each blog post, maximizing user engagement.
- Blog Post Display: Display blog posts in a chronological or category-based order with images and videos embedded.
- Image and Video Upload: Allow the admins to upload images and videos to enrich the content of the blog posts. Display images and videos attractively in the blog layout.
- Categories and Tags: Organize posts by categories (e.g., Touring, Events, News) and tags for easy filtering.
- Search Functionality: Implement a search bar to allow users to search for specific posts or content.
- Social Sharing: Enable social sharing buttons on each blog post to allow users to share content on social media platforms.
## ✨ Funcionalidades

## Style Guidelines:
Atualmente, o projeto inclui as seguintes funcionalidades:

- Primary color: Deep Red (#B80F0A) evoking a sense of passion and power.
- Background color: Dark Gray (#2A2A2A) to provide a sleek, modern feel.
- Accent color: Gold (#D4AF37) to highlight important elements and add a touch of class.
- Font: 'Space Grotesk' (sans-serif) for both headlines and body text; a modern and readable font with a slight edge.
- Use motorcycle-themed icons for categories and interactive elements; utilize Font Awesome or similar icon library.
- Clean and responsive design, with a focus on visual content. Grid-based layout for blog posts to ensure consistency.
- Subtle transition effects for a smooth user experience when navigating between blog posts and sections.
- **Página Inicial Dinâmica**: Uma landing page atraente com uma seção "hero" impactante, apresentação das funcionalidades do clube e uma seção "Sobre Nós".
- **Blog**: Exibição das postagens mais recentes do blog diretamente na página inicial, com um link para explorar mais.
- **Dados Estáticos**: As postagens do blog são atualmente gerenciadas através de um arquivo estático (`/src/lib/data.ts`), facilitando o desenvolvimento inicial.
- **Design Responsivo**: Construído com Tailwind CSS para uma experiência de usuário consistente em todos os dispositivos.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um stack de tecnologias moderno e robusto:

- **Next.js**: Framework React para produção.
- **React**: Biblioteca para construir interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework CSS utility-first para estilização rápida.
- **shadcn/ui**: Componentes de UI reutilizáveis.
- **Lucide React**: Biblioteca de ícones SVG.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento local.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <nomedoprojeto>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Abra no navegador:**
    Abra http://localhost:3000 no seu navegador para ver o resultado.

## ⚙️ Configuração de Imagens

O projeto utiliza o componente `next/image` para otimização de imagens. As imagens remotas são permitidas a partir dos seguintes domínios, configurados em `next.config.js`:

- `picsum.photos`
- `www.pexels.com`

Imagens locais são importadas diretamente dos diretórios `public` ou `src/assets`.
