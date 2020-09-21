import React from 'react';
import { Link } from 'react-router-dom'; 
export default function Home() {
    return (
        <div>
           <h1><center> Welcome to the Hello Jeopardy Tool! </center></h1>
           <h2><center>You can checkout the Creation Tool <Link to="/Create"> Here </Link> </center></h2>
           <div>
                <h3> Here are some features: </h3>
                <ul>
                    <li>The user can create up to five categories with up to 200 point and 1000 point clues for Single Jeopardy.</li>
                    <li>The user can create up to five categories with up to 400 point and 2000 point clues for Double Jeopardy.</li>
                    <li>The user can create a Final Jeopardy.</li>
                </ul>
            </div>
            <div>
                <h3>Coming Soon:</h3>
                <ul>
                    <li>A Create Button to Launch Your Jeopardy Game!</li>
                </ul>      
            </div>
            <div>            
                <footer>
                    <p>Authors</p>
                        <ul>
                            <li>Your Name Here #1</li>
                            <li>Your Name Here #2</li>
                            <li>Your Name Here #3</li>
                        </ul>
                    <p>Here is a link to the Github Reposiory: <a href="https://github.com/jake-freeman/jeopardy-tool">Github</a></p>
                    <p>Contact Information: example@gmail.com</p>
                    <p>Copyright: &copy; The Chat</p>
                </footer>
            </div>

        </div>
    );
}
