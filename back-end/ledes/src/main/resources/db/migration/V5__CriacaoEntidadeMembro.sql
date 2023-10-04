DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'Membro') THEN
        CREATE TABLE membro (
        id bigint not null,
        ativo boolean not null,
        data_ingresso timestamp,
        data_termino timestamp,
        tipo_papel integerL,
        tipo_vinculo integer,
        projeto_id bigint,
        usuario_id bigint, 
        primary key (id)           
);
    END IF;
END $$;