import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useCryptos } from "../hooks/useCrypto";

const Explore = () => {
  const { cryptos, loading, error } = useCryptos();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header>
        <NavBar />
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">Explore</h1>
          <p className="text-gray-600 mt-2">
            Browse assets, markets, and discover opportunities. This page is a
            lightweight placeholder to show structure — replace with live data
            or more detailed UI as needed.
          </p>
        </div>

        {/* Search / Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <div className="w-full sm:w-2/3">
            <label htmlFor="explore-search" className="sr-only">
              Search assets
            </label>
            <div className="relative">
              <input
                id="explore-search"
                type="search"
                placeholder="Search assets, e.g. Bitcoin, ETH, SOL"
                className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div className="w-full sm:w-1/3 flex justify-end">
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm">
                All markets
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm">
                Price
              </button>
            </div>
          </div>
        </div>

        {/* Asset list / grid */}
        <section aria-labelledby="explore-assets">
          <h2 id="explore-assets" className="sr-only">
            Assets
          </h2>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading assets...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cryptos.map((crypto) => (
                <a
                  key={crypto._id || crypto.id}
                  href={`/asset/${crypto._id || crypto.id}`}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-white"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-8 h-8 rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="text-sm font-bold text-gray-700 hidden">
                      {crypto.symbol[0]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{crypto.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{crypto.symbol}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium text-sm">${crypto.price?.toLocaleString()}</p>
                        <p
                          className={`text-xs mt-1 ${
                            crypto.priceChange24h >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {crypto.priceChange24h >= 0 ? "+" : ""}{crypto.priceChange24h}%
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {!loading && !error && cryptos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No assets found.</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <button className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Load more
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
