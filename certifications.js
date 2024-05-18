fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Access the parsed data
        console.log(data);

        // Populate General certifications
        populateCertifications(data.general, '#general', 5);

        // Populate Security certifications
        populateCertifications(data.security, '#security', 4);

        // Populate Databases certifications
        populateCertifications(data.databases, '#databases', 4);

        // Populate Project Management certifications
        populateCertifications(data['project-management'], '#project-management', 4);

        // Populate Marketing certifications
        populateCertifications(data.marketing, '#marketing', 4);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to populate certifications for a specific section
function populateCertifications(certifications, sectionId, columnCount) {
    const tableBody = document.querySelector(`${sectionId} tbody`);
    certifications.forEach(certification => {
        const row = createTableRow(certification, columnCount);
        tableBody.appendChild(row);
    });
}

// Function to create table row
function createTableRow(certification, columnCount) {
    const row = document.createElement('tr');
    if (columnCount === 5) {
        row.innerHTML = `
            <td>${certification.technology}</td>
            <td>${certification.provider}</td>
            <td>${certification.description}</td>
            <td><a href="${certification.link}" target="_blank">Link</a></td>
            <td>${certification.expiration}</td>
        `;
    } else if (columnCount === 4) {
        row.innerHTML = `
            <td>${certification.provider}</td>
            <td>${certification.description}</td>
            <td><a href="${certification.link}" target="_blank">Link</a></td>
            <td>${certification.expiration}</td>
        `;
    }
    return row;
}





    // Function to filter certifications based on expiration date
    function filterByExpiration(section, expiration) {
        const rows = document.querySelectorAll(`#${section} tbody tr`);
        rows.forEach(row => {
            const expirationCell = row.querySelector('td:last-child');
            const expirationText = expirationCell.textContent.trim();
            row.style.display = expiration === "" || expirationText.includes(expiration) ? '' : 'none';
        });
    }



    // Function to filter certifications based on provider name
    function filterByProvider(section, provider) {
        const rows = document.querySelectorAll(`#${section} tbody tr`);
        rows.forEach(row => {
            const providerCell = row.querySelector('td:nth-child(2)');
            const providerText = providerCell.textContent.trim().toLowerCase();
            row.style.display = providerText.includes(provider) ? '' : 'none';
        });
    }

    // Event listeners for filtering options
    document.querySelectorAll('.filter-options select').forEach(selectElement => {
        const section = selectElement.id.split('-')[2];
        selectElement.addEventListener('change', (event) => {
            const expiration = event.target.value;
            filterByExpiration(section, expiration);
        });
    });

    document.querySelectorAll('.filter-options input').forEach(inputElement => {
        const section = inputElement.id.split('-')[2];
        inputElement.addEventListener('input', (event) => {
            const provider = event.target.value.toLowerCase();
            filterByProvider(section, provider);
        });
    });

   








// Function to toggle the visibility of sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const sectionBody = section.querySelector('tbody');

    // Toggle the display style
    sectionBody.style.display = sectionBody.style.display === 'none' ? 'table-row-group' : 'none';
}

// event listeners to the section headers for toggling
document.addEventListener('DOMContentLoaded', () => {
    const sectionHeaders = document.querySelectorAll('.section > h2');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sectionId = header.parentElement.id;
            toggleSection(sectionId);
        });
    });
});




 // Call the functions to populate the tables
 populateCertifications();