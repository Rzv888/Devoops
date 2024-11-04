const express = require("express");
const { loginHandler } = require("../routes/AuthRoute"); // Pastikan path ini sesuai dengan lokasi file Anda

describe("Login Route", () => {
  it("should return HTML with specific elements", () => {
    // Buat objek request dan response palsu
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      render: jest.fn(), // Digunakan jika Anda merender tampilan
    };

    // Panggil handler secara langsung
    loginHandler(req, res);

    // Periksa apakah render dipanggil dengan tampilan yang benar
    expect(res.render).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    
    // Dapatkan HTML yang dirender
    const htmlResponse = res.render.mock.calls[0][1]; // Ambil argumen kedua dari panggilan terakhir
    expect(htmlResponse).toContain('<header id="header" class="header d-flex align-items-center">');
    expect(htmlResponse).toContain('<h1><span>T</span>vent</h1>');

    // Periksa navbar dengan tautan
    expect(htmlResponse).toContain('<a href="/">Home</a>');
    expect(htmlResponse).toContain('<a href="/my-event">My Event</a>');
    expect(htmlResponse).toContain('<a href="/profile-user">Profile</a>');
    expect(htmlResponse).toContain('<a href="/login">Login</a>'); // CTA Login

    // Periksa footer dengan tautan media sosial
    expect(htmlResponse).toContain('<div class="social-links d-flex mt-4">');
    expect(htmlResponse).toContain('<a href="#" class="twitter">');
    expect(htmlResponse).toContain('<a href="#" class="facebook">');
    expect(htmlResponse).toContain('<a href="#" class="instagram">');
    expect(htmlResponse).toContain('<a href="#" class="linkedin">');

    // Periksa kontak footer
    expect(htmlResponse).toContain('<strong>Phone:</strong>');
    expect(htmlResponse).toContain('<strong>Email:</strong>');
    expect(htmlResponse).toContain('TventHelpDesk@Telkomuniversity.ac.id');
  });
});
