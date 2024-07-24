import conn from "../config/conn.js";

const tableMotoristas = /*sql*/ `
    CREATE TABLE IF NOT EXISTS motoristas(
        motorista_id int auto_increment PRIMARY KEY not null,
        nome varchar(255) not null,
        data_nascimento date not null,
        numero_carteira_habilitacao varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    );
`;

conn.query(tableMotoristas, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }

  console.log("Tabela [Motoristas] criada com sucesso!");
});
