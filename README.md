# 🎮 GameLog

Bem-vindo ao repositório oficial do **GameLog**, plataforma criada para ajudar você a organizar e registrar sua jornada no mundo dos games. Com ele, você pode catalogar os jogos que já jogou, registrar avaliações e incluir seus comentários.

---

## ⚙️ Tecnologias Utilizadas

### API (Backend) + IGDB API (Externa)
- Node.js
- Express
- Sequelize
- MySQL
- dotenv
- Swagger (documentação da API)
- Jest (testes)

### APP (Frontend)
- React
- Axios
- React Router
- Formik + Yup
- MUI

---

## 🚀 Como Executar o Projeto

### 📦 Configuração do Backend (API)

```bash
# Acesse a pasta da API
cd api

# Instale as dependências
npm install

# Crie o arquivo .env baseado no .env.example
cp .env.example .env

# Configure as variáveis de ambiente (.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_banco
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
CLIENT_ID=twitch_client_id
CLIENT_SECRET=twitch_client_secret

# Inicie o servidor
npm run dev
```

---

### 🖥️ Configuração do Frontend (APP)

```bash
# Acesse a pasta da aplicação
cd app

# Instale as dependências
npm install

# Inicie o frontend
npm run dev
```

---

## 🐳 Executando com Docker

Você pode executar toda a aplicação com Docker, sem precisar configurar `.env` manualmente. O Docker já cuida disso para você!

### 1. Execute os containers

Na raiz do projeto (onde está o `docker-compose.yml`), rode o seguinte comando:

```bash
docker-compose up --build
```

Esse comando irá:

- Subir o banco MySQL
- Subir a API e aguardar o banco estar pronto
- Subir o frontend

---

### 2. Acesse as aplicações

- API: [http://localhost:3000](http://localhost:3000)
- Documentação da API (Swagger): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Frontend: [http://localhost:5173](http://localhost:5173)

---

### 3. Finalizando

Para parar todos os containers, execute:

```bash
docker-compose down
```

---

## 📑 Documentação da API

A documentação da API está disponível via Swagger:

```
http://localhost:3000/api-docs
```

---

## 🔐 Variáveis de Ambiente (exemplo)

```env
# .env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=banco_nome
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
CLIENT_ID=twitch_client_id
CLIENT_SECRET=twitch_client_secret
```

OBS.: Acesse o Twitch Developers para extrair o Client ID e Client Secret. 

Twitch Developers Docs: https://api-docs.igdb.com/?javascript#getting-started

---

## 🧪 Testes

```bash
cd api
npm run test
```