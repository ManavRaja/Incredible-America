import random
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
import time
from scrape_functions import get_attraction_list, get_attraction_name, get_attraction_address, get_attraction_website, get_attraction_rating, get_attraction_phone_number, get_attraction_hours, get_attraction_photo


domain = "https://www.tripadvisor.com"
path_to_list_of_attractions = "/Attractions-g28946-Activities-a_allAttractions.true-Missouri.html"

# Get links to all attractions on list of attractions page
driver = webdriver.Firefox()
driver.get(domain + path_to_list_of_attractions)
time.sleep(2.5)
driver_document = driver.page_source
attraction_list_document = BeautifulSoup(driver_document, "html.parser")
attraction_list_links = get_attraction_list(attraction_list_document)
driver.close()

"""# Get rid of 29 elements of 30
for i in range(29):
    attraction_list_links.pop(0)"""

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

    print(attraction_name)
    print(attraction_address)
    print(attraction_website_link)
    print(attraction_rating)
    print(attraction_phone_number)
    print(attraction_hours)
    print(attraction_photo_link)
    driver.close()
    print("--------------------------------------------------------------------------------------------------------")

print(len(attraction_list_links))