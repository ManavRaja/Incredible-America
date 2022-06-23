from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
db = client["Incredible-America"]
collection = db["Attractions"]

attraction_name = input("Attraction Name:  ")
attraction_address = input("Attraction Address:  ")
attraction_website_link = input("Attraction Website Link:  ")
attraction_rating = input("Attraction Rating:  ")
attraction_phone_number = input("Attraction Phone Number:  ")

attraction_hours_days = input("Number of Open Days:  ")
attraction_hours = []
for day in range(int(attraction_hours_days)):
    day = input("Day Open:  ")
    hours = input("Hours of Day Open:  ")
    attraction_hours.append({day: hours})

attraction_photo_link = input("Attraction Photo Link:  ")

attraction_types = input("Types of Attraction:  ")
if "•" in attraction_types:
    attraction_types = attraction_types.split(" • ")
else:
    attraction_types = attraction_types

mongodb_attraction_document = {"name": attraction_name, "state": "Missouri", "address": attraction_address, "website_link": attraction_website_link,
"rating": attraction_rating, "phone_number": attraction_phone_number, "hours": attraction_hours, "photo_link": attraction_photo_link, "types": attraction_types}
collection.insert_one(mongodb_attraction_document)
