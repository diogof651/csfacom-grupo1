DO $$
Begin
    If NOT EXISTS (Select 1 from information_schema.tables WHERE table_name = 'Membro') THEN
        CREATE TABLE membro (
        id INT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        tipoVinculo VARCHAR(255) NOT NULL UNIQUE,
        tipoPapel VARCHAR(255) NOT NULL,
        dataInicio DATE NOT NULL,
        dataTermino DATE,
        ativo BOOLEAN NOT NULL       
);
    END IF;
END $$;