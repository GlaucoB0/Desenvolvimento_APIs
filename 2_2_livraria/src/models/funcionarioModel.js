import conn from "../config/conn.js"

const tableFuncionarios = /*sql*/`
    CREATE TABLE IF NOT EXISTS funcionarios(
        id VARCHAR(60) PRIMARY KEY not null,
        nome varchar(255) not null,
        cargo varchar(255) not null,
        data_contratacao date not null,
        salario decimal(10,2) not null,
        email varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    );
`

conn.query(tableFuncionarios, (err, result, field)=>{
    if(err){
        console.error("erro ao criar a tabela"+err.stack)
        return
    }

    console.log("Tabela [funcionarios] criada com sucesso!")
})
