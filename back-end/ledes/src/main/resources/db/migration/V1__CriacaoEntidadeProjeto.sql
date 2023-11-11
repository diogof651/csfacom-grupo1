DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'projeto') THEN
        CREATE TABLE projeto (
            id INT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            descricao TEXT NOT NULL,
            inicio DATE NOT NULL,
            termino DATE NOT NULL,
            status VARCHAR(255) NOT NULL,
            ativo BOOLEAN NOT NULL
        );
    END IF;
END $$;
