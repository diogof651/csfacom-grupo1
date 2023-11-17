CREATE TABLE membro_tipo_vinculo (
    membro_id BIGINT,
    tipo_vinculo_id BIGINT,
    PRIMARY KEY (membro_id, tipo_vinculo_id),
    FOREIGN KEY (membro_id) REFERENCES membro(id),
    FOREIGN KEY (tipo_vinculo_id) REFERENCES tipo_vinculo(id)
);