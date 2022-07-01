import { useState, useEffect } from "react";
import Attraction from "./Attraction.js";
import "./Attractions.css"
import StateFilter from "./StateFilter.js"
import OpenFilter from "./OpenFilter.js"
import RatingFilter from "./RatingFilter.js";

const Attractions = () => {
    // Set react states
    const [state, setState] = useState()
    const [allAmericanStates, setallAmericaStates] = useState(["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"])
    const [ratingThreshold, setratingThreshold] = useState("All")
    const [openThreshold, setopenThreshold] = useState("All")
    const [permanentAttractionsList, setpermanentAttractionsList] = useState([])
    const [attractionsList, setattractionsList] = useState([])

    // Fetches data from backend
    async function fetchdata() {

        // Loads on first time user visits
        if (state == null) {
            // Get location data from browser geolocation API & make call to 
            let localGeoapiState
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async function(position) {
                    let request = await fetch(`https://new.fbla.manavrv.dev/get-location/${position.coords.latitude}/${position.coords.longitude}`)
                    localGeoapiState = await request.text()
                    // Get attraction data for specifc state
                    let response = await fetch(`https://new.fbla.manavrv.dev/attractions/${localGeoapiState.replaceAll('"', '')}`)
                    let data = await response.json()
                    setattractionsList(data)
                    setpermanentAttractionsList(data)
                    setState(localGeoapiState.replaceAll('"', ''))
                }, function(error) {
                    // Handle permission being denied for geolocation api, pick a random state
                    if (error.code == error.PERMISSION_DENIED) {
                        async function fetchy() {
                        let response = await fetch(`https://new.fbla.manavrv.dev/attractions/Hawaii`)
                        let data = await response.json()
                        setattractionsList(data)
                        setpermanentAttractionsList(data)
                        setratingThreshold("All")
                        setopenThreshold("All")
                        }
                        fetchy()
                        
                    }
                      
                  })
                  // Pick random state if geolocation api isn't supported
            } else {
                let response = await fetch(`https://new.fbla.manavrv.dev/attractions/${allAmericanStates[Math.floor(Math.random()*allAmericanStates.length)]}`)
                let data = await response.json()
                setattractionsList(data)
                setpermanentAttractionsList(data)
                setratingThreshold("All")
                setopenThreshold("All")
            }

            // Fetch attraction data for user selected state
        } else {
            let response = await fetch(`https://new.fbla.manavrv.dev/attractions/${state}`)
            let data = await response.json()
            setattractionsList(data)
            setpermanentAttractionsList(data)
            setratingThreshold("All")
            setopenThreshold("All")
        }
        
    }   

    // Runs on initial page load and when the state state gets modified
    useEffect(() => {
        fetchdata() // Calls fetchdata function to get info about attractions
    }, [state])

    // Runs when a new state has been selected
    function changeState(event) {
        setState(event.target.innerHTML)
        setratingThreshold(1)
    }

    // Runs after the `Is Open?` filter is run to prevent overriding of `Is Open?` filter
    function filterRatingThreshold(attraction) {
        if (attraction.rating >= ratingThreshold || ratingThreshold == "All") {
            return true
        } else{
            return false
        }
    }

    // Runs when a new rating filter has been selected
    function ratingChange(event) {
        if (event.target.innerHTML === "All") {
            setratingThreshold("All")
        } else {
            setratingThreshold(Number(event.target.innerHTML))
        }
        // Updates attraction list based on filter
        let newAttractionsList = []
        for (let attraction of permanentAttractionsList) {
            if (event.target.innerHTML === "All") {
                newAttractionsList.push(attraction)
            } else {
                if (attraction.rating >= Number(event.target.innerHTML)) {
                    newAttractionsList.push(attraction)
                }
            }
        }
        // Uses OpenThreshold filter function to make sure `Is Open?` filter isn't overriden
        let newNewAttractionsList = newAttractionsList.filter(filterOpenThreshold)
        setattractionsList(newNewAttractionsList)
    }

    // Runs when `Is Open?` filter is used
    function changeOpenState(event) {
        let openOrNot = event.target.innerHTML
        setopenThreshold(openOrNot)
        if (openOrNot == "Open") {
            let newAttractionsList = []
            for (let attraction of permanentAttractionsList) {
                if (attraction.is_open === "Yes") {
                    newAttractionsList.push(attraction)
                }
            }
            let newNewAttractionsList = newAttractionsList.filter(filterRatingThreshold)
            setattractionsList(newNewAttractionsList)
        } else {
            let newAttractionsList = permanentAttractionsList.filter(filterRatingThreshold)
            setattractionsList(newAttractionsList)
        }
    }

    // Called after rating filter is changed to prevent rating filter overriding `Is Open?` filter
    function filterOpenThreshold(attraction) {
        if (openThreshold == "Open") {
            if (attraction.is_open == "Yes") {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }


    if (state == null) {
        return (
        <div class="loading spinner-border text-warning d-flex" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        )
    

    } else if (attractionsList.length < 1) {
        return (
            <>
                <h1 className="display-3 title">Attractions in {state}</h1>

                <hr/>

                
                <div className="filters-section">
                <h1 className="text-center">Filters</h1>
                <div className="d-flex justify-content-center flex-wrap">

                    <div className="filter state-filter d-flex flex-column justify-content-center">
                        <h6>Choose State</h6>
                        <StateFilter allAmericanStates={allAmericanStates} changeState={changeState} state={state} />
                    </div>
                    
                    <div className="filter open-filter d-flex flex-column justify-content-center">
                        <h6>Open Now or All?</h6>
                        <OpenFilter changeOpenState={changeOpenState} openThreshold={openThreshold}/>
                    </div>

                    <div className="filter rating-fliter d-flex flex-column justify-content-center">
                        <h6>Rating Filter</h6>
                        <RatingFilter ratingThreshold={ratingThreshold} ratingChange={ratingChange} />
                    </div>
                </div>
            </div>
                    
                

            <h1 className="text-center">No Attractions Match These Filters</h1>
            </>
        )
    } else {

    return (
        <>
            <h1 className="display-3 title">Attractions in {state}</h1>
            <hr className="sep-2"/>

            
            <div className="filters-section">
                <h1 className="text-center">Filters</h1>
                <div className="d-flex justify-content-center flex-wrap">

                    <div className="filter state-filter d-flex flex-column justify-content-center">
                        <h6>Choose State</h6>
                        <StateFilter allAmericanStates={allAmericanStates} changeState={changeState} state={state} />
                    </div>
                    
                    <div className="filter open-filter d-flex flex-column justify-content-center">
                        <h6>Open Now?</h6>
                        <OpenFilter changeOpenState={changeOpenState} openThreshold={openThreshold}/>
                    </div>

                    <div className="filter rating-fliter d-flex flex-column justify-content-center">
                        <h6>Rating Filter</h6>
                        <RatingFilter ratingThreshold={ratingThreshold} ratingChange={ratingChange} />
                    </div>
                </div>
            </div>

            


            <div className="d-flex justify-content-center flex-wrap">
            {attractionsList.map(attraction => <Attraction name={attraction.name} state={attraction.state} address={attraction.address} 
            websiteLink={attraction.website_link} rating={attraction.rating} phoneNumber={attraction.phone_number} hours={attraction.hours}
            photoLink={attraction.photo_link} types={attraction.types}/> )}
            </div>
            
        </>
    )}
    
}

export default Attractions