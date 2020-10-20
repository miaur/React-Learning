import React from 'react'
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            justifyContent: "space-between",
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
        },
        appBar: {
            marginBottom: theme.spacing(3),
        },
        media: {}
    }),
);

export default function Header() {
    const classes = useStyles();
    const img = <img width="90px" src="https://icons.iconarchive.com/icons/mcdo-design/book/256/Cook-Book-icon.png" alt="Cook Book" />
    return (
        <AppBar className={classes.appBar} position="static" color="default">
            <Toolbar className={classes.toolbar}>
                <Link to={`/`}>
                    {img}
                </Link>
                <Link to={`/editForm`}>
                    <Button variant="outlined" color="primary">Add New Recipe</Button>
                </Link>
                <Button variant="outlined" color="primary">Sing In</Button>
            </Toolbar>
        </AppBar>
    );
}