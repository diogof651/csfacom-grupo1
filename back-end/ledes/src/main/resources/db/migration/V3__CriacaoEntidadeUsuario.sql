DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'Usuario') THEN
        CREATE TABLE usuario (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        ativo BOOLEAN,
        fotoPerfil VARCHAR(255),
        link VARCHAR(255)
);
    END IF;
END $$;





