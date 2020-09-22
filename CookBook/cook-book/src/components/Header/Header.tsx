import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            justifyContent: "space-between",
            alignItems: 'flex-start',
            paddingTop: theme.spacing(2),
        },
        appBar: {
            marginBottom: theme.spacing(3),
        },
        media: {}
    }),
);

export default function Header() {
    const classes = useStyles();
    const img = <img width="80%" height="80%" src="https://icons.iconarchive.com/icons/mcdo-design/book/256/Cook-Book-icon.png" alt="Cook Book" />
    return (
        <AppBar className={classes.appBar} position="static" color="default">
            <Toolbar className={classes.toolbar}>
                <Link to={`/`}>
                    {img}
                </Link>
                <Button variant="outlined" color="primary">Sing In</Button>
            </Toolbar>
        </AppBar>
    );
}