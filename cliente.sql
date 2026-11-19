-- TABELA CLIENTE

CREATE TABLE cliente
(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
cpf CHAR(14) NOT NULL UNIQUE,
celular CHAR(14) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
senha VARCHAR(512) NOT NULL
);

DROP TABLE cliente;

INSERT INTO cliente (
nome, cpf, celular, email, senha
) VALUES
    ("Guilherme Godoy", "111-222-333.04", "cesarnoooooo67@gmail.com", "(41)99999-8888", "pedrodocapa6742aura+ego=rego"),
    ("Thiago Mendes", "111.222.333-44", "thiago.mendes@outlook.com", "(11)96666-1234", "th1@g0_m3nd3s"),
    ("Larissa Rocha", "555.111.222-33", "larissa.rocha@gmail.com", "(21)97777-5678", "l@r1_r0ch4!"),
    ("Bruno Azevedo", "777.333.888-22", "bruno.azevedo@yahoo.com", "(31)98888-9012", "br_azvd#2026"),
    ("Amanda Vieira", "999.444.111-55", "amanda.vieira@gmail.com", "(51)99999-3456", "am@nd4_v131r@"),
    ("Rodrigo Nunes", "222.888.555-66", "rodrigo.nunes@hotmail.com", "(61)97777-7890", "rod_nunes$99"),
    ("Letícia Dias", "888.666.444-11", "leticia.dias@gmail.com", "(71)98888-2345", "l3t_d1as#2026"),
    ("Felipe Castro", "333.555.999-00", "felipe.castro@outlook.com", "(81)99999-6789", "fel1p3_c@str0"),
    ("Isabela Martins", "444.000.777-88", "isabela.martins@gmail.com", "(19)96666-4321", "1s@_martins!"),
    ("Leonardo Frota", "666.222.111-99", "leonardo.frota@hotmail.com", "(47)97777-8765", "leo_frota#123"),
    ("Clarice Santana", "000.444.888-55", "clarice.santana@yahoo.com", "(85)98888-0987", "cl@r1_s@nt");


SELECT email, senha FROM cliente;


SELECT email, senha FROM cliente WHERE email = "thiago.mendes@outlook.com";


SELECT * FROM cliente


SELECT * FROM cliente WHERE id <= 10 AND LENGTH(senha) > 20;


DELETE FROM cliente WHERE id = 11;


UPDATE cliente SET nome = "Guilherme Godoy", email = "cesarnoooooo67@gmail.com" WHERE id = 1;

-- TABELA ENDERECO

CREATE TABLE endereco
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    numero INT NOT NULL,
    rua VARCHAR(100) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,

    FOREIGN KEY (idcliente) REFERENCES cliente(id)
);

-- TABELA PRODUTO

CREATE TABLE produto
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    caminho_img VARCHAR(255),
    quantidade_img INT NOT NULL
);

INSERT INTO produto
(nome, descricao, categoria, preco, caminho_img, quantidade_img)
VALUES
('Óleo Sintético 5W30', 'Lubrificante sintético de alta performance para motores.', 'Lubrificantes', 45.90, 'http://localhost:3000/img/óleo.jpg', 50),
('Filtro de Óleo Blindado', 'Filtro de óleo para proteção contra impurezas no motor.', 'Filtros', 28.50, 'http://localhost:3000/img/filtro-de-oleo.jpg', 40),
('Filtro de Ar Esportivo', 'Filtro de ar lavável de alto fluxo para maior potência.', 'Filtros', 149.90, 'http://localhost:3000/img/filtro-de-ar.jpg', 15),
('Pastilha de Freio Dianteira', 'Jogo de pastilhas de cerâmica sem ruído e alta durabilidade.', 'Freios', 119.90, 'http://localhost:3000/img/pastilha-de-freio.jpg', 25),
('Disco de Freio Ventilado', 'Par de discos dianteiros ventilados de aço carbono.', 'Freios', 249.90, 'http://localhost:3000/img/disco-de-freio.jpg', 12),
('Vela de Ignição Iridium', 'Jogo com 4 velas de iridium para queima eficiente.', 'Ignição', 189.90, 'http://localhost:3000/img/velas.jpg', 20),
('Cabo de Vela Silicone', 'Jogo de cabos de ignição supressivos de 8mm.', 'Ignição', 89.90, 'http://localhost:3000/img/cabo-de-vela.jpg', 18),
('Amortecedor Dianteiro', 'Amortecedor pressurizado a gás para maior estabilidade.', 'Suspensão', 329.90, 'http://localhost:3000/img/amortecedor-dianteiro.jpg', 10),
('Kit Embreagem Completo', 'Platô, disco e rolamento para transmissão manual.', 'Transmissão', 489.90, 'http://localhost:3000/img/embreagem.jpg', 8),
('Correia Dentada', 'Correia sincronizadora reforçada em borracha nitrílica.', 'Motor', 79.90, 'http://localhost:3000/img/correia-dentada.jpg', 30),
('Bateria Automotiva 60Ah', 'Bateria selada livre de manutenção com 18 meses de garantia.', 'Elétrica', 389.90, 'http://localhost:3000/img/bateria.jpg', 14),
('Lâmpada Super LED H4', 'Par de lâmpadas LED 6000K branco frio para farol principal.', 'Iluminação', 129.90, 'http://localhost:3000/img/lampada-led.jpg', 22),
('Palheta Limpador Silicone', 'Par de palhetas flexíveis de encaixe universal.', 'Acessórios', 49.90, 'http://localhost:3000/img/palheta-limpador.png', 35),
('Aditivo Radiador Concentrado', 'Fluido orgânico anticorrosivo rosa de 1 litro.', 'Arrefecimento', 34.90, 'http://localhost:3000/img/aditivo.jpg', 45),
('Bomba de Água', 'Bomba d água com rotor de alumínio e junta de vedação.', 'Arrefecimento', 139.90, 'http://localhost:3000/img/bomba-de-agua.jpg', 16),
('Fluido de Freio DOT 4', 'Frasco de 500ml de fluido sintético para freios ABS.', 'Freios', 24.90, 'http://localhost:3000/img/fluido.jpg', 40),
('Sensor de Oxigênio', 'Sonda lambda universal de 4 fios para injeção eletrônica.', 'Injeção', 179.90, 'http://localhost:3000/img/sonda.jpeg', 12),
('Bico Injetor Flex', 'Válvula injetora de combustível de alta vazão.', 'Injeção', 159.90, 'http://localhost:3000/img/bico-injetor.jpeg', 15),
('Tapete Automotivo Borracha', 'Jogo com 4 tapetes impermeáveis e antiderrapantes.', 'Acessórios', 84.90, 'http://localhost:3000/img/tapete.jpeg', 20);


-- TABELA COMPRA

CREATE TABLE compra
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    idEndereco INT NOT NULL,
    data DATE NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (idcliente) REFERENCES cliente(id),
    FOREIGN KEY (idendereco) REFERENCES endereco(id)
);

-- TABELA PRODUTO COMPRA

CREATE TABLE produtocompra
(
    idproduto INT NOT NULL,
    idcompra INT NOT NULL,
    quantidade INT NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (idproduto, idcompra),

    FOREIGN KEY (idproduto) REFERENCES produto(id),
    FOREIGN KEY (idcompra) REFERENCES compra(id)
);