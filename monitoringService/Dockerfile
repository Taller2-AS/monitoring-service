# Imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto gRPC (debe coincidir con el del .env)
EXPOSE 50053

# Comando para iniciar la aplicación
CMD ["npm", "start"]
