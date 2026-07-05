/* ============================================================
   BACKEND — Mon Business (Lavage & Café)
   Node.js PUR : aucune dépendance, aucun "npm install".
   - Sert le frontend (dossier /public)
   - API de synchronisation : le téléphone remonte les données ici
   - Stockage dans data.json + sauvegardes horodatées dans /backups
   Lancer avec :  node server.js   (ou double-clic sur Démarrer.bat)
   ============================================================ */
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { exec } = require('child_process');

const PORT    = process.env.PORT || 3232;
const ROOT    = __dirname;
const PUBLIC  = path.join(ROOT, 'public');
const DATA    = path.join(ROOT, 'data.json');
const BACKDIR = path.join(ROOT, 'backups');
const MAX_BACKUPS = 60;

if (!fs.existsSync(BACKDIR)) fs.mkdirSync(BACKDIR);

const MIME = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.webmanifest':'application/manifest+json'
};

const CORS = {
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type'
};

function send(res, code, body, type){
  res.writeHead(code, Object.assign({'Content-Type': type || 'text/plain; charset=utf-8'}, CORS));
  res.end(body);
}
function sendJSON(res, code, obj){ send(res, code, JSON.stringify(obj), MIME['.json']); }

function stamp(){
  const d = new Date(), p = n => String(n).padStart(2,'0');
  return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds());
}
function readData(){ try { return JSON.parse(fs.readFileSync(DATA,'utf8')); } catch(e){ return null; } }
function lastBackupInfo(){
  try {
    const files = fs.readdirSync(BACKDIR).filter(f=>f.endsWith('.json')).sort();
    if(!files.length) return null;
    const st = fs.statSync(path.join(BACKDIR, files[files.length-1]));
    return { file: files[files.length-1], at: st.mtime.toISOString() };
  } catch(e){ return null; }
}
function pruneBackups(){
  try {
    let files = fs.readdirSync(BACKDIR).filter(f=>f.endsWith('.json')).sort();
    while(files.length > MAX_BACKUPS){ fs.unlinkSync(path.join(BACKDIR, files.shift())); }
  } catch(e){}
}

function counts(d){
  if(!d) return {};
  return {
    ventes: (d.ventes||[]).length,
    depenses: (d.depenses||[]).length,
    clients: (d.customers||[]).length,
    services: (d.services||[]).length
  };
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (req.method === 'OPTIONS') return send(res, 204, '');

  /* ---------- API ---------- */
  if (url === '/api/status') {
    const d = readData();
    return sendJSON(res, 200, { ok:true, hasData: !!d, lastBackup: lastBackupInfo(), counts: counts(d), server:'Mon Business' });
  }

  if (url === '/api/backup' && req.method === 'GET') {
    const d = readData();
    return sendJSON(res, 200, d || {});
  }

  if (url === '/api/backup' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 20*1024*1024) req.destroy(); });
    req.on('end', () => {
      let obj;
      try { obj = JSON.parse(body); } catch(e){ return sendJSON(res, 400, { ok:false, error:'JSON invalide' }); }
      if (typeof obj !== 'object' || obj === null) return sendJSON(res, 400, { ok:false, error:'Données invalides' });
      try {
        fs.writeFileSync(DATA, JSON.stringify(obj));
        fs.writeFileSync(path.join(BACKDIR, 'data-' + stamp() + '.json'), JSON.stringify(obj));
        pruneBackups();
        console.log('[' + new Date().toLocaleTimeString('fr-FR') + '] Synchronisation reçue — ' +
          JSON.stringify(counts(obj)));
        return sendJSON(res, 200, { ok:true, savedAt: new Date().toISOString(), counts: counts(obj) });
      } catch(e){ return sendJSON(res, 500, { ok:false, error:String(e) }); }
    });
    return;
  }

  /* ---------- Fichiers statiques (frontend) ---------- */
  let file = url === '/' ? '/index.html' : url;
  file = path.normalize(file).replace(/^(\.\.[\/\\])+/, '');
  const full = path.join(PUBLIC, file);
  if (!full.startsWith(PUBLIC)) return send(res, 403, 'Interdit');

  fs.readFile(full, (err, buf) => {
    if (err) return send(res, 404, 'Page introuvable');
    send(res, 200, buf, MIME[path.extname(full).toLowerCase()] || 'application/octet-stream');
  });
});

function localIPs(){
  const nets = os.networkInterfaces(), ips = [];
  for (const name in nets) for (const n of nets[name]) {
    if (n.family === 'IPv4' && !n.internal) ips.push(n.address);
  }
  return ips;
}

server.listen(PORT, '0.0.0.0', () => {
  const ips = localIPs();
  console.log('\n===================================================');
  console.log('   MON BUSINESS — serveur démarré ✓');
  console.log('===================================================');
  console.log('  Sur CET ordinateur  :  http://localhost:' + PORT);
  ips.forEach(ip => console.log('  Depuis un téléphone  :  http://' + ip + ':' + PORT + '   (même WiFi)'));
  console.log('---------------------------------------------------');
  console.log('  Les données sont enregistrées dans : data.json');
  console.log('  Sauvegardes automatiques dans      : /backups');
  console.log('  Laissez cette fenêtre ouverte pendant l\'utilisation.');
  console.log('===================================================\n');
  // Ouvre le navigateur automatiquement (Windows)
  if (process.platform === 'win32') exec('start "" http://localhost:' + PORT);
  else if (process.platform === 'darwin') exec('open http://localhost:' + PORT);
});
