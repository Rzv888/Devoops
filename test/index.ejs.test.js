/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

describe("Form Submission Confirmation", () => {
  let document;

  // Setup HTML environment
  beforeAll(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../views/Buat_Event/index.ejs"),
      "utf8"
    );
    document = new DOMParser().parseFromString(html, "text/html");
    global.document = document;
    global.window = document.defaultView;
  });

  // Mock the confirm function
  beforeEach(() => {
    window.confirm = jest.fn(() => true); // Default to "OK" for confirm
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("does not submit form if confirm is cancelled", () => {
    window.confirm = jest.fn(() => false); 
    const form = document.querySelector("form");

    form.submit = jest.fn();

    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    form.dispatchEvent(submitEvent);

    expect(form.submit).not.toHaveBeenCalled();
  });
});
