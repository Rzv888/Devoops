/**
 * @jest-environment jsdom
 */
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe("Login and Registration Form", () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../views/Login_Register/login_register.ejs'), 'utf8');
    console.log(html); // Tampilkan isi HTML
    dom = new JSDOM(html);
    document = dom.window.document;
});


  describe("Registration Form", () => {
    test("should contain a form with id 'identitasForm'", () => {
      const form = document.getElementById('identitasForm');
      expect(form).not.toBeNull();
    });

    test("should contain required input fields for registration", () => {
      expect(document.querySelector("input[name='email']")).not.toBeNull();
      expect(document.querySelector("input[name='password']")).not.toBeNull();
      expect(document.querySelector("input[name='nim']")).not.toBeNull();
      expect(document.querySelector("input[name='phone']")).not.toBeNull();
      expect(document.querySelector("input[name='nama_depan']")).not.toBeNull();
      expect(document.querySelector("input[name='nama_belakang']")).not.toBeNull();
    });

    test("should contain gender radio buttons", () => {
      const maleRadio = document.getElementById('gender-male');
      const femaleRadio = document.getElementById('gender-female');
      expect(maleRadio).not.toBeNull();
      expect(femaleRadio).not.toBeNull();
      expect(maleRadio.getAttribute('value')).toBe('L');
      expect(femaleRadio.getAttribute('value')).toBe('P');
    });

    test("should contain a 'fakultas' dropdown", () => {
      const fakultas = document.getElementById('fakultas');
      expect(fakultas).not.toBeNull();
      expect(fakultas.querySelectorAll('option').length).toBeGreaterThan(1);
    });

    test("should contain a 'prodi' dropdown", () => {
      const prodi = document.getElementById('prodi');
      expect(prodi).not.toBeNull();
      expect(prodi.querySelectorAll('option').length).toBeGreaterThan(1);
    });

    test("should contain a 'Sign Up' button", () => {
      const signUpButton = document.getElementById('SignUp');
      expect(signUpButton).not.toBeNull();
      expect(signUpButton.textContent).toBe('Sign Up');
    });
  });

  describe("Login Form", () => {
    test("should contain a form with action '/login'", () => {
      const form = document.querySelector("form[action='/login']");
      expect(form).not.toBeNull();
    });

    test("should contain required input fields for login", () => {
      expect(document.querySelector("input[name='email']")).not.toBeNull();
      expect(document.querySelector("input[name='password']")).not.toBeNull();
    });

    test("should contain a 'Sign In' button", () => {
      const signInButton = document.getElementById('SignIn');
      expect(signInButton).not.toBeNull();
      expect(signInButton.textContent).toBe('Sign In');
    });
  });

  describe("Overlay Panel", () => {
    test("should contain a button with id 'signIn' in the overlay", () => {
      const signInButton = document.getElementById('signIn');
      expect(signInButton).not.toBeNull();
    });

    test("should contain a button with id 'signUp' in the overlay", () => {
      const signUpButton = document.getElementById('signUp');
      expect(signUpButton).not.toBeNull();
    });
  });
});
// describe("Password Visibility Toggle", () => {
//   test("should toggle password visibility on clicking the eye icon", () => {
//       // Ambil elemen input password dan tombol toggle dengan ID yang benar
//       const passwordInput = document.getElementById('password'); // ID yang sesuai untuk input password
//       const toggleButton = document.getElementById('togglePassword'); // ID yang sesuai untuk tombol toggle

//       // Log untuk membantu debugging
//       console.log("Document Body:", document.body.innerHTML); // Menampilkan HTML saat ini
//       console.log("Password Input:", passwordInput);
//       console.log("Toggle Password Icon:", toggleButton);

//       // Pastikan password awalnya tersembunyi
//       expect(passwordInput).not.toBeNull(); // Memastikan input ada
//       expect(passwordInput.getAttribute('type')).toBe('password'); // Pastikan tipe awalnya adalah password

//       // Simulasi klik untuk menunjukkan password
//       toggleButton.click();
//       expect(passwordInput.getAttribute('type')).toBe('text'); // Pastikan tipe menjadi 'text' setelah klik

//       // Simulasi klik lagi untuk menyembunyikan password
//       toggleButton.click();
//       expect(passwordInput.getAttribute('type')).toBe('password'); // Pastikan tipe kembali menjadi 'password'
//   });
// });









