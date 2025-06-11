import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="p-6 pt-28 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Kết quả cho: <span className="text-red-600">{query}</span>
      </h1>
      {loading ? (
        <p>Đang tải kết quả...</p>
      ) : results.length === 0 ? (
        <p>Không tìm thấy kết quả nào.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((item) => (
            <li key={item.id} className="border rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
