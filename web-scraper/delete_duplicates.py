from pymongo import MongoClient
from bson.objectid import ObjectId
import pprint


client = MongoClient("mongodb://localhost:27017/")
db = client["Incredible-America"]
collection = db["Attractions"]

duplicates = collection.aggregate([
    {"$group" : { "_id": "$name", "count": { "$sum": 1 } } },
    {"$match": {"_id" :{ "$ne" : None } , "count" : {"$gt": 1} } }, 
    {"$project": {"name" : "$_id", "_id" : 0} }
])

to_be_deleted = []
for duplicate in duplicates:
    query = collection.find(duplicate)
    for document in query:
        to_be_deleted.append(document)
    del to_be_deleted[-1]

for document in to_be_deleted:
    collection.delete_one({"_id": ObjectId(document["_id"])})
