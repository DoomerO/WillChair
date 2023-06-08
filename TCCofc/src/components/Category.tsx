import { Link } from "react-router-dom";
import "../styles/components/Category.css";

//properties to adjust the component
interface catProps {
    imgPath: string //Using to define the path to an image to represent the category
    name: string //Using to define the name to a Category
}  

const Category =({imgPath, name}:catProps) => {

    return (
        <div id="Category">
            <div id="background">
                <Link to={"/login"}><img src={imgPath}></img></Link>
            </div>
            <div id="title">{name}</div>
        </div>
    )
}

export default Category;