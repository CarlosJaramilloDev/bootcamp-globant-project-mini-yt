const container = document.querySelector(".videos-container");
const alert = document.querySelector("#msg");
const urlapi = 'http://localhost:3000/';
const urlsite = 'video.html?id=';
const search = async () => {
    try {
        const req = await fetch(urlapi + 'videos')
        if(req.ok){
            const data = await (req).json()
            if(data){
                if(data.length > 0){
                    data.forEach((element) => {
                        showContent(element)
                    } );
                }else{
                    alert.classList.remove("d-none")
                    alert.textContent = "Nothing to show"
                }
            }else{
                alert.classList.remove("d-none")
                alert.textContent = "Nothing to show"
            }
        }else{
            alert.classList.remove("d-none")
            alert.textContent = "Sorry, we have an error in SERVER: " + req.statusText
        }
    } catch (error) {
        alert.classList.remove("d-none")
        alert.textContent = "Sorry, we have an error in SERVER: " + error
    }
}

const showContent = (data) => {
    const temp = document.querySelector("template");
    const clon = temp.content.cloneNode(true);
    clon.querySelector("#title").textContent = data.title;
    clon.querySelector("#videolink").href = urlsite + data._id;
    clon.querySelector("#video").src = urlapi + data.file;
    clon.querySelector("#time").textContent = data.updatedAt.substring(0,10);
    container.appendChild(clon);
}

search()