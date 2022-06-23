import random
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
import time
from scrape_functions import get_attraction_list, get_attraction_name, get_attraction_address, get_attraction_website, get_attraction_rating, get_attraction_phone_number, get_attraction_hours, get_attraction_photo, get_attraction_types
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
db = client["Incredible-America"]
collection = db["Attractions"]

domain = "https://www.tripadvisor.com"
paths_to_list_of_attractions = [input("1st Path:  "), input("2nd Path:  ")]

for path in paths_to_list_of_attractions:
    # Get links to all attractions on list of attractions page
    driver = webdriver.Firefox()
    driver.get(domain + path)
    time.sleep(2.5)
    driver_document = driver.page_source
    attraction_list_document = BeautifulSoup(driver_document, "html.parser")
    attraction_list_links = get_attraction_list(attraction_list_document)
    driver.close()

    # Visit each attraction link & scrape data
    for attraction in attraction_list_links:
        driver = webdriver.Firefox()
        driver.get(domain + str(attraction))
        time.sleep(2.5)
        driver_document = driver.page_source
        attraction_document = BeautifulSoup(driver_document, "html.parser")

        attraction_name = get_attraction_name(attraction_document)
        attraction_address = get_attraction_address(attraction_document)
        attraction_website_link = get_attraction_website(attraction_document)
        attraction_rating = get_attraction_rating(attraction_document)
        attraction_phone_number = get_attraction_phone_number(attraction_document)
        attraction_hours = get_attraction_hours(attraction_document)
        attraction_photo_link = get_attraction_photo(driver)
        attraction_types = get_attraction_types(attraction_document)

        print(attraction_name)
        print(attraction_address)
        print(attraction_website_link)
        print(attraction_rating)
        print(attraction_phone_number)
        print(attraction_hours)
        print(attraction_photo_link)
        print(attraction_types)
        driver.close()
        mongodb_attraction_document = {"name": attraction_name, "state": "Missouri", "address": attraction_address, "website_link": attraction_website_link, "rating": attraction_rating,
        "phone_number": attraction_phone_number, "hours": attraction_hours, "photo_link": attraction_photo_link, "types": attraction_types}
        collection.insert_one(mongodb_attraction_document)
        print("--------------------------------------------------------------------------------------------------------")
