import requests


def make_request_to_geo_api(client_ip):
    client_ip = "100.41.132.250" # Remove line when deploying to production
    geo_api_req = requests.get(f"http://ip-api.com/json/{client_ip}")
    return geo_api_req.json()

def get_client_state_and_set_cookie(request, response, geo_api_res):
    if request.cookies.get("user_state") == None:
        if geo_api_res["status"] == "success" and geo_api_res["countryCode"] == "US":
            response.set_cookie(key="user_state", value=geo_api_res["regionName"])
            return geo_api_res["regionName"]
        else:
            response.set_cookie(key="user_state", value="Random")
            return "Random state"
    else:
        if request.cookies.get("user_state") == geo_api_res["regionName"]:
            return geo_api_res["regionName"]
        else:
            if geo_api_res["status"] == "success" and geo_api_res["countryCode"] == "US":
                response.set_cookie(key="user_state", value=geo_api_res["regionName"])
                return geo_api_res["regionName"]
            else:
                response.set_cookie(key="user_state", value="Random")
                return "Random state"
