(() => {
  const params = new URLSearchParams(location.search);
  const file = location.pathname.split('/').pop() || 'index.html';
  const staticKeys = {
    'abano-montegrotto-terme.html':'Abano / Montegrotto · page',
    'arqua-petrarca.html':'Arquà Petrarca · page',
    'colli-euganei-wineries.html':'Colli Euganei wineries · page',
    'dolomites.html':'Dolomites · page',
    'lake-como.html':'Lake Como · page',
    'monselice-este.html':'Monselice / Este · page',
    'sicily.html':'Sicily · page',
    'torreglia-colli-euganei.html':'Torreglia deep · page',
    'torreglia-local.html':'Torreglia local · page',
    'tuscany.html':'Tuscany · page',
    'vo-festa-uva.html':'Vo festival · page'
  };
  const key = params.get('place') || staticKeys[file];
  const data = key && window.architectureLensData?.[key];

  const alignHashTarget = target => {
    if (!target || location.hash !== `#${target.id}`) return;
    let userMoved = false;
    const stopAutoAlign = () => { userMoved = true; };
    ['pointerdown','touchstart','wheel'].forEach(type => window.addEventListener(type,stopAutoAlign,{once:true,passive:true}));
    const align = () => {
      if (userMoved || location.hash !== `#${target.id}`) return;
      requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
    };
    align();
    if (document.readyState === 'complete') align();
    else window.addEventListener('load', align, {once:true});
    if (document.fonts?.ready) document.fonts.ready.then(align).catch(() => {});
    [300,800,1600,2600].forEach(delay => window.setTimeout(align,delay));
    [...document.images].forEach(image => {
      if (image.complete) return;
      image.addEventListener('load',align,{once:true});
      image.addEventListener('error',align,{once:true});
    });
  };

  if (!data) {
    alignHashTarget(document.getElementById('architecture-index'));
    return;
  }

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  const section = el('section','architecture-lens');
  section.id = 'architecture-design';
  section.setAttribute('aria-labelledby','architecture-title');

  const head = el('div','architecture-head');
  const intro = el('div','architecture-title-block');
  intro.append(
    el('p','architecture-kicker',data.kicker || 'Architecture & spatial design'),
    el('h2','',data.title || '建筑与空间，值不值得为它改变路线？'),
    el('p','architecture-intro',data.intro)
  );
  intro.querySelector('h2').id = 'architecture-title';
  const score = el('div','architecture-score');
  score.append(
    el('span','',data.scoreLabel || '建筑权重'),
    el('strong','',data.score),
    el('p','',data.scoreNote)
  );
  head.append(intro,score);

  const grid = el('div','architecture-grid' + (data.items.length === 1 ? ' single' : ''));
  data.items.forEach(item => {
    const card = el('article','architecture-card');
    if (item.image) {
      const media = item.source ? el('a','architecture-media') : el('div','architecture-media');
      if (item.source) {
        media.href = item.source;
        media.target = '_blank';
        media.rel = 'noopener';
      }
      const image = el('img');
      image.src = item.image;
      image.alt = item.imageAlt || `${item.name} 建筑与空间`;
      image.loading = 'lazy';
      image.decoding = 'async';
      media.appendChild(image);
      if (item.credit) {
        const credit = el(item.source ? 'span' : 'span','architecture-photo-credit',item.credit);
        media.appendChild(credit);
      }
      card.appendChild(media);
    }
    const body = el('div','architecture-body');
    const status = el('span','architecture-status' + (item.statusTone ? ` ${item.statusTone}` : ''),item.status);
    body.append(status,el('h3','',item.name),el('p','architecture-subtitle',item.subtitle),el('p','architecture-why',item.why));
    if (item.look) {
      const look = el('div','architecture-look');
      look.append(el('b','','现场看这三个细节'),el('p','',item.look.join(' · ')));
      body.appendChild(look);
    }
    if (item.facts?.length) {
      const facts = el('div','architecture-facts');
      item.facts.forEach(([label,value]) => {
        const fact = el('div','architecture-fact');
        fact.append(el('b','',label),el('span','',value));
        facts.appendChild(fact);
      });
      body.appendChild(facts);
    }
    if (item.fit) {
      const fit = el('p','architecture-fit');
      fit.append(el('b','','怎么放进行程：'),document.createTextNode(item.fit));
      body.appendChild(fit);
    }
    const actions = el('div','architecture-actions');
    (item.links || []).forEach(([label,href],index) => {
      const link = el('a',index ? 'secondary' : '',label);
      link.href = href;
      if (/^https?:/i.test(href)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      actions.appendChild(link);
    });
    if (item.map) {
      const map = el('a','secondary','地图');
      map.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.map);
      map.target = '_blank';
      map.rel = 'noopener';
      actions.appendChild(map);
    }
    if (actions.children.length) body.appendChild(actions);
    card.appendChild(body);
    grid.appendChild(card);
  });
  section.append(head,grid);
  if (data.note) section.appendChild(el('p','architecture-footnote',data.note));

  let anchor = data.anchor ? document.querySelector(data.anchor) : null;
  if (!anchor && params.get('place')) anchor = document.querySelector('.guide-gallery-section');
  if (!anchor) {
    const dates = [...document.querySelectorAll('main > .date-strip')];
    anchor = dates.at(-1) || document.querySelector('main > .verdict, main > .advisor, main > .section');
  }
  if (!anchor) return;
  if (data.wide) section.classList.add('architecture-wide');
  anchor.insertAdjacentElement(data.position === 'before' ? 'beforebegin' : 'afterend',section);
  alignHashTarget(section);
})();
