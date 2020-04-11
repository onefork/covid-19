import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchInput from './SearchInput';
import DataTable from './DataTable';
// import Graph from './Graph';
import GraphPanel from './GraphPanel';

import examples from './data/examples';
import mockupData from './data/mockup_papers';

// const drawerWidth = 120; // xx em?
const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  mainToolbar: {
    justifyContent: 'space-around',
  },
  hackHide: {
    visibility: 'hidden',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: theme.spacing(7) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
    width: '40em',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  mainContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    flexFlow: 'column',
  },
  flexHeader: {
    flex: '0 1 auto',
  },
  flexContent: {
    flex: '1 1 auto',
  },
  flexFooter: {
    flex: '0 1 40px',
  },
}));

export default function Main() {
  const classes = useStyles();
  const theme = useTheme();
  const [input, setInput] = React.useState(''); // default input
  const [graphOnly, setGraphOnly] = React.useState(false);
  const [listFull, setListFull] = React.useState(false);
  const [query, setQuery] = React.useState({ status: 'idle' });
  const timerRef = React.useRef();

  const handleDrawerToggle = () => {
    if (!graphOnly) setListFull(!listFull);
    else {
      setGraphOnly(false);
      setListFull(false);
    }
  };

  // const handleDrawerOpen = () => {
  //   setListFull(true);
  // };

  // const handleDrawerClose = () => {
  //   setListFull(false);
  // };

  const handleGraphToggle = () => {
    setGraphOnly(!graphOnly);
    // no need to set this (graphOnly supercedes listFull)
    // setListFull(false);
  };

  const handleGraphNav = () => {
    setGraphOnly(true);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = (event) => {
    if (process.env.REACT_APP_MOCKUP_DATA === 'true') return handleSearchMockup(event);

    setQuery({ status: 'progress' });
    setGraphOnly(false);
    setListFull(true);

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
          else setQuery({ status: 'error', data: { message: 'Not a paper list.' } });
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
      setGraphOnly(false);
      setListFull(false);
      return;
    }

    setQuery({ status: 'progress' });
    setGraphOnly(false);
    setListFull(true);

    timerRef.current = setTimeout(() => {
      setQuery({ status: 'success', data: mockupData });
    }, 2000);
  };

  let drawerContent = null;
  switch (query.status) {
    case 'idle':
      drawerContent = (
        <Box m={5} style={{ whiteSpace: "normal" }}>
          <Typography>
            We still have several bugs to fight with.
            <br />
            If you're interested, please visit us again this week for a fully functional live demo.
            <br /><br />
            :)
          </Typography>
        </Box>
      );
      break;
    case 'success':
      const langs = !query.data.langs
        ? {
          en: 'English',
          de: 'Deutsch',
          fr: 'Français',
          it: 'Italiano',
          zh: 'Chinese',
          es: 'Español',
          pt: 'Português',
          ja: 'Japanese',
        }
        : {
          ...query.data.langs.en && { en: 'English' },
          ...query.data.langs.de && { de: 'Deutsch' },
          ...query.data.langs.fr && { fr: 'Français' },
          ...query.data.langs.it && { it: 'Italiano' },
          ...query.data.langs.zh && { zh: 'Chinese' },
          ...query.data.langs.es && { es: 'Español' },
          ...query.data.langs.pt && { pt: 'Português' },
          ...query.data.langs.ja && { ja: 'Japanese' },
        }
      drawerContent = (
        <DataTable data={query.data.papers} langs={langs} />
      );
      break;
    case 'progress':
      drawerContent = (
        <Fade
          in={query.status === 'progress'}
          style={{
            marginTop: 5,
            transitionDelay: query.status === 'progress' ? '500ms' : '0ms',
            textAlign: 'center', // TODO why here?
          }}
          unmountOnExit
        >
          <div>
            <CircularProgress />
            <div>loading...</div>
          </div>

        </Fade>
      );
      break;
    case 'error':
      console.debug('Error', query.data);
      drawerContent = (
        <div>Error: {query.data.message}</div>
      );
      break;
    default:

  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          // [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.mainToolbar}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: true,
            })}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Box> */}
          {/* <Typography variant="h6" noWrap style={{ marginRight: 50 }}>{process.env.REACT_APP_TITLE}</Typography> */}
          <Typography variant="h6" noWrap>{process.env.REACT_APP_TITLE}</Typography>
          <SearchInput
            style={{ margin: 'auto' }}
            value={input}
            onChange={handleChange}
            onSearch={handleSearch}
            onMenu={handleDrawerToggle}
            onGraph={handleGraphToggle}
          />
          <Typography variant="h6" noWrap className={classes.hackHide}>{process.env.REACT_APP_TITLE}</Typography>
          {/* </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: listFull,
          [classes.drawerClose]: !listFull,
          [classes.hide]: graphOnly,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: listFull,
            [classes.drawerClose]: !listFull,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </div>
        <Divider />
        {drawerContent}

        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}

      </Drawer>
      <div
        className={classes.mainContent}
      >
        {
          // NOTE
          // https://material-ui.com/components/app-bar/#fixed-placement
          // https://material-ui.com/components/drawers/#MiniDrawer.js
          // https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
        }
        <div className={`${classes.toolbar} ${classes.flexHeader}`} />
        <div
          className={
            clsx(classes.flexContent, {
              [classes.hide]: !graphOnly && listFull,
            })}
        >
          <GraphPanel onNav={handleGraphNav} />
          {/* <Typography variant="overline" color="textSecondary">
            {process.env.REACT_APP_TITLE}
          </Typography> */}
        </div>
      </div>
    </div>
  );
}
