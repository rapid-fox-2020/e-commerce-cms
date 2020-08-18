const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';


function authorize() {
  let credentials = {
    installed:
    {client_id:process.env.GOOGLE_CLIENT_ID,
    project_id:process.env.PROJECT_ID,
    auth_uri:process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url:process.env.AUTH_PROVIDER,
    client_secret:process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris:[process.env.REDIRECT_URI]}}

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  let token = fs.readFileSync(TOKEN_PATH, 'utf-8')
    if (!token) {
      return getAccessToken(oAuth2Client)
    }
    else{
      oAuth2Client.setCredentials(JSON.parse(token));
      return oAuth2Client;
    }
}

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      return oAuth2Client;
    });
  });
}

function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  return new Promise((resolve, reject) => {
    drive.files.list({
      q: `'${process.env.DRIVE_FOLDER}' in parents`,
      fields: 'nextPageToken, files(webContentLink)',
    }, (err, res) => {
      if (err) {
        console.log('The API returned an error: ' + err)
        reject(err)
      }
      else{
        const files = res.data.files;
        resolve(files)
      }
    })
  })
}


module.exports = { authorize, listFiles }
