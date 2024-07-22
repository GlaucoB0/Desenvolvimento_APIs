import conn from "../config/conn.js";

const tableEmprestimos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS emprestimos(
        emprestimo_id VARCHAR(60) PRIMARY KEY not null,
        cliente_id varchar(60) not null,
        foreign key (cliente_id) references clientes(cliente_id),
        livro_id varchar(60) not null,
        foreign key (livro_id) references livros(livro_id),
        data_emprestimo datetime not null,
        data_devolucao datetime not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    );
`;

conn.query(tableEmprestimos, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }

  console.log("Tabela [Clientes] criada com sucesso!");
});
