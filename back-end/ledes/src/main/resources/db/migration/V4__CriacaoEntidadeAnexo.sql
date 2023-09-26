DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'anexo') THEN
        CREATE TABLE anexo (
            id INT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            conteudo TEXT NOT NULL,
            noticia_id BIGINT NOT NULL,
            FOREIGN KEY (noticia_id) REFERENCES noticia(id)
        );
    END IF;
END $$;
