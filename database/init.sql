CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    legajo VARCHAR(50) NOT NULL,
    feature VARCHAR(50),
    servicio VARCHAR(50),
    estado VARCHAR(50)
);


INSERT INTO members (nombre, apellido, legajo, feature, servicio, estado) VALUES
('Yanina Fatima Ester', 'Martinez', '34795', 'Feature 01', 'Coordinación', 'Completo'),
('Dana Natasha', 'Cadabon', '31001', 'Feature 02', 'Frontend', 'Completo'),
('Yael Noemi', 'Pilar Luque', '31486', 'Feature 03', 'Backend', 'Completo'),
('Sofia', 'Lindon', '31058', 'Feature 04', 'Base de Datos', 'Completo');
