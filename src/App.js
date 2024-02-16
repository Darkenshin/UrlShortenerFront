import React, { useState } from 'react';
import axios from 'axios';

function useApiCall() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const callApi = async (method, url, data) => {
    try {
      const response = await axios[method](url, data);
      setResponse(JSON.stringify(response.data, null, 2));
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return { response, error, callApi };
}

function ShortenUrl() {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const { response, error, callApi } = useApiCall();

  const shortenUrl = () => callApi('post', 'http://localhost:8080/api/url/shorten', inputUrl );

  return (
    <div>
      <fieldset>
        <legend>Shorten URL</legend>
        <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
        <button onClick={shortenUrl}>Shorten URL</button>
        <p>Shortened URL: {shortenedUrl}</p>
      </fieldset>
      <div>
        <textarea value={response} readOnly />
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </div>
  );
}

function GetFullUrl() {
  const [inputShortenedUrl, setInputShortenedUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const { response, error, callApi } = useApiCall();

  const getFullUrl = () => callApi('post', 'http://localhost:8080/api/url/short-url', inputShortenedUrl);

  return (
    <div>
      <fieldset>
        <legend>Get Full URL</legend>
        <input type="text" value={inputShortenedUrl} onChange={(e) => setInputShortenedUrl(e.target.value)} />
        <button onClick={getFullUrl}>Get Full URL</button>
        <p>Full URL: {fullUrl}</p>
      </fieldset>
      <div>
        <textarea value={response} readOnly />
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <ShortenUrl />
      </div>
      <div style={{ flex: 1 }}>
        <GetFullUrl />
      </div>
    </div>
  );
}

export default App;