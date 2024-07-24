import conn from "../config/conn.js";

const tableOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS onibus(
        onibus_id INT auto_increment PRIMARY KEY,
        placa VARCHAR(255) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        ano_fabricacao YEAR(4) NOT NULL,
        capacidade INT NOT NULL,
        id_linha INT NOT NULL,
        id_motorista INT NOT NULL,
        foreign key (id_linha) references linhas(linha_id),
        foreign key (id_motorista) references motoristas(motorista_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

conn.query(tableOnibus, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }

  console.log("Tabela [onibus] criada com sucesso!");
});
