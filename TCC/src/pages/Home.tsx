import {Link} from 'react-router-dom';

const Home = () => {
    return  (
        <div>
            <h1>Mano</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home;