const API_URL = 'http://localhost:5000';

const tableBody = document.getElementById("table-body");

const status = document.getElementById("backend-status");

// Función para cargar los datos del equipo y el estado del backend
async function fetchTeam() {
    const response = await fetch(`${API_URL}/api/team`);
    if (!response.ok) {
        throw new Error("Error en Backend");
    }
    return await response.json();
}

//funcion para cargar el estado del backend
async function fetchHealth() {
    const response = await fetch(`${API_URL}/api/health`);
    if (!response.ok) {
        throw new Error("Error en Backend");
    }
    return await response.json();
}
//funcion para cargar dinámicamente los miembros desde el backend 
async function loadData() {
    try {
        const teamData = await fetchTeam();
        const healthData = await fetchHealth();
        status.textContent = `Backend: ${healthData.status} | Database: ${healthData.database}`;
        status.classList.add("ok");

        const members = await fetchTeam();

        tableBody.innerHTML = "";

        members.forEach(member => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${member.nombre} ${member.apellido}</td>
                <td>${member.legajo}</td>
                <td>${member.feature}</td>
                <td>${member.servicio}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        status.textContent = "Backend o base de datos no disponible";
        status.classList.add("error");
        console.error(error);
    }
}

loadPage();
