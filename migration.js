const db = require("./db")

const ESTRUTURA_CLIENTE = `
DROP TABLE IF EXISTS cliente;
CREATE TABLE cliente (
id int NOT NULL AUTO_INCREMENT,
nome varchar(50) NOT NULL,
cpf char(14) NOT NULL,
celular char(14) NOT NULL,
email varchar(50) NOT NULL,
senha varchar(512) NOT NULL,
PRIMARY KEY (id),
UNIQUE KEY cpf (cpf),
UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;`

const DADOS_CLIENTE = `
INSERT INTO cliente VALUES 
(2,'guilherme godoy','111.222.333-44','(41)98888-1111','guilherme.godoy@email.com','godoy123'),(3,'pedro nathan','222.333.444-55','(42)97777-2222','pedro.nathan@email.com','nathanneris456'),(4,'antonio wesley','333.444.555-66','(43)96666-3333','antonio wesley@email.com','$2b$10$dl68TJDYI9QGfygH.zSP7uuDo.YkQAabrBlmbW4LY3ZrdfpKqRXZ.'),
(5,'kayke','444.555.666-77','(44)95555-4444','kayke.ramos@email.com','ramos321'),(6,'Ana liva','555.666.777-88','(45)94444-5555','ana.livia@email.com','analivia987'),(7,'Pedro','777.888.999-00','(46)93333-6666','pedro.rocha@email.com','pedro654'),(8,'Beatriz','888.999.000-11','(47)92222-7777','beatriz.soares@email.com','biazinha2026'),(9,'Gabriel','999.000.111-22','(48)91111-8888','gabriel.lima@email.com','gabriel111'),(10,'Larissa','123.456.789-10','(49)90000-9999','larissa.souza@email.com','larissa555'),(12,'Ianzeen','11.322.322-44','(43)98888-1111','ianzeen.isadora@email.com','$2b$10$Mo.W9JRtsCskWxse/pNWuuM0q8IGwyNyFw/usAQ3rT/OEK7KZnDda');`
 
 const ESTRUTURA_PRODUTO = `
 DROP TABLE IF EXISTS produto;
 CREATE TABLE produto (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    descricao varchar(255) NOT NULL,
    categoria varchar(50) NOT NULL,
    preco decimal(10,2) NOT NULL,
    caminho_img varchar(255) DEFAULT NULL,
    quantidade int NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;`

  const CAMINHO_IMG = "http://localhost:" + process.env.API_PORT + "/img/"

  const DADOS_PRODUTO = `
  INSERT INTO produto
  (nome, descricao, categoria, preco, caminho_img, quantidade)
  VALUES
  ('Óleo Sintético 5W30', 'Lubrificante sintético de alta performance para motores.', 'Lubrificantes', 45.90, '${CAMINHO_IMG}oleo.jpg', 50),
  ('Filtro de Óleo Blindado', 'Filtro de óleo para proteção contra impurezas no motor.', 'Filtros', 28.50, '${CAMINHO_IMG}filtro-de-oleo.jpg', 40),
  ('Filtro de Ar Esportivo', 'Filtro de ar lavável de alto fluxo para maior potência.', 'Filtros', 149.90, '${CAMINHO_IMG}filtro-de-ar.jpg', 15),
  ('Pastilha de Freio Dianteira', 'Jogo de pastilhas de cerâmica sem ruído e alta durabilidade.', 'Freios', 119.90, '${CAMINHO_IMG}pastilha-de-freio.jpg', 25),
  ('Disco de Freio Ventilado', 'Par de discos dianteiros ventilados de aço carbono.', 'Freios', 249.90, '${CAMINHO_IMG}disco-de-freio.jpg', 12),
  ('Vela de Ignição Iridium', 'Jogo com 4 velas de iridium para queima eficiente.', 'Ignição', 189.90, '${CAMINHO_IMG}velas.jpg', 20),
  ('Cabo de Vela Silicone', 'Jogo de cabos de ignição supressivos de 8mm.', 'Ignição', 89.90, '${CAMINHO_IMG}cabo-de-vela.jpg', 18),
  ('Amortecedor Dianteiro', 'Amortecedor pressurizado a gás para maior estabilidade.', 'Suspensão', 329.90, '${CAMINHO_IMG}amortecedor-dianteiro.jpg', 10),
  ('Kit Embreagem Completo', 'Platô, disco e rolamento para transmissão manual.', 'Transmissão', 489.90, '${CAMINHO_IMG}embreagem.jpg', 8),
  ('Correia Dentada', 'Correia sincronizadora reforçada em borracha nitrílica.', 'Motor', 79.90, '${CAMINHO_IMG}correia-dentada.jpg', 30),
  ('Bateria Automotiva 60Ah', 'Bateria selada livre de manutenção com 18 meses de garantia.', 'Elétrica', 389.90, '${CAMINHO_IMG}bateria.jpg', 14),
  ('Lâmpada Super LED H4', 'Par de lâmpadas LED 6000K branco frio para farol principal.', 'Iluminação', 129.90, '${CAMINHO_IMG}lampada-led.jpg', 22),
  ('Palheta Limpador Silicone', 'Par de palhetas flexíveis de encaixe universal.', 'Acessórios', 49.90, '${CAMINHO_IMG}palheta-limpador.jpg', 35),
  ('Aditivo Radiador Concentrado', 'Fluido orgânico anticorrosivo rosa de 1 litro.', 'Arrefecimento', 34.90, '${CAMINHO_IMG}aditivo.jpg', 45),
  ('Bomba de Água', 'Bomba d água com rotor de alumínio e junta de vedação.', 'Arrefecimento', 139.90, '${CAMINHO_IMG}bomba-de-agua.jpg', 16),
  ('Fluido de Freio DOT 4', 'Frasco de 500ml de fluido sintético para freios ABS.', 'Freios', 24.90, '${CAMINHO_IMG}fluido.jpg', 40),
  ('Sensor de Oxigênio', 'Sonda lambda universal de 4 fios para injeção eletrônica.', 'Injeção', 179.90, '${CAMINHO_IMG}sonda.jpeg', 12),
  ('Bico Injetor Flex', 'Válvula injetora de combustível de alta vazão.', 'Injeção', 159.90, '${CAMINHO_IMG}bico-injetor.jpeg', 15),
  ('Tapete Automotivo Borracha', 'Jogo com 4 tapetes impermeáveis e antiderrapantes.', 'Acessórios', 84.90, '${CAMINHO_IMG}tapete.jpeg', 20);
`;

  const DESABILITAR_FK = `SET FOREIGN_KEY_CHECKS = 0`
  const HABILITAR_FK = `SET FOREIGN_KEY_CHECKS = 1`

  const ESTRUTURA_ENDERECO = `
  DROP TABLE IF EXISTS endereco;
  CREATE TABLE endereco (
    id int NOT NULL AUTO_INCREMENT,
    idCliente int NOT NULL,
    numero int NOT NULL,
    rua varchar(100) NOT NULL,
    bairro varchar(50) NOT NULL,
    cidade varchar(50) NOT NULL,
    estado varchar(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idCliente) REFERENCES cliente(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

  const DADOS_ENDERECO = `
  INSERT INTO endereco
  (idCliente, numero, rua, bairro, cidade, estado)
  VALUES (2, 123, 'Rua das Peças', 'Centro', 'Curitiba', 'PR');`

  const ESTRUTURA_COMPRA = `
  DROP TABLE IF EXISTS compra;
  CREATE TABLE compra (
    id int NOT NULL AUTO_INCREMENT,
    idCliente int NOT NULL,
    idEndereco int NOT NULL,
    data date NOT NULL,
    forma_pagamento varchar(50) NOT NULL,
    valor_total decimal(10,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idCliente) REFERENCES cliente(id),
    FOREIGN KEY (idEndereco) REFERENCES endereco(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

  const ESTRUTURA_PRODUTOCOMPRA = `
  DROP TABLE IF EXISTS produtocompra;
  CREATE TABLE produtocompra (
    idproduto int NOT NULL,
    idcompra int NOT NULL,
    quantidade int NOT NULL,
    valor_unitario decimal(10,2) NOT NULL,
    PRIMARY KEY (idproduto, idcompra),
    FOREIGN KEY (idproduto) REFERENCES produto(id),
    FOREIGN KEY (idcompra) REFERENCES compra(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

async function criar_tabelas() {
  const connection = await db.pool.getConnection();
  try {
    console.log("Criando estrutura das tabelas...");
    await connection.query(DESABILITAR_FK);
    await connection.query(ESTRUTURA_CLIENTE);
    await connection.query(ESTRUTURA_PRODUTO);
    await connection.query(ESTRUTURA_ENDERECO);
    await connection.query(ESTRUTURA_COMPRA);
    await connection.query(ESTRUTURA_PRODUTOCOMPRA);
    await connection.query(HABILITAR_FK);

    await connection.beginTransaction();

    console.log("Inserindo dados...");
    await connection.query(DADOS_CLIENTE);
    await connection.query(DADOS_PRODUTO);
    await connection.query(DADOS_ENDERECO);

    await connection.commit();
    console.log("Migration executada com sucesso!");
  } catch (error) {
    await connection.rollback();
    console.error("Erro na migration:", error);
    process.exitCode = 1;
  } finally {
    connection.release();
    await db.pool.end();
  }
}

criar_tabelas();
