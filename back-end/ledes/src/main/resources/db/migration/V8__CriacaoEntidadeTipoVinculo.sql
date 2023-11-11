DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'tipo_vinculo') THEN
        CREATE TABLE tipo_vinculo (
            id INT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL UNIQUE,
            ativo BOOLEAN
        );
    END IF;
END $$;