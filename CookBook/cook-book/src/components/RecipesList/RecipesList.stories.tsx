import React from 'react';
import RecipesList from './index'


import { storiesOf } from '@storybook/react';

const recipes = [
    {
        "id": "56c782f18990ecf954f6e027",
        "date": "2016-06-09T15:03:23.000Z",
        "title": "Chef John's Frozen Zabaglione",
        "directions": ["Whisk egg yolks, salt, sugar, and Marsala wine together in a metal mixing bowl.Set the bowl over a medium-low heat, or over a double boiler. Hold the bowl with one hand using a towel or pot-holder, while whisking constantly with the other. Continue cooking until the mixture is very thick and reaches the ribbon stage, about 10 minutes.Remove custard from heat and allow to cool completely, preferably over an ice bath, whisking occasionally, 20 to 30 minutes.Pour cold heavy cream into another bowl and whisk until soft peaks form. Transfer into the cooled custard and gently fold everything together until just barely combined; do not overmix.Transfer into an airtight container, cover the top with plastic wrap, and seal. Place in a freezer until firm, at least 4 hours, or up to overnight."],
        "ingredients":["6 large egg yolks", "1 pinch salt", "1/2 cup white sugar", "2/3 cup dry Marsala wine", "1 cup cold heavy cream"],
        "image":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F08%2F27%2FIMG_5769-2000.jpg&w=272&h=272&c=sc&poi=face&q=85"
    },
    {
        "id": "56c782f17b4e0ba78c7ad717",
        "date": "2016-04-09T18:03:23.000Z",
        "title": "Air Fryer Chicken Thighs",
        "directions": [ "Preheat an air fryer to 400 degrees F (200 degrees C).",
        "Pat chicken thighs dry with a paper towel and brush the skin-side of each piece with olive oil. Place chicken thighs, skin-side down, in a single layer on a plate.",
        "Combine smoked paprika, garlic powder, salt, and pepper in a bowl and sprinkle half the seasoning mixture evenly over the 4 chicken thighs. Turn thighs over and evenly sprinkle remaining seasoning mixture on top. Place chicken thighs in the air fryer basket in a single layer, skin-side up.",
        "Fry in the preheated air fryer until chicken is brown and juices run clear, about 18 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
        ],
        "ingredients":[
            "4 eaches skin-on, boneless chicken thighs", 
            "2 teaspoons extra-virgin olive oil", 
            "1 teaspoon smoked paprika", 
            "3/4teaspoon garlic powder", 
            "1/2 teaspoon salt", 
            "1/2 teaspoon ground black pepper"
        ],
        "image":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F08%2F27%2Fimage.jpg&w=272&h=272&c=sc&poi=face&q=85"
    }
];
storiesOf('RecipesList', module)
  .add('Default', () => <RecipesList recipes={recipes}/>)