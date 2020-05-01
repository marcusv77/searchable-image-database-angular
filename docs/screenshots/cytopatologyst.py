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
        'cytopatologyst-home.jpg'
    )

    await asyncio.gather(
        page.click(
            'a#login'
        ),
    )
    await screenshot(
        page,
        'cytopatologyst-login.jpg'
    )

    await go4screenshot(
        page,
        '/classification',
        'cytopatologyst-classification.jpg'
    )

    await go4screenshot(
        page,
        '/classification/image/1',
        'cytopatologyst-classification-details.jpg'
    )

    await go4screenshot(
        page,
        '/downloads',
        'cytopatologyst-downloads.jpg'
    )

    await browser.close()

asyncio.get_event_loop().run_until_complete(
    main()
)
