# Análise de Dados Nutricionais

## Descrição
Análise de dados nutricionais utilizando SQL para manipulação de dados e JavaScript com Chart.js para visualização gráfica. O projeto oferece ferramentas para visualizar e entender padrões nutricionais por meio de gráficos interativos.

## Estrutura do Projeto
```plaintext
├── assets/
│   ├── logo.jpeg              # Logotipo do projeto
│   └── screenshots/           # Capturas de tela e imagens de exemplo
├── data/
│   └── sample_data.csv        # Dados fictícios para análise
├── scripts/
│   ├── chart_visualization.html # Página HTML para análise de calorias
│   ├── macronutrients_line.js  # Script de gráficos de linha para macronutrientes
│   ├── macronutrients_pie.js   # Script de gráficos de pizza para macronutrientes
│   └── config.js              # Configuração das chaves públicas (ver explicação abaixo)
├── sql/
│   ├── create_tables.sql      # Script para criação de tabelas no banco de dados
│   ├── insert_data.sql        # Script para inserir dados fictícios
│   └── queries.sql            # Exemplos de consultas SQL
├── .gitignore                 # Arquivos a serem ignorados no controle de versão
├── package.json               # Configuração de dependências (Node.js)
└── README.md                  # Instruções do projeto
```


## Tecnologias
- SQL: Manipulação de dados e consultas.
- JavaScript: Lógica e integração com o banco de dados.
- Chart.js: Visualização de dados em gráficos interativos.
- Supabase: Banco de dados em nuvem utilizado para armazenamento e consultas.

## Pré-requisitos
- Navegador atualizado (Google Chrome, Firefox, etc.).
- Ambiente Node.js instalado para rodar pacotes NPM.


## Como Configurar e Rodar

### Passo 1: Configurar o Banco de Dados
1. Crie um projeto no [Supabase](https://supabase.com).
2. Copie as credenciais fornecidas (URL e chave pública `anon`).
3. No painel do Supabase:
   - Execute o script `sql/create_tables.sql` para criar as tabelas no banco de dados.
   - Execute o script `sql/insert_data.sql` para popular o banco de dados com dados fictícios.

### Passo 2: Configurar o Arquivo `config.js`
1. No diretório `scripts/`, crie um arquivo chamado `config.js`.
2. Insira as seguintes informações no arquivo:
   ```javascript
   export const SUPABASE_URL = 'https://seu-url-supabase.supabase.co';
   export const SUPABASE_KEY = 'sua-chave-publica';
Atenção: Certifique-se de usar apenas a chave pública (anon key) e não uma chave administrativa.

### Passo 3: Instalar Dependências
1. Certifique-se de estar no diretório raiz do projeto no terminal.
2. Execute o seguinte comando para instalar as dependências necessárias:
   ```bash
   npm install

### Passo 4: Executar o Projeto
1. Utilize um servidor local para rodar o projeto e visualizar os gráficos. Caso esteja utilizando o Visual Studio Code, instale a extensão "Live Server" para facilitar o processo.
2. Após iniciar o servidor local, abra o arquivo `scripts/chart_visualization.html` no navegador para visualizar os gráficos interativos.

## Exemplo de Saída
Abaixo está um exemplo de saída esperada ao executar o projeto:
![Gráfico de Calorias](assets/screenshots/Análise%20Diária%20de%20Calorias.png)
![Gráfico de Distribuição de Calorias](assets/screenshots/Distribuição%20de%20Macronutrientes%20por%20Dia.png)
![Gráfico de Evolução de Macros](assets/screenshots/Evolução%20de%20Macronutrientes%20ao%20Longo%20da%20Semana.png)


## Atenção: Proteção de Dados
1. Certifique-se de que o arquivo `config.js` contenha apenas chaves públicas. Não inclua informações privadas ou administrativas no arquivo.
2. Adicione o seguinte conteúdo ao arquivo `.gitignore` para evitar o envio de arquivos sensíveis ao repositório:
   ```plaintext
   node_modules/
   config.js
   .env
   *.log
3. Para usuários que desejam replicar o projeto, inclua no `README.md` as seguintes instruções para criação do arquivo `config.js`:

   ```markdown
   ## Configuração do Arquivo `config.js`
   Para executar este projeto, é necessário criar um arquivo `config.js` no diretório `scripts/` com as seguintes informações:

   ```javascript
   export const SUPABASE_URL = 'https://seu-url-supabase.supabase.co';
   export const SUPABASE_KEY = 'sua-chave-publica';
Substitua seu-url-supabase.supabase.co e sua-chave-publica pelas credenciais fornecidas pelo Supabase ao criar o projeto.

## Repositório
Acesse o repositório do projeto no GitHub: [Análise de Dados Nutricionais](https://github.com/dayana-de-paula/analise-dados-nutricao).

## Licença
Este projeto é licenciado sob a licença MIT. Você pode utilizá-lo, modificá-lo e redistribuí-lo livremente, desde que mantenha a atribuição original ao autor.
