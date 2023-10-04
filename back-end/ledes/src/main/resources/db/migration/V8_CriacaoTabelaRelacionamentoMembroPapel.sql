DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'membro_papel') THEN
    CREATE TABLE membro_papel  (
        membro_id INT,
        papel_id INT,
        PRIMARY KEY (membro_id, papel_id),
        FOREIGN KEY (membro_id) REFERENCES membro(id),
        FOREIGN KEY (papel_id) REFERENCES papel(id)
);
    END IF;
END $$;
