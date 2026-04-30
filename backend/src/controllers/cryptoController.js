import Crypto from "../models/Crypto.js";

export const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json(cryptos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not fetch cryptocurrencies" });
  }
};

export const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ priceChange24h: { $gt: 0 } })
      .sort({ priceChange24h: -1 })
      .limit(10);
    return res.status(200).json(gainers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not fetch top gainers" });
  }
};

export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);
    return res.status(200).json(newListings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not fetch new listings" });
  }
};

export const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, priceChange24h } = req.body;
    if (!name || !symbol || !price || !image || priceChange24h === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(409).json({ message: "Cryptocurrency with this symbol already exists" });
    }

    const crypto = await Crypto.create({
      name: name.trim(),
      symbol: symbol.toUpperCase(),
      price: parseFloat(price),
      image: image.trim(),
      priceChange24h: parseFloat(priceChange24h),
    });

    return res.status(201).json(crypto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not add cryptocurrency" });
  }
};