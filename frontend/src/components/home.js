import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Home({ token }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null || token === '') {
            navigate('/login')
        }
    })

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

export default Home;
