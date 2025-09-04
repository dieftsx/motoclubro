import type { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'aventura-pelo-pais-a-grande-viagem',
    title: 'Aventura pelo País: A Grande Viagem',
    description: 'Junte-se a nós enquanto relembramos nossa jornada épica pelo país, enfrentando diversos terrenos e criando memórias inesquecíveis.',
    content: `Nossa jornada começou em uma manhã fresca de outono. A empolgação era palpável enquanto uma dúzia de pilotos do MotoBlog Central ligava seus motores... Pilotamos por rodovias ensolaradas, passagens sinuosas nas montanhas e estradas secundárias encharcadas de chuva. Cada dia trazia novos desafios e vistas de tirar o fôlego.

Um dos destaques foi navegar pela lendária Cauda do Dragão, com suas 318 curvas em apenas 11 milhas. O rugido de nossos motores ecoava pela floresta densa enquanto nos inclinávamos em cada curva, uma sinfonia de aço e espírito.

A camaradagem foi a verdadeira alma da viagem. As noites eram passadas ao redor de fogueiras, compartilhando histórias, ajustando motos e planejando a rota do dia seguinte. Isso não foi apenas um passeio; foi uma peregrinação que fortaleceu nossos laços e nosso amor pela estrada aberta.`,
    author: {
      name: 'João "Piloto" Silva',
      avatarUrl: 'https://picsum.photos/100/100?random=1',
    },
    date: '2024-10-15',
    imageUrl: 'https://picsum.photos/1200/800?random=1',
    category: 'Turismo',
    tags: ['Cross-Country', 'Aventura', 'Viagem de Estrada'],
  },
  {
    id: 2,
    slug: 'rally-anual-de-caridade-2024-recap',
    title: 'Rally Anual de Caridade 2024: Um Sucesso Estrondoso',
    description: 'Uma retrospectiva do nosso evento de caridade de maior sucesso até agora. Pilotamos por uma causa e fizemos a diferença em nossa comunidade.',
    content: `O rally de caridade deste ano foi nada menos que espetacular. Mais de 200 motos de vários clubes se juntaram a nós para um dia de pilotagem, música e arrecadação de fundos. O evento arrecadou mais de R$ 100.000 para hospitais infantis locais.

O dia começou com um passeio panorâmico em grupo pelo campo, uma parada de cromo e cor que chamou a atenção em todas as cidades por onde passamos. De volta à sede do clube, tivemos bandas ao vivo, food trucks e uma exposição de motos que exibia algumas máquinas personalizadas incríveis.

Estamos imensamente orgulhosos do que conquistamos juntos. Um enorme obrigado a todos os participantes, voluntários e patrocinadores que tornaram este dia possível. O planejamento para 2025 já começou!`,
    author: {
      name: 'Maria "V-Twin" Souza',
      avatarUrl: 'https://picsum.photos/100/100?random=2',
    },
    date: '2024-09-20',
    imageUrl: 'https://picsum.photos/1200/800?random=2',
    category: 'Eventos',
    tags: ['Caridade', 'Comunidade', 'Rally'],
  },
  {
    id: 3,
    slug: 'guia-de-novos-equipamentos-seguranca-e-estilo',
    title: 'Guia de Novos Equipamentos: Segurança e Estilo',
    description: 'Analisamos as novidades em equipamentos para motociclistas, de capacetes de alta tecnologia a jaquetas de proteção com estilo.',
    content: `A segurança nunca deve ser comprometida, mas isso não significa que você precise sacrificar o estilo. Nesta postagem, mergulhamos nos melhores e mais recentes equipamentos de motocicleta de 2024.

Primeiro, os capacetes inteligentes com HUDs integrados e sistemas de comunicação. Testamos o novo Forcite MK1S e ficamos impressionados com seus recursos. Em seguida, analisamos o aumento dos airbags para motocicletas, avaliando coletes e jaquetas que oferecem proteção incomparável em caso de colisão.

Também cobrimos as últimas tendências em vestuário de pilotagem, onde o couro clássico encontra materiais modernos como Kevlar e Cordura para a combinação perfeita de estilo e segurança. Confira nossas principais escolhas de botas, luvas e jaquetas para mantê-lo com boa aparência e seguro em seus passeios.`,
    author: {
      name: 'Carlos "Gadget" Pereira',
      avatarUrl: 'https://picsum.photos/100/100?random=3',
    },
    date: '2024-08-05',
    imageUrl: 'https://picsum.photos/1200/800?random=3',
    category: 'Notícias',
    tags: ['Equipamento', 'Segurança', 'Análise'],
  },
  {
    id: 4,
    slug: 'a-arte-da-manutencao-de-motocicletas',
    title: 'A Arte da Manutenção de Motocicletas',
    description: 'Um guia para iniciantes para manter sua moto em ótimas condições. Aprenda o básico sobre limpeza de correntes, trocas de óleo e muito mais.',
    content: `Uma moto bem conservada é uma moto feliz. Para muitos, a manutenção de motocicletas pode parecer intimidadora, mas o básico é mais fácil do que você pensa. Verificações regulares não apenas garantem a longevidade da sua moto, mas também sua segurança na estrada.

Neste guia, orientamos você sobre o essencial:
- **Inspeção T-CLOCS:** Uma lista de verificação pré-passeio que abrange Pneus, Controles, Luzes, Óleo, Chassi e Descansos.
- **Manutenção da Corrente:** Como limpar, lubrificar e ajustar corretamente sua corrente para uma entrega de potência suave.
- **Troca de Óleo:** Um guia passo a passo para trocar o óleo e o filtro, o sangue vital do seu motor.

Sujar as mãos pode ser uma parte gratificante da experiência de possuir uma motocicleta. Comece com essas tarefas simples e construa sua confiança a partir daí.`,
    author: {
      name: 'João "Piloto" Silva',
      avatarUrl: 'https://picsum.photos/100/100?random=1',
    },
    date: '2024-07-12',
    imageUrl: 'https://picsum.photos/1200/800?random=4',
    category: 'Manutenção',
    tags: ['Faça Você Mesmo', 'Dica Técnica', 'Iniciante'],
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
}

export const getCategories = () => {
    const categories = blogPosts.map(post => post.category);
    return ['Todos', ...new Set(categories)];
}

export const getTags = () => {
    const tags = blogPosts.flatMap(post => post.tags);
    return [...new Set(tags)];
}
