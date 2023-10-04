DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'membro_vinculo') THEN
    CREATE TABLE membro_vinculo (
        id INT PRIMARY KEY,
        tipo_vinculo VARCHAR(255)
);
    END IF;
END $$;