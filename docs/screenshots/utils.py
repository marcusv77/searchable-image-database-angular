import asyncio

DOMAIN = 'http://localhost:8080'

async def goto(page, endpoint):
    url = '{}{}'.format(
        DOMAIN,
        endpoint
    )
    print("Visiting {} ...".format(url))
    await page.goto(
        url,
        {
            'waitUntil': 'networkidle0'
        }
    )
    print("{} loaded!".format(url))

async def screenshot(page, path):
    print("Saving {} ...".format(path))
    await page.screenshot(
        {
            'path': path,
            'quality': 60,
        }
    )
    print("{} saved!".format(path))

async def go4screenshot(page, endpoint, path):
    await goto(page, endpoint)
    await screenshot(page, path)
