DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'papel') THEN
    CREATE TABLE papel (
    id INT PRIMARY KEY,
    tipo_papel VARCHAR(255)
);
    END IF;
END $$;