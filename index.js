document.onload = () => {
    converterSheet()
}

function converterSheet() {
    const fileInput = document.getElementById('fileInput');
    let containerSheet = document.getElementById('containerSheet');
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const jsonData = [];
        workbook.SheetNames.map(function (sheetName) {
            const worksheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
            jsonData.push({ [sheetName]: sheetData });
        });

        const jsonOutput = JSON.stringify(jsonData, null, 2);
        console.log(jsonOutput);

        let resJson = JSON.parse(jsonOutput).map(function (sheet) {
            const name = workbook.SheetNames
            console.log(name)
            let sheetTable = '';

            for (let index = 0; index < sheet[name].length; index++) {
                const element = sheet[name][index];

                sheetTable += `
                <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
        alt="Trendy Pants and Shoes"
        class="img-fluid rounded-start"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <p class="card-text">
          This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
        <p class="card-text">
          <small class="text-muted">${element.Provincia}</small>
        </p>
      </div>
    </div>
  </div>
</div>
                `
            }
            containerSheet.innerHTML = sheetTable;

        })
    };

    reader.readAsBinaryString(file);
}