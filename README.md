# 'Book Your Stay' javascript third party widget

## Code referred to do this
[![Code](https://thomassileo.name/blog/2014/03/27/building-an-embeddable-javascript-widget-third-party-javascript/)](https://thomassileo.name/blog/2014/03/27/building-an-embeddable-javascript-widget-third-party-javascript/)


Sample third party embed script js
```text
dist/widget.min.js
```
, is the js file we built to share in third party script

Files to do any change in widget html or css are the follows
```text
template/form.html
style/widget.css
```
After any changes in these files, do the build again for creating the widget.min.js file
```bash
node_modules/requirejs/bin/r.js -o embed.build.js
```

## Third party widget loading script sample
You can refer the demo/index.html for detail
```text
<script>
    (function (window, document) {
        var loader = function () {

            var default_checkin = "";
            var min_checkin = "2019-08-28"; 
            var max_checkout = "";
            var submission_url = "http://alta.publisher.localhost/search";

            var s = document.createElement("script"), t = document.getElementsByTagName("script")[0];                 
            s.id = "rootrezScript";
            s.src = "http://10.254.101.90/book_your_stay_widget/dist/widget.min.js";
            s.setAttribute("data-default_checkin", default_checkin);
            s.setAttribute("data-min_checkin",min_checkin);
            s.setAttribute("data-max_checkout",max_checkout);
            s.setAttribute("data-submission_url",submission_url);
            t.parentNode.insertBefore(s, t);
        };
        window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
    })(window, document);
</script>
```
Place this script inside the third party web page and add the following 'div' inside the web page where it need to show the widget
```text
<div id="RootRezWidget"></div> 
```
