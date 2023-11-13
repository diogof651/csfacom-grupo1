DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'permissao') THEN
        CREATE TABLE permissao (
            id INT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
        );
    END IF;
END $$;
