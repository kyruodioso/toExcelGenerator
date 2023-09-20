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
            const name= workbook.SheetNames
            let sheetTable = '';

            for (let index = 0; index < sheet[name].length; index++) {
                const element = sheet[name][index];
                console.log(name)

                sheetTable += `<h2>${element.__EMPTY_1}</h2>`
            }
            containerSheet.innerHTML = sheetTable;

        })


    };

    reader.readAsBinaryString(file);
}
