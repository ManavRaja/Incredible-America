import random
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
import time


domain = "https://www.tripadvisor.com"
path_to_list_of_attractions = "/Attractions-g44881-Activities-a_allAttractions.true-Saint_Louis_Missouri.html"
city = "Saint Louis"
"""
# Get links to all attractions on list of attractions page
driver = webdriver.Firefox()
driver.get(domain + path_to_list_of_attractions)
driver_document = driver.page_source
attraction_list_document = BeautifulSoup(driver_document, "html.parser")
def get_attraction_list():
    attraction_list_links_raw = attraction_list_document.find_all("div", {"class": "fVbwn cdAAV cagLQ eZTON"})
    attraction_list_links = [attraction.a["href"] for attraction in attraction_list_links_raw] # Convert list of raw a tags to list of paths
    return attraction_list_links
attraction_list_links = get_attraction_list()
driver.close()

# Get rid of 29 elements of 30
for i in range(29):
    attraction_list_links.pop(0)"""

attraction_list_links = [1]

# Visit each attraction link & scrape data
for attraction in attraction_list_links:
    driver = webdriver.Firefox()
    #driver.get(domain + str(attraction))
    driver.get("https://www.tripadvisor.com/Attraction_Review-g44881-d107811-Reviews-Missouri_Botanical_Garden-Saint_Louis_Missouri.html")
    time.sleep(1)
    driver_document = driver.page_source
    attraction_document = BeautifulSoup(driver_document, "html.parser")

    attraction_name = attraction_document.find("h1", {"class": "WlYyy cPsXC GeSzT"}).text
    def get_attraction_address():
        attraction_address_raw = attraction_document.find_all("span", {"class": "WlYyy cacGK Wb"})
        for attraction_address in attraction_address_raw:
            if city in attraction_address.text:
                return attraction_address.text
    attraction_address = get_attraction_address()
    attraction_website_raw = attraction_document.find_all("span", {"class": "WlYyy cacGK Wb"})
    def get_attraction_website():
        for attraction_website in attraction_website_raw:
            if "Visit website" in attraction_website.text:
                return attraction_website.parent["href"]
    attraction_website_link = get_attraction_website()
    attraction_rating = attraction_document.find("div", {"class": "WlYyy cPsXC fksET cMKSg"}).text
    def get_attraction_phone_number():
        attraction_phone_number_raw = attraction_document.find_all("a", {"class": "bfQwA _G B- _S _T c G_ P0 ddFHE cnvzr bTBvn"})
        for attraction_phone_number in attraction_phone_number_raw:
            for i in attraction_phone_number.children:
                if i.text == "Call":
                    return attraction_phone_number["href"]
    attraction_phone_number = get_attraction_phone_number()[11:]
    def get_attraction_hours():
        attraction_hours_raw = attraction_document.find_all("div", {"class": "efQQj"})
        attraction_hours = []
        for i in attraction_hours_raw:
            separation_index = i.text.index("y") + 1
            attraction_hours.append({i.text[:separation_index]: i.text[separation_index:]})
        return attraction_hours
    attraction_hours = get_attraction_hours()
    driver.close()