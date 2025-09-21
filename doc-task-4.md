# DOKUMENTASI WEEKLY 7

## Perbedaan Linux kernel dan distro

- Linux Kernel adalah inti dari sistem operasi Linux yang bertugas mengenlola sumber daya perangkat keras/Hardware dan mefasilitasi komunikasi antara hardware dan software.
- Sedangkan Linux Distro adalah, sistem operasi yang di bangun di atas kernel Linux dan berbagai perangkat lunak tambahan, Linux Distro bisa juga disebut distribusi Linux.
- Intinya:
- **Linux Kernel,** Inti sistem operasi, hanya mengatur hardware & komunikasi software dan hardware.
- **Linux Distro,** Sistem operasi lengkap berbasis kernel Linux, ditambah tools, package manager, desktop environment, dan aplikasi agar siap digunakan.

## Linux FHS

FHS adalah singkatan dari Filesystem Hierarchy Standard yang artinya adalah standard yang mendefinisikan struktur direktori dan isi direktori pada sistem operasi Linux. FHS juga bertujuan untuk memastikan bawha aplikasi dan sistem dapat berinteraksi dengan cara yang konsisten dan dapat diprediksi. contohnya sebagai berikut:

- `/`: Direktori root, titik awal dari semua file dan direktori.
- `/bin`: Berisi perintah-perintah penting yang dibutuhkan oleh semua pengguna, termasuk perintah dasar sistem seperti `ls`, `cp`, dan `rm`.
- `/etc`: Berisi file konfigurasi sistem.
- `/home`: Berisi direktori home pengguna, tempat file pribadi mereka disimpan.
- `/usr`: Berisi aplikasi dan data yang digunakan oleh pengguna.
- `/var`: Berisi data yang berubah-ubah, seperti log sistem, basis data, dan cache.

## SISTEM PERMISSION & OWNER PADA LINUX

Pada Linux Sistem Permission dan Owner digunakan untuk mengatur siapa saja yang dapat mengakses, membaca, menulis, atau menjalankan file direktori.

### Ownership (Kepemilikan)

- **Owner:** Pengguna yang membuat atau memiliki file atau direktori tersebut.
- **Group:** Grup pengguna yang memiliki akses ke file atau direktori.
- **Others:** Semua pengguna lain di sistem yang bukan pemilik atau anggota grup.

### Permission (Izin Akses)

- **Read (R):** Izin untuk membaca isi file atau daftar isi direktori.
- **Write (W):** Izin untuk mengubah isi file atau membuat/menghapus file dalam direktori.
- **Execute (X):** Izin untuk menjalankan file (executable) atau mengakses direktori.

Contohnya:

- **`rwxr-xr-x`:**
  Ini adalah representasi permission dalam format simbolik
  • `rwx` (owner): Pemilik memiliki hak baca, tulis, dan eksekusi.
  • `r-x` (group): Grup hanya memiliki hak baca dan eksekusi.
  •

## PRINSIP ENKRIPSI PADA SSH

Prinsip utama enkripsi pada SSH adalah menjaga kerahasiaan data yang dikirimkan melalui koneksi jaringan. SSH menggunakan beberapa jenis algoritma enkripsi untuk melindungi data dari akses tidak sah. Enkripsi ini melibatkan proses pengacakan data menggunakan kunci enkripsi, sehingga hanya pihak yang memiliki kunci yang sesuai yang dapat membaca data tersebut.

Berikut adalah prinsip enkripsi pada SSH secara lebih rinci:

**1. Enkripsi Simetris:**

- SSH menggunakan enkripsi simetris untuk mengenkripsi seluruh sesi komunikasi setelah proses otentikasi selesai.
- Kunci simetris (shared key) dibuat dan digunakan oleh kedua belah pihak (klien dan server) untuk mengenkripsi dan mendekripsi data.
- Kunci ini tidak pernah ditransmisikan melalui jaringan, sehingga keamanannya terjaga.
- Algoritma enkripsi simetris yang umum digunakan antara lain AES, Blowfish, dan 3DES.

**2. Enkripsi Asimetris:**

- Enkripsi asimetris digunakan pada tahap awal negosiasi koneksi untuk pertukaran kunci simetris.
- SSH menggunakan pasangan kunci publik dan privat.
- Kunci publik dapat dibagikan secara luas, sedangkan kunci privat hanya diketahui oleh pemiliknya.
- Kunci publik digunakan untuk mengenkripsi data, dan hanya kunci privat yang sesuai yang dapat mendekripsinya.

**3. Hashing:**

- SSH juga menggunakan hashing untuk berbagai keperluan, seperti otentikasi dan verifikasi integritas data.
- Hashing adalah fungsi satu arah yang mengubah data menjadi string karakter dengan panjang tetap (hash).
- Hasil hash tidak dapat dikembalikan ke data aslinya (irreversibel), sehingga aman untuk memverifikasi apakah data telah dimodifikasi.
- Algoritma hashing yang umum digunakan antara lain SHA-256 dan MD5.

## PERBEDAAN HTTP DAN HTTPS

HTTP (Hypertext Transfer Protocol) mengirimkan data dalam bentuk teks biasa, rentan terhadap penyadapan dan serangan. Sedangkan HTTPS (Hypertext Transfer Protocol Secure) menggunakan enkripsi SSL/TLS untuk melindungi data yang ditransmisikan, sehingga lebih aman dari serangan. Intinya, perbedaan utama dari HTTP dan HTTP adalah terletak pada keamanannya.

**HTTP:**

- **Tidak terenkripsi:** Data dikirimkan dalam bentuk teks biasa, sehingga mudah dibaca oleh pihak yang tidak berwenang.
- **Rentan terhadap serangan:** Rentan terhadap serangan seperti penyadapan, pencurian data, dan serangan man-in-the-middle.
- **Port 80:** Menggunakan port 80 untuk komunikasi.
- **Tidak ada ikon gembok:** Tidak ada indikator keamanan di browser.

**HTTPS:**

- **Terenkripsi:** Data dikirimkan dalam bentuk terenkripsi, sehingga lebih aman dan sulit dibaca oleh pihak lain.
- **Aman:** Lebih aman dari HTTP karena menggunakan enkripsi SSL/TLS.
- **Port 443:** Menggunakan port 443 untuk komunikasi.
- **Ikon gembok:** Biasanya menampilkan ikon gembok di browser, menandakan koneksi yang aman.

## DOCKER OCI COMPLIANCE STANDARD

OCI adalah standar terbuka yang dibuat oleh Linux Foundation (2015, diprakarsai oleh Docker, CoreOS, dan vendor lain) untuk memastikan

interoperabilitas

container di seluruh ekosistem.

Artinya: container image yang dibuat di satu platform (misalnya Docker) bisa dijalankan di platform lain (misalnya Podman, CRI-O, containerd, runc).

OCI mendefinisikan **spesifikasi standar** untuk:

- OCI Image Specification → format image container (bagaimana image dibuild, disimpan, didistribusikan).
- OCI Runtime Specification → cara mengeksekusi container (apa itu bundle, lifecycle container, hook, cgroups, namespace).
- OCI Distribution Specification → protokol distribusi image (registry API, push/pull).

Docker OCI Compliance Standard adalah Jaminan bahwa Docker (engine, image, registry) mengikuti standar OCI (Image Spec, Runtime Spec, Distribution Spec), sehingga container yang dibuat dengan Docker bisa dijalankan di runtime/container ecosystem lain tanpa lock-in.

## PERBEDAAN ANTARA CONTAINER DAN VM

- Container mengisolasi aplikasi dan dependensinya, tetapi berbagi kernel sistem operasi host. Hal ini membuat container lebih ringan dan cepat untuk dimulai serta dimatikan, serta membutuhkan lebih sedikit sumber daya (CPU, Memori, dan Penyimpanan) dibandingkan VM.
- Virtual Machine memiliki sistem operasi sendiri yang lengkap, yang berarti setiap VM mengisolasikan sumber daya untuk OS nya sendiri, menjadikkannya lebih berat dan membutuhkan lebih banyak waktu untuk dimulai.

Perbedaan utama antara container dan virtual machine (VM) terletak pada cara mereka mengisolasi aplikasi dan penggunaan sumber daya. Container lebih ringan dan efisien, berbagi kernel sistem operasi host, sementara VM memiliki kernel sendiri dan lebih berat.

## DEFINISI DAN MANFAAT DARI IMAGE LAYER PADA DOCKER

Image Layer pada Docker adalah bagian-bagian terstruktur yang membentuk sebuah Docker Image. Setiap layer mempresentasikan perubahan yang dilakukan pada sistem file selama proses pembuatan Image. Lapisan-lapisan ini bersifat read-only (kecuali lapisan teratas pada container) dan di-cache oleh Docker, sehingga memungkinkan efisiensi dalam pembuatan dan pengguna Image.

Manfaat dari Image Layer adalah sebagai berikut:

- Mengurangi ukuran Image. Dengan menggunakan sistem berlapis, Docker dapat mengurangi ukuran image karena hanya perubahan yang disimpan sebagai lapisan baru.
- Mempercepat Pembuatan Image. Karena lapisan di-cache, pembuatan Image baru atau pembaruan Image menjadi lebih cepat karena Docker hanya perlu memproses lapisan yang berubah.
- Berbagi Lapisan. Lapisan yang sama dapat digunakan oleh beberapa Image, sehingga menghemat ruang penyimpanan dan meningkatkan efisiensi.
- Reusability. Lapisan dapat digunakan kembali dalam berbagai Image, memungkinkan penggunaan kembali kode dan dependensi.

## KEGUNAAN DARI PENGGUNAAN DOCKER VOLUME DAN NETWORK BESERTA CONTOHNYA

- Docker Volume
  Mekanisme untuk menyimpan data di luar container. Data yang disimpan dalam volume tetap ada meskipun kontainer dihapus atau dibuat ulang.

Kegunaannya:

- Penyimpanan Data Persisten: Volume memastikan data aplikasi tetap ada meskipun kontainer terkait dihentikan atau dihapus.
- Berbagi Data: Volume dapat digunakan untuk berbagi data antar beberapa kontainer.
  -Isolasi Data: Data dalam volume terisolasi dari sistem file host, meningkatkan keamanan dan portabilitas.

Contoh:

- Menyimpan database dalam volume agar data tetap ada meskipun server database dihentikan.
- Berbagi file konfigurasi antara beberapa kontainer web.
- Menyimpan log aplikasi dalam volume yang terpisah.
- Docker Network
  Mekanisme untuk menghubungkan kontainer satu sama lain dan ke jaringan eksternal.

Kegunaannya:

- Komunikasi Antar Kontainer: Memungkinkan kontainer untuk saling berkomunikasi melalui jaringan.
- Isolasi Jaringan: Mengontrol akses jaringan antar kontainer, memastikan isolasi dan keamanan.
- Skalabilitas: Memungkinkan penambahan kontainer baru ke jaringan dengan mudah.

Contoh:

- Membuat jaringan untuk aplikasi web yang terdiri dari beberapa kontainer (web server, database server).
- Memisahkan jaringan untuk aplikasi yang berbeda, memastikan mereka tidak dapat saling berkomunikasi.
- Menghubungkan kontainer ke jaringan eksternal untuk mengakses layanan lain.

## DEFINISI DAN TUJUAN DARI PENGGUNAAN WEB SERVER DAN REVERSE-PROXY

- Web Server
  Sebuah Sistem (hardware ataupun software) yang bertugas menyimpan, memproses, dan mengirimkan konten web (seperti halaman HTML, gambar, file CSS, Javascript) ke klien (browser) melalui protokol HTTP/HTTPS.
  Tujuan dari Web Server adalah:
  - Menyediakan konten web kepada pengguna.
  - Menangani permintaan dari klien dan mengirimkan response yang sesuai.
  - Mengelola file dan data yang terkait dengan situs web.
  - Menyediakan berbagai fitur seperti caching, load balancing, dan keamanan dasar.
- Reverse-Proxy
  Server yang bertindak sebagai perantara antara klien dan satu atau lebih web server. Klien mengirimkan permintaan ke reverse-proxy, yang kemudian meneruskan ke web server yang sesuai. Setelah web server memproses permintaan, response dikembalikan melalui reverse proxy ke klien.
  Tujuan dari Reverse-Proxy adalah:
- Keamanan. Reverse Proxy dapat menyembunyikan alamat IP asli dari web server, melindungi dari serangan langsung. Selain itu, reverse proxy dapat melakukan penyaringan lalu lintas untuk memblokir permintaan berbahaya.
- Performa. Reverse Proxy dapat mengelola load balancing, menditribusikan permintaan ke beberapa server untuk menghindari beban berlebih pada satu server dan juga dapat melakukan caching untuk mempercepat pengiriman konten.
- Skalabilitas. Dengan reverse proxy, mudah untuk menambahkan lebih banyak web server di belakangnya untuk meningkatkan kapasitas dan kinerja aplikasi.
- Fleksibilitas. Reverse proxy dapat digunakan untuk berbagai tujuan, seperti mengamankan HTTPS, kompresi data, dan routing permintaan berdasarkan berbagai kriteria
