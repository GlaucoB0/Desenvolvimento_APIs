import conn from "../config/conn.js";

const tableLinhas = /*sql*/ `
    CREATE TABLE IF NOT EXISTS linhas(
        linha_id INT auto_increment PRIMARY KEY,
        nome_linha varchar(255) not null,
        numero_linha varchar(255) not null,
        itinerario varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    );
`;

conn.query(tableLinhas, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }

  console.log("Tabela [Linhas] criada com sucesso!");
});
