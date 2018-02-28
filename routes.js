'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/add',() => app.bookView.initAddform);


//use book_id in view and book in server review this during lab like a .put from blog lab.
//research context!
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, anotherCallback));

page();