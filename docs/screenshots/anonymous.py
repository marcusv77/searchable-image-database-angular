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
        'anonymous-home.jpg'
    )

    await go4screenshot(
        page,
        '/classification',
        'anonymous-classification-list.jpg'
    )

    await go4screenshot(
        page,
        '/classification/image/1#dashboard',
        'anonymous-classification-view.jpg'
    )

    await asyncio.gather(
        page.waitForSelector(
            'div.box_info',
            {
                "visible": True
            }
        ),
        page.select(
            'select',
            '0'
        ),
    )
    await screenshot(
        page,
        'anonymous-classification-details.jpg'
    )

    await go4screenshot(
        page,
        '/downloads',
        'anonymous-downloads.jpg'
    )

    await browser.close()

asyncio.get_event_loop().run_until_complete(
    main()
)
