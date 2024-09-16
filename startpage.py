import requests

result = requests.post(
    "https://www.startpage.com/sp/search",
    headers={
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,hi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "priority": "u=0, i",
        "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "startpage-extension": "ext-chrome",
        "startpage-extension-version": "3.0.1",
        "upgrade-insecure-requests": "1",
        "Referer": "https://www.startpage.com/",
        "Referrer-Policy": "origin",
    },
    data={
        "lui": "english",
        "language": "english",
        "query": "copy+an+api+from+chrome+to+postman",
        "cat": "web",
        "sc": "RwWBntnhx44a20",
        "t": "device",
        "segment": "startpage.defaultchx",
        "page": "2",
        "abd": "0",
    },
    timeout=30,
)

print(result.text)
