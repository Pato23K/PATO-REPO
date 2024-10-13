console.log("Running the script");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('agendaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('Date').value;
    const timeStart = document.getElementById('timeStart').value;
    const timeEnd = document.getElementById('timeEnd').value;
    const activitie = document.getElementById('Activitie').value;
    const place = document.getElementById('Place').value;
    const type = document.getElementById('Type').value;
    const notes = document.getElementById('Notes').value;
    const free = document.getElementById('Free').checked ? 'Free' : 'Busy';

    const table = document.getElementById('agendaTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${date}</td>
        <td>${timeStart}</td>
        <td>${timeEnd}</td>
        <td>${activitie}</td>
        <td>${place}</td>
        <td>${type}</td>
        <td>${notes}</td>
        <td>${free}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
    `;

    newRow.querySelector('.delete-btn').addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
    });

    document.getElementById('agendaForm').reset();
    });
});