miilClient
=====

# Step 1: Install web components
Install custom elements via bower:
```
bower install
```
# Step 2: Build the app
Run the following command.
```
python ~/apricotPie/apricot.py build miilclient-app-ca.js base.js,R_griddles-app-card-clicked=oss-ca,R_device-format=oss-ca,R_compute-flexible-width=1,R_ma=1,R_tw=0,V_codeversion=1,V_edition=oss-ca,V_app=*MiilClient,V_version="0.2.0 beta",V_build="2015/02/02" utf-8 //!
```

# Step 3: Install to Chrome
1. Visit `chrome://extensions` in your chrome browser.
2. Ensure that the *Developer mode* checkbox in  the top right-hand corner is checked.
3. Click *Load unpacked extension…* to pop up a file-selection dialog.
4. Navigate to the directory in which your extension files live, and select it.

(Quoted from https://developer.chrome.com/extensions/getstarted)

When the installation is complete, the application `*MiilClient` will appear in the Chrome app launcher.

# Step 4: Collect more information of `miilClient`
You can get more information about this project in my blog: http://daiiz.hatenablog.com/archive/category/miilClient
