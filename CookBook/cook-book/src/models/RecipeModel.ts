export interface RecipeModel {
    id:string,
    date:string,
    title:string,
    directions:Array<string>,
    image:string,
    ingredients:Array<string>
    timetocook:string
}