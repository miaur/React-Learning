import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

class Recipe extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isOpen: true
        };
    
    }

    onViewClick = (isOpen) => { 
        console.log('onViewClick');
        this.isOpen = !isOpen;
    }

    render() {
        const {recipe} = this.props;

        const ingredientsList = recipe.ingredients.map(
            (ingredient) => 
                <li>{ingredient}</li>
        );
        const ingredients = <div><ul>{ingredientsList}</ul></div>;
        const directions = <div><ul>{
            recipe.directions.map(
                (direction, index) => 
            <li>Step {(index + 1) + " " + direction}</li>
                
        )}</ul></div>;

        return(
            <div>
                <div className='card-header'>
                    <Typography fontFamily="CopperPot Bold" variant="h2" component="h2" gutterBottom>
                        {recipe.title} 
                        {/* <Button backgroundColor="rgba(147,146,224,1)" label={this.state.isOpen ? 'close' : 'view'} onClick={this.onViewClick} primary size="small"/> */}
                        <button className='btn btn-primary btn-sm float-right' onClick={this.onViewClick}>{this.state.isOpen ? 'close' : 'view'}</button>
                    </Typography>
                    
                    
                </div>
                <Container maxWidth="sm">
                    <div>
                        {/* TODO image from file */}
                        <img src={recipe.image} alt={recipe.title + " image"} className="rounded float-left" />
                    </div>
                    <div style={{float: 'left'}}>
                        <Typography fontFamily="CopperPot Bold" variant="h2" component="h2" gutterBottom>
                            {recipe.title}
                        </Typography>
                    </div>
                    <div>
                        Ingredients:
                        {ingredients}

                        Directions:
                        {directions}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Recipe