import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import { useSearchParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { getCategoriesListRequest } from '../../store/actions/categories';
import { getAuthorsRequest } from '../../store/actions/authors';
// import { getBooksRequest } from '../../store/actions/books';
import classes from './search.module.css';
import searchIcon from '../../assets/icons/search.svg';

function Search() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const categories = useSelector((state) => state.categories.categories);
  const authors = useSelector((state) => state.authors.authors);
  const [searchParams, setSearchParams] = useSearchParams();
  const prices = [
    { id: 1, price: 'All' },
    { id: 2, price: '<15$' },
    { id: 3, price: '15$-35$' },
    { id: 4, price: '>35$' },
  ];
  const languagesArr = [
    { id: 1, language: 'Armenian' },
    { id: 2, language: 'English' },
    { id: 3, language: 'French' },
    { id: 4, language: 'Chinese' },
  ];
  console.log(books);
  const [selectedItem, setSelectedItem] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [authorIds, setAuthorIds] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [value, setValue] = useState('');
  const handleAddCategory = useCallback((id) => {
    if (!categoryIds.includes(id)) {
      categoryIds.push(id);
      setCategoryIds([...categoryIds]);
      searchParams.set('category_ids', categoryIds);
      setSearchParams(searchParams);
    }
    selectedItem.push(id);
    setSelectedItem(selectedItem);
  }, []);
  const handleAddAuthor = useCallback((id) => {
    if (!authorIds.includes(id)) {
      authorIds.push(id);
      setAuthorIds([...authorIds]);
      searchParams.set('author_ids', authorIds);
      setSearchParams(searchParams);
    }
    selectedItem.push(id);
    setSelectedItem(selectedItem);
  }, []);
  const handleAddPrice = useCallback((id) => {
    if (id === 1) {
      searchParams.set('minPrice', 0);
      searchParams.set('maxPrice', 9999);
    } else if (id === 2) {
      searchParams.set('minPrice', 0);
      searchParams.set('maxPrice', 15);
    } else if (id === 3) {
      searchParams.set('minPrice', 15);
      searchParams.set('maxPrice', 35);
      setSearchParams(searchParams);
    } else if (id === 4) {
      searchParams.set('minPrice', 35);
      searchParams.set('maxPrice', 9999);
    }
    setSearchParams(searchParams);
    selectedItem.push(id);
    setSelectedItem(selectedItem);
  }, []);
  const handleAddLanguage = useCallback((language) => {
    if (!languages.includes(language)) {
      languages.push(language);
      setLanguages([...languages]);
      searchParams.set('languages', languages);
      setSearchParams(searchParams);
    }
    selectedItem.push(language);
    setSelectedItem(selectedItem);
  }, []);
  useEffect(() => {
    (async () => {
      await dispatch(getCategoriesListRequest());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await dispatch(getAuthorsRequest({ limit: 4 }));
    })();
  }, []);
  const handleSearchPopular = useCallback(() => {
    if (!searchParams.has('popular')) {
      searchParams.append('popular', 'true');
      setSearchParams(searchParams);
    }
  }, []);
  const handleSearchNew = useCallback(() => {
    if (!searchParams.has('new')) {
      searchParams.append('new', 'true');
      setSearchParams(searchParams);
    }
  }, []);
  const ratingChanged = (newRating) => {
    if (!searchParams.has('rating')) {
      searchParams.append('rating', newRating);
      setSearchParams(searchParams);
    }
  };
  const handleChange = useCallback((ev) => {
    setValue(ev.target.value);
  }, []);
  const handleClick = useCallback(async () => {
    if (value) {
      searchParams.set('q', value);
      setSearchParams(searchParams);
    }
  }, [value]);

  return (
    <>
      <div className="container">
        <input type="text" value={value} onChange={handleChange} placeholder="search" className={`${classes.input}`} />
        <button type="button" onClick={handleClick} className={`${classes.icon_button}`}>
          <img src={searchIcon} alt="search" className={`${classes.img}`} />
        </button>
      </div>
      <Accordion className={`${classes.accordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.title}`}>
            Genre
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={`${classes.accrordion_details}`}>
          {categories ? categories.map((d) => (
            <Typography key={d.id} onClick={() => handleAddCategory(d.id)} className={selectedItem.includes(d.id) ? `${classes.selected}` : `${classes.details}`}>
              { d.category }
              {' '}
            </Typography>
          )) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${classes.accordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.title}`}>
            Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {prices ? prices.map((p) => (
            <Typography key={p.id} onClick={() => handleAddPrice(p.id)} className={selectedItem.includes(p.id) ? `${classes.selected}` : `${classes.details}`}>
              { p.price}
              {' '}
            </Typography>
          )) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${classes.accordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.title}`}>
            Authors
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={`${classes.accrordion_details}`}>
          {authors ? authors.map((a) => (
            <Typography key={a.id} onClick={() => handleAddAuthor(a.id)} className={selectedItem.includes(a.id) ? `${classes.selected}` : `${classes.details}`}>
              { a.fullName}
              {' '}
            </Typography>
          )) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${classes.accordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.title}`}>
            Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ReactStars
            count={5}
            size={16}
            color2="#ffd700"
            half={false}
            onChange={ratingChanged}
            value={searchParams.get('rating')}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${classes.accordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.title}`}>
            Format
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <label htmlFor="audiobook">
            {' '}
            <input type="checkbox" id="audiobook" name="Audiobooks" value="Audiobooks" />
            <span className={`${classes.details}`}> Audiobooks </span>
          </label>
          {' '}
          <br />
          <label htmlFor="book">
            {' '}
            <input type="checkbox" id="book" name="Books" value="Books" />
            <span className={`${classes.details}`}> Books </span>
          </label>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${classes.accordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.title}`}>
            Language
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {languagesArr ? languagesArr.map((l) => (
            <Typography key={l.id} onClick={() => handleAddLanguage(l.language)} className={selectedItem.includes(l.language) ? `${classes.selected}` : `${classes.details}`}>
              { l.language}
              {' '}
            </Typography>
          )) : null}
        </AccordionDetails>
      </Accordion>
      <button type="button" onClick={handleSearchPopular} className={`${classes.button_accord}`}>
        Popular
      </button>
      <button type="button" onClick={handleSearchNew} className={`${classes.button_accord}`}>
        New
      </button>
    </>
  );
}

export default Search;
