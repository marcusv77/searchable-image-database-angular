import asyncio
from pyppeteer import launch

from utils import go4screenshot

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
        '/about',
        'about.jpg'
    )

    await go4screenshot(
        page,
        '/privacy',
        'privacy.jpg'
    )

    await go4screenshot(
        page,
        '/terms',
        'terms.jpg'
    )

    await browser.close()

asyncio.get_event_loop().run_until_complete(
    main()
)
