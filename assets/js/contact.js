const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const toast = document.getElementById("toast");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;

    submitBtn.innerHTML = "Sending...";

    const formData = new FormData(form);

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        showToast(result.message, result.success);

        if (result.success) {

            form.reset();

        }

    } catch (error) {

        showToast(
            "Something went wrong. Please try again.",
            false
        );

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML = `
        Request Strategy Call
        <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
    `;

});

function showToast(message, success) {

    toast.innerHTML = message;

    toast.classList.remove("hidden");

    toast.classList.remove("bg-green-600");

    toast.classList.remove("bg-red-600");

    toast.classList.add(
        success
            ? "bg-green-600"
            : "bg-red-600"
    );

    toast.style.opacity = "1";

    setTimeout(() => {

        toast.style.opacity = "0";

        setTimeout(() => {

            toast.classList.add("hidden");

        }, 300);

    }, 3000);

}