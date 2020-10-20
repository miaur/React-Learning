import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            maxWidth: 345,
        },
        cardMedia: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        cardDisabled: {
            display: "disabled",
        },
        cardExpand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        gridRoot: {
            flexGrow: 1,
        },
        gridControl: {
            padding: theme.spacing(2),
        },
    }),
);

export function RecipeSkeleton() {
    const classes = useStyles();
    return (
        <Card className={classes.cardRoot}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" className={classes.cardDisabled}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 3 }} />}
                subheader={<Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 3 }} />}
            />
            <Skeleton animation="wave" variant="rect" className={classes.cardMedia} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{ maxWidth: "200px" }}>
                    Time to cook: <Skeleton animation="wave" height={18} width="50%" style={{ marginBottom: 3, float: "right" }} />
                </Typography>
                <Typography paragraph>Ingredients: </Typography>
                <span><ul>
                    <li><Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 3 }} /></li>
                    <li><Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 3 }} /></li>
                    <li><Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 3 }} /></li>
                </ul></span>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" className={classes.cardDisabled}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" className={classes.cardDisabled}>
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.cardExpand, classes.cardDisabled)}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    );
}

interface RecipesGridSkeletonProps {
    count: number;
}

export default function RecipesGridSkeleton(props: RecipesGridSkeletonProps) {
    const classes = useStyles();

    return (
        <Grid container className={classes.gridRoot} spacing={2}>
            {(new Array(props.count)).map((_, index) => <Grid xs={6} lg={3} key={index} item>
                <RecipeSkeleton />
            </Grid>)}
        </Grid>
    );
}

