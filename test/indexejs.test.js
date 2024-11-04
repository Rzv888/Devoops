const { JSDOM } = require("jsdom");
const { TextEncoder, TextDecoder } = require("util");

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("Form Validation for index.ejs", () => {
  let document, window;

  beforeAll(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <form id="event-form" method="post" action="/buat-event">
          <input type="text" id="nama-event" />
          <div id="nama-event-error" class="error-message"></div>
          <textarea id="deskripsi-event"></textarea>
          <div id="deskripsi-event-error" class="error-message"></div>
          <!-- Add more elements as necessary -->
          <button type="submit">Buat Event</button>
        </form>
      </body>
      </html>
    `);
    document = dom.window.document;
    window = dom.window; // Store window object for later use
    global.document = document;
  });

  test("Displays error if 'Nama Event' is empty", () => {
    const form = document.getElementById("event-form");
    const namaEvent = document.getElementById("nama-event");

    namaEvent.value = ""; // Simulate empty input

    // Manually trigger submit event using window.Event
    const event = new window.Event("submit", { cancelable: true });
    form.dispatchEvent(event);
  });
});
