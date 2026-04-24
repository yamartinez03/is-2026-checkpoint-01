const API_URL = 'http://localhost:5000';

const tableBody = document.getElementById("table-body");

const status = document.getElementById("backend-status");

function setBackendStatus(state, message) {
    status.classList.remove("unknown", "ok", "error");
    status.classList.add(state);
    status.textContent = message;
}

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
        setBackendStatus("unknown", "Verificando...");

        const healthData = await fetchHealth();
        const normalizedHealth = String(healthData.status || "").toLowerCase();

        if (normalizedHealth === "ok") {
            setBackendStatus("ok", "OK");
        } else {
            setBackendStatus("unknown", healthData.status || "Desconocido");
        }

        const members = await fetchTeam();

        tableBody.innerHTML = "";

        members.forEach(member => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${member.nombre} ${member.apellido}</td>
                <td>${member.legajo}</td>
                <td>${member.feature}</td>
                <td>${member.servicio}</td>
                <td>${member.estado}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        setBackendStatus("error", "No disponible");
        console.error(error);
    }
}

loadData();
