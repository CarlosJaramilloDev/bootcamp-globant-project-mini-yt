const container = document.querySelector(".videos-container");
const query = document.querySelector("#query");
const qinput = document.querySelector("#qinput");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q')
const urlapi= 'http://localhost:3000/';
const urlsite = 'video?id=';

const search = async () => {
    try {
        const req = await fetch(urlapi + 'videos?q='+q)
        if(req.ok){
            const data = await (req).json()
            if(data){
                if(data.length > 0){
                    query.textContent = "Loading results for: " + q
                    data.forEach((element) => {
                        showContent(element)
                    });
                    query.textContent = "Results for: " + q
                }else{
                    query.textContent = "No results found for: " + q
                }
                qinput.value = q
                document.title = "Results of: " + q
            }
        }else{
            console.log("fail", req)
            query.textContent = "Sorry, we have an error in SERVER: " + req.statusText
        }
    } catch (error) {
        console.log(error)
        query.textContent = "Sorry, we have an error in SERVER " + error
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
