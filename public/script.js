document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('/api/files/upload', {
      method: 'POST',
      body: formData
    });
    loadFiles();
  });
  
  async function loadFiles() {
    const response = await fetch('/api/files');
    const files = await response.json();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    files.forEach(file => {
      const listItem = document.createElement('li');
      listItem.textContent = file;
      listItem.addEventListener('click', () => loadFileData(file));
      fileList.appendChild(listItem);
    });
  }
  
  async function loadFileData(filename) {
    const response = await fetch(`/api/files/${filename}`);
    const data = await response.json();
    displayData(data);
  }
  
  function displayData(data) {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';
  
    if (data.length === 0) return;
  
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      th.addEventListener('click', () => sortTableByColumn(header));
      headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
  
    data.forEach(row => {
      const tableRow = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        tableRow.appendChild(td);
      });
      tableBody.appendChild(tableRow);
    });
  
    document.getElementById('searchBox').addEventListener('input', (e) => {
      const searchText = e.target.value.toLowerCase();
      const filteredData = data.filter(row => row[headers[0]].toLowerCase().includes(searchText));
      displayData(filteredData);
    });
  }
  
  function sortTableByColumn(column) {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const headerIndex = Array.from(table.querySelectorAll('thead th')).findIndex(th => th.textContent === column);
    rows.sort((a, b) => a.cells[headerIndex].textContent.localeCompare(b.cells[headerIndex].textContent));
    rows.forEach(row => table.querySelector('tbody').appendChild(row));
  }
  
  loadFiles();
  