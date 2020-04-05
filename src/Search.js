import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchInput from './SearchInput';
import Table from './Table';

import mockupData from './mockup_data';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    marginTop: 20,
    width: 'calc(96% + 8px)',
  },
  loading: {
    marginTop: 200,
  },
}));

const Search = () => {
  const classes = useStyles();
  const [input, setInput] = React.useState(''); // default input
  const [query, setQuery] = React.useState({ status: 'idle' });
  const timerRef = React.useRef();

  // Seems to be wrong code
  // React.useEffect(
  //   () => () => {
  //     clearTimeout(timerRef.current);
  //   },
  //   [],
  // );

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = (event) => {
    if (process.env.REACT_APP_MOCKUP_DATA === 'true') return handleSearchMockup(event);

    setQuery({ status: 'progress' });

    const url = new URL(process.env.REACT_APP_BACKEND || 'http://localhost:8000/papers');
    url.search = new URLSearchParams({ 'q': input });

    fetch(url,
      {
        headers: new Headers({
          'Authorization': 'ZHANG',
          'Account-ID': 'bin'
        })
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          if (result.papers) setQuery({ status: 'success', data: result });
          else setQuery({ status: 'error', data: { message: '' } });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setQuery({ status: 'error', data: error });
        }
      )
  };

  const handleSearchMockup = (event) => {
    clearTimeout(timerRef.current);

    if (query.status !== 'idle') {
      setQuery({ status: 'idle' });
      return;
    }

    setQuery({ status: 'progress' });

    timerRef.current = setTimeout(() => {
      setQuery({ status: 'success', data: mockupData });
    }, 1000);
  };

  const columns = [
    {
      title: 'Title',
      field: 'title',
      // customFilterAndSearch: (term, rowData) => term == rowData.name.length,
      cellStyle: {
        fontWeight: 'bold',
      },
    },
    { title: 'Score', field: 'score', type: 'numeric' },
    { title: 'Date', field: 'date', type: 'date' },
    {
      title: 'Language',
      field: 'language',
      lookup: { en: 'English', de: 'German', fr: 'French' },
    },
    // { title: 'Year', field: 'year', type: 'numeric' },
    // {
    //   title: 'Country',
    //   field: 'country',
    //   lookup: { 1: 'Switzerland', 2: 'China', 3: 'Italy', 4: 'USA' },
    // },
  ];

  let content;
  switch (query.status) {
    case 'success':
      content = (
        <Table data={query.data.papers} columns={columns} />
      );
      break;
    case 'progress':
      content = (
        <Fade
          in={query.status === 'progress'}
          style={{
            transitionDelay: query.status === 'progress' ? '500ms' : '0ms',
          }}
          unmountOnExit
        >
          <div>
            <CircularProgress />
            <div>loading</div>
          </div>

        </Fade>
      );
      break;
    case 'error':
      console.debug('Error', query.data);
      content = (
        <div>Error: {query.data.message}</div>
      );
      break;
    default:

  }

  return (
    <div className={classes.root}>
      <SearchInput value={input} onChange={handleChange} onSearch={handleSearch} />
      <div className={classes.placeholder}>
        {content}
      </div>
    </div>
  );
}

export default Search;
