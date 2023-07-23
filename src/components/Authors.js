import React, { useEffect, useState } from 'react';
import Api from '../Api';

function Authors() {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await Api.getAuthors();
      setAuthors(data.authors);
    })();
  }, []);

  console.log(authors);
  return (
    <div className="authors">
      <div className="container">
        <h4> Authors of books </h4>
        <div className="list">
          {authors.map((a) => (
            <div key={a.id} className="author">
              <img src={a.avatar} alt={a.firstName} />
              <p>
                {a.fullName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Authors;
