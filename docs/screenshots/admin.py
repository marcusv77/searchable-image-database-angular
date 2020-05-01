import asyncio
from pyppeteer import launch

from utils import go4screenshot, screenshot

async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.setViewport(
        {
            "width": 1920,
            "height": 1080,
            "deviceScaleFactor": 1,
        }
    )


    await go4screenshot(
        page,
        '/',
        'admin-home.jpg'
    )

    await asyncio.gather(
        page.waitForSelector('input#email-login'),
        page.click(
            'a#login'
        ),
    )
    await screenshot(
        page,
        'admin-login.jpg'
    )

    await go4screenshot(
        page,
        '/classification',
        'admin-classification.jpg'
    )

    await go4screenshot(
        page,
        '/classification/image/1',
        'admin-classification-details.jpg'
    )

    await go4screenshot(
        page,
        '/downloads',
        'admin-downloads.jpg'
    )

    await browser.close()

asyncio.get_event_loop().run_until_complete(
    main()
)
