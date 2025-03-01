document.addEventListener('DOMContentLoaded', function () {
    // Select input fields
    const inputs = document.querySelectorAll('.input-section input');

    // Select preview sections
    const displayName = document.getElementById('displayName');
    const displayAddress = document.getElementById('displayAddress');
    const displayMobile = document.getElementById('displayMobile');
    const displayEmail = document.getElementById('displayEmail');
    const displayAge = document.getElementById('displayAge');
    const displayNationality = document.getElementById('displayNationality');
    const displayGender = document.getElementById('displayGender');
    const displayPassportno = document.getElementById('passportno');
    const displayMasters = document.getElementById('displayMasters');
    const displayBachelor = document.getElementById('displayBachelor');
    const displayPUC = document.getElementById('displayPUC');
    const profileImage = document.getElementById('profileImage');
    const skillsInput = document.getElementById('skills');
    const skillsList = document.getElementById('skillsList');

    skillsInput.addEventListener('input', function () {
        const skills = skillsInput.value.trim();

        skillsList.innerHTML = '';

        if (skills) {
            const skillArray = skills.split(',').map(skill => skill.trim());
            skillArray.forEach(skill => {
                // let capsSkill = skill.toUpperCase();
                const li = document.createElement('li');
                const p = document.createElement('p');
                p.textContent = skill.toUpperCase();
                li.appendChild(p);
                skillsList.appendChild(li);
            });
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Function to update the preview section
    function updatePreview() {
        // Update text content in the preview section
        displayName.textContent = document.getElementById('fullName').value || 'Your Name';
        displayAddress.textContent = document.getElementById('address').value;
        displayMobile.textContent = document.getElementById('mobile').value;
        displayEmail.textContent = document.getElementById('email').value;
        displayAge.textContent = document.getElementById('age').value;
        displayNationality.textContent = document.getElementById('nationality').value;
        displayGender.textContent = document.getElementById('gender').value;
        displayPassportno.textContent = document.getElementById('passport').value;

        // Education section
        displayMasters.textContent = document.getElementById('masters').value;
        displayBachelor.textContent = document.getElementById('bachelor').value;
        displayPUC.textContent = document.getElementById('puc').value;
    }

    // Function to handle the profile image preview
    document.getElementById('imageUpload').addEventListener('change', function (event) {
        previewImage(event);
    });

    function previewImage(event) {
        const reader = new FileReader();
        reader.onload = function () {
            profileImage.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

});

function validateForm() {
    const requiredInputs = document.querySelectorAll('.input-section input[required]');

    let isValid = true;

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error'); 
        }
    });

    if (!isValid) {
        alert("Please fill out all required fields before downloading the PDF.");
    }

    return isValid;
}


function downloadPDF() {
    if (!validateForm()) {
        return; // Stop the function if validation fails
    }

    const filename = document.getElementById('fullName').value || 'resume';
    var tableDiv = $("#printResume");

    console.log("Starting PDF export...");

    kendo.drawing
        .drawDOM(tableDiv)
        .then(function (group) {
            console.log("DOM drawn, exporting to PDF...");
            return kendo.drawing.exportPDF(group, {
                paperSize: "auto",
                margin: { left: "1cm", right: "1cm", top: "1cm", bottom: "1cm" },
                scale: 0.8,
            });
        })
        .done(function (data) {
            console.log("PDF export successful, saving file...");
            kendo.saveAs({
                dataURI: data,
                fileName: filename + ".pdf",
            });

            if (confirm("PDF downloaded successfully. Do you want to reload the page?")) {
                window.location.reload();
            }
        })
        .fail(function (error) {
            console.error("Error exporting PDF:", error);
        });
}