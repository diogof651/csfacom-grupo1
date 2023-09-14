CREATE TABLE IF NOT EXISTS projeto (
    id INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    inico DATE NOT NULL,
    termino DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL
);





