import mongoose from "mongoose";
import dotenv from "dotenv";
import Crypto from "./src/models/Crypto.js";

dotenv.config();

const sampleCryptos = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 747347.62,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    priceChange24h: 2.75,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 21834.85,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    priceChange24h: 3.88,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 6878.67,
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    priceChange24h: 3.18,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 918.9,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    priceChange24h: 3.4,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 14.75,
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    priceChange24h: 1.22,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.42,
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    priceChange24h: 0.6,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.08,
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    priceChange24h: -2.11,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 5.23,
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    priceChange24h: 5.5,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Crypto.deleteMany({});
    console.log("Cleared existing crypto data");

    // Insert sample data
    await Crypto.insertMany(sampleCryptos);
    console.log("Seeded database with sample cryptocurrencies");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedDatabase();