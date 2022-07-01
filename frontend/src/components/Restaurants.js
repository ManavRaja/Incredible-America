import { useState, useEffect } from "react";
import Restaurant from "./Restaurant.js";
import "./Restaurants.css"
import RatingFilter from "./RatingFilter.js";
import StateFilter from "./StateFilter.js";
import PriceFilter from "./PriceFilter.js";

const Restaurants = () => {
    // Set react states
    const [state, setState] = useState()
    const [allAmericanStates, setallAmericaStates] = useState(["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"])
    const [ratingThreshold, setratingThreshold] = useState("All")
    const [priceThreshold, setpriceThreshold] = useState("All")
    const [permanentRestaurantsList, setpermanentRestaurantsList] = useState([])
    const [restaurantsList, setrestaurantsList] = useState([])

    // Fetches data from backend
    async function fetchdata() {
        if (state == null) {
            let response = await fetch("https://new.fbla.manavrv.dev/restaurants")
            let data = await response.json()
            setrestaurantsList(data)
            setpermanentRestaurantsList(data)
            setState(data[0].state)
        } else {
            let response = await fetch(`https://new.fbla.manavrv.dev/restaurants/${state}`)
            let data = await response.json()
            setrestaurantsList(data)
            setpermanentRestaurantsList(data)
            setratingThreshold("All")
            setpriceThreshold("All")
        }
        
    }

    async function fetchdata() {
        if (state == null) {

            let localGeoapiState
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async function(position) {
                    let request = await fetch(`https://new.fbla.manavrv.dev/get-location/${position.coords.latitude}/${position.coords.longitude}`)
                    localGeoapiState = await request.text()
                    let response = await fetch(`https://new.fbla.manavrv.dev/restaurants/${localGeoapiState.replaceAll('"', '')}`)
                    let data = await response.json()
                    setrestaurantsList(data)
                    setpermanentRestaurantsList(data)
                    setState(localGeoapiState.replaceAll('"', ''))
                });
            } else {
                let response = await fetch(`https://new.fbla.manavrv.dev/restaurants/${state}`)
                let data = await response.json()
                setrestaurantsList(data)
                setpermanentRestaurantsList(data)
                setratingThreshold("All")
                setpriceThreshold("All")
            }

            
        } else {
            let response = await fetch(`https://new.fbla.manavrv.dev/restaurants/${state}`)
            let data = await response.json()
            setrestaurantsList(data)
            setpermanentRestaurantsList(data)
            setratingThreshold("All")
            setpriceThreshold("All")
        }
        
    }
    
    // Runs on initial page load and when the state state gets modified
    useEffect(() => {
        fetchdata() // Cals fetchdata function to get info about restaurants
    }, [state])

    // Runs when a new state has been selected
    function changeState(event) {
        setState(event.target.innerHTML)
        setratingThreshold(1)
    }

    function filterRatingThreshold(restaurant) {
        if (restaurant.rating >= ratingThreshold || ratingThreshold == "All") {
            return true
        } else{
            return false
        }
    }

    function filterPriceChange(restaurant) {
        if (priceThreshold == "All") {
            return true
        } else if (priceThreshold == "$$$") {
            if (restaurant.price == "$$ - $$$" || restaurant.price == "$") {
                return true
            } else {
                return false
            }
        } else if (priceThreshold == "$") {
            if (restaurant.price == "$") {
                return true
            } else {
                return false
            }
        }
    }



    // Runs when a new rating filter has been selected
    function ratingChange(event) {
        if (event.target.innerHTML === "All") {
            setratingThreshold("All")
        } else {
            setratingThreshold(Number(event.target.innerHTML))
        }
        let newRestaurantsList = []
        for (let restaurant of permanentRestaurantsList) {
            if (event.target.innerHTML === "All") {
                newRestaurantsList.push(restaurant)
            } else {
                if (restaurant.rating >= Number(event.target.innerHTML)) {
                    newRestaurantsList.push(restaurant)
                }
            }
        }
        setrestaurantsList(newRestaurantsList.filter(filterPriceChange))
    }

    function priceChange(event) {
        setpriceThreshold(event.target.innerHTML)
        let newRestaurantsList = []
        for (let restaurant of permanentRestaurantsList) {
            if (event.target.innerHTML == "All") {
                newRestaurantsList.push(restaurant)
            } else if (event.target.innerHTML == "$$$") {
                if (restaurant.price == "$$ - $$$" || restaurant.price == "$") {
                    newRestaurantsList.push(restaurant)
                }
            } else if (event.target.innerHTML == "$") {
                if (restaurant.price == "$") {
                    newRestaurantsList.push("$")
                }
            }
        }
        setrestaurantsList(newRestaurantsList.filter(filterRatingThreshold))
    }


    if (state == null) {
        return (
        <div class="loading spinner-border text-warning d-flex" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        )
    } else if (restaurantsList.length < 1) {
        return (
            <>
                <h1 className="display-3 title">Restauants in {state}</h1>

                <hr/>

                <div className="filters-section">
                <h1 className="text-center">Filters</h1>
                <div className="d-flex justify-content-center flex-wrap">

                    <div className="filter state-filter d-flex flex-column justify-content-center">
                        <h6>Choose State</h6>
                        <StateFilter state={state} changeState={changeState} allAmericanStates={allAmericanStates} />
                    </div>

                    <div className="filter rating-fliter d-flex flex-column justify-content-center">
                        <h6>Price Filter</h6>
                    <PriceFilter priceThreshold={priceThreshold} priceChange={priceChange} />
                    </div>


                    <div className="filter rating-fliter d-flex flex-column justify-content-center">
                        <h6>Rating Filter</h6>
                    <RatingFilter ratingThreshold={ratingThreshold} ratingChange={ratingChange} />
                    </div>

                    
                </div>
            </div>

                

            <h1 className="text-center">No Restauarants Match These Filters</h1>
            </>
        )
    } else {

    return (
        <>
            <h1 className="display-3 title">Restauarants in {state}</h1>
            <hr className="sep-2"/>

            
            <div className="filters-section">
                <h1 className="text-center">Filters</h1>
                <div className="d-flex justify-content-center flex-wrap">

                    <div className="filter state-filter d-flex flex-column justify-content-center">
                        <h6>Choose State</h6>
                        <StateFilter state={state} changeState={changeState} allAmericanStates={allAmericanStates} />
                    </div>

                    <div className="filter rating-fliter d-flex flex-column justify-content-center">
                        <h6>Price Filter</h6>
                    <PriceFilter priceThreshold={priceThreshold} priceChange={priceChange} />
                    </div>


                    <div className="filter rating-fliter d-flex flex-column justify-content-center">
                        <h6>Rating Filter</h6>
                    <RatingFilter ratingThreshold={ratingThreshold} ratingChange={ratingChange} />
                    </div>

                    
                </div>
            </div>

            <div className="d-flex justify-content-center flex-wrap">
            {restaurantsList.map(restaurant => <Restaurant name={restaurant.name} state={restaurant.state} address={restaurant.address} 
            websiteLink={restaurant.website_link} rating={restaurant.rating} phoneNumber={restaurant.phone_number} hours={restaurant.hours}
            photoLink={restaurant.photo_link} types={restaurant.types} price={restaurant.price}/> )}
            </div>
            
        </>
    )}

}

export default Restaurants