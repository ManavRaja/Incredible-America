import "./HomeContent.css"
import niagaraFalls from "../niagaraFalls.jpg"
import tacoPlate from "../tacoPlate.jpg"
import { Link } from "react-router-dom";

const HomeContent = () => {
  return (
    <div className="home-content">
        <h3 className="home-hype-text">America is a vast land with many surprises. From the breathtaking Niagra Falls to the magnificent Golden Gate Bridge, there are many attractions to explore. As America is such a diverse country, there are a plethora of foreign cuisine available, so foodies will have a great time.</h3>
        <div className="d-flex justify-content-center flex-wrap">
            <Link to="/restaurants">
                <div>
                    <img className="home-type-pic img-fluid" src={tacoPlate} alt="Tacos on Plate"></img>
                    <h3 className="home-type-link">See Restaurants in America</h3>
                </div>
            </Link>
            <Link to="attractions">
                <div>
                    <img className="home-type-pic img-fluid" src={niagaraFalls} alt="Niagara Falls"></img>
                    <h3 className="home-type-link">See Attractions in America</h3>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default HomeContent