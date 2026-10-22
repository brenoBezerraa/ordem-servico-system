CREATE TABLE cadastros (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        servico TEXT NOT NULL,
        status BOOLEAN NOT NULL,
        data_entrada TEXT,
        modelo TEXT,
        quantidade INTEGER,
        numero TEXT,
        valor NUMERIC(12,2)
);
