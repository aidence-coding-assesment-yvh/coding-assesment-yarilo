
import { ENDPOINTS, SERVER_URL } from '../../src/constants';

export default async function (page, returnValue) {
    await page.route(`${SERVER_URL}${ENDPOINTS.USERS}`, async route => {
        const json = returnValue;
        await route.fulfill({ json });
    });
}