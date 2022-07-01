import requests
import requests.exceptions
import time


check = True

while True:
    try:
        req = requests.get("https://fbla.manavrv.dev")
        res = req.text
        r.raise_for_status()
        print(res)
    except:
        dns_req = requests.get("https://api.cloudflare.com/zones/f3d3457a8fd11473fc456830634d3cb8/dns_records/fbla.manavrv.dev")
        while dns_req.status_code != 200:
            dns_req = requests.get("https://api.cloudflare.com/zones/f3d3457a8fd11473fc456830634d3cb8/dns_records/fbla.manavrv.dev")
    time.sleep(60)