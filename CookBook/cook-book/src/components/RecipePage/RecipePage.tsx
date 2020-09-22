import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

import CardHeader from '@material-ui/core/CardHeader'
import { CardMedia } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type RecipePageProps = {} & RouteComponentProps<{
    id: string
}>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
);

export default function RecipePage(props: RecipePageProps) {
    const { id } = props.match.params;

    //TODO json file
    const recipe = {
        "id": id,
        "date": "2020-04-09T18:03:23.000Z",
        "title": "Air Fryer Chicken Thighs",
        "directions": ["Preheat an air fryer to 400 degrees F (200 degrees C).",
            "Pat chicken thighs dry with a paper towel and brush the skin-side of each piece with olive oil. Place chicken thighs, skin-side down, in a single layer on a plate.",
            "Combine smoked paprika, garlic powder, salt, and pepper in a bowl and sprinkle half the seasoning mixture evenly over the 4 chicken thighs. Turn thighs over and evenly sprinkle remaining seasoning mixture on top. Place chicken thighs in the air fryer basket in a single layer, skin-side up."
        ],
        "ingredients": [
            "4 eaches skin-on, boneless chicken thighs",
            "2 teaspoons extra-virgin olive oil",
            "1 teaspoon smoked paprika",
            "3/4teaspoon garlic powder",
            "1/2 teaspoon salt"
        ],
        "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F08%2F27%2Fimage.jpg&w=272&h=272&c=sc&poi=face&q=85",
        "timetocook": "1 hour"
    };

    const classes = useStyles();

    return (
        <div>
            <CardHeader title={recipe.title} />
            <CardMedia
                className={classes.media}
                image={recipe.image}
                title={recipe.title}
            />
            Тра ля ля! Тут сейчас будет рецептик :Р {id}
        </div>
    );
}