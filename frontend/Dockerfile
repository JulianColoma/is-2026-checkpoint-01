FROM python:3.12-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos la carpeta html 
COPY html/ ./html/

# Exponemos el puerto 
EXPOSE 8080

# Levantamos el servidor HTTP apuntando a la carpeta html
CMD ["python3", "-m", "http.server", "8080", "--directory", "html"]