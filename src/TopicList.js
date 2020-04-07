import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';

// TODO width, height, cols

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: '80%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     uid: 'uid',
 *     src: 'src',
 *     // img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TopicList({ data, onClick }) {
  const classes = useStyles();

  const tileData = [];

  for (const property in data) {
    if ((property.startsWith('topic') || property.startsWith('subtopic'))
      && data[property].name !== undefined) {
      const topic = data.topic || (property.startsWith('topic') ? property.substr(6) : undefined);
      const subtopic = property.startsWith('subtopic') ? property.substr(9) : undefined;
      tileData.push({
        uid: property,
        topic,
        subtopic,
        ...data[property]
      });
    }
  }

  // console.log(tileData);

  // return (
  //   query.status === 'progress')
  //   ? (
  //     <div className={classes.root}>
  //       <CircularProgress />
  //       <div>loading...</div>
  //     </div >
  //   ) : (

  //     <div className={classes.root}>
  //       <GridList cellHeight={160} className={classes.gridList} cols={3}>
  //         {tileData.map((tile) => (
  //           <GridListTile key={tile.uid} cols={tile.cols || 1} onClick={onClick}>
  //             <img src={tile.img || tile.src || process.env.PUBLIC_URL + '/topic.png'} alt={tile.title} />
  //           </GridListTile>
  //         ))}
  //       </GridList>
  //     </div>
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={180} cols={3}>
        <GridListTile key="Subheader" style={{ height: 'auto' }} cols={3} >
          <ListSubheader component="div">{data.name}</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.uid} onClick={event => onClick(event, tile.topic, tile.subtopic, tile.uid)}>
            <img src={tile.img || tile.src || process.env.PUBLIC_URL + '/topic.png'} alt={tile.title} />
            <GridListTileBar
              title={tile.name}
              // subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}}
      </GridList>
    </div >
  );
}
