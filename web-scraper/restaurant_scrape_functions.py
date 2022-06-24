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
from pymongo import MongoClient
import pprint


def get_restaurant_list(html_document):
    restaurant_list_links_raw = html_document.find_all("a", {"class": "bHGqj Cj b"})
    restaurant_list_links = [restaurant["href"] for restaurant in restaurant_list_links_raw] # Convert list of raw a tags to list of paths
    return restaurant_list_links

def get_restaurant_name(html_document):
    return html_document.find("h1", {"class": "fHibz"}).text

def get_restaurant_address(html_document):
    restaurant_address_raw = html_document.find_all("a", {"class": "fhGHT"})
    for restaurant in restaurant_address_raw:
        if restaurant["href"] == "#MAPVIEW":
            return restaurant.text

def get_restaurant_website(html_document):
    restaurant_website_raw = html_document.find_all("a", {"class": "dOGcA Ci Wc _S C fhGHT"})
    for restaurant_website in restaurant_website_raw:
        if "Website" in restaurant_website.text:
            return restaurant_website["href"]

def get_restaurant_rating(html_document):
    return html_document.find("span", {"class": "fdsdx"}).text

def get_restaurant_phone_number(html_document):
    restaurant_phone_number_raw = html_document.find_all("a", {"class": "iPqaD _F G- ddFHE eKwUx"})
    for restaurant_phone_number in restaurant_phone_number_raw:
        if restaurant_phone_number.parent["class"][0] == "fhGHT":
            return restaurant_phone_number.text[3:]
        
def get_restaurant_hours(html_document, web_driver):
    try:
        web_driver.find_element(By.CLASS_NAME, "dauAM").click()
        time.sleep(1)
    except:
        return "No hours listed"
    web_driver_document = web_driver.page_source
    html_document = BeautifulSoup(web_driver_document, "html.parser")
    restaurant_hours_raw = html_document.find_all("div", {"class": "ferBE f"})
    restaurant_hours = []
    for i in restaurant_hours_raw:
        for ib in i.children:
            restaurant_hours.append(ib.text)
    for restaurant_hour in restaurant_hours:
        if restaurant_hour == "Sun":
            restaurant_hours[restaurant_hours.index("Sun")] = "Sunday"
        elif restaurant_hour == "Mon":
            restaurant_hours[restaurant_hours.index("Mon")] = "Monday"
        elif restaurant_hour == "Tue":
            restaurant_hours[restaurant_hours.index("Tue")] = "Tuesday"
        elif restaurant_hour == "Wed":
            restaurant_hours[restaurant_hours.index("Wed")] = "Wednesday"
        elif restaurant_hour == "Thu":
            restaurant_hours[restaurant_hours.index("Thu")] = "Thursday"
        elif restaurant_hour == "Fri":
            restaurant_hours[restaurant_hours.index("Fri")] = "Friday"
        elif restaurant_hour == "Sat":
            restaurant_hours[restaurant_hours.index("Sat")] = "Saturday"
        elif "AM" in restaurant_hour:
            restaurant_hours[restaurant_hours.index(restaurant_hour)] = restaurant_hour.replace(u'\xa0', u' ')
        elif "PM" in restaurant_hour:
            restaurant_hours[restaurant_hours.index(restaurant_hour)] = restaurant_hour.replace(u'\xa0', u' ')
        else:
            pass

    def list_to_dict(lst):
        res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
        return res_dct
    return list_to_dict(restaurant_hours)
            
def get_restaurant_photo(html_document):
    restaurant_photo_raw = html_document.find_all("img", {"class": "basicImg"})
    restaurant_photo_list = []
    for restaurant_photo in restaurant_photo_raw:
        if restaurant_photo.attrs.get("data-lazyurl") != None:
            restaurant_photo_list.append(restaurant_photo.attrs.get("data-lazyurl"))
    while len(restaurant_photo_list) != 1:
        del restaurant_photo_list[-1]
    return restaurant_photo_list[0]

def get_restaurant_price(html_document):
    restaurant_price_raw = html_document.find("span", {"class": "dyeJW VRlVV"}).children
    for child in restaurant_price_raw:
        if "$" in child.text:
            return child.text
    
def get_restaurant_types(html_document):
    restaurant_types_raw = html_document.find("span", {"class": "dyeJW VRlVV"}).children
    for child in restaurant_types_raw:
        if "$" in child.text:
            child.decompose()
    restaurant_types_raw = html_document.find("span", {"class": "dyeJW VRlVV"})
    restaurant_types_list = []
    for restaurant_type in restaurant_types_raw:
        restaurant_types_list.append(restaurant_type.text)
    return restaurant_types_list
