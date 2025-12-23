export default async function handler(req, res) {
  if (req.method === 'POST' && req.nextUrl.pathname === '/api/start-session') {
    return new Response(JSON.stringify({ 
      sessionId: Date.now().toString(), 
      timeLeft: 1800000 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Serve HTML
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Safe Explorer</title>
  <style>body{font-family:Arial;text-align:center;padding:20px;background:#1a1a2e;color:white;}.level-card{display:inline-block;width:300px;margin:20px;padding:20px;background:#16213e;border-radius:10px;cursor:pointer;transition:transform 0.3s;}.level-card:hover{transform:scale(1.05);}.level-1{border:3px solid #4CAF50;}.level-2{border:3px solid #FF9800;}.level-3{border:3px solid #f44336;}#session-area{display:none;margin-top:30px;}#proxy-frame{width:95%;height:70vh;border:none;border-radius:10px;}.countdown{font-size:3em;margin:20px 0;}.about{background:#0f3460;padding:20px;margin:20px auto;max-width:800px;border-radius:10px;}</style>
</head>
<body>
  <h1>🔍 Safe Internet Explorer</h1>
  <div class="about">
    <h2>📖 About</h2>
    <p><strong>Level 1:</strong> Normal web. 100% safe.</p>
    <p><strong>Level 2:</strong> Deep web = academic papers.</p>
    <p><strong>Level 3:</strong> Dark web preview = safe .onion sites.</p>
  </div>
  <h2>Choose Your Level (30min)</h2>
  <div class="level-card level-1" onclick="startSession(1)">
    <h3>🌐 Level 1</h3><p>Safe web</p><strong>👶 Beginner</strong>
  </div>
  <div class="level-card level-2" onclick="startSession(2)">
    <h3>🔍 Level 2</h3><p>Academic DBs</p><strong>📚 Educational</strong>
  </div>
  <div class="level-card level-3" onclick="startSession(3)">
    <h3>🕵️ Level 3</h3><p>Tor preview</p><strong>⚠️ Advanced</strong>
  </div>
  <div id="session-area">
    <div id="status"></div>
    <div id="countdown" class="countdown"></div>
    <iframe id="proxy-frame"></iframe>
  </div>
  <script>
    let currentLevel;
    async function startSession(level){
      currentLevel=level;
      document.querySelectorAll('.level-card').forEach(c=>c.style.display='none');
      document.getElementById('session-area').style.display='block';
      loadLevel();
      startTimer();
      try{await fetch('/api/start-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({level})})}catch(e){}
    }
    function loadLevel(){
      const status=document.getElementById('status');
      const frame=document.getElementById('proxy-frame');
      if(currentLevel===1){status.innerHTML='🌐 Level 1 Active';frame.src='https://duckduckgo.com/?q=safe+browsing'}
      else if(currentLevel===2){status.innerHTML='🔍 Level 2 Active';frame.src='https://scholar.google.com/scholar?q=deep+web'}
      else{status.innerHTML='🕵️ Level 3 Active';frame.src='https://www.torproject.org/'}
    }
    function startTimer(){
      let timeLeft=1800;
      const timer=document.getElementById('countdown');
      const interval=setInterval(()=>{
        const mins=Math.floor(timeLeft/60);
        const secs=timeLeft%60;
        timer.textContent=\`\${mins}:\${secs.toString().padStart(2,'0')}\`;
        if(timeLeft--<=0){clearInterval(interval);location.reload()}
      },1000)
    }
  </script>
</body>
</html>`;
  
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}
