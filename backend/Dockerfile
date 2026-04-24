# Usamos la versión slim
FROM python:3.12-slim

# Instalamos curl (necesario para el HEALTHCHECK)
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Creamos un usuario no-root 
RUN useradd -m appuser
WORKDIR /home/appuser

# Instalamos dependencias primero 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el código
COPY app.py .

# Cambiamos al usuario no-root
USER appuser

# Exponemos el puerto
EXPOSE 5000

# Verificamos la salud del servicio
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

# Usamos Gunicorn para producción
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-", "app:app"]