
import { test, expect } from '@playwright/test';
import mockedUsers from './fixtures/mockedUsers';
import mockAPICall from './utils/mockAPICall';


const clickEditOnAUser = async (page, name) => {
  const row = await page.getByRole('row').filter({ hasText: name })
  await row.getByTestId(`edit-action`).click();
}

const assertUserIsVisible = async (page, user) => {
  const expectedEmail = new RegExp(user.name);
  const expectedName = new RegExp(user.email);
  await expect(page.getByText(expectedEmail)).toBeVisible();
  await expect(page.getByText(expectedName)).toBeVisible();
}

const assertUserIsNotVisible = async (page, user) => {
  const expectedEmail = new RegExp(user.name);
  const expectedName = new RegExp(user.email);
  await expect(page.getByText(expectedEmail)).not.toBeVisible();
  await expect(page.getByText(expectedName)).not.toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // We mock the API call to avoid relying on the `/users` endpoint, but in a real app we probably make the test points to a staging/pre-prod/CI server
  await mockAPICall(page, mockedUsers);
});


test.describe('Users', () => {
  test('By default the name & mail of every user will be shown', async ({ page }) => {
    for (const user of mockedUsers) {
      await assertUserIsVisible(page, user);
    }
  })

  test('Can be filtered by name', async ({ page }) => {
    const [userToFilter, ...restOfUsers] = mockedUsers;
    const nameToFilter = userToFilter.name;
    // If we filter by name...
    await page.locator("[name='filter-user']").fill(nameToFilter);
    // The filtered user is visible
    await assertUserIsVisible(page, userToFilter);
    // And the rest are not
    for (const user of restOfUsers) {
      await assertUserIsNotVisible(page, user);
    }
  })

  test('Can be filtered by email', async ({ page }) => {
    const [userToFilter, ...restOfUsers] = mockedUsers;
    const emailToFilter = userToFilter.name;
    // If we filter by email...
    await page.locator("[name='filter-user']").fill(emailToFilter);
    // The filtered user is visible
    await assertUserIsVisible(page, userToFilter);
    // And the rest are not
    for (const user of restOfUsers) {
      await assertUserIsNotVisible(page, user);
    }
  })

  test('Can be edited, keeping the changes locally', async ({ page }) => {
    const name = new RegExp(mockedUsers[0].name);
    const newName = 'A new name for the user';
    await clickEditOnAUser(page, name)

    await page.locator("[name='name']").fill(newName);

    await page.getByTestId('confirm-edit-action').click();
    await expect(page.getByText(name)).not.toBeVisible()
    await expect(page.getByText(newName)).toBeVisible()

    // If we reload the page, the modifications are still there
    await page.reload();
    await expect(page.getByText(name)).not.toBeVisible()
    await expect(page.getByText(newName)).toBeVisible()
  });

  test('Can be deleted', async ({ page }) => {
    const name = new RegExp(mockedUsers[0].name);
    await clickEditOnAUser(page, name);

    await page.getByTestId(`delete-action`).click();
    await assertUserIsNotVisible(page, mockedUsers[0]);
  });

  test('Can start the edition of a user and cancel it', async ({ page }) => {
    const name = new RegExp(mockedUsers[0].name);
    const newName = 'A new name for the user';
    await clickEditOnAUser(page, name)

    await page.locator("[name='name']").fill(newName);

    // If we cancel edition, nothing happens
    await page.getByTestId('cancel-edit-action').click();
    await expect(page.getByText(name)).toBeVisible()
    await expect(page.getByText(newName)).not.toBeVisible()
  });

  test('Can restore the default values after modifications', async ({ page }) => {
    // If we delete a user
    const name = new RegExp(mockedUsers[0].name);
    await clickEditOnAUser(page, name);
    await page.getByTestId(`delete-action`).click();
    await assertUserIsNotVisible(page, mockedUsers[0]);

    // And click on restore
    await page.getByText(/Restore default values/).click();
    // The user will be there again as it was part of the original values
    await assertUserIsVisible(page, mockedUsers[0]);
  })
})




