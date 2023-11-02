DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'Usuario') THEN
        ALTER TABLE usuario
        ADD COLUMN codigo_hash VARCHAR(255),
        ADD COLUMN data_acesso DATE;
    END IF;
END $$;
