class Quote{
    constructor(quote, adapter){
      this.id = quote.id
      this.quote = quote.quote
      this.likes = quote.likes
      this.author = quote.author
      this.adapter = adapter
      this.renderEdit = false
    }
  
    renderQuote(){
      let li = document.createElement('li')
      li.className = 'quote-card'
      li.dataset.id = this.id
      li.innerHTML = `
          <blockquote class="blockquote">
            <p class="mb-0">${this.quote}</p>
            <footer class="blockquote-footer">${this.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
            <button class='btn-info'>Edit</button>
          </blockquote>
      `
  
      let editForm = document.createElement('form')
      editForm.id = "edit-quote-form"
      editForm.innerHTML = `
        <div class="form-group">
          <label for="new-quote">Edit Quote</label>
          <input type="text" class="form-control" id="edit-quote" value="${this.quote}">
        </div>
        <div class="form-group">
          <label for="Author">Edit Author</label>
          <input type="text" class="form-control" id="edit-author" value="${this.author}">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      `
      editForm.style.display = 'none'
      li.appendChild(editForm)
  
  
      const quoteList = document.querySelector("#quote-list")
      quoteList.appendChild(li)
      // debugger
      let likeBtn = li.querySelector('.btn-success')
      let deleteBtn = li.querySelector('.btn-danger')
      let editBtn = li.querySelector('.btn-info')
  
      likeBtn.addEventListener('click', (e) => this.increaseLikes(e))
      deleteBtn.addEventListener('click', (e) => this.deleteQuote(e))
      editBtn.addEventListener('click', (e) => this.renderEditForm(e))
  
      //add sort button later
    }
  
    increaseLikes(e){
      let span = e.target.querySelector('span')
      let likes = parseInt(span.innerHTML)
      likes++
      this.adapter.editQuote(this.id, {likes: likes})
      span.innerHTML = likes
    }
  
    deleteQuote(e){
      this.adapter.deleteQuote(this.id)
        .then(() => {
          e.target.parentNode.parentNode.remove()
        })
    }
  
    renderEditForm(e){
      this.renderEdit = !this.renderEdit
      let editForm = e.target.parentNode.parentNode.querySelector("#edit-quote-form")
      if (this.renderEdit){
        editForm.style.display = "block"
        editForm.addEventListener('submit', (e) => {
          e.preventDefault();
          let quote = editForm.querySelector("#edit-quote")
          let author = editForm.querySelector("#edit-author")
          let body = {quote: quote.value, author: author.value}
          this.adapter.editQuote(this.id, body)
            .then((quote) => {
              let editedQuote = new Quote(quote)
              let quoteList = document.querySelector("#quote-list")
              for (let i = 0; i < quoteList.children.length; i++){
                let li = quoteList.children[i];
                if (parseInt(li.dataset.id) === quote.id){
                  li.querySelector("p").innerHTML = quote.quote
                  li.querySelector("footer").innerHTML = quote.author
                  let editForm = li.querySelector("#edit-quote-form")
                  editForm.style.display = 'none'
                }
              }
            })
        })
  
      }else{
        editForm.style.display = "none"
      }
    }
  
  }