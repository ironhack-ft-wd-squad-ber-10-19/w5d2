const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* GET home page */

const sayHi = () => {
  return (req, res, next) => {
    // console.log("Hello!");
    req.greeting = "Hello";
    next();
  };
};

// router.use(sayHi());

router.get("/", sayHi(), (req, res) => {
  console.log(req.greeting);
  console.log("GET request on /");
  res.render("index");
});

router.get("/books", (req, res) => {
  Book.find({})
    .then(documents => {
      // this function runs WHEN the promise succeeds
      // res.send(documents);
      res.render("books.hbs", { books: documents });
    })
    .catch(err => {
      // this function runs WHEN the promise rejects
      console.log(err);
    });
});

router.get("/books/add", (req, res) => {
  // render a form to add a book
  res.render("bookForm.hbs");
});

router.get("/books/:bookId", (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render("bookDetails", { book: book });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/books", (req, res) => {
  console.log("req.body: ", req.body);
  //   const title = req.body.title;
  //   const author = req.body.author;
  //   const description = req.body.description;
  //   const rating = req.body.rating;
  //   const { title, author, description, rating } = req.body;
  //   Book.create({
  //     title: title,
  //     author: author,
  //     description: description,
  //     rating: rating
  //   });
  //   Book.create({
  //     title,
  //     author,
  //     description,
  //     rating
  //   });

  Book.create({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating
  })
    .then(newBook => {
      res.redirect("/books/" + newBook._id);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/books/edit/:bookId", (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render("bookEdit.hbs", { book: book });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/books/edit/:bookId", (req, res) => {
  Book.updateOne(
    { _id: req.params.bookId },
    {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      rating: req.body.rating
    }
  )
    .then(() => {
      //  success!
      res.redirect("/books/" + req.params.bookId);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
