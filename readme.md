# Book List Application

This project is a simple, interactive web application for managing a personal book collection. Users can add books to their list, mark them as read, rate them, and provide a link to where the book can be obtained.

## Overview

The Book List application allows users to maintain a list of books with details such as title, author, rating, and a URL to purchase or find the book. It provides a clean and intuitive interface for adding, viewing, and managing the book collection.

## Key Features

- **Add Books**: Users can add books to the list by providing the title, author, and an optional URL.
- **Mark as Read**: Users can mark books as read by checking a checkbox.
- **Rate Books**: Users can rate books on a scale of 1 to 10.
- **Remove Books**: Users can remove books from the list.
- **Responsive Design**: The layout adjusts to different screen sizes for a better user experience.

## Functionalities implementation

addBook:

When the user submits the form to add a new book, this function is triggered.
It retrieves the input values (title, author, website) provided by the user.
If the title and author are not empty, it creates a new list item representing the book.
The list item includes the book details (title, author, website), a checkbox for marking as read, a dropdown for rating, and a delete button.
Finally, the new list item is appended to the book list.


handleBookListClick:

This function handles clicks within the book list.
If the user clicks on the delete button (or the trash icon), it removes the corresponding book from the list.
If the user clicks on the checkbox to mark a book as read, it toggles the 'read' class to visually indicate the read status.
These functionalities collectively enable users to add, remove, mark as read, and rate books within the application.

## Installation and Usage

To use the Book List application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/book-list.git

2. Navigate to the project directory:
    cd book-list

3. Open the index.html file

4. Start adding your favorite books to the list! You can provide the book title, author, website link, mark books as read, and rate them.
