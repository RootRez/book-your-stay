# Book Your Stay Widget

COMPILATION: Navigate to this folder in windows command line and execute the following command: npm run prod

Stay date and guest selection widget for publishers and affiliates to setup on their website. Adjust the settings in the sample below and provide the HTML/JavaScript snippet to the client. [Click here](https://assets.rootrez.com/book-your-stay/) to view the demo.

## Sample

You can refer to index.html on your localhost or the demo site [https://assets.rootrez.com/book-your-stay/](https://assets.rootrez.com/book-your-stay/).

```html
<style>
        .container {
            max-width: 800px;
        }
        :root {
            --primary-color: orange;
            --secondary-color: pink;
            --book-font: 'Roboto Condensed',-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            --border-radius: 200px;
            --border-color: #ececec;
            --form-border: 1px solid #ececec;
            --box-shadow: none;
        }

        #RootRezWidget{
            font-family: var(--book-font);
            box-shadow: none !important;
        }

        #widget-title {
            font-size: 2em;
            font-weight: bold;
            text-align: left !important;
        }
        #widget-tagline {
            font-size: 1.2em;
            text-align: left !important;
        }

    </style>
<script>
(function (window, document) {
        var loader = function () {

            // required (update with your lodging subdomain):
            var submission_url = "https://lodging.publisher-domain.com/search";
            
			// optional widget title. replace with empty strings to remove.
            var title_text = "Book Your Stay Now!";
            var tagline_text = "Add dates and guests and click Search";

            // optional (these values can be left empty):
            var default_checkin = ""; // MM/DD/YYYY (e.g. 06/07/2020)
            var default_checkout = ""; // MM/DD/YYYY (e.g. 06/15/2020)
            var min_checkin = ""; // MM/DD/YYYY (e.g. 06/01/2020)
            var max_checkout = ""; // MM/DD/YYYY (e.g. 06/28/2020)
            
            var value_add_code = ""; //Leave blank. This is for optionally overriding available value-adds.

            var s = document.createElement("script"), t = document.getElementsByTagName("script")[0];
            s.id = "rootrezScript";
            s.src = "https://assets.rootrez.com/book-your-stay/widget.min.js";
			s.setAttribute("data-default_checkin", default_checkin);
            s.setAttribute("data-default_checkout", default_checkout);
            s.setAttribute("data-min_checkin",min_checkin);
	    	s.setAttribute("data-publisher_key","YOUR API KEY HERE");
            s.setAttribute("data-max_checkout",max_checkout);
            s.setAttribute("data-submission_url",submission_url);
            s.setAttribute("data-title_text",title_text);
            s.setAttribute("data-tagline_text", tagline_text);
            s.setAttribute("data-value_add_code", value_add_code);
            s.setAttribute("data-api_url", "https://svc.rootrez.com");  
            s.setAttribute("data-locale", "en-us");  //Default: en-us. Also available: fr-ca   
            t.parentNode.insertBefore(s, t);
        };
        window.addEventListener
            ? window.addEventListener("load", loader, false)
            : window.attachEvent("onload", loader);
    })(window, document);
</script>
<div id="RootRezWidget"></div>
```

For affiliates you would adjust the submission_url as follows:

```javascript
var submission_url = "https://lodging.bookwesteros.com/referral?Code=rz-78th-annual-widget-festival";
```

For discounts and value-adds:

```javascript
var submission_url = "https://lodging.bookwesteros.com/search";
```

## Settings

| Variable      | Description |
| ----------- | ----------- |
| submission_url   | Required. The publishers URL to submit to        |
| default_checkin      | Checkin date the date picker will default to        |
| default_checkout      | Checkout date the date picker will default to        |
| min_checkin   | The minimum allowed check-in date        |
| max_checkout   | The maximum allowed check-out date        |
| title_text   | Optional widget title. replace with empty strings to remove        |
| tagline_text   | Optional widget tagline. replace with empty strings to remove        |
| value_add_code   | Optionally use one value add for all customers, instead of showing a list for them to choose from        |
| locale   | Optional localization. Change to "fr-ca" for French localized widget calendar and text        |
| results_in_new_tab   | Required (Boolean). Results will be shown on the current window or onto a new window/tab based on this setting. Defaults to false.       |

## Developer Info
[Building an embeddable Javascript widget](https://thomassileo.name/blog/2014/03/27/building-an-embeddable-javascript-widget-third-party-javascript/)

Build file to share in third party script:

```text
widget.min.js
```

Files to do any change in widget html or css are the follows:

HTML: template/form.html
SCSS: resources/scss -> npm run styles

Production: npm run prod

```

After any changes in these files, do the build again for creating the widget.min.js file:
```bash
npm run build
```
