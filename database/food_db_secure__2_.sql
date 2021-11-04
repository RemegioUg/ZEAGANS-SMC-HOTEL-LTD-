-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2021 at 06:55 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_db_secure (2)`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers_tbl`
--

CREATE TABLE `customers_tbl` (
  `customer_id` int(10) NOT NULL,
  `customer_username` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_password` varchar(100) NOT NULL,
  `customer_date` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers_tbl`
--

INSERT INTO `customers_tbl` (`customer_id`, `customer_username`, `customer_email`, `customer_password`, `customer_date`) VALUES
(1, 'Den', 'den@mail.com', '12345', ''),
(2, 'max', 'max@mail.com', '12345', ''),
(4, 'Mux', 'mu@mail.com', '12345', '1635749614597'),
(5, 'remegio', 'mugiziremegio1@gmail.com', '0778299052', '1635756797666'),
(6, 'nahwera alex', 'nahwera81@gmail.com', '0778299052', '1635930970443'),
(7, 'aleamos', 'aleamos@gmail.com', '', '1635939112920'),
(8, 'illego', 'illego@gmail.com', '22445', '1635939157736');

-- --------------------------------------------------------

--
-- Table structure for table `foods_tbl`
--

CREATE TABLE `foods_tbl` (
  `food_id` varchar(100) NOT NULL,
  `food_name` varchar(100) NOT NULL,
  `food_qty` int(10) NOT NULL,
  `food_description` varchar(100) NOT NULL,
  `food_category` varchar(100) NOT NULL,
  `food_images` varchar(255) NOT NULL,
  `food_prices` float NOT NULL,
  `food_discount` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foods_tbl`
--

INSERT INTO `foods_tbl` (`food_id`, `food_name`, `food_qty`, `food_description`, `food_category`, `food_images`, `food_prices`, `food_discount`) VALUES
('cfc28548-90a5-4d6b-bfb1-6afa7ef58bf8', 'Posho and Beans', 99, 'Fried Beans and quality posho', 'Breakfast', '[\"cfc28548-90a5-4d6b-bfb1-6afa7ef58bf8-image-one.jpg\"]', 5000, 0),
('188e4ede-8743-4626-b532-f6231ded40fe', 'Rice and Posho', 100, 'Fried and White rice plus fried beans', 'Supper', '[\"188e4ede-8743-4626-b532-f6231ded40fe-image-one.jpg\"]', 3500, 0),
('364c140d-d7ed-402f-b89d-20c62b722123', 'Dry Tea', 97, 'With tea leaves and sugar', 'Breakfast', '[\"364c140d-d7ed-402f-b89d-20c62b722123-break-fast.jpg\"]', 1000, 0),
('2767fe16-42e6-4adf-ab6e-3a0fb440c393', 'Milk Tea', 148, 'With sugar and not diluted', 'Breakfast', '[\"2767fe16-42e6-4adf-ab6e-3a0fb440c393-break-fast-one.jpg\"]', 2000, 0),
('1989990e-1d56-45d5-8e7f-0758d7ffea32', 'Rice and Beans', 18, 'Fried beans and clean rice', 'Lunch', '[\"1989990e-1d56-45d5-8e7f-0758d7ffea32-lunch.jpg\"]', 3000, 0),
('8643d563-4fa7-457c-8c20-98dddd0b87c1', 'Hot Pizza', 20, 'High quality fried', 'Lunch', '[\"8643d563-4fa7-457c-8c20-98dddd0b87c1-lunch-one.jpg\"]', 10000, 0),
('61981258-379e-426a-b00e-3939e10e08a0', 'Col Omlet', 30, 'Deep fried', 'Supper', '[\"61981258-379e-426a-b00e-3939e10e08a0-omlet-two.jpg\"]', 40000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_tbl`
--

CREATE TABLE `order_tbl` (
  `order_id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `order_amount` float NOT NULL,
  `order_status` varchar(10) NOT NULL,
  `payment_method` varchar(10) NOT NULL,
  `order_items` longtext NOT NULL,
  `customer_address` varchar(100) NOT NULL,
  `order_date` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_tbl`
--

INSERT INTO `order_tbl` (`order_id`, `customer_id`, `order_amount`, `order_status`, `payment_method`, `order_items`, `customer_address`, `order_date`) VALUES
(1, 1, 10000, 'finished', 'cod', '[{\"cartItemAdded\":\"8643d563-4fa7-457c-8c20-98dddd0b87c1\",\"cartNumber\":1}]', 'Lira', '1635423463252'),
(2, 1, 10000, 'finished', 'cod', '[{\"cartItemAdded\":\"8643d563-4fa7-457c-8c20-98dddd0b87c1\",\"cartNumber\":1}]', 'Lira', '1635440139384'),
(3, 1, 5000, 'finished', 'cod', '[{\"cartItemAdded\":\"2767fe16-42e6-4adf-ab6e-3a0fb440c393\",\"cartNumber\":1},{\"cartItemAdded\":\"1989990e-1d56-45d5-8e7f-0758d7ffea32\",\"cartNumber\":1}]', 'Lira', '1635704129599'),
(4, 1, 1000, 'finished', 'cod', '[{\"cartItemAdded\":\"364c140d-d7ed-402f-b89d-20c62b722123\",\"cartNumber\":1}]', 'University', '1635751603236'),
(5, 5, 1000, 'finished', 'cod', '[{\"cartItemAdded\":\"364c140d-d7ed-402f-b89d-20c62b722123\",\"cartNumber\":1}]', 'Washington ', '1635756846735'),
(6, 5, 1000, 'finished', 'cod', '[{\"cartItemAdded\":\"364c140d-d7ed-402f-b89d-20c62b722123\",\"cartNumber\":1}]', 'lira university', '1635757559109'),
(7, 5, 8000, 'finished', 'cod', '[{\"cartItemAdded\":\"cfc28548-90a5-4d6b-bfb1-6afa7ef58bf8\",\"cartNumber\":1},{\"cartItemAdded\":\"1989990e-1d56-45d5-8e7f-0758d7ffea32\",\"cartNumber\":1}]', 'bako', '1635930670310'),
(8, 8, 2000, 'finished', 'cod', '[{\"cartItemAdded\":\"2767fe16-42e6-4adf-ab6e-3a0fb440c393\",\"cartNumber\":1}]', 'bako', '1635939202506');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers_tbl`
--
ALTER TABLE `customers_tbl`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `foods_tbl`
--
ALTER TABLE `foods_tbl`
  ADD PRIMARY KEY (`food_id`);

--
-- Indexes for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD PRIMARY KEY (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers_tbl`
--
ALTER TABLE `customers_tbl`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_tbl`
--
ALTER TABLE `order_tbl`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
