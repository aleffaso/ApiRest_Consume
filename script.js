
function createGame(){

    var titleInput = document.getElementById("title");
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price");

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }

    axios.post("http://localhost:3000/game", game).then( res =>{
        if(res.status == 200){
            alert("Success");
        }
    }).catch( err => {
        console.log(err);
    });
}

function deleteGame(listItem){
    var id = listItem.getAttribute("data-id");
    axios.delete("http://localhost:3000/game/"+id).then(res=>{
        alert("Game deleted");
    }).catch(err => {
        console.log(err);
    });
}

function loadForm(listItem){
    var id = listItem.getAttribute("data-id");
    var title = listItem.getAttribute("data-title");
    var year = listItem.getAttribute("data-year");
    var price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;

}

function updateGame(){
    
    var idInput = document.getElementById("idEdit")
    var titleInput = document.getElementById("titleEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }

    var id = idInput.value;

    axios.put("http://localhost:3000/game/"+id,game).then( res =>{
        if(res.status == 200){
            alert("Updated");
        }
    }).catch( err => {
        console.log(err);
    });
    }

axios.get("http://localhost:3000/games").then(res => {

    var games = res.data;
    var list = document.getElementById("games");

    games.forEach(game => {
        var item = document.createElement("li");

        item.setAttribute("data-id",game.id);
        item.setAttribute("data-title",game.title);
        item.setAttribute("data-year",game.year);
        item.setAttribute("data-price",game.price);

        item.innerHTML = game.id + (" - ") + game.title + (" - ") + game.year + (" - $") + game.price;

        list.appendChild(item);

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", function (){
            deleteGame(item);
        });

        list.appendChild(deleteBtn);

        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.addEventListener("click", function(){
            loadForm(item);
        });

        list.appendChild(editBtn);
    });
}).catch(error =>{
    console.log(error);
});

