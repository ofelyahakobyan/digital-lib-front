import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Audio() {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const token = localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    try {
      if (id) {
        const res = await axios.get(
          `http://localhost:4000/api/v1/books/${id}/audio`,
          {
            headers: {
              authorization: token,
            },
            responseType: 'arraybuffer',
          },
        );
        if (res.data) {
          const blob = new Blob([res.data], { type: 'audio/mpeg' });
          setUrl(URL.createObjectURL(blob));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div>
      <button type="button" onClick={fetchData}>Click</button>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio style={{ width: '92%' }} src={url} controls />
    </div>
  );
}

export default Audio;
