DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'usuario') THEN
        CREATE TABLE usuario (
        id INT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        ativo BOOLEAN NOT NULL,
        fotoPerfil text,
        gitHub VARCHAR(255),
        linkedin VARCHAR(255)
);
    END IF;
END $$;
