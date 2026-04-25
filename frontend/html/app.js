document.addEventListener('DOMContentLoaded', () => {
    const teamBody = document.getElementById('team-body');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');

    const apiUrl = 'http://localhost:5000/api/team';
    const healthUrl = 'http://localhost:5000/api/health';

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

    const checkBackendHealth = async () => {
        try {
            const response = await fetch(healthUrl);
            const healthy = response.ok;
            setBackendStatus(healthy);
            return healthy;
        } catch (error) {
            console.error('Error al verificar /api/health:', error);
            setBackendStatus(false);
            return false;
        }
    };

    const fetchTeamData = async () => {
        const backendHealthy = await checkBackendHealth();

        if (!backendHealthy) {
            teamBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--error);">
                        El backend no responde en /api/health. Verifica el servicio en el puerto 5000.
                    </td>
                </tr>
            `;
            return;
        }

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor al obtener el equipo');
            }

            const teamMembers = await response.json();
            teamBody.innerHTML = '';

            teamMembers.forEach(member => {
                const row = document.createElement('tr');
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
            console.error('Error al cargar los datos del equipo:', error);
            setBackendStatus(true);
            teamBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--error);">
                        El backend está activo, pero no se pudieron cargar los integrantes.
                    </td>
                </tr>
            `;
        }
    };

    fetchTeamData();
});