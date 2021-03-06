import React from 'react';
import MediaRow from './mediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(0, 150, 136, 0.6)",
  },
}));

const MediaTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia('liquidapp');

  console.log('täällä picArrayssa: ', picArray);

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={"100%" }
        className={classes.gridList}
        cols={1}
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {picArray.map((file) => (
          <GridListTile key={file.file_id}>
            <MediaRow file={file} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MediaTable;

