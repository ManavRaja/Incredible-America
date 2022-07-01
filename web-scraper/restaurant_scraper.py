import random
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.utils import ChromeType
import time
from restaurant_scrape_functions import get_restaurant_list, get_restaurant_name, get_restaurant_address, get_restaurant_website, get_restaurant_rating, get_restaurant_phone_number, get_restaurant_hours, get_restaurant_photo, get_restaurant_price, get_restaurant_types
from pymongo import MongoClient
import pprint


client = MongoClient("mongodb://localhost:27017/")
db = client["Incredible-America"]
collection = db["Restaurants"]

client2 = MongoClient("mongodb://5.161.111.104:27017/")
db2 = client2["Incredible-America"]
collection2 = db2["Restaurants"]

chrome_options = Options()
chrome_options.add_argument("--headless")

state = input("State:  ")
domain = "https://www.tripadvisor.com"
number_of_paths_to_list_of_restaurants = input("Number of Paths to List of Restaurants:  ")
paths_to_list_of_restaurants = []
for path in range(int(number_of_paths_to_list_of_restaurants)):
    paths_to_list_of_restaurants.append(input("Path to List of Restaurants:  "))


for path in paths_to_list_of_restaurants:
    # Get links to all attractions on list of attractions page
    driver = webdriver.Chrome(service=Service(ChromeDriverManager(chrome_type=ChromeType.BRAVE).install()), options=chrome_options)
    driver.get(domain + str(path))
    time.sleep(3.25)
    driver_document = driver.page_source
    restaurant_list_document = BeautifulSoup(driver_document, "html.parser")
    restaurant_list_links = get_restaurant_list(restaurant_list_document)
    driver.close()

    for restaurant in restaurant_list_links:
        try:
            driver = webdriver.Chrome(service=Service(ChromeDriverManager(chrome_type=ChromeType.BRAVE).install()), options=chrome_options)
            driver.get(domain + str(restaurant))
            time.sleep(3)
            driver_document = driver.page_source
            restaurant_document = BeautifulSoup(driver_document, "html.parser")

            restaurant_name = get_restaurant_name(restaurant_document)
            restaurant_address = get_restaurant_address(restaurant_document)
            restaurant_website_link = get_restaurant_website(restaurant_document)
            restaurant_rating = get_restaurant_rating(restaurant_document)
            restaurant_phone_number = get_restaurant_phone_number(restaurant_document)
            restaurant_hours = get_restaurant_hours(restaurant_document, driver)
            restaurant_photo_link = get_restaurant_photo(restaurant_document)
            restaurant_price = get_restaurant_price(restaurant_document)
            restaurant_types = get_restaurant_types(restaurant_document)
            
            print(restaurant_name)
            print(restaurant_address)
            print(restaurant_website_link)
            print(restaurant_rating)
            print(restaurant_phone_number)
            print(restaurant_hours)
            print(restaurant_photo_link)
            print(restaurant_price)
            print(restaurant_types)
            
            mongodb_restaurant_document = {"name": restaurant_name, "state": state, "address": restaurant_address, "website_link": restaurant_website_link, "rating": restaurant_rating,
            "phone_number": restaurant_phone_number, "hours": restaurant_hours, "photo_link": restaurant_photo_link, "price": restaurant_price, "types": restaurant_types}
            try:
                collection.insert_one(mongodb_restaurant_document)
            except:
                collection2.insert_one(mongodb_restaurant_document)
            print("--------------------------------------------------------------------------------------------------------")
            time.sleep(random.uniform(1, 3) * random.uniform(1, 3))
            driver.close()
        except:
            pass
