import React, { useEffect, useState } from 'react';

const apiKey = 'e16cb05c067e40fe8316afc616ddd403'; // Replace with your NewsAPI.org key

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await res.json();
        if (data.status === 'ok') {
          setArticles(data.articles);
          setError('');
        } else {
          setError('Failed to fetch news: ' + data.message);
        }
      } catch (err) {
        setError('Error: ' + err.message);
      }
    }
    fetchNews();
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <h1>Viral News</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && articles.length === 0 && <p>Loading news...</p>}
      <div>
        {articles.map((article, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}
            >
              {article.title}
            </a>
            <div style={{ fontStyle: 'italic', color: 'gray', marginTop: '5px' }}>
              {article.source.name} - {new Date(article.publishedAt).toLocaleString()}
            </div>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
