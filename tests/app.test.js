import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const APP_URL = process.env.APP_URL || "https://protective-graphs-thee-pace.trycloudflare.com";

describe("Call of Duty Mobile Attachments Guide", () => {
  it("should display weapon cards and filter weapons by category", async (context) => {
    const testdriver = TestDriver(context);

    // Launch Chrome and navigate to the application
    await testdriver.provision.chrome({ url: APP_URL });

    // Verify main header and weapon list are loaded
    const pageLoaded = await testdriver.assert(
      "the page header 'کالاف دیوتی موبایل - اتچمنت‌های برتر' and weapon cards are visible"
    );
    expect(pageLoaded).toBeTruthy();

    // Filter by Multiplayer category
    const multiplayerFilter = await testdriver.find("the button with text 'مولتی‌پلیر'");
    await multiplayerFilter.click();

    // Verify filtered results
    const filterApplied = await testdriver.assert(
      "the weapon cards are filtered to multiplayer weapons"
    );
    expect(filterApplied).toBeTruthy();
  });

  it("should open weapon details modal with attachments when a weapon card is clicked", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: APP_URL });

    // Find and click the M4 assault rifle weapon card
    const weaponCard = await testdriver.find("the weapon card for M4");
    await weaponCard.click();

    // Verify the details modal opened displaying weapon attachments
    const modalVisible = await testdriver.assert(
      "the weapon details modal is open displaying attachments and stats for M4"
    );
    expect(modalVisible).toBeTruthy();

    // Close the modal
    const closeButton = await testdriver.find("the close button X on the modal");
    await closeButton.click();

    const modalClosed = await testdriver.assert(
      "the weapon modal is closed and the weapons grid is visible again"
    );
    expect(modalClosed).toBeTruthy();
  });
});
