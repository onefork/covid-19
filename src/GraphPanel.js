import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import TopicList from './TopicList';
import Graph from './Graph';

// import mockupData from './mockup_data';
import topics from './topics';

// TODO error handling not found
// TODO routing / transition
// TODO calc(96% + 8px)

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   button: {
//     margin: theme.spacing(2),
//   },
//   placeholder: {
//     marginTop: 20,
//     width: 'calc(96% + 8px)',
//   },
//   loading: {
//     marginTop: 200,
//   },
// }));

const GraphPanel = ({ onNav }) => {
  // const classes = useStyles();
  const [query, setQuery] = React.useState({ status: 'idle' });

  const handleClick = (event, topic, subtopic, uid) => {
    // console.log(topic, subtopic, uid)
    onNav();
    setQuery({ status: 'progress' });
    getData(topic, subtopic);
  };

  const getData = (topic, subtopic) => {
    let url;
    if (topic === undefined || subtopic === undefined) {
      // url = topic === undefined ? 'main.json' : `topic_${topic}.json`;
      if (topic === undefined) setQuery({ status: 'success', data: topics });
      else setQuery({
        status: 'success',
        data: {
          topic: topic,
          ...topics[`topic_${topic}`]
        }
      });
    } else {
      url = `data_${topic}_${subtopic}.json`;
      fetch(process.env.PUBLIC_URL + '/data/' + url)
        .then(res => res.json())
        .then(
          (result) => {
            setQuery({ status: 'success', data: result });
            // if (result.topics) setQuery({ status: 'success', data: result });
            // else setQuery({ status: 'error', data: { message: 'Not a topic list.' } });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setQuery({ status: 'error', data: error });
          }
        )
    }
  }

  let content = null;
  switch (query.status) {
    case 'idle':
      setQuery({ status: 'progress' });
      getData();
      break;
    case 'success':
      if (query.data.nodes && query.data.edges) {
        content = (
          <Graph data={query.data} />
        );
      } else {
        content = (
          <TopicList data={query.data} onClick={handleClick} />
        );
      }
      break;
    case 'progress':
      content = (
        <Fade
          in={query.status === 'progress'}
          style={{
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
      content = (
        <div>Error: {query.data.message}</div>
      );
      break;
    default:

  }
  return content;
}

export default GraphPanel;
