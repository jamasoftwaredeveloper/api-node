# Usa una imagen de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Copiar el script de entrada
COPY start.sh /usr/local/bin/start.sh

# Hacer el script ejecutable
RUN chmod +x /usr/local/bin/start.sh

# Hacer ejecutable el script de inicio
RUN chmod +x start.sh

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Configurar el script de entrada
ENTRYPOINT ["start.sh"]
