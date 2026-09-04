const guideCatalog = {
  "Padua": {cn:"帕多瓦", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-07-padua-prato-della-valle.jpg"},
  "Vicenza": {cn:"维琴察", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-08-vicenza-basilica-palladiana.jpg"},
  "Treviso": {cn:"特雷维索", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-09-treviso-buranelli.webp"},
  "Bassano del Grappa": {cn:"巴萨诺·德尔·格拉帕", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-10-bassano-ponte-degli-alpini.jpg"},
  "Asolo": {cn:"阿索洛", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-11-asolo.jpg"},
  "Prosecco Hills": {cn:"普罗塞克丘陵", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-12-prosecco-hills.jpg"},
  "Venice": {cn:"威尼斯", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-13-venice-grand-canal.jpg", giusi:"GIUSI 推荐 · 另一种威尼斯"},
  "Verona": {cn:"维罗纳", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-14-verona.jpg"},
  "Chioggia": {cn:"基奥贾", group:"Veneto 日游", returnHash:"veneto", photo:"../assets/place-photos/place-15-chioggia.jpg"},
  "Lake Garda": {cn:"加尔达湖", group:"山与延伸", returnHash:"beyond", photo:"../assets/place-photos/place-16-lake-garda.jpg", giusi:"GIUSI 推荐 · 南湖＋Mincio"},
  "Collio": {cn:"科利奥葡萄酒乡", group:"两天延伸 · Friuli 边境酒乡", returnHash:"beyond", photo:"../assets/detail-photos/collio-cormons.jpg", giusi:"GIUSI 推荐 · 两天一晚"},
  "Mantua": {cn:"曼图亚", group:"山与延伸", returnHash:"beyond", photo:"../assets/place-photos/place-17-mantua.jpg"},
  "Ferrara": {cn:"费拉拉", group:"山与延伸", returnHash:"beyond", photo:"../assets/place-photos/place-18-ferrara-castello-estense.jpg"},
  "Bologna": {cn:"博洛尼亚", group:"山与延伸", returnHash:"beyond", photo:"../assets/place-photos/place-19-bologna.jpg"},
  "Trieste": {cn:"的里雅斯特", group:"山与延伸", returnHash:"beyond", photo:"../assets/place-photos/place-20-trieste-piazza-unita.webp"},
  "Milan": {cn:"米兰", group:"平行候选 · 城市与时装", returnHash:"northwest", photo:"../assets/place-photos/place-31-milan.jpg"},
  "Lake Como": {cn:"科莫湖", group:"平行候选 · 中央湖区", returnHash:"northwest", photo:"../assets/place-photos/place-32-lake-como.jpg"},
  "Lugano": {cn:"卢加诺", group:"平行候选 · 瑞士近线", returnHash:"northwest", photo:"../assets/place-photos/place-33-lugano.jpg"},
  "Lucerne": {cn:"卢塞恩", group:"平行候选 · 瑞士山湖", returnHash:"northwest", photo:"../assets/place-photos/place-34-lucerne.jpg"}
};

const guideChoices = {
  "Venice": [
    {tag:"最推荐", title:"下午进城＋夜晚威尼斯", text:"11点后抵达，先 Cannaregio 和 bacaro，下午 Dorsoduro，17:30后再去 Rialto 与 San Marco。避开最挤的早晨打卡节奏。"},
    {tag:"更轻松", title:"只做 Cannaregio＋Dorsoduro", text:"完全放弃排队大景点，以 cicchetti、咖啡、小巷和 Zattere 日落为主；最符合这次家庭旅行方式。"},
    {tag:"下雨版", title:"Scuola Grande＋长午餐", text:"选一个室内重点，之后做长午餐与咖啡馆。不要雨里坚持走完整条经典路线。"}
  ],
  "Verona": [
    {tag:"最推荐", title:"Verona＋一家 Amarone 酒庄", text:"上午老城、午餐后去 Valpolicella，只约一家酒庄。城市和酒的比例最好。"},
    {tag:"不喝酒", title:"河边老城慢一天", text:"Arena 外观、Ponte Pietra、Castel San Pietro 观景和正式午餐，不排 Juliet House 长队。"},
    {tag:"想轻松", title:"只去 Valpolicella", text:"睡到自然醒，预约下午品鉴和晚餐；如果前面城市已经很多，这是更适合全家的版本。"}
  ],
  "Prosecco Hills": [
    {tag:"最推荐", title:"Col Vetoraz＋景观路", text:"把最好看的 Cartizze 丘陵和一次品鉴连起来，午餐后不再加第二家酒庄。"},
    {tag:"更懂酒", title:"Bisol 老酒窖", text:"如果想听产区和酿造故事，选 Bisol；风景稍让位给酒庄内容。"},
    {tag:"驾驶友好", title:"只看丘陵＋长午餐", text:"驾驶者完全不做正式 tasting，景观路、Osteria senz’Oste 和小村已经足够。"}
  ],
  "Bassano del Grappa": [
    {tag:"最推荐", title:"Bassano 上午＋Asolo 下午", text:"桥、河岸和一小杯 grappa 后去 Asolo 喝咖啡看日落，一天有画面也不单调。"},
    {tag:"更轻松", title:"只做 Bassano 半天", text:"Ponte Vecchio、Poli 或 Nardini 二选一，午餐后回 villa。"},
    {tag:"不喝烈酒", title:"河景＋市场＋Asolo", text:"跳过 grappa 博物馆，把时间留给 Brenta 河边和 Asolo 山城。"}
  ],
  "Bologna": [
    {tag:"最推荐", title:"从早餐一路吃到 aperitivo", text:"坐火车进入，市场、正式 pasta 午餐、咖啡和一轮 aperitivo；不再添加博物馆 KPI。"},
    {tag:"半天版", title:"Quadrilatero＋一顿午餐", text:"中午前抵达，认真吃一顿，下午三四点返程。适合前后都是大转场时。"},
    {tag:"雨天版", title:"拱廊城市日", text:"利用 portici 避雨，加入市场和室内美食体验，是天气不好时最稳的城市选择。"}
  ],
  "Lake Garda": [
    {tag:"一日版本", title:"Sirmione 半日＋午餐", text:"只做老城、短船和午餐；不环湖，不同时追 Bardolino 与 Malcesine。"},
    {tag:"一晚版本", title:"Malcesine 住一晚", text:"北湖山景明显更好，用2个日历日换清晨、晚饭与缆车选择。"},
    {tag:"比较方式", title:"和Dolomites / Como看差异", text:"Garda最容易插入；Dolomites山感更强，Como的完整湖区度假感更强。"}
  ],
  "Collio": [
    {tag:"GIUSI 原建议", title:"La Subida 一晚＋Venica 品鉴", text:"把住宿、正式晚餐和第二天的酒庄体验拆开；这不是Torreglia附近的Colli Euganei，而是意大利东北角靠斯洛文尼亚的白葡萄酒乡。"},
    {tag:"更专注酒", title:"住 Venica Wine Resort", text:"只有6间房与2套公寓，醒来就在酒庄；最适合想把Ronco delle Mele和Collio白葡萄酒喝明白的人。"},
    {tag:"最短版本", title:"Cormons 一晚＋一家酒庄", text:"第一天下午Enoteca与小镇，第二天只约Venica一家，午餐后返程；不在采收季临时敲第二家酒庄的门。"}
  ],
  "Milan": [
    {tag:"时装周版本", title:"9/22–24住两晚", text:"以Brera、Quadrilatero、公开品牌活动、设计店与aperitivo为主；正式秀场是否能进不是行程成立的前提。"},
    {tag:"经典城市版本", title:"Duomo＋Brera＋一晚夜生活", text:"住两晚，不赶博物馆清单；给购物、咖啡和对象自己的时间。"},
    {tag:"组合版本", title:"Milan 2晚＋Como 3晚", text:"先用城市能量和时装周，再去中央湖区慢下来；完整组合占大约7个日历日。"}
  ],
  "Lake Como": [
    {tag:"完整版本", title:"中央湖区住3晚", text:"Varenna或Menaggio一处住下，两个完整日坐船，才能有清晨、轮渡和湖边晚餐。"},
    {tag:"城市＋湖区", title:"Milan 2晚＋Como 3晚", text:"路线顺、反差清楚；正好可以把时装周城市能量和湖区慢节奏连起来。"},
    {tag:"最短门槛", title:"住2晚，不做当天往返", text:"两晚只能保留一个完整湖区日；仍然比从Torreglia往返更符合这次想慢下来的节奏。"}
  ]
};
