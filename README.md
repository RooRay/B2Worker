# B2Worker 
Source code for a Cloudflare Worker that loads content from a public Backblaze B2 bucket onto a Cloudflare domain/subdomain :)

## Setup

Go to the Backblaze website and enable B2 storage if it isn't already [here](https://secure.backblaze.com/account_settings.htm). Then make a bucket, ensure that the "Files in Bucket are" setting is set to **Public** or else this script won't work. If you're using an existing bucket ensure it is public by clicking the "Bucket Settings" option beside it.

Upload a test file to the bucket via the web manager. Once uploaded, click on the file and copy the "Friendly URL" but do not include the filename and the slash before it. Your link should be formatted something like this: ```https://f003.backblazeb2.com/file/RooImg```

Now, create a Worker on the Cloudflare dashboard ([or click here](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/workers/new)) and paste the ```worker.js``` from this repo into the box on the Cloudflare website, you can set the name to whatever you like. Then, replace the Friendly URL on line 11 ([this line](https://github.com/RooRay/B2Worker/blob/c052428953bcd0e44f3dcf82cdd4ba1ee418cd27/worker.js#L11)) with the Friendly URL from your own Backblaze bucket following the formatting of the example.

Once Cloudflare deploys your worker, click "Configure Worker" and on the page that loads click "Settings" at the top and "Triggers" on the left sidebar once it loads. Under the "Custom Domains" section click "Add Custom Domain" and type in whatever domain or subdomain you like. Currently only domains active on Cloudflare can be used here. For this, I typed ```img.rooray.xyz``` but you can use whatever you like, you can also add more later. Follow the instructions provided by Cloudflare and then that's it! You're done here.

Tip: In the same "Triggers" section under "Routers" Cloudflare gives you a .workers.dev domain that your Worker is also reachable at. You can keep this on if you like or disable it by clicking the 3 dots to the side of it and then "Disable route".

## ShareX Setup

For this part you'll need to make a Backblaze Application Key [here](https://secure.backblaze.com/app_keys.htm). Set the name of the key to whatever you like. You can restrict access to only the bucket you use for your uploads if you want to though I'd recommend keeping Type of Access on "Read and Write" rather than changing it.

Copy the "keyID" and "applicationKey". Don't worry about the "keyName" as that is not super important.

Open your ShareX destination settings and paste in the "keyID" into the "Application Key ID" box. Then paste the "applicationKey" into the "Application key (secret)" box. Then type your Bucket name in the respective box and check the option to use a Custom URL. Here you should type ```https://``` followed by the domain or subdomain you configured for your worker with no slash at the end.

After that, close your Destination settings menu and change your Image uploader destination to Backblaze B2. That's you done!
