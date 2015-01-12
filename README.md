miilClient
=====

# Step 1: Install web components
Install custom elements via bower:
```
bower install
```

# Step 2: Set the Twitter API keys
1. Fill some blanks of `key.twitter.placeholder.js`, which is located in the directory `oauth-keys`.
2. Change name of this file to `key.twitter.js` from `key.twitter.placeholder.js`.

# Step 3: Install to Chrome
1. Visit `chrome://extensions` in your chrome browser.
2. Ensure that the *Developer mode* checkbox in  the top right-hand corner is checked.
3. Click *Load unpacked extension…* to pop up a file-selection dialog.
4. Navigate to the directory in which your extension files live, and select it.

(Quoted from [https://developer.chrome.com/extensions/getstarted])

When the installation is complete, the application `*MiilClient` will appear in the Chrome app launcher.

# Step 4: Collect more information of `miilClient`
You can get more information about this project in my blog:
[http://daiiz.hatenablog.com/archive/category/miilClient]