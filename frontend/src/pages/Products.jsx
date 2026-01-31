import { useEffect, useState } from "react";
import api from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("name");
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api.get("/products", {
      params: {
        search,
        sort,
        direction,
        page,
        min_price: minPrice,
        max_price: maxPrice
      }
    })
      .then((res) => {
        setProducts(res.data.data);
        setLastPage(res.data.last_page);
        setTotal(res.data.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [search, sort, direction, page, minPrice, maxPrice]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">

     
      <div>
        <h1 className="text-3xl font-bold">Produkty</h1>
        <p className="text-gray-500">
          Znaleziono produktów: {total}
        </p>
      </div>

      
      <div className="flex gap-4 flex-wrap">

        <input
          placeholder="Szukaj produktu..."
          className="border p-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <input
          type="number"
          placeholder="Cena od"
          className="border p-2 rounded w-32"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
        />

        <input
          type="number"
          placeholder="Cena do"
          className="border p-2 rounded w-32"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => {
            const [field, dir] = e.target.value.split("|");
            setSort(field);
            setDirection(dir);
            setPage(1);
          }}
        >
          <option value="name|asc">Nazwa A-Z</option>
          <option value="name|desc">Nazwa Z-A</option>
          <option value="price|asc">Cena rosnąco</option>
          <option value="price|desc">Cena malejąco</option>
        </select>

      </div>

    
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Ładowanie produktów...
        </div>

      ) : products.length === 0 ? (

        <div className="text-center text-gray-400 py-20">
          Brak produktów
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
            >

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">

                <h2 className="font-semibold text-lg">
                  {product.name}
                </h2>

                <p className="text-gray-600 text-sm">
                  {product.description}
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {product.price} zł
                </p>

              </div>
            </div>
          ))}

        </div>
      )}

    
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          className="border px-4 py-2 rounded disabled:opacity-40"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>

        <span className="font-semibold">
          Strona {page} z {lastPage}
        </span>

        <button
          className="border px-4 py-2 rounded disabled:opacity-40"
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>

    </div>
  );
}
