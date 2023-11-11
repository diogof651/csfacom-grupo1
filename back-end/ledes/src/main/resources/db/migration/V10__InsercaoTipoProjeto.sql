DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'projeto') THEN
        ALTER TABLE projeto
        ADD COLUMN tipo_projeto_id INT,
        ADD CONSTRAINT fk_projeto_tipo_projeto FOREIGN KEY (tipo_projeto_id) REFERENCES tipo_projeto(id);
    END IF;
END $$;