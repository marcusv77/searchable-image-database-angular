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
        page.waitFor(2_000),  # For modal to show
        page.waitForSelector(
            'input#email-login',
            {
                "visible": True
            }
        ),
        page.click(
            'a#login'
        ),
    )
    await screenshot(
        page,
        'admin-login.jpg'
    )

    # Perform login
    await page.focus('input#email-login')
    await page.keyboard.type('admin@test.database.cric.com.br')
    await page.focus('input#senha-login')
    await page.keyboard.type('123.456')
    await page.keyboard.down('Enter')
    await page.waitForSelector(
        'a.sair',
        {
            "visible": True
        }
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
        'admin-classification-more-details.jpg'
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
