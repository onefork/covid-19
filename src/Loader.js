import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import Input from './Input';
import Table from './Table';

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

export default function DelayingAppearance() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  // const handleClickLoading = () => {
  //   setLoading((prevLoading) => !prevLoading);
  // };

  const handleClickQuery = () => {
    clearTimeout(timerRef.current);

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }

    setQuery('progress');
    timerRef.current = setTimeout(() => {
      setQuery('success');
    }, 2000);
  };

  return (
    <div className={classes.root}>
      {/* <div className={classes.placeholder}>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </div>
      <Button onClick={handleClickLoading} className={classes.button}>
        {loading ? 'Stop loading' : 'Loading'}
      </Button> */}
      <Input search={handleClickQuery} />
      <div className={classes.placeholder}>
        {query === 'success' ? (
          <Table />
        ) : (
            <Fade
              in={query === 'progress'}
              style={{
                transitionDelay: query === 'progress' ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <div className={classes.root}>
                <CircularProgress />
                <div>loading</div>
              </div>

            </Fade>
          )}
      </div>
      {/* <Button onClick={handleClickQuery} className={classes.button}>
        {query !== 'idle' ? 'Reset' : 'Simulate a load'}
      </Button> */}
    </div>
  );
}
