let inputEl = document.querySelector('input');
let resultSectionEl = document.querySelector("#resultSection")
let recordClear = document.querySelector("#btn")

async function getJSONData() {
    const response = await fetch('../assets/json/data.json');
    return await response.json();
}

let searchRecord = async (value) => {
    const jsonData = await getJSONData();
    const findRecord = jsonData.find((record) => {
        return record.code === value || value.toUpperCase().startsWith(record.code);
    });

    if (findRecord) {
        resultSectionEl.classList.remove('hidden');
        // Update UI
        resultSectionEl.querySelector("#number").innerText = value.toUpperCase();
        resultSectionEl.querySelector("#id-num").innerText = findRecord.id
        resultSectionEl.querySelector("#code").innerText = findRecord.code
        resultSectionEl.querySelector("#loca").innerText = findRecord.location
        resultSectionEl.querySelector("#type").innerText = findRecord.type
        resultSectionEl.querySelector("#dist").innerText = findRecord.district

    } else {
        resultSectionEl.classList.add('hidden');
    }

    // delete UI innertext
    recordClear.addEventListener('click', () => {
        inputEl.value = '';
        resultSectionEl.querySelector("#id-num").innerText = findRecord.id.value = '';
        resultSectionEl.querySelector("#code").innerText = findRecord.code.value = '';
        resultSectionEl.querySelector("#loca").innerText = findRecord.location.value = '';
        resultSectionEl.querySelector("#type").innerText = findRecord.type.value = '';
        resultSectionEl.querySelector("#dist").innerText = findRecord.district.value = '';
    })
}

inputEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        if (inputEl.value.length > 3) {
            searchRecord(inputEl.value);
        }
    }
});