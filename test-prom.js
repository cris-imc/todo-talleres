const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.promiedos.com.ar/league/liga-profesional/hc', { waitUntil: 'load' });
    await page.waitForTimeout(6000);
    const tables = await page.e:\Pagina Talleres\code\talleres-web('table');
    for (const table of tables) {
        const rows = await table.e:\Pagina Talleres\code\talleres-web('tr');
        for (const row of rows) {
            const h = await row.innerText();
            if (h.includes('Talleres')) {
                const cells = await row.e:\Pagina Talleres\code\talleres-web('td');
                const p = await Promise.all(cells.map(async c => (await c.innerText()).replace(/\n/g, ' ')));
                console.log('CELLS:', p);
            }
        }
    }
    await browser.close();
})();
