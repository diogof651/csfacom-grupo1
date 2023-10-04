DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'Membro') THEN
        CREATE TABLE membro_tipos_vinculo (
        tipo_papel varchar(255),
        foreign key (membro_id) references membro       
);
    END IF;
END $$;