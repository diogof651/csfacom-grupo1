DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'usuario') THEN
        ALTER TABLE usuario
        ADD COLUMN codigo_unico VARCHAR(255);
    END IF;
END $$;
