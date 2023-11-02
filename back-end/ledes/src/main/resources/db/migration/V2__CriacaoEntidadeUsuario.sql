DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'usuario') THEN
        CREATE TABLE usuario (
        id INT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        ativo BOOLEAN NOT NULL,
        senha VARCHAR(255),
        foto_perfil text,
        github VARCHAR(255),
        linkedin VARCHAR(255)
);
    END IF;
END $$;
