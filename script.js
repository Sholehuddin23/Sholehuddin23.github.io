const form = document.getElementById('formStatistik');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const checklist = [];
    form.querySelectorAll('input[name="checklist"]:checked').forEach(cb => {
        checklist.push(cb.value);
    });

    const data = {
        jumlah_entry: formData.get('jumlah_entry'),
        win_loss: formData.get('win_loss'),
        rr_rata: formData.get('rr_rata'),
        hasil_akhir: formData.get('hasil_akhir'),
        checklist: checklist.join(', '),
        hari_ke: formData.get('hari_ke')
    };

    statusDiv.innerText = "Mengirim...";

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby265QXUdfAKYrYwJbaWxKbwn0VWxdJabrgXGZ1eGeLWhjyEB4g_vEae7x_j_tLFbnvEQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        statusDiv.innerText = "Terkirim ✅";
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        statusDiv.innerText = "Gagal mengirim.";
    }
});
