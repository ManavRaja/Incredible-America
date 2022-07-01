from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import requests
from functions import get_client_state_and_set_cookie, make_request_to_geo_api
import motor
import motor.motor_asyncio
import random
import json
import datetime
from datetime import datetime
import us
import pytz


def time_in_range(start, end, current):
    """Returns whether current is in the range [start, end]"""
    return start <= current <= end

# Connect to mongodb databse
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017/")
db = client["Incredible-America"]
attraction_collection = db["Attractions"]
restaurant_collection = db["Restaurants"]

client2 = motor.motor_asyncio.AsyncIOMotorClient("mongodb://server.manavrv.dev:27017/")
db2 = client2["Incredible-America"]
attraction_collection2 = db2["Attractions"]
restaurant_collection2 = db2["Restaurants"]

# List of all 50 states in America
state_list = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado",
  "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
  "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]

# Initialize/create FastAPI class
app = FastAPI()

# Stuff to let react make requests to API
origins = [
    "http://localhost:3000",
    "https://fbla.manavrv.dev"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/attractions/{state}")
async def get_state_attractions(state: str):
    # Gets the current day
    day_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    today_day = day_list[datetime.today().weekday()]
    try:
        attraction_documents_raw = attraction_collection.find({"state": state}, {'_id': 0}) # Makes search query in mongodb to find all attraction documents for the client's state and removes the _id field
    except:
        attraction_documents_raw = attraction_collection2.find({"state": state}, {'_id': 0}) # Makes search query in mongodb to find all attraction documents for the client's state and removes the _id field
    # Empty list that will get filled with all documents for the state and returned to client
    attraction_documents = []
    for document in await attraction_documents_raw.to_list(length=100):
        if document["hours"] == []:
            document.update({"is_open": "N/A"})
        else:
            # Get timezone and current time at the attraction
            attraction_timezone = pytz.timezone(us.states.lookup(document["state"]).capital_tz)
            attraction_current_time = datetime.now(attraction_timezone).time()

            # Check if attraction is open today
            def is_open_today():
                for day_and_hours in document["hours"]:
                    if today_day in day_and_hours:
                        return day_and_hours[today_day]
            today_hours = is_open_today()
            
            if today_hours == None:
                document.update({"is_open": "No"})
            else:
                comp_today_hours_raw = today_hours.split(" - ")
                attraction_start_time = datetime.strptime(comp_today_hours_raw[0], "%I:%M %p").time()
                attraction_end_time = datetime.strptime(comp_today_hours_raw[1], "%I:%M %p").time()
                if time_in_range(attraction_start_time, attraction_end_time, attraction_current_time):
                    document.update({"is_open": "Yes"})
                else:
                    document.update({"is_open": "No"})
        attraction_documents.append(document)
    print(attraction_documents)
    return attraction_documents

@app.get("/restaurants/{state}")
async def restaurants(state: str):
    try:
        restaurant_documents_raw = restaurant_collection.find({"state": state}, {'_id': 0}) # Makes search query in mongodb to find all restaurant documents for the client's state and removes the _id field
    except:
         restaurant_documents_raw = restaurant_collection2.find({"state": state}, {'_id': 0}) # Makes search query in mongodb to find all restaurant documents for the client's state and removes the _id field

        # Empty list that will get filled with all documents for the state and returned to client
    restaurant_documents = []
    for document in await restaurant_documents_raw.to_list(length=100):
        restaurant_documents.append(document)
    return restaurant_documents

@app.get("/get-location/{lat}/{lon}")
async def get_location(lat, lon):
    geo_api_req = requests.get(f"http://api.positionstack.com/v1/reverse?access_key=4bed730ed422b8699133c9d27aa81a76&query={lat},{lon}")
    client_state = geo_api_req.json()["data"][0]["region"]
    if client_state in state_list:
        return client_state
    else:
        return "Random state"
