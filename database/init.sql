CREATE TABLE miembros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    legajo VARCHAR(20),
    feature VARCHAR(20),
    servicio VARCHAR(50),
    estado VARCHAR(20)
);

INSERT INTO miembros (nombre, apellido, legajo, feature, servicio, estado) VALUES
('Julian Valentin', 'Coloma Visconti', '33214', '01', 'Coordinación e Infraestructura Base', 'running'),
('Tomas', 'Soler', '33378', '02', 'Frontend', 'running'),
('Hajime', 'Shiroma', '31113', '03', 'Backend', 'running'),
('Lucas Ignacio', 'Modernell', '33364', '04', 'Database', 'running'),
('Tomas', 'Rosato', '33280', '05', 'Monitoreo', 'running'),
('Mariano', 'Salas', '32758', '06', 'Extensión Opcional', 'running');
