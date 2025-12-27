import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import styles from "./App.module.css";
import {Navbar} from "./components/Navbar/Navbar";
import {Hero} from "./components/Hero/Hero";
import {About} from "./components/About/About";
import {Projects} from "./components/Projects/Projects";
import {ProjectPage} from "./pages/ProjectPage";
import {Contact} from "./components/Contact/Contact";
import {PrivacyPolicyPage} from "./pages/PrivacyPolicyPage";

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero
                                    title="Hello,"
                                    description="We're Indie Game Developer. Reach out if you'd like to learn more!"
                                    buttonLink="mailto:fajaryudaapriliano@gmail.com"
                                    imageUrl="hero.png"
                                />
                                <About
                                    about="About"
                                    itemTitle="Game Designer"
                                    itemDescription="We design casual puzzle and arcade games that are easy to pick up and enjoy. We focus on creating simple mechanics and smooth gameplay that make playing fun. Our goal is to craft experiences that bring joy and entertainment to players."
                                />
                                <Projects/>
                                <Contact/>
                            </>
                        }
                    />

                    <Route path="/:id" element={<ProjectPage/>}/>
                    <Route path="/privacy-policy/:id" element={<PrivacyPolicyPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
