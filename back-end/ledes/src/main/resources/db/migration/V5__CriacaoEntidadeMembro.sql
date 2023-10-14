DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'membro') THEN
        CREATE TABLE membro (
        id int PRIMARY KEY,
        ativo boolean not null,
        data_ingresso date,
        data_termino date,
        projeto_id int,
        usuario_id int, 
        FOREIGN KEY (projeto_id) REFERENCES projeto(id),
        FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);
    END IF;
END $$;
