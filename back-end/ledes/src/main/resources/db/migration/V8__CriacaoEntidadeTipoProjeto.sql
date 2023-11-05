DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'tipo_projeto') THEN
        CREATE TABLE tipo_projeto (
            id INT PRIMARY KEY,
            tipo VARCHAR(255) NOT NULL UNIQUE,
            ativo BOOLEAN
        );
    END IF;
END $$;
