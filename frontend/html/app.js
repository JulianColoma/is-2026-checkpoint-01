document.addEventListener('DOMContentLoaded', () => {
    const teamBody = document.getElementById('team-body');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    
    // URL del endpoint expuesto por el contenedor del backend
    const apiUrl = 'http://localhost:5000/api/team';

    // Función para actualizar la UI según la salud del backend
    const setBackendStatus = (isOnline) => {
        if (isOnline) {
            statusDot.classList.remove('offline');
            statusDot.classList.add('online');
            statusText.textContent = 'Backend Online';
        } else {
            statusDot.classList.remove('online');
            statusDot.classList.add('offline');
            statusText.textContent = 'Backend Offline';
        }
    };

    // Función principal para buscar y renderizar
    const fetchTeamData = async () => {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            
            const teamMembers = await response.json();
            
            // Si la promesa se resuelve correctamente, marcamos online
            setBackendStatus(true);
            
            // Limpiamos el tbody antes de inyectar
            teamBody.innerHTML = '';
            
            // Iteramos sobre los datos de la base de datos
            teamMembers.forEach(member => {
                const row = document.createElement('tr');
                
                // Asumiendo que las claves del JSON son estas, si Hajime usa 
                // nombres en inglés (ej: member.name), solo ajusta estas variables.
                row.innerHTML = `
                    <td>${member.nombre} ${member.apellido}</td>
                    <td>${member.legajo}</td>
                    <td>${member.feature}</td>
                    <td>${member.servicio}</td>
                    <td>${member.estado}</td>
                `;
                teamBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error al conectar con la API de TeamBoard:', error);
            setBackendStatus(false);
            
            // Mensaje de fallback para la tabla
            teamBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--error);">
                        No se pudieron cargar los datos. Esperando conexión con el backend en el puerto 5000...
                    </td>
                </tr>
            `;
        }
    };

    // Ejecutamos la petición ni bien carga el DOM
    fetchTeamData();
});