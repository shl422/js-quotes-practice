document.addEventListener("DOMContentLoaded", () => {
    const URL = "http://localhost:3000/quotes"
    const quoteList = document.querySelector("#quote-list")
    const newQuoteForm = document.querySelector("#new-quote-form")
    // debugger
    const adapter  = new Adapter(URL);
  
  
    adapter.getQuotes()
      .then((quotes) => {
        quotes.forEach((quoteObj) => {
          let quote = new Quote(quoteObj, adapter);
          quote.renderQuote();
        })
      })
  
    newQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let form = e.target
      let quote = e.target.querySelector("#new-quote").value
      let author = e.target.querySelector("#author").value
      let quoteObj = {quote: quote, likes: 0, author: author}
      adapter.createQuote(quoteObj)
        .then((quote) => {
          let newQuote = new Quote(quote, adapter);
          newQuote.renderQuote()
          e.target.querySelector("#new-quote").value = ""
          e.target.querySelector("#author").value = ""
        })
  
    })
  
  })