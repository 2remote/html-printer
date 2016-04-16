# html-printer
为YAOPAI生成静态HTML文件的API

## 使用 

- 如何配置环境：在daoCloud的volume盘创建www/file.json，内容格式`["1", "2"]`。1，2为默认文章id，重启时会读取，并创建1，2的文章。

- 如何 创建 静态文章： 访问 `http://localhost:8080/api/make-html-by-id/5` 地址，5是文章id，可以替换。如果访问文章存在，则创建；否则会创建提示`未找到`内容的文章。

- 生成的文章在哪里：在www目录下。

- 如何访问生成的文章：浏览器直接访问 `http://localhost:8080/5.html` ，5可以替换成任意文章id。

- 如何 更新 静态文章：同 创建 命令，会覆盖原有静态文章。

- 在哪里触发 创建：访问api地址会触发创建。推荐在文章添加的前／后端操作后触发。

## 注意 

- 如何修改生成的html样式: 样式模版在 vews/article.ejs。

- 不管是否存在文章，调用api都会返回：`{"result":{"Success":true}}` 

## 参考

- [Yaopai api doc](https://xiattst.gitbooks.io/yaopai/content/API/Article/Get.html)

- [Icon package](http://www.iconpng.com/series/1374)

- [npm: EJS](http://www.embeddedjs.com)

- [npm: async waterfall](https://www.npmjs.com/package/async#waterfall)

- [Scrape data from the Web](http://www.codeproject.com/Tips/701689/How-to-scrape-data-from-the-Web-using-Node-js)

