(() => {
  const params = new URLSearchParams(location.search);
  const name = params.get('place');
  const guide = name && plannerGuides[name];
  const meta = name && guideCatalog[name];
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
  document.getElementById('verdict').textContent = guide.verdict;
  document.getElementById('update').textContent = guide.update;

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
  const choices = guideChoices[name] || fallbackChoices;
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
  guide.day.forEach(([time, activity]) => {
    const step = document.createElement('div');
    step.className = 'step';
    const when = document.createElement('time');
    when.textContent = time;
    const text = document.createElement('p');
    text.textContent = activity;
    step.append(when, text);
    schedule.appendChild(step);
  });

  const officialLinks = document.getElementById('officialLinks');
  guide.links.forEach(([label, href], index) => {
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
