import time

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By


def get_attraction_list(html_document):
    attraction_list_links_raw = html_document.find_all("div", {"class": "fVbwn cdAAV cagLQ eZTON"})
    attraction_list_links = [attraction.a["href"] for attraction in attraction_list_links_raw] # Convert list of raw a tags to list of paths
    return attraction_list_links

def get_attraction_name(html_document):
    return html_document.find("h1", {"class": "WlYyy cPsXC GeSzT"}).text

def get_attraction_address(html_document, city):
        attraction_address_raw = html_document.find_all("span", {"class": "WlYyy cacGK Wb"})
        for attraction_address in attraction_address_raw:
            if city in attraction_address.text:
                return attraction_address.text

def get_attraction_website(html_document):
    attraction_website_raw = html_document.find_all("span", {"class": "WlYyy cacGK Wb"})
    for attraction_website in attraction_website_raw:
        if "Visit website" in attraction_website.text:
            return attraction_website.parent["href"]

def get_attraction_rating(html_document):
    return html_document.find("div", {"class": "WlYyy cPsXC fksET cMKSg"}).text

def get_attraction_phone_number(html_document):
    attraction_phone_number_raw = html_document.find_all("a", {"class": "bfQwA _G B- _S _T c G_ P0 ddFHE cnvzr bTBvn"})
    for attraction_phone_number in attraction_phone_number_raw:
        for i in attraction_phone_number.children:
            if i.text == "Call":
                return attraction_phone_number["href"][11:]

def get_attraction_hours(html_document):
    attraction_hours_raw = html_document.find_all("div", {"class": "efQQj"})
    attraction_hours = []
    for i in attraction_hours_raw:
        separation_index = i.text.index("y") + 1
        attraction_hours.append({i.text[:separation_index]: i.text[separation_index:]})
    return attraction_hours

def get_attraction_photo(web_driver):
    web_driver.find_element(By.XPATH, "//span[text()='Full view']").click()
    time.sleep(2.5)
    web_driver_document = web_driver.page_source
    attraction_document = BeautifulSoup(web_driver_document, "html.parser")
    attraction_photo_raw = attraction_document.find("picture", {"class": "dugSS _R fXtOt kFZIK"})
    attraction_photo_raw_list = attraction_photo_raw.contents
    attraction_photo_raw_list_length_need_to_delete = len(attraction_photo_raw_list) - 1
    for attraction_photo_link in range(attraction_photo_raw_list_length_need_to_delete):
        attraction_photo_raw_list.pop(0)
    attraction_photo_link = attraction_photo_raw_list[0]["src"]
    return attraction_photo_link