

document.addEventListener("click", function(e) {
    // Delete Feature
    if (e.target.classList.contains("delete-me")) {
      if (confirm("Bunu yorumu silmek istediginizden emin misiniz?")) {
        axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function () {
          e.target.parentElement.parentElement.remove()
        }).catch(function() {
          console.log("Please try again later.")
        })
      }
    }
})

