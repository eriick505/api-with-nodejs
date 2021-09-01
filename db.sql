-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Set-2021 às 21:43
-- Versão do servidor: 10.4.20-MariaDB
-- versão do PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `api_node_crud`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `quantity` smallint(6) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `orders`
--

INSERT INTO `orders` (`id_order`, `quantity`, `id_product`) VALUES
(1, 4, 1),
(7, 1, 1),
(8, 1, 4),
(9, 1, 4),
(10, 2, 15),
(11, 1, 15);

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image_product` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id_product`, `name`, `price`, `image_product`) VALUES
(1, 'Luva de plástico', 50.4, NULL),
(4, 'Guitarra Ibanez', 100, NULL),
(5, 'Bicicleta', 1000, NULL),
(6, 'Boneca', 100, NULL),
(7, NULL, NULL, NULL),
(8, 'Hot Wheels', 5.55, NULL),
(9, 'Anime', 120, NULL),
(10, 'Anime DA NETFLIX', 120, NULL),
(11, 'Anime DA NETFLIX 2', 1201, NULL),
(12, 'icone do insta', 3, NULL),
(13, 'algo', 325, NULL),
(14, 'novo produto', 400, 'uploads\\2021-08-30T22-51-25.626Z-17442f92-5e1f-4010-ab42-1e99da95b632.jpg'),
(15, 'mais novo produto', 400, 'uploads\\2021-08-30T22-53-39.776Z-17442f92-5e1f-4010-ab42-1e99da95b632.jpg'),
(16, 'algo ai', 400, 'uploads\\2021-08-30T22-55-14.373Z-17442f92-5e1f-4010-ab42-1e99da95b632.jpg'),
(17, 'Playstation 5', 4500, 'uploads\\2021-09-01T15-31-35.404Z-quickly-setup-git.jpg'),
(18, 'Xbox one', 4000, 'uploads\\2021-09-01T15-32-59.429Z-extensions-vscode.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`) VALUES
(1, 'Julio Casablanca', 'julio@casablanca.com', '$2b$10$dVGma1ALOAsuzNXqLcXBW.PvPU0roTiRkJnUSy5KXo1k2wkKDxm46'),
(5, 'Mario Casablanca', 'mario@casablanca.com', '$2b$10$aE1uT0Jc44ul6.jcwFAOb.DCcroaCM32ffUZWVgx4BlZIWAvvinyK'),
(9, 'Pipoca Casablanca', 'pipoca@casablanca.com', '$2b$10$HPCWiVegB3hptoCPTkRxlOQ29YtNVBlSQDYQg7JhQKPURHZZKR7Ii'),
(10, 'Michael Jackson', 'mj@ihii.com', '$2b$10$E3yFhX3D9EJ1wve5VtFHF.1N/Zf1a3F1Zo9W.EkHfGmqoaACAr0xe');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
