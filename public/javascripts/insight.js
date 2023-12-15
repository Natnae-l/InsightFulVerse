Array.from(document.querySelectorAll('.delete')).forEach(element => {
    element.addEventListener('click', deleteItem)
}) 

async function deleteItem(){
    console.log(this.id)
    let data = await fetch(`http://localhost:3000/blogs/${this.id}`, {
        method: 'DELETE'
    })
    data = await data.json();
    window.location = data.redirect
}

