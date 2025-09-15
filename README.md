# WA BOT (WhatsApp Bot)

WA BOT adalah bot WhatsApp yang dapat merespon perintah/command yang diketik oleh pengguna. Bot ini dibangun menggunakan [Baileys](https://github.com/WhiskeySockets/Baileys) sebagai library WhatsApp Web API dan [Bun](https://bun.sh) sebagai runtime JavaScript yang cepat dan modern.

## Fitur

- **Command Handler:** Bot dapat mendeteksi dan merespon command yang diketik pengguna di WhatsApp.
- **Respon Otomatis:** Buat command custom sesuai kebutuhan.
- **Performa Tinggi:** Berkat Bun, proses eksekusi script menjadi lebih cepat.

## Persyaratan

- Node.js (opsional, hanya jika dibutuhkan oleh dependencies)
- [Bun](https://bun.sh) versi 1.2.6 atau lebih baru
- Akun WhatsApp aktif (untuk login via QR code)
- Koneksi internet stabil

## Instalasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/nurkhaliqfm/wa-otp.git
   cd wa-otp
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Jalankan bot:**
   ```bash
   bun run src/main.js
   ```

4. **Scan QR code:**  
   Saat pertama kali dijalankan, bot akan meminta Anda untuk scan QR code menggunakan aplikasi WhatsApp Anda.

## Cara Kerja Command

Bot akan membaca setiap pesan yang masuk dan jika pesan tersebut berupa command (misal: diawali dengan tanda `/` atau `!`), bot akan mengeksekusi fungsi yang sesuai dengan command tersebut.

**Contoh Command:**
```
/ping
```
Bot akan merespon:
```
pong!
```

## Contoh Struktur Command (Pseudo-code)

```js
if (pesan.startsWith('/ping')) {
  kirimPesan('pong!');
}
```

## Konfigurasi & Pengembangan

- Untuk menambahkan command baru, edit file pada folder `src/commands` atau sesuaikan dengan struktur project Anda.
- Dokumentasi resmi Baileys: [https://github.com/WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)
- Dokumentasi Bun: [https://bun.sh/docs](https://bun.sh/docs)

## Lisensi

MIT

---

> Dibuat dengan 💚 oleh [nurkhaliqfm](https://github.com/nurkhaliqfm)
