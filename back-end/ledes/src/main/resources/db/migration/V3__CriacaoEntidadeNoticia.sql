DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'noticia') THEN
        CREATE TABLE noticia (
            id INT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            descricao TEXT NOT NULL,
            autor VARCHAR(255) NOT NULL,
            conteudo TEXT NOT NULL,
            estado VARCHAR(50) NOT NULL,
            thumbnail TEXT,  -- Campo para armazenar uma imagem ou outro arquivo binário
            data_publicacao DATE,
            em_destaque BOOLEAN
        );
    END IF;
END $$;