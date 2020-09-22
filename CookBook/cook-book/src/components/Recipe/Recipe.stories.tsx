import React from 'react';
import Recipe from './index'

import { storiesOf } from '@storybook/react';
import { RecipeModel } from '../../models/RecipeModel';

const recipe: RecipeModel =
{
    "id": "56c782f18990ecf954f6e027",
    "date": "2016-06-09T15:03:23.000Z",
    "title": "Chef John's Frozen Zabaglione",
    "directions": ["Whisk egg yolks, salt, sugar, and Marsala wine together in a metal mixing bowl.Set the bowl over a medium-low heat, or over a double boiler. Hold the bowl with one hand using a towel or pot-holder, while whisking constantly with the other. Continue cooking until the mixture is very thick and reaches the ribbon stage, about 10 minutes.Remove custard from heat and allow to cool completely, preferably over an ice bath, whisking occasionally, 20 to 30 minutes.Pour cold heavy cream into another bowl and whisk until soft peaks form. Transfer into the cooled custard and gently fold everything together until just barely combined; do not overmix.Transfer into an airtight container, cover the top with plastic wrap, and seal. Place in a freezer until firm, at least 4 hours, or up to overnight."],
    "ingredients": ["6 large egg yolks", "1 pinch salt", "1/2 cup white sugar", "2/3 cup dry Marsala wine", "1 cup cold heavy cream"],
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F08%2F27%2FIMG_5769-2000.jpg&w=272&h=272&c=sc&poi=face&q=85",
    "timetocook": "5 minutes"
}

storiesOf('Recipe', module).add('Default', () => <Recipe recipe={recipe} />)