const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const ALL_PARTNERS = {
  huanqiuti: {
    name: '环球梯',
    item: 'item-1',
    url: 'https://123pps01.huanqiutiaff.com/#/?code=j5VBUvw0',
    code: 'HQ66'
  },
  dalaoyun: {
    name: '大佬云',
    item: 'item-2',
    url: 'https://ppsvip01.dalaoyunaff.com/#/?code=Iz1GlCVa',
    code: 'dly88'
  },
  yunjiexian: {
    name: '云界线',
    item: 'item-3',
    url: 'https://pp01.yunjiexianaff.com/#/?code=6Y9vSMcc',
    code: 'yjx888'
  },
  liulianyun: {
    name: '榴莲云',
    item: 'item-4',
    url: 'https://123pp01.liulianyunaff.com/#/?code=MsZP3u7G',
    code: 'll88'
  },
  shenxing: {
    name: '神行加速',
    item: 'item-5',
    url: 'https://pps123.shenxingaff.com/#/?code=6tQ7zHUc',
    code: 'sx0077'
  },
  shandianshu: {
    name: '闪电鼠',
    item: 'item-6',
    url: 'https://ppsvip01.shandianshuaff.com/#/?code=QbLF8tjB',
    code: 'sds88'
  },
  shunyun: {
    name: '瞬云',
    item: 'item-7',
    url: 'https://ddd.jichang.best/#/register?code=nldUZaYc',
    code: ''
  },
  jilianyun: {
    name: '极连云',
    item: 'item-8',
    url: 'https://haozevpn.jlyvipaff.com/#/?code=jwCMOvQO',
    code: 'JLY888'
  },
  edgenode: {
    name: '边缘节点',
    item: 'item-9',
    url: 'https://wep.edgenovaaff.com/#/?code=mLLL6h6F',
    code: 'xk808'
  },
  kuaili: {
    name: '快狸快狸',
    item: 'item-10',
    url: 'https://fanxiaobin.kuailiaff.com/#/?code=e0cAmK7F',
    code: 'kl888'
  },
  kexinyun: {
    name: '可信云',
    item: 'item-11',
    url: 'https://everett7623.kosingaff.com/#/?code=sFKkfEYs',
    code: 'kxy80'
  },
  sujie: {
    name: '速界',
    item: 'item-12',
    url: 'https://pygllc.speedworldaff.cc/#/?code=kcoensXG',
    code: 'sujie888'
  },
  yuntu: {
    name: '云图机场',
    item: 'item-13',
    url: 'https://super.ytjcok.org/#/register?code=poKwFVtv',
    code: 'yt88'
  },
  kunpeng: {
    name: '鲲鹏加速',
    item: 'item-14',
    url: 'https://kunpengjiasu.com/#/register?code=WPugVZUe',
    code: ''
  },
  guangnianti: {
    name: '光年梯',
    item: 'item-15',
    url: 'https://gnt001.gntvipaff.cc/#/?code=PQhPFDhO',
    code: 'GNT80'
  }
};

// 1. Update rankings.html items 7-15
let rankingsHtml = fs.readFileSync(path.join(rootDir, 'rankings.html'), 'utf8');

const rankingReplacements = [
  { item: 'item-7', name: '瞬云', url: ALL_PARTNERS.shunyun.url },
  { item: 'item-8', name: '极连云', url: ALL_PARTNERS.jilianyun.url },
  { item: 'item-9', name: '边缘节点', url: ALL_PARTNERS.edgenode.url },
  { item: 'item-10', name: '快狸快狸', url: ALL_PARTNERS.kuaili.url },
  { item: 'item-11', name: '可信云', url: ALL_PARTNERS.kexinyun.url },
  { item: 'item-12', name: '速界', url: ALL_PARTNERS.sujie.url },
  { item: 'item-13', name: '云图机场', url: ALL_PARTNERS.yuntu.url },
  { item: 'item-14', name: '鲲鹏加速', url: ALL_PARTNERS.kunpeng.url },
  { item: 'item-15', name: '光年梯', url: ALL_PARTNERS.guangnianti.url },
];

rankingReplacements.forEach(({ item, name, url }) => {
  const reg = new RegExp(`<a href="\\/rankings\\.html#${item}" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\\.5">\\s*直达${name}官网`, 'g');
  rankingsHtml = rankingsHtml.replace(reg, `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达${name}官网`);
});

fs.writeFileSync(path.join(rootDir, 'rankings.html'), rankingsHtml, 'utf8');
console.log('✓ rankings.html items 7-15 updated');

// 2. Update coupons.html
let couponsHtml = fs.readFileSync(path.join(rootDir, 'coupons.html'), 'utf8');

// Section 2: Cards for 极连云 & 云图机场
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-8" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*极连云[\s\S]*?)<a href="\/rankings\.html#item-8" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${ALL_PARTNERS.jilianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-13" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*云图机场[\s\S]*?)<a href="\/rankings\.html#item-13" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${ALL_PARTNERS.yuntu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);

// Section 3: All 15 rows table in coupons.html
const couponsTableList = [
  { item: 'item-1', name: '环球梯', url: ALL_PARTNERS.huanqiuti.url, oldLink: '/post.html' },
  { item: 'item-2', name: '大佬云', url: ALL_PARTNERS.dalaoyun.url, oldLink: '/rankings.html#item-2' },
  { item: 'item-3', name: '云界线', url: ALL_PARTNERS.yunjiexian.url, oldLink: '/rankings.html#item-3' },
  { item: 'item-4', name: '榴莲云', url: ALL_PARTNERS.liulianyun.url, oldLink: '/rankings.html#item-4' },
  { item: 'item-5', name: '神行加速', url: ALL_PARTNERS.shenxing.url, oldLink: '/rankings.html#item-5' },
  { item: 'item-6', name: '闪电鼠', url: ALL_PARTNERS.shandianshu.url, oldLink: '/rankings.html#item-6' },
  { item: 'item-8', name: '极连云', url: ALL_PARTNERS.jilianyun.url, oldLink: '/rankings.html#item-8' },
  { item: 'item-13', name: '云图机场', url: ALL_PARTNERS.yuntu.url, oldLink: '/rankings.html#item-13' },
  { item: 'item-14', name: '鲲鹏加速', url: ALL_PARTNERS.kunpeng.url, oldLink: '/rankings.html#item-14' },
  { item: 'item-11', name: '可信云', url: ALL_PARTNERS.kexinyun.url, oldLink: '/rankings.html#item-11' },
  { item: 'item-7', name: '瞬云', url: ALL_PARTNERS.shunyun.url, oldLink: '/rankings.html#item-7' },
  { item: 'item-12', name: '速界', url: ALL_PARTNERS.sujie.url, oldLink: '/rankings.html#item-12' },
  { item: 'item-15', name: '光年梯', url: ALL_PARTNERS.guangnianti.url, oldLink: '/rankings.html#item-15' },
  { item: 'item-9', name: '边缘节点', url: ALL_PARTNERS.edgenode.url, oldLink: '/rankings.html#item-9' },
  { item: 'item-10', name: '快狸快狸', url: ALL_PARTNERS.kuaili.url, oldLink: '/rankings.html#item-10' }
];

couponsTableList.forEach(({ item, name, url, oldLink }) => {
  const reg = new RegExp(`(<a href="\\.\\/rankings\\.html#${item}"[^>]*>[\\s\\S]*?${name}[\\s\\S]*?)<a href="${oldLink.replace(/[\.#]/g, '\\$&')}" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\\s*直达官网`, 'g');
  couponsHtml = couponsHtml.replace(reg, `$1<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`);
});

// Update coupon codes in table where applicable:
// 可信云 -> kxy80
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-11"[^>]*>[\s\S]*?可信云[\s\S]*?)<span class="inline-flex items-center rounded bg-ink\/5 px-2 py-0.5 text-xs text-ink\/60">年费小包<\/span>/,
  `$1<div class="inline-flex items-center gap-1.5"><span class="font-semibold text-accent">8折</span><button type="button" class="copy-code inline-flex items-center gap-1 rounded border border-dashed border-ink/25 px-1.5 py-0.5 font-mono text-xs text-ink hover:text-accent hover:border-accent" data-code="kxy80" aria-label="复制 kxy80"><span class="copy-code-text">kxy80</span></button></div>`
);
// 速界 -> sujie888
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-12"[^>]*>[\s\S]*?速界[\s\S]*?)<span class="inline-flex items-center rounded bg-ink\/5 px-2 py-0.5 text-xs text-ink\/60">年付特惠<\/span>/,
  `$1<div class="inline-flex items-center gap-1.5"><span class="font-semibold text-accent">特惠</span><button type="button" class="copy-code inline-flex items-center gap-1 rounded border border-dashed border-ink/25 px-1.5 py-0.5 font-mono text-xs text-ink hover:text-accent hover:border-accent" data-code="sujie888" aria-label="复制 sujie888"><span class="copy-code-text">sujie888</span></button></div>`
);
// 快狸快狸 -> kl888
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-10"[^>]*>[\s\S]*?快狸快狸[\s\S]*?)<span class="inline-flex items-center rounded bg-ink\/5 px-2 py-0.5 text-xs text-ink\/60">免费试用<\/span>/,
  `$1<div class="inline-flex items-center gap-1.5"><span class="font-semibold text-accent">特惠</span><button type="button" class="copy-code inline-flex items-center gap-1 rounded border border-dashed border-ink/25 px-1.5 py-0.5 font-mono text-xs text-ink hover:text-accent hover:border-accent" data-code="kl888" aria-label="复制 kl888"><span class="copy-code-text">kl888</span></button></div>`
);
// 边缘节点 -> xk808
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-9"[^>]*>[\s\S]*?边缘节点[\s\S]*?)<span class="inline-flex items-center rounded bg-ink\/5 px-2 py-0.5 text-xs text-ink\/60">两年付9折<\/span>/,
  `$1<div class="inline-flex items-center gap-1.5"><span class="font-semibold text-accent">特惠</span><button type="button" class="copy-code inline-flex items-center gap-1 rounded border border-dashed border-ink/25 px-1.5 py-0.5 font-mono text-xs text-ink hover:text-accent hover:border-accent" data-code="xk808" aria-label="复制 xk808"><span class="copy-code-text">xk808</span></button></div>`
);
// 光年梯 -> GNT80
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-15"[^>]*>[\s\S]*?光年梯[\s\S]*?)<span class="inline-flex items-center rounded bg-ink\/5 px-2 py-0.5 text-xs text-ink\/60">年付特惠<\/span>/,
  `$1<div class="inline-flex items-center gap-1.5"><span class="font-semibold text-accent">8折</span><button type="button" class="copy-code inline-flex items-center gap-1 rounded border border-dashed border-ink/25 px-1.5 py-0.5 font-mono text-xs text-ink hover:text-accent hover:border-accent" data-code="GNT80" aria-label="复制 GNT80"><span class="copy-code-text">GNT80</span></button></div>`
);

fs.writeFileSync(path.join(rootDir, 'coupons.html'), couponsHtml, 'utf8');
console.log('✓ coupons.html updated');

// 3. Update brands.html
let brandsHtml = fs.readFileSync(path.join(rootDir, 'brands.html'), 'utf8');

const brandsList = [
  { item: 'item-8', name: '极连云', url: ALL_PARTNERS.jilianyun.url },
  { item: 'item-14', name: '鲲鹏加速', url: ALL_PARTNERS.kunpeng.url },
  { item: 'item-11', name: '可信云', url: ALL_PARTNERS.kexinyun.url },
  { item: 'item-7', name: '瞬云', url: ALL_PARTNERS.shunyun.url },
  { item: 'item-12', name: '速界', url: ALL_PARTNERS.sujie.url },
  { item: 'item-15', name: '光年梯', url: ALL_PARTNERS.guangnianti.url },
  { item: 'item-13', name: '云图机场', url: ALL_PARTNERS.yuntu.url },
  { item: 'item-9', name: '边缘节点', url: ALL_PARTNERS.edgenode.url },
  { item: 'item-10', name: '快狸快狸', url: ALL_PARTNERS.kuaili.url }
];

brandsList.forEach(({ item, name, url }) => {
  const reg = new RegExp(`(<h3 class="font-display pr-10 text-lg font-semibold text-ink">${name}<\\/h3>[\\s\\S]*?)<a href="\\/rankings\\.html#${item}" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\\/a>`, 'g');
  brandsHtml = brandsHtml.replace(reg, `$1<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`);
});

fs.writeFileSync(path.join(rootDir, 'brands.html'), brandsHtml, 'utf8');
console.log('✓ brands.html updated');

// 4. Update best-value.html
let bestValueHtml = fs.readFileSync(path.join(rootDir, 'best-value.html'), 'utf8');

// Top card 2 (极连云) & 3 (鲲鹏加速)
bestValueHtml = bestValueHtml.replace(
  /(<h3 class="font-display text-xl font-semibold text-ink">极连云<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-8" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达官网/,
  `$1<a href="${ALL_PARTNERS.jilianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<h3 class="font-display text-xl font-semibold text-ink">鲲鹏加速<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-14" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达官网/,
  `$1<a href="${ALL_PARTNERS.kunpeng.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达官网`
);

// Table rows 7-15
const bestValueTableList = [
  { item: 'item-8', name: '极连云', url: ALL_PARTNERS.jilianyun.url },
  { item: 'item-14', name: '鲲鹏加速', url: ALL_PARTNERS.kunpeng.url },
  { item: 'item-11', name: '可信云', url: ALL_PARTNERS.kexinyun.url },
  { item: 'item-7', name: '瞬云', url: ALL_PARTNERS.shunyun.url },
  { item: 'item-12', name: '速界', url: ALL_PARTNERS.sujie.url },
  { item: 'item-15', name: '光年梯', url: ALL_PARTNERS.guangnianti.url },
  { item: 'item-13', name: '云图机场', url: ALL_PARTNERS.yuntu.url },
  { item: 'item-9', name: '边缘节点', url: ALL_PARTNERS.edgenode.url },
  { item: 'item-10', name: '快狸快狸', url: ALL_PARTNERS.kuaili.url }
];

bestValueTableList.forEach(({ item, name, url }) => {
  const reg = new RegExp(`(<a href="\\.\\/rankings\\.html#${item}"[^>]*>[\\s\\S]*?${name}[\\s\\S]*?)<a href="\\/rankings\\.html#${item}" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\\s*直达官网`, 'g');
  bestValueHtml = bestValueHtml.replace(reg, `$1<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`);
});

fs.writeFileSync(path.join(rootDir, 'best-value.html'), bestValueHtml, 'utf8');
console.log('✓ best-value.html updated');

// 5. Update compare.html
let compareHtml = fs.readFileSync(path.join(rootDir, 'compare.html'), 'utf8');

const compareTableList = [
  { item: 'item-7', name: '瞬云', url: ALL_PARTNERS.shunyun.url },
  { item: 'item-8', name: '极连云', url: ALL_PARTNERS.jilianyun.url },
  { item: 'item-9', name: '边缘节点', url: ALL_PARTNERS.edgenode.url },
  { item: 'item-10', name: '快狸快狸', url: ALL_PARTNERS.kuaili.url },
  { item: 'item-11', name: '可信云', url: ALL_PARTNERS.kexinyun.url },
  { item: 'item-12', name: '速界', url: ALL_PARTNERS.sujie.url },
  { item: 'item-13', name: '云图机场', url: ALL_PARTNERS.yuntu.url },
  { item: 'item-14', name: '鲲鹏加速', url: ALL_PARTNERS.kunpeng.url },
  { item: 'item-15', name: '光年梯', url: ALL_PARTNERS.guangnianti.url }
];

compareTableList.forEach(({ item, name, url }) => {
  const reg = new RegExp(`(<a href="\\.\\/rankings\\.html#${item}"[^>]*>[\\s\\S]*?${name}[\\s\\S]*?)<a href="\\/rankings\\.html#${item}" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\\s*直达官网`, 'g');
  compareHtml = compareHtml.replace(reg, `$1<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`);
});

fs.writeFileSync(path.join(rootDir, 'compare.html'), compareHtml, 'utf8');
console.log('✓ compare.html updated');

// 6. Update test-seo-audit.js
let testAuditJs = fs.readFileSync(path.join(rootDir, 'test-seo-audit.js'), 'utf8');
const allPartnerDomains = [
  '123pps01.huanqiutiaff.com',
  'pps123.shenxingaff.com',
  '123pp01.liulianyunaff.com',
  'pp01.yunjiexianaff.com',
  'ppsvip01.shandianshuaff.com',
  'ppsvip01.dalaoyunaff.com',
  'everett7623.kosingaff.com',
  'pygllc.speedworldaff.cc',
  'fanxiaobin.kuailiaff.com',
  'wep.edgenovaaff.com',
  'super.ytjcok.org',
  'kunpengjiasu.com',
  'ddd.jichang.best',
  'haozevpn.jlyvipaff.com',
  'gnt001.gntvipaff.cc'
];

testAuditJs = testAuditJs.replace(
  /const allowedPartnerHosts = \[[^\]]*\];/s,
  `const allowedPartnerHosts = [\n      '${allPartnerDomains.join("',\n      '")}'\n    ];`
);
testAuditJs = testAuditJs.replace(
  /6 大核心服务商专属跳转链路合规加载/g,
  '15 大核心服务商专属跳转链路合规加载'
);

fs.writeFileSync(path.join(rootDir, 'test-seo-audit.js'), testAuditJs, 'utf8');
console.log('✓ test-seo-audit.js updated');
