import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classes from './accordion.module.css';

export default function BasicAccordion(props) {
  const { title, data } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryIds, setCategoryIds] = useState([]);
  const [authorIds, setAuthorIds] = useState([]);
  const handleAddParams = useCallback((id) => {
    if (title === 'genre') {
      if (!categoryIds.includes(id)) {
        categoryIds.push(id);
        setCategoryIds([...categoryIds]);
        searchParams.set('category_ids', categoryIds);
        setSearchParams(searchParams);
      } else if (title === 'authors') {
        if (!authorIds.includes(id)) {
          authorIds.push(id);
          setAuthorIds([...authorIds]);
          searchParams.set('author_ids', authorIds);
          setSearchParams(searchParams);
        } else if (title === 'price') {
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
        }
      }
    }
  }, []);
    <Accordion className={`${classes.accordion}`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={`${classes.title}`}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={`${classes.accrordion_details}`}>
        {data ? data.map((d) => (
          <Typography key={d.id} onClick={() => handleAddParams(d.id)} className={`${classes.details}`}>
            { d.category}
            {' '}
          </Typography>
        )) : null}
      </AccordionDetails>
    </Accordion>;
}

BasicAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};
