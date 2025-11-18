# Usa uma imagem oficial leve do Node.js
FROM node:20-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de definição de dependência
# Isso é crucial para que o Docker possa usar o cache se as dependências não mudarem
COPY package*.json ./

# Instala todas as dependências do projeto, incluindo devDependencies (para testes)
RUN npm install

# Copia o restante do código do projeto para o contêiner
COPY . .

# Expõe a porta que o Express está escutando (porta 3000 em index.js)
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]