import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '50em',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchInput = ({ value = '', placeholder, onChange, onSearch, onMenu, onGraph }) => {
  const classes = useStyles();

  // console.log('render')

  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // const [cValue, setCValue] = React.useState('');
  // const handleChange = (event) => {
  //   onChange && onChange(event);
  //   value === undefined && setCValue(event.target.value);
  // };
  // console.log('value=', value,',', cValue);
  // value === undefined || cValue === value || setCValue(value); // does it cause 2 renders for the 1st render?
  // const [test, setTest] = React.useState(Math.random());
  // const handleTest = () => setTest(test + 1)
  // console.log('test=', test);

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={event => { onSearch && onSearch(event); event.preventDefault(); }}
    >
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        onClick={onMenu}
      >
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder || 'What are you looking for?'}
        inputProps={{ 'aria-label': 'search papers' }}
        value={value}
        onChange={onChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="graph"
        onClick={onGraph}
      >
        <BubbleChartIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;
