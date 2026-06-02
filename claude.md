# CLAUDE.md

## Stack
- Angular 20+ com Standalone Components
- TypeScript strict mode

## Boas práticas obrigatórias

### Angular
- Sempre usar Standalone Components (sem NgModules)
- Services com `providedIn: 'root'`
- Usar `inject()` ao invés de injeção por construtor
- Reactive Forms, nunca Template-driven
- Separar lógica de negócio em Services, componentes só lidam com UI
- Lazy loading em todas as rotas
- Arquitetura limpa e bem separada

## Arquitetura do Projeto

### Estrutura de pastas
- `core/` → serviços singleton, interceptors, guards. Nunca importar entre features
- `shared/` → componentes, pipes, utils reutilizáveis. Sem lógica de negócio
- `features/` → cada feature é isolada com suas próprias pages, components, services e models

### Regras de ouro
- Features nunca se importam diretamente entre si
- Se algo é usado em 2+ features, vai para `shared/`
- Serviços globais (auth, http, storage) ficam em `core/`
- Cada feature tem seu próprio arquivo de rotas (`feature.routes.ts`) com lazy loading

### Componentes
- `pages/` → componentes de rota (smart): injetam services, gerenciam estado
- `components/` → componentes visuais (dumb/presentational): só @Input e @Output, zero lógica de negócio
- Nunca injetar services diretamente em componentes dumb

### Services
- Um service por responsabilidade (SRP)
- Services de feature ficam dentro da própria feature
- Services globais ficam em `core/`
- Lógica de negócio fica no service, nunca no componente

### Models
- Cada feature tem sua pasta `models/` com interfaces e types
- Interfaces de resposta da API ficam em `models/` da feature que a consome
- Types compartilhados entre features ficam em `shared/models/`

### Clean Code
- Funções com responsabilidade única
- Nomes de variáveis e funções descritivos e sem abreviações
- Nomes sempre em inglês (apenas comentários em português)
- Sem comentários óbvios; o código deve ser autoexplicativo
- Nome de componentes e serviços em inglês, objetivos e simples

### SOLID
- S: cada classe/service faz uma coisa só
- O: aberto para extensão, fechado para modificação (use interfaces)
- D: dependa de abstrações (interfaces), não de implementações concretas

### DRY
- Lógica repetida vira um utilitário em `shared/utils`
- Serviços podem ser utilizados em diferentes componentes para reaproveitamento de código
- Sem copy-paste — se copiou, extraia para função ou service