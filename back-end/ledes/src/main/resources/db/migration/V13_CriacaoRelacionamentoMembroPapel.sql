CREATE TABLE membro_tipo_papel (
    membro_id BIGINT,
    tipo_papel_id BIGINT,
    PRIMARY KEY (membro_id, tipo_papel_id),
    FOREIGN KEY (membro_id) REFERENCES membro(id),
    FOREIGN KEY (tipo_papel_id) REFERENCES tipo_papel(id)
);

