(() => {
  'use strict';
  const stops = Array.from(document.querySelectorAll('.stop'));
  const synth = window.speechSynthesis;
  const dock = document.querySelector('.audio-dock');
  const status = document.getElementById('audio-status');
  const title = document.getElementById('audio-title');
  const pauseButton = document.getElementById('audio-pause');
  const voicesSelect = document.getElementById('voice-select');
  const rateSelect = document.getElementById('voice-rate');
  let voices = [], current = -1, chunks = [], position = 0, generation = 0, mode = 'idle', utterance = null;
  const savedDetails = new Map();
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details').forEach(d => { savedDetails.set(d, d.open); d.open = true; });
  });
  window.addEventListener('afterprint', () => { savedDetails.forEach((open, d) => { d.open = open; }); savedDetails.clear(); });
  document.getElementById('print-guide').addEventListener('click', () => window.print());
  if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') {
    document.querySelectorAll('.listen').forEach(b => { b.disabled = true; b.textContent = '此浏览器不支持语音'; });
    voicesSelect.disabled = true; rateSelect.disabled = true;
    document.getElementById('voice-help').textContent = '此浏览器不支持系统朗读。请使用Safari或Chrome，或展开阅读完整讲解。';
    return;
  }
  function updateVoices() {
    const previous = voicesSelect.value;
    voices = synth.getVoices().filter(v => /^zh|^cmn/i.test(v.lang));
    voices.sort((a,b) => Number(/zh-CN|zh-Hans|cmn-CN/i.test(b.lang)) - Number(/zh-CN|zh-Hans|cmn-CN/i.test(a.lang)));
    voicesSelect.replaceChildren();
    if (!voices.length) {
      const o = new Option('系统默认中文（若设备支持）', ''); voicesSelect.add(o);
    } else {
      voices.forEach(v => voicesSelect.add(new Option(v.name + ' · ' + v.lang, v.voiceURI)));
      if (voices.some(v => v.voiceURI === previous)) voicesSelect.value = previous;
    }
  }
  updateVoices(); synth.addEventListener('voiceschanged', updateVoices);
  function cancel() { generation++; synth.cancel(); utterance = null; }
  function syncButtons() {
    document.querySelectorAll('.listen').forEach(b => {
      const selected = current >= 0 && b.dataset.stop === stops[current].id;
      b.setAttribute('aria-pressed', String(selected && mode === 'playing'));
      b.textContent = selected && mode === 'playing' ? '正在播放 · 重新开始' : '听这一站';
    });
    stops.forEach((s,i) => s.classList.toggle('active', i === current));
    document.getElementById('audio-prev').disabled = current <= 0;
    document.getElementById('audio-next').disabled = current >= stops.length - 1;
    pauseButton.textContent = mode === 'playing' ? '暂停' : mode === 'done' ? '重播' : '继续';
  }
  function speakChunk() {
    if (position >= chunks.length) {
      mode = 'done'; status.textContent = '本段已结束 · 到下一站后再播放'; syncButtons(); return;
    }
    const token = generation;
    utterance = new SpeechSynthesisUtterance(chunks[position]);
    utterance.lang = 'zh-CN';
    const voice = voices.find(v => v.voiceURI === voicesSelect.value);
    if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
    utterance.rate = Number(rateSelect.value);
    utterance.onstart = () => { if(token === generation) status.textContent = `正在朗读 ${position + 1}/${chunks.length} · 请保持页面在前台`; };
    utterance.onend = () => { if(token !== generation || mode !== 'playing') return; position++; speakChunk(); };
    utterance.onerror = event => {
      if(token !== generation || ['canceled','interrupted'].includes(event.error)) return;
      mode = 'paused'; status.textContent = '播放中断，请点继续；无中文声音时可切换声音或阅读文字。'; syncButtons();
    };
    synth.speak(utterance);
  }
  function start(index, scroll = false) {
    if(index < 0 || index >= stops.length) return;
    cancel(); current = index; position = 0;
    const stop = stops[index];
    const text = Array.from(stop.querySelectorAll('.narration p')).map(p => p.textContent.trim()).join('\n');
    // Short sentences keep long Chinese narration reliable on mobile browsers.
    chunks = (text.match(/[^。！？；\n]+[。！？；]?/g) || [text]).flatMap(s => s.match(/.{1,95}/gu) || []).filter(Boolean);
    stop.querySelector('details').open = true;
    title.textContent = stop.dataset.title;
    dock.hidden = false; mode = 'playing';
    status.textContent = '准备中文朗读…'; syncButtons();
    if(scroll) stop.scrollIntoView({behavior: 'smooth', block: 'start'});
    speakChunk();
  }
  document.querySelectorAll('.listen').forEach(button => button.addEventListener('click', () => start(stops.findIndex(s => s.id === button.dataset.stop))));
  pauseButton.addEventListener('click', () => {
    if(mode === 'playing') { cancel(); mode = 'paused'; status.textContent = '已暂停 · 继续时从当前句开始'; syncButtons(); }
    else if(mode === 'done') start(current);
    else if(current >= 0) { cancel(); mode = 'playing'; syncButtons(); speakChunk(); }
  });
  document.getElementById('audio-stop').addEventListener('click', () => {
    cancel(); mode = 'idle'; current = -1; dock.hidden = true; syncButtons();
  });
  document.getElementById('audio-prev').addEventListener('click', () => start(current - 1, true));
  document.getElementById('audio-next').addEventListener('click', () => start(current + 1, true));
  [voicesSelect,rateSelect].forEach(el => el.addEventListener('change', () => {
    if(mode === 'playing') { cancel(); speakChunk(); }
  }));
  document.addEventListener('visibilitychange', () => {
    if(document.hidden && mode === 'playing') { cancel(); mode = 'paused'; status.textContent = '离开页面后已暂停 · 点继续接着听'; syncButtons(); }
  });
  window.addEventListener('pagehide', () => { cancel(); mode = 'paused'; });
  syncButtons();
})();
