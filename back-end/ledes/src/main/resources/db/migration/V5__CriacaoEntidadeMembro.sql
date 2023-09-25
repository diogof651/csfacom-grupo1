DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'Membro') THEN
        CREATE TABLE Membro (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            foto VARCHAR(255),
            ativo BOOLEAN NOT NULL
        );
    END IF;
END $$;
