# IS-2026-checkpoint-01: TeamBoard App

## 📝 Descripción del Proyecto
TeamBoard es una aplicación web integrada diseñada para la gestión y visualización de equipos de desarrollo. El sistema permite visualizar de forma dinámica los integrantes del grupo, las funcionalidades implementadas y el estado de salud de cada servicio.

La arquitectura utiliza una red interna de Docker para conectar un frontend en Python, una API en Flask y una base de datos PostgreSQL, todo monitoreado mediante Portainer.

## 👥 Integrantes y Features
Conforme a los requisitos del trabajo práctico, cada integrante tiene asignada una feature única y crítica para el funcionamiento del producto final:

| Nombre y Apellido | Legajo | Feature | Responsabilidad |
|:---:|:---:|:---:|:---|
| **Julian Valentin Coloma Visconti** |    | **01** | **Coordinación e Infraestructura Base**: Creación del repositorio, configuración de Docker Compose, gestión de variables de entorno y documentación base. |
| **Tomas Soler** |    | **02** | **Frontend**: Interfaz de usuario dinámica en HTML/JS servida por un servidor HTTP de Python. |
| **Hajime Shiroma** |    | **03** | **Backend**: API REST desarrollada en Flask que actúa como puente entre la DB y el frontend. |
| **Lucas Ignacio Modernell** |    | **04** | **Database**: Persistencia de datos con PostgreSQL y script de inicialización de tablas. |
| **Tomas Rosato** |    | **05** | **Monitoreo**: Implementación y configuración de Portainer para la gestión visual de la infraestructura. |
| **Mariano Salas** |    | **06** | **Extensión Opcional**: Implementación de servicio adicional (pgAdmin / Redis / API Extendida). |

## 🏗️ Arquitectura del Sistema
El proyecto utiliza una red interna de Docker para garantizar la comunicación aislada entre componentes:

* **Frontend (:8080)**: Consume datos del backend.
* **Backend (:5000)**: Procesa solicitudes y consulta la base de datos.
* **Database (Puerto Interno)**: PostgreSQL 16-alpine con volúmenes para persistencia de datos.
* **Portainer (:9000)**: Interfaz de administración conectada al socket de Docker.

## 🚀 Instrucciones de Ejecución

### Requisitos Previos
* Docker y Docker Compose instalados.
* Git para el control de versiones.

### Pasos para el despliegue
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/JulianColoma/is-2026-checkpoint-01.git
    cd is-2026-checkpoint-01
    ```
2.  **Configurar el entorno:**
    Copia el archivo de plantilla y configura las credenciales (el archivo `.env` está excluido de Git por seguridad):
    ```bash
    cp .env.example .env
    ```
3.  **Lanzar los servicios:**
    ```bash
    docker compose up -d --build
    ```
4.  **Verificación:**
    * Acceder a la App: `http://localhost:8080`.
    * Acceder a Portainer: `http://localhost:9000`.


*Este proyecto fue desarrollado bajo las normativas de Ingeniería y Calidad de Software 2026 - UTN FRLP.*