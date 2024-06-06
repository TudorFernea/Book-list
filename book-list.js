const bookTemplate = document.createElement('template');
bookTemplate.innerHTML = `
  <div class="book-list">
    <div class="header">My Book Collection</div>
    <div class="instruction">Check the box to mark the book as read</div>
    <form class="input-field">
      <input type="text" placeholder="Book Title" class="title-input">
      <input type="text" placeholder="Author" class="author-input">
      <input type="url" placeholder="Website" class="website-input">
      <button type="submit">
        <i class="fas fa-plus"></i> Add Book
      </button>
    </form>
    <ul class="book-list-items"></ul>
  </div>

  <style>
    .book-list {
        background-color: #ffffff;
        border: 2px solid #00796b;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        padding: 20px;
        max-width: 600px;
        width: 100%;
        text-align: center;
    }

    .header {
        font-size: 28px;
        font-weight: bold;
        color: #004d40;
        margin-bottom: 10px;
    }

    .instruction {
        font-size: 14px;
        color: #004d40;
        margin-bottom: 20px;
    }

    .input-field {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        margin-bottom: 20px;
    }

    .input-field input {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #b2dfdb;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .input-field button {
        padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background-color: #004d40;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
        grid-column: span 2;
    }

    .input-field button:hover {
        background-color: #00796b;
    }

    .book-list-items {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .book-list-items li {
        background-color: #e0f2f1;
        border: 1px solid #b2dfdb;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .book-info {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-right: auto;
        margin-left: 10px;
        flex: 1;
    }

    .book-info span {
        font-size: 16px;
    }

    .book-info span.title {
        font-weight: bold;
        color: #004d40;
    }

    .read-checkbox {
        margin-right: 10px;
    }

    .read-label {
        margin-right: 20px;
    }

    .delete {
        background-color: #c62828;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 10px;
        transition: background-color 0.3s ease;
    }

    .delete:hover {
        background-color: #d32f2f;
    }

    .read {
        text-decoration: line-through;
        color: #757575;
    }

    .rating {
        margin-left: 20px;
        font-size: 14px;
        color: #004d40;
    }
    
    .rating select {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #b2dfdb;
        font-size: 14px;
    }
    
    .website {
        margin-top: 5px;
        font-size: 14px;
    }
    
    .website a {
        color: #00796b;
        text-decoration: none;
    }
    
    .website a:hover {
        text-decoration: underline;
    }
  </style>
`;

class BookList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(bookTemplate.content.cloneNode(true));
        this.form = this.querySelector('.input-field');
        this.titleInput = this.form.querySelector('.title-input');
        this.authorInput = this.form.querySelector('.author-input');
        this.websiteInput = this.form.querySelector('.website-input');
        this.bookList = this.querySelector('.book-list-items');
        this.attachEvents();
    }

    attachEvents() {
        this.form.addEventListener('submit', (event) => this.addBook(event));
        this.bookList.addEventListener('click', (event) => this.handleBookListClick(event));
    }

    addBook(event) {
        event.preventDefault();

        const title = this.titleInput.value.trim();
        const author = this.authorInput.value.trim();
        const website = this.websiteInput.value.trim();
        if (title && author) {
            const listItem = document.createElement('li');
            const bookInfo = document.createElement('div');
            bookInfo.classList.add('book-info');
            const bookTitle = document.createElement('span');
            bookTitle.classList.add('title');
            bookTitle.innerText = title;
            const bookAuthor = document.createElement('span');
            bookAuthor.innerText = `by ${author}`;
            const bookWebsite = document.createElement('span');
            bookWebsite.classList.add('website');
            bookWebsite.innerHTML = website ? `Get it <a href="${website}" target="_blank">here</a>` : '';
            const readCheckbox = document.createElement('input');
            readCheckbox.type = 'checkbox';
            readCheckbox.classList.add('read-checkbox');
            const readLabel = document.createElement('label');
            readLabel.innerText = 'Read';
            readLabel.classList.add('read-label');
            const rating = document.createElement('div');
            rating.classList.add('rating');
            rating.innerHTML = `
                <label for="rating">Rating: </label>
                <select name="rating" class="rating-select">
                    ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                </select>
            `;
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.innerHTML = `<i class="fas fa-trash"></i> Delete`;

            bookInfo.appendChild(bookTitle);
            bookInfo.appendChild(bookAuthor);
            bookInfo.appendChild(bookWebsite);
            listItem.appendChild(readCheckbox);
            listItem.appendChild(readLabel);
            listItem.appendChild(bookInfo);
            listItem.appendChild(rating);
            listItem.appendChild(deleteButton);
            this.bookList.appendChild(listItem);

            this.titleInput.value = '';
            this.authorInput.value = '';
            this.websiteInput.value = '';
        }
    }

    handleBookListClick(event) {
        const target = event.target;

        if (target.classList.contains('fa-trash') || target.classList.contains('delete')) {
            const book = target.closest('li');
            book.remove();
        }

        if (target.classList.contains('read-checkbox')) {
            const bookInfo = target.nextElementSibling.nextElementSibling;
            bookInfo.classList.toggle('read', target.checked);
        }
    }
}

customElements.define('my-book-list', BookList);