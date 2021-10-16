const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
const urlapi = 'http://localhost:3000/'
const urlsite = 'video.html?id=';
const container = document.querySelector(".videos-container");
const myvideo = document.querySelector("#myvideo")
const btnlike = document.querySelector("#btnlike")
const btndislike = document.querySelector("#btndislike")
const alert = document.querySelector("#msg")

const search = async () => {
    try {
        const req = await fetch(urlapi + 'videos/'+id)
        if(req.ok){
            const data = await (req).json()
            if(data){
                showContent(data[0])
                showRelatedVideos(data[1])
            }else{
                cleanAlert()
                alert.classList.add("alert-warning")
                alert.textContent = "Nothing to show"
            }
        }else{
            cleanAlert()
            alert.classList.add("alert-danger")
            alert.textContent = "Sorry, we have an error in SERVER"
        }
    } catch (error) {
        console.log(error)
    }
}

search()

const showContent = (mainVideo) => {
    document.querySelector("#title").textContent = mainVideo.title
    document.querySelector("#myvideo").src = urlapi + mainVideo.file
    document.querySelector("#time").textContent = mainVideo.updatedAt.substring(0,10)
    document.querySelector("#likes").textContent = mainVideo.likes
    document.querySelector("#dislikes").textContent = mainVideo.dislikes
    document.querySelector("#tags").textContent = mainVideo.tags
    document.querySelector("#downloadlink").href = urlapi + mainVideo.file
    document.title = mainVideo.title + " | CSJI Youtube"

    console.log(mainVideo.tags);
}

const showRelatedVideo = (relatedVideo) => {
    if(document.querySelector("#downloadlink").href != urlapi + relatedVideo.file){
        const temp = document.querySelector("template");
        const clon = temp.content.cloneNode(true);
        clon.querySelector("#title").textContent = relatedVideo.title;
        clon.querySelector("#videolink").href = urlsite + relatedVideo._id;
        clon.querySelector("#video").src = urlapi + relatedVideo.file;
        clon.querySelector("#time").textContent = relatedVideo.updatedAt.substring(0,10);
        container.appendChild(clon);
    }
}

const showRelatedVideos = (data) => {
    if(data != null || data != undefined){
        if(data.length > 0){
            data.forEach(element => {
                showRelatedVideo(element)
            });
        }
    }
}

const cleanAlert = () => {
    alert.classList.remove("alert-warning")
    alert.classList.remove("alert-success")
    alert.classList.remove("alert-danger")
}

const sendOperation = async (op) => {
    try {
        const req = await fetch(urlapi + 'videos/'+id+'/'+op, {method: 'PATCH'})
        if(req.ok){
            const data = await (req).json()
            console.log(data)
            return data
        }else{
            console.log("fail", req)
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

const updateVotes = (res) => {
    alert.classList.remove("d-none")
    cleanAlert()
    if(res){
        alert.classList.add("alert-success")
        alert.textContent = "Vote saved successfully"
        document.querySelector("#likes").textContent = res.likes
        document.querySelector("#dislikes").textContent = res.dislikes
    }else{
        alert.classList.add("alert-danger")
        alert.textContent = "Vote not saved successfully"
    }
}

btnlike.addEventListener('click', async (e) => {
    console.log(e)
    updateVotes(await sendOperation('likes'))
})

btndislike.addEventListener('click', async (e) => {
    console.log(e)
    updateVotes(await sendOperation('dislikes'))
})
