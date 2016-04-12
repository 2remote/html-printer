# html-printer
Generate article to static html form yaopai api

## usage

- make: use ajax to `http://localhost:6000/api/make-html-by-id/5`  will build article(id=5) to html

- view: view `http://localhost:6000/5.html` after make.

- update: same as make.

## notes

- not found page: if an article is not accessed by id, it will generate a not found page.

- style: feel free to add style in vews/article.ejs

