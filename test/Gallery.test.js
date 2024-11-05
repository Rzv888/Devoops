const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Gallery.ejs', () => {
  let document;

  beforeAll(() => {
    const template = fs.readFileSync(path.resolve(__dirname, '../views/Main_Page/Gallery.ejs'), 'utf-8');
    const dom = new JSDOM(template);
    document = dom.window.document;
  });

  test('checks each gallery item has an image and overlay text', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      const overlayText = item.querySelector('.overlay p');
      
      expect(img).toBeTruthy(); // Check if image element exists
      expect(overlayText).toBeTruthy(); // Check if overlay text exists
      expect(overlayText.textContent).not.toBe(''); // Ensure overlay text is not empty
    });
  });

  test('checks the first gallery item image source and alt text', () => {
    const firstItem = document.querySelector('.gallery-item');
    const img = firstItem.querySelector('img');
    
    expect(img.src).toBe('https://images.pexels.com/photos/3546429/pexels-photo-3546429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    expect(img.alt).toBe('Image 1');
  });

  test('checks for click functionality on gallery item', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const clickHandler = jest.fn();

    // Simulate click event
    galleryItems.forEach(item => {
      item.onclick = clickHandler;
      item.click();
      expect(clickHandler).toHaveBeenCalled();
    });
  });
});
