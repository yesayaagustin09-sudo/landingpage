document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formPemesanan');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Mencegah halaman me-refresh
            event.preventDefault();

            // 1. Ambil data dari formulir
            const nama = document.getElementById('nama').value;
            const varian = document.getElementById('varian').value;
            const ukuran = document.getElementById('ukuran').value;
            let kontak = document.getElementById('kontak').value.replace(/\D/g, ''); 
            const messageStatus = document.getElementById('message-status');

            if (!varian || !ukuran) {
                alert('Mohon lengkapi pilihan Varian Baju dan Ukuran.');
                return;
            }
            
            // 2. Format Kontak ke format internasional (62xxxx)
            if (kontak.startsWith('0')) {
                kontak = '62' + kontak.substring(1);
            } else if (!kontak.startsWith('62')) {
                kontak = '62' + kontak;
            }
            
            // 3. Menentukan Harga
            const priceMap = {
                'Midnight Black': 'Rp 299.000',
                'Cloud White': 'Rp 249.000',
                'Stone Grey': 'Rp 199.000',
                'Blue Electric': 'Rp 149.000'
            };
            const harga = priceMap[varian] || 'Harga tidak ditemukan';
            
            // 4. NOMOR WHATSAPP ADMIN (GANTI INI)
            const adminNumber = '6285158451977'; 
            
            // 5. Membuat isi pesan yang terstruktur
            const message = `*PESANAN BARU BOX.Y OVERSİZE T-SHIRT*

*Nama:* ${nama}
*Varian:* ${varian}
*Ukuran:* ${ukuran}
*Harga Satuan:* ${harga}
*Nomor Kontak Pelanggan:* ${kontak}

Mohon konfirmasi ketersediaan dan total harga. Terima kasih.`;

            // 6. Encode pesan dan buat URL WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

            // 7. Tampilkan pesan sukses dan alihkan
            messageStatus.style.display = 'block';

            setTimeout(() => {
                window.location.href = whatsappUrl;
                document.getElementById('formPemesanan').reset();
                messageStatus.style.display = 'none';
            }, 1000); 
        });
    }
});