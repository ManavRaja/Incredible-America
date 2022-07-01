import Home from './components/Home';
import Attractions from './components/Attractions';
import Restaurants from "./components/Restaurants" 
import NotFound from './components/NotFound';
import About from './components/About';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';


function App() {

    // Set some properties of the bot
    const config = {
        floating: true,
        customDelay: 250,
        userDelay: 250,
        headerTitle: "Incredible America Help Bot"
    };

    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#ffca2c',
        headerFontColor: 'black',
        headerFontSize: '15px',
        botBubbleColor: 'black',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
      };

    const steps = [
        {
            id: '0',
            message: 'Welcome to Incredible America, your guide to attractions and restaurants in America!',
            trigger: "1"
        },
        {
            id: "1",
            message: "I am a bot that was made to help users like you.",
            trigger: "2"
        },
        {
            id: "2",
            message: "Do you need any help?",
            trigger: "3"
        },
        {
            id: "3",
            options: [{ value: "Yes", label: "Yes", trigger: 'Help' }, { value: "No", label: 'No', trigger: 'End' }]
        },
        {
            id: "End",
            message: "Ok, I hope you a good day! Bye 👋",
            end: true
        },
        {
            id: "Help",
            message: "Ok",
            trigger: "What Help"
        },
        {
            id: "What Help",
            message: "What do you need help with?",
            trigger: "Ask What Help"
        },
        {
            id: "Ask What Help",
            options: [{ value: "Attractions", label: "Help with Attractions", trigger: 'Help Attractions' }, { value: "Help with Restaurants?", label: 'Help with Restaurants', trigger: 'Help Restaurants' }, { value: "Help with Attraction Filters?", label: 'Help with Attraction Filters', trigger: 'Help Attraction Filters' }, { value: "Help with Restaurant Filters?", label: 'Help with Restaurant Filters', trigger: 'Help Restaurant Filters' }]
        },
        {
            id: "Help Attractions",
            message: "To see the attractions of America, click on the attractions link in the top right. Once you get there, if you let the website have your current location, it will automatically, show attractions for your state if you live in America or it will pick a random state if you don't live inside America or don't let the website get your current location",
            trigger: "Help Attractions 2"
        },
        {
            id: "Help Attractions 2",
            message: "Once the attractions for the state load, you can see a picture of the attraction, it's name, rating, as well as click to show buttons that will display it's address, contact information, and visiting hours.",
            trigger: "End",
        },
        {
            id: "Help Attraction Filters",
            message: "If you want to only see attractions that are currently open, click on the dropdown menu below the 'Open Now?' filter and click `Open.` If you want to only see attractions with a certain rating, click on the dropdown menu below `Rating Filter` and select the desired minimum rating you want attractions to have.",
            trigger: "Help Attraction Filters 2",
        },
        {
            id: "Help Attraction Filters 2",
            message: "Lastly, if you want to view attractions for a different state, click on the dropdown menu below `Choose State` and select your desired state.",
            trigger: "End",
        },
        {
            id: "Help Restaurants",
            message: "To see the restaurants of America, click on the Restaurants link in the top right. Once you get there, if you let the website have your current location, it will automatically, show restaurants for your state if you live in America or it will pick a random state if you don't live inside America or don't let the website get your current location",
            trigger: "Help Restaurants 2"
        },
        {
            id: "Help Restaurants 2",
            message: "Once the restaurants for the state load, you can see a picture of the restaurant, it's name, rating, the price level, as well as click to show buttons that will display it's address, contact information, and business hours.",
            trigger: "End",
        },
        {
            id: "Help Restaurant Filters",
            message: "If you want to only see restaurants in a specific price range, click on the dropdown menu below the 'Price Filter' and click on your desired price range. If you want to only see restaurants with a certain rating, click on the dropdown menu below `Rating Filter` and select the desired minimum rating you want restaurants to have.",
            trigger: "Help Restaurant Filters 2",
        },
        {
            id: "Help Restaurant Filters 2",
            message: "Lastly, if you want to view restaurants for a different state, click on the dropdown menu below `Choose State` and select your desired state.",
            trigger: "End",
        },
        {
            id: "End",
            message: "Thank you for visiting Incredible America & have a good day!",
            trigger: "What Help"
        }
    ];

    return (
        <>
        <Router>
            <ThemeProvider theme={theme}>
                <ChatBot steps={steps} {...config} />
            </ThemeProvider>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Incredible America</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto">
                                <Link className="nav-link active" to="/">Home</Link>
                                <Link  className="nav-link active" to="/attractions">Attractions</Link>
                                <Link className="nav-link active" to="/restaurants">Restaurants</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/about" element={<About />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
        </>
);
}

export default App;
