const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const PARTNERS = {
  huanqiuti: {
    name: '环球梯',
    url: 'https://123pps01.huanqiutiaff.com/#/?code=j5VBUvw0',
    code: 'HQ66'
  },
  dalaoyun: {
    name: '大佬云',
    url: 'https://ppsvip01.dalaoyunaff.com/#/?code=Iz1GlCVa',
    code: 'dly88'
  },
  yunjiexian: {
    name: '云界线',
    url: 'https://pp01.yunjiexianaff.com/#/?code=6Y9vSMcc',
    code: 'yjx888'
  },
  liulianyun: {
    name: '榴莲云',
    url: 'https://123pp01.liulianyunaff.com/#/?code=MsZP3u7G',
    code: 'll88'
  },
  shenxing: {
    name: '神行加速',
    url: 'https://pps123.shenxingaff.com/#/?code=6tQ7zHUc',
    code: 'sx0077'
  },
  shandianshu: {
    name: '闪电鼠',
    url: 'https://ppsvip01.shandianshuaff.com/#/?code=QbLF8tjB',
    code: 'sds88'
  }
};

// 1. Update index.html
let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
indexHtml = indexHtml.replace(
  /<a href="\/post\.html" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达环球梯官网/g,
  `<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达环球梯官网`
);
indexHtml = indexHtml.replace(
  /<a href="\/rankings\.html#item-2" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达大佬云官网/g,
  `<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达大佬云官网`
);
indexHtml = indexHtml.replace(
  /<a href="\/rankings\.html#item-3" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达云界线官网/g,
  `<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达云界线官网`
);
indexHtml = indexHtml.replace(
  /<a href="\/rankings\.html#item-4" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达榴莲云官网/g,
  `<a href="${PARTNERS.liulianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达榴莲云官网`
);
indexHtml = indexHtml.replace(
  /<a href="\/rankings\.html#item-5" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达神行加速官网/g,
  `<a href="${PARTNERS.shenxing.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达神行加速官网`
);
indexHtml = indexHtml.replace(
  /<a href="\/rankings\.html#item-6" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达闪电鼠官网/g,
  `<a href="${PARTNERS.shandianshu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达闪电鼠官网`
);
fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
console.log('✓ index.html updated');

// 2. Update rankings.html
let rankingsHtml = fs.readFileSync(path.join(rootDir, 'rankings.html'), 'utf8');
rankingsHtml = rankingsHtml.replace(
  /<a href="\/post\.html" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达环球梯官网/g,
  `<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达环球梯官网`
);
rankingsHtml = rankingsHtml.replace(
  /<a href="\/rankings\.html#item-2" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达大佬云官网/g,
  `<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达大佬云官网`
);
rankingsHtml = rankingsHtml.replace(
  /<a href="\/rankings\.html#item-3" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达云界线官网/g,
  `<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达云界线官网`
);
rankingsHtml = rankingsHtml.replace(
  /<a href="\/rankings\.html#item-4" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达榴莲云官网/g,
  `<a href="${PARTNERS.liulianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达榴莲云官网`
);
rankingsHtml = rankingsHtml.replace(
  /<a href="\/rankings\.html#item-5" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达神行加速官网/g,
  `<a href="${PARTNERS.shenxing.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达神行加速官网`
);
rankingsHtml = rankingsHtml.replace(
  /<a href="\/rankings\.html#item-6" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达闪电鼠官网/g,
  `<a href="${PARTNERS.shandianshu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达闪电鼠官网`
);
fs.writeFileSync(path.join(rootDir, 'rankings.html'), rankingsHtml, 'utf8');
console.log('✓ rankings.html updated');

// 3. Update coupons.html
let couponsHtml = fs.readFileSync(path.join(rootDir, 'coupons.html'), 'utf8');
// In coupons.html, the cards for 环球梯, 大佬云, 云界线, 榴莲云, 神行加速, 闪电鼠
// Let's replace each 立即前往 button within their respective card section
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-1" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*环球梯[\s\S]*?)<a href="\/post\.html" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-2" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*大佬云[\s\S]*?)<a href="\/rankings\.html#item-2" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-3" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*云界线[\s\S]*?)<a href="\/rankings\.html#item-3" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-4" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*榴莲云[\s\S]*?)<a href="\/rankings\.html#item-4" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${PARTNERS.liulianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-5" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*神行加速[\s\S]*?)<a href="\/rankings\.html#item-5" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${PARTNERS.shenxing.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
couponsHtml = couponsHtml.replace(
  /(<a href="\.\/rankings\.html#item-6" class="font-display text-lg font-semibold text-ink hover:text-accent">\s*闪电鼠[\s\S]*?)<a href="\/rankings\.html#item-6" class="transition-colors" target="_blank" class="btn-primary shrink-0 text-sm">\s*立即前往\s*<\/a>/,
  `$1<a href="${PARTNERS.shandianshu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary shrink-0 text-sm transition-colors">\n            立即前往\n          </a>`
);
fs.writeFileSync(path.join(rootDir, 'coupons.html'), couponsHtml, 'utf8');
console.log('✓ coupons.html updated');

// 4. Update brands.html
let brandsHtml = fs.readFileSync(path.join(rootDir, 'brands.html'), 'utf8');
brandsHtml = brandsHtml.replace(
  /(<h3 class="font-display pr-10 text-lg font-semibold text-ink">环球梯<\/h3>[\s\S]*?)<a href="\/post\.html" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\/a>/,
  `$1<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`
);
brandsHtml = brandsHtml.replace(
  /(<h3 class="font-display pr-10 text-lg font-semibold text-ink">大佬云<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-2" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\/a>/,
  `$1<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`
);
brandsHtml = brandsHtml.replace(
  /(<h3 class="font-display pr-10 text-lg font-semibold text-ink">云界线<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-3" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\/a>/,
  `$1<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`
);
brandsHtml = brandsHtml.replace(
  /(<h3 class="font-display pr-10 text-lg font-semibold text-ink">榴莲云<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-4" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\/a>/,
  `$1<a href="${PARTNERS.liulianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`
);
brandsHtml = brandsHtml.replace(
  /(<h3 class="font-display pr-10 text-lg font-semibold text-ink">神行加速<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-5" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\/a>/,
  `$1<a href="${PARTNERS.shenxing.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`
);
brandsHtml = brandsHtml.replace(
  /(<h3 class="font-display pr-10 text-lg font-semibold text-ink">闪电鼠<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-6" class="transition-colors" target="_blank" class="btn-primary flex-1 !px-3 text-sm text-center">立即前往<\/a>/,
  `$1<a href="${PARTNERS.shandianshu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary flex-1 !px-3 text-sm text-center transition-colors">立即前往</a>`
);
fs.writeFileSync(path.join(rootDir, 'brands.html'), brandsHtml, 'utf8');
console.log('✓ brands.html updated');

// 5. Update best-value.html
let bestValueHtml = fs.readFileSync(path.join(rootDir, 'best-value.html'), 'utf8');
// Top 3 cards
bestValueHtml = bestValueHtml.replace(
  /(<h3 class="font-display text-xl font-semibold text-ink">环球梯<\/h3>[\s\S]*?)<a href="\/post\.html" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达官网/,
  `$1<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<h3 class="font-display text-xl font-semibold text-ink">大佬云<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-2" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达官网/,
  `$1<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<h3 class="font-display text-xl font-semibold text-ink">云界线<\/h3>[\s\S]*?)<a href="\/rankings\.html#item-3" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm inline-flex items-center gap-1\.5">\s*直达官网/,
  `$1<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm inline-flex items-center gap-1.5">\n                  直达官网`
);

// Table rows
bestValueHtml = bestValueHtml.replace(
  /(<a href="\.\/rankings\.html#item-1"[^>]*>[\s\S]*?环球梯[\s\S]*?)<a href="\/post\.html" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<a href="\.\/rankings\.html#item-2"[^>]*>[\s\S]*?大佬云[\s\S]*?)<a href="\/rankings\.html#item-2" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<a href="\.\/rankings\.html#item-3"[^>]*>[\s\S]*?云界线[\s\S]*?)<a href="\/rankings\.html#item-3" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<a href="\.\/rankings\.html#item-4"[^>]*>[\s\S]*?榴莲云[\s\S]*?)<a href="\/rankings\.html#item-4" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.liulianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<a href="\.\/rankings\.html#item-5"[^>]*>[\s\S]*?神行加速[\s\S]*?)<a href="\/rankings\.html#item-5" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.shenxing.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`
);
bestValueHtml = bestValueHtml.replace(
  /(<a href="\.\/rankings\.html#item-6"[^>]*>[\s\S]*?闪电鼠[\s\S]*?)<a href="\/rankings\.html#item-6" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.shandianshu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                            直达官网`
);
fs.writeFileSync(path.join(rootDir, 'best-value.html'), bestValueHtml, 'utf8');
console.log('✓ best-value.html updated');

// 6. Update compare.html
let compareHtml = fs.readFileSync(path.join(rootDir, 'compare.html'), 'utf8');
compareHtml = compareHtml.replace(
  /(<a href="\.\/rankings\.html#item-1"[^>]*>[\s\S]*?环球梯[\s\S]*?)<a href="\/post\.html" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`
);
compareHtml = compareHtml.replace(
  /(<a href="\.\/rankings\.html#item-2"[^>]*>[\s\S]*?大佬云[\s\S]*?)<a href="\/rankings\.html#item-2" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.dalaoyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`
);
compareHtml = compareHtml.replace(
  /(<a href="\.\/rankings\.html#item-3"[^>]*>[\s\S]*?云界线[\s\S]*?)<a href="\/rankings\.html#item-3" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.yunjiexian.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`
);
compareHtml = compareHtml.replace(
  /(<a href="\.\/rankings\.html#item-4"[^>]*>[\s\S]*?榴莲云[\s\S]*?)<a href="\/rankings\.html#item-4" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.liulianyun.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`
);
compareHtml = compareHtml.replace(
  /(<a href="\.\/rankings\.html#item-5"[^>]*>[\s\S]*?神行加速[\s\S]*?)<a href="\/rankings\.html#item-5" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.shenxing.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`
);
compareHtml = compareHtml.replace(
  /(<a href="\.\/rankings\.html#item-6"[^>]*>[\s\S]*?闪电鼠[\s\S]*?)<a href="\/rankings\.html#item-6" target="_blank" rel="noopener noreferrer" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\s*直达官网/,
  `$1<a href="${PARTNERS.shandianshu.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary !px-3 py-1 text-xs inline-flex items-center gap-1">\n                    直达官网`
);
fs.writeFileSync(path.join(rootDir, 'compare.html'), compareHtml, 'utf8');
console.log('✓ compare.html updated');

// 7. Update post.html
let postHtml = fs.readFileSync(path.join(rootDir, 'post.html'), 'utf8');
postHtml = postHtml.replace(
  /data-code="SPECIAL2026" aria-label="复制优惠码 SPECIAL2026"/g,
  `data-code="${PARTNERS.huanqiuti.code}" aria-label="复制优惠码 ${PARTNERS.huanqiuti.code}"`
);
postHtml = postHtml.replace(
  /<span class="copy-code-text">SPECIAL2026<\/span>/g,
  `<span class="copy-code-text">${PARTNERS.huanqiuti.code}</span>`
);
postHtml = postHtml.replace(
  /<a href="#" class="btn-primary text-sm">前往官方网站<\/a>/g,
  `<a href="${PARTNERS.huanqiuti.url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-primary text-sm">前往官方网站</a>`
);
fs.writeFileSync(path.join(rootDir, 'post.html'), postHtml, 'utf8');
console.log('✓ post.html updated');
