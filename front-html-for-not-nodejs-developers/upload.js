const urlapi = 'http://localhost:3000/';
const form = document.querySelector("#form-upload")
const alert = document.querySelector("#msg")

const select = $("select").select2({
    tags: true,
    tokenSeparators: [',', ' ', '.']
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    alert.classList.remove("d-none")
    send()
})

const send = async () => {
    try {
        const tagsCollection = document.querySelector("#tags").options
        const formData = new FormData()
        const fileField = document.querySelector("input[type='file']")
        formData.append('title', document.querySelector("#title").value)
        formData.append('fileupload', fileField.files[0])
        for (i = 0; i < tagsCollection.length; i++) {
            formData.append('tags', tagsCollection[i].text.toLowerCase())
        }
        const req = await fetch(urlapi + 'upload', {method: 'POST', body: formData})
        if(req.ok){
            const data = await (req).json()
            console.log(data)
            cleanAlert()
            alert.classList.add("alert-success")
            alert.textContent = "Video saved successfully"
            form.reset();
            select.val(null).trigger("change")
        }else{
            console.log("fail", req)
            cleanAlert()
            alert.classList.add("alert-danger")
            alert.textContent = "Video doesnt saved"
        }
    } catch (error) {
        console.log(error)
    }
}

const cleanAlert = () => {
    alert.classList.remove("alert-warning")
    alert.classList.remove("alert-success")
    alert.classList.remove("alert-danger")
}