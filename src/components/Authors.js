import React, { useEffect, useState } from 'react';
import ButtonComponent from './ButtonComponent';
import Api from '../Api';
import SingleInfo from './SingleInfo';

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await Api.getAuthors();
      setAuthors(data.authors);
    })();
  }, []);

  return (
    <div className="authors">
      <div className="container">
        <h4> Authors of books </h4>
        <div className="list">
          {authors ? authors.map((a) => (
            <SingleInfo data={a} link="/authors/single" name={`${a.fullName}`} key={a.id} />
          )) : null}
        </div>
        <div className="button_container">
          <ButtonComponent
            buttonName="see more"
            color="secondary"
            size="large"
            link="/authors"
          />
        </div>
      </div>
    </div>
  );
}

export default Authors;
