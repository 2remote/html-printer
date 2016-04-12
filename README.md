# html-printer
Generate article to static html form yaopai api

## usage

- make: use ajax to `http://localhost:6000/api/make-html-by-id/5`  will build article(id=5) to html.

- view: view `http://localhost:6000/5.html` after make.

- update: same as make.

## notes

- not found page: if an article is not accessed by id, it will generate a not found page.

- style: feel free to add style in vews/article.ejs.

- return after make: it will return `{"result":{"Success":true}}` always, even if real data is not fetched from api.

## Refers

- [Yaopai api doc](https://xiattst.gitbooks.io/yaopai/content/API/Article/Get.html)

- [Icon package](http://www.iconpng.com/series/1374)

- [npm: EJS](http://www.embeddedjs.com)

- [npm: async waterfall](https://www.npmjs.com/package/async#waterfall)

- [Scrape data from the Web](http://www.codeproject.com/Tips/701689/How-to-scrape-data-from-the-Web-using-Node-js)