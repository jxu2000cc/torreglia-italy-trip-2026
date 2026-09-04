(() => {
  const params = new URLSearchParams(location.search);
  const name = params.get('place');
  const guide = name && plannerGuides[name];
  const meta = name && guideCatalog[name];
  const detail = name && window.guideDetails?.[name];
  if (!guide || !meta) {
    document.title = '攻略暂未找到';
    document.getElementById('placeTitle').textContent = '这页暂时找不到';
    document.getElementById('placeCn').textContent = '请回到主攻略重新进入。';
    document.getElementById('heroImage').src = '../assets/place-photos/place-06-colli-euganei.jpg';
    return;
  }

  const returnUrl = '../index.html#' + meta.returnHash;
  document.title = name + ' · 完整旅行攻略';
  document.getElementById('topBack').href = returnUrl;
  document.getElementById('bottomBack').href = returnUrl;
  document.getElementById('eyebrow').textContent = meta.group + ' · 完整 click-in 攻略';
  document.getElementById('placeTitle').textContent = name;
  document.getElementById('placeCn').textContent = meta.cn;
  document.getElementById('heroImage').src = meta.photo;
  document.getElementById('heroImage').alt = name + ' 实景照片';
  if (meta.giusi) {
    const badge = document.createElement('span');
    badge.className = 'giusi-badge';
    badge.textContent = meta.giusi;
    document.querySelector('.hero-copy').prepend(badge);
  }
  document.getElementById('verdict').textContent = guide.verdict;
  document.getElementById('update').textContent = guide.update;

  const makeButton = (label, href, secondary = false) => {
    const link = document.createElement('a');
    link.className = secondary ? 'btn secondary' : 'btn';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = label;
    return link;
  };

  if (detail) {
    const essentialsSection = document.getElementById('essentialsSection');
    essentialsSection.hidden = false;
    if (detail.essentialsIntro) document.getElementById('essentialsIntro').textContent = detail.essentialsIntro;
    const quickFacts = document.getElementById('quickFacts');
    detail.quick.forEach(item => {
      const card = document.createElement('article');
      card.className = 'quick-fact';
      const label = document.createElement('span');
      label.textContent = item.label;
      const value = document.createElement('strong');
      value.textContent = item.value;
      const note = document.createElement('p');
      note.textContent = item.note;
      card.append(label, value, note);
      quickFacts.appendChild(card);
    });
    if (detail.stance) {
      const stance = document.getElementById('plannerStance');
      stance.hidden = false;
      const label = document.createElement('b');
      label.textContent = detail.stanceLabel || '顾问怎么判断';
      const copy = document.createElement('p');
      copy.textContent = detail.stance;
      stance.append(label, copy);
    }

    if (detail.primer?.length) {
      const primerSection = document.getElementById('primerSection');
      primerSection.hidden = false;
      if (detail.primerTitle) document.getElementById('primerTitle').textContent = detail.primerTitle;
      document.getElementById('primerIntro').textContent = detail.primerIntro || '';
      const primerGrid = document.getElementById('primerGrid');
      detail.primer.forEach(item => {
        const card = document.createElement('article');
        card.className = 'primer-card';
        const title = document.createElement('h3');
        title.textContent = item.term;
        const copy = document.createElement('p');
        copy.textContent = item.text;
        card.append(title, copy);
        primerGrid.appendChild(card);
      });
    }

    if (detail.venues?.length) {
      const venuesSection = document.getElementById('venuesSection');
      venuesSection.hidden = false;
      if (detail.venuesTitle) document.getElementById('venuesTitle').textContent = detail.venuesTitle;
      if (detail.venuesIntro) document.getElementById('venuesIntro').textContent = detail.venuesIntro;
      const venueList = document.getElementById('venueList');
      detail.venues.forEach((venue, index) => {
        const article = document.createElement('article');
        article.className = 'venue-card' + (index === 0 ? ' is-best' : '');
        const rank = document.createElement('div');
        rank.className = 'venue-rank';
        rank.textContent = String(index + 1).padStart(2, '0');

        const copy = document.createElement('div');
        copy.className = 'venue-copy';
        const tag = document.createElement('span');
        tag.className = 'venue-tag';
        tag.textContent = venue.tag;
        const title = document.createElement('h3');
        title.textContent = venue.name;
        const subtitle = document.createElement('p');
        subtitle.className = 'venue-subtitle';
        subtitle.textContent = venue.subtitle;
        const why = document.createElement('p');
        why.className = 'venue-why';
        why.textContent = venue.why;
        copy.append(tag, title, subtitle, why);

        const side = document.createElement('div');
        side.className = 'venue-side';
        const facts = document.createElement('ul');
        facts.className = 'facts';
        venue.facts.forEach(([factLabel, factValue]) => {
          const row = document.createElement('li');
          const factTitle = document.createElement('b');
          factTitle.textContent = factLabel;
          const factCopy = document.createElement('span');
          factCopy.textContent = factValue;
          row.append(factTitle, factCopy);
          facts.appendChild(row);
        });
        const actions = document.createElement('div');
        actions.className = 'actions';
        if (venue.link) actions.appendChild(makeButton(venue.link[0], venue.link[1]));
        if (venue.map) {
          const mapHref = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.map);
          actions.appendChild(makeButton('地图', mapHref, true));
        }
        side.append(facts, actions);
        article.append(rank, copy, side);
        venueList.appendChild(article);
      });
      const jump = document.querySelector('.topbar .jump');
      jump.href = '#venuesSection';
      jump.textContent = '直接看具体选择 ↓';
    }
    if (detail.scheduleIntro) document.getElementById('scheduleIntro').textContent = detail.scheduleIntro;
  }

  const gallery = document.getElementById('placeGallery');
  const galleryPhotos = [
    {label:name + ' · 第一眼', src:meta.photo, credit:'代表性城市风貌'},
    ...(window.placeGalleryExtras?.[name] || []).map(photo => ({
      ...photo,
      src:'../' + photo.src
    }))
  ].slice(0, 3);
  if (galleryPhotos.length === 2) gallery.classList.add('two');
  galleryPhotos.forEach(photo => {
    const figure = document.createElement('figure');
    const media = photo.source ? document.createElement('a') : document.createElement('span');
    if (photo.source) {
      media.href = photo.source;
      media.target = '_blank';
      media.rel = 'noopener';
      media.setAttribute('aria-label', photo.label + ' 照片来源');
    }
    const image = document.createElement('img');
    image.loading = 'lazy';
    image.decoding = 'async';
    image.src = photo.src;
    image.alt = photo.label + ' 实景照片';
    media.appendChild(image);
    const caption = document.createElement('figcaption');
    const title = document.createElement('b');
    title.textContent = photo.label;
    const credit = document.createElement('span');
    credit.textContent = photo.credit || '实景照片';
    caption.append(title, credit);
    figure.append(media, caption);
    gallery.appendChild(figure);
  });

  const fallbackChoices = [
    {tag:'完整版本', title:'按时间表走', text:'保留一个主体验、一顿正式午餐和下午自由时间；不再添加附近第二座城市。'},
    {tag:'轻松版本', title:'只保留最想做的半天', text:'睡到自然醒，把上午或下午的一个重点留下；吃完饭后看状态直接回家。'},
    {tag:'日历比较', title:'天气或体力不对就换日', text:'这不是必须完成的景点。若没有至少两个人明显期待，就回到首页日历，把这一天换成另一张候选卡或Torreglia留白。'}
  ];
  const choices = detail?.choices || guideChoices[name] || fallbackChoices;
  const choiceGrid = document.getElementById('choiceGrid');
  choices.forEach((choice, index) => {
    const article = document.createElement('article');
    article.className = 'pick' + (index === 0 ? ' best' : '');
    const body = document.createElement('div');
    body.className = 'pick-body';
    const tag = document.createElement('span');
    tag.className = 'choice-tag';
    tag.textContent = choice.tag;
    const title = document.createElement('h3');
    title.textContent = choice.title;
    const text = document.createElement('p');
    text.textContent = choice.text;
    body.append(tag, title, text);
    article.appendChild(body);
    choiceGrid.appendChild(article);
  });

  const schedule = document.getElementById('schedule');
  (detail?.day || guide.day).forEach(([time, activity]) => {
    const step = document.createElement('div');
    step.className = 'step';
    const when = document.createElement('time');
    when.textContent = time;
    const text = document.createElement('p');
    text.textContent = activity;
    step.append(when, text);
    schedule.appendChild(step);
  });

  if (detail?.budget) {
    const budgetSection = document.getElementById('budgetSection');
    budgetSection.hidden = false;
    document.getElementById('budgetTitle').textContent = detail.budget.title || '这一天大概花多少';
    document.getElementById('budgetText').textContent = detail.budget.text;
    const budgetLines = document.getElementById('budgetLines');
    detail.budget.lines.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'budget-line';
      const rowLabel = document.createElement('b');
      rowLabel.textContent = label;
      const rowValue = document.createElement('span');
      rowValue.textContent = value;
      row.append(rowLabel, rowValue);
      budgetLines.appendChild(row);
    });
    const total = document.getElementById('budgetTotal');
    const totalLabel = document.createElement('small');
    totalLabel.textContent = detail.budget.totalLabel || '四人合计';
    const totalValue = document.createElement('strong');
    totalValue.textContent = detail.budget.total;
    total.append(totalLabel, totalValue);
  }
  if (detail?.fallbacks?.length) {
    const fallback = document.getElementById('fallbackBox');
    fallback.hidden = false;
    const list = document.getElementById('fallbackList');
    detail.fallbacks.forEach(item => {
      const row = document.createElement('li');
      row.textContent = item;
      list.appendChild(row);
    });
  }

  const officialLinks = document.getElementById('officialLinks');
  [...guide.links, ...(detail?.links || [])].forEach(([label, href], index) => {
    const link = document.createElement('a');
    link.className = index === 0 ? 'btn' : 'btn secondary light';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = label;
    officialLinks.appendChild(link);
  });

  const xhs = document.getElementById('xhsLink');
  xhs.href = 'https://www.xiaohongshu.com/search_result?keyword=' + encodeURIComponent(name) + '&source=web_search_result_notes&type=51';
})();
