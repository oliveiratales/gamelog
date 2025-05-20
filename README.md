# 🎮 GameLog

Bem-vindo ao repositório oficial do **GameLog**, plataforma criada para ajudar você a organizar e registrar sua jornada no mundo dos games. Com ele, você pode catalogar os jogos que já jogou, registrar avaliações e comentários, e ainda descobrir novas aventuras para adicionar à sua lista.

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
```

---

## 🧪 Testes

```bash
# Em breve: testes unitários e de integração
```