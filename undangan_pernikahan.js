document.addEventListener("DOMContentLoaded", function () {


    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");
    const openButton = document.getElementById("openInvitation");

    if (cover && invitation && openButton) {
        openButton.addEventListener("click", function () {

            cover.classList.add("closed");
            invitation.classList.remove("hidden");

            document.body.classList.remove("locked");

            document.getElementById("home")?.scrollIntoView({
                behavior: "smooth"
            });

           
            const music = document.getElementById("backgroundMusic");

            if (music) {
                music.play().catch(function () {
                    console.log("Musik belum tersedia atau gagal diputar.");
                });
            }

        });
    }


    const music = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");
    const musicText = document.getElementById("musicText");

    if (music && musicToggle) {

        musicToggle.addEventListener("click", async function () {

            if (music.paused) {

                try {
                    await music.play();

                    if (musicText) {
                        musicText.textContent = "Matikan Musik";
                    }

                } catch (error) {
                    console.error("Musik gagal diputar:", error);

                    if (musicText) {
                        musicText.textContent = "Musik tidak tersedia";
                    }
                }

            } else {

                music.pause();

                if (musicText) {
                    musicText.textContent = "Putar Musik";
                }

            }

        });

    }


    

    const params = new URLSearchParams(window.location.search);
    const guestName = params.get("to");
    const guestElement = document.getElementById("guestName");

    if (guestName && guestElement) {
        guestElement.textContent = guestName.replace(/[<>]/g, "");
    }


 

    const eventDate = new Date(2026, 11, 20, 8, 0, 0);

    function updateCountdown() {

        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            console.error("Elemen hitung mundur tidak ditemukan.");
            return;
        }

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        daysElement.textContent = String(days).padStart(2, "0");
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);



    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpResult = document.getElementById("rsvpResult");

    if (rsvpForm && rsvpResult) {

        rsvpForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const attendance = document.getElementById("attendance").value;
            const message = document.getElementById("message").value.trim();

            if (name === "" || attendance === "") {
                alert("Nama dan konfirmasi kehadiran wajib diisi!");
                return;
            }

            rsvpResult.textContent =
                "Terima kasih, " + name + "! " +
                "Konfirmasi kehadiran: " + attendance + "." +
                (message ? " Ucapan: " + message : "") +
                " Data ini belum tersimpan ke server.";

            rsvpForm.reset();

        });

    }

    console.log("JavaScript undangan berhasil dijalankan!");

});
