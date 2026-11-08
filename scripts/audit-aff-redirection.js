const fs = require('fs');
const path = require('path');

console.log('>>> 开始执行全站 AFF 301 隔离与合规门禁审计...\n');

let hasError = false;

// 1. 检查 robots.txt
const robotsTxtPaths = ['robots.txt', 'public/robots.txt'];
robotsTxtPaths.forEach(p => {
  if (!fs.existsSync(p)) {
    console.error(`[FAIL] 缺失文件: ${p}`);
    hasError = true;
    return;
  }
  const content = fs.readFileSync(p, 'utf8');
  if (/disallow:\s*\/go(\/|\.html)?/i.test(content)) {
    console.error(`[FAIL] ${p} 中包含对 /go/ 或 /go.html 的 Disallow，违反合规避坑原则！`);
    hasError = true;
  } else {
    console.log(`[PASS] ${p} 严格未设置 /go/ 或 /go.html 的 Disallow，符合合规标准。`);
  }
});

// 2. 检查 go.html
if (!fs.existsSync('go.html')) {
  console.error('[FAIL] 缺失 /go.html 承接页！');
  hasError = true;
} else {
  const goContent = fs.readFileSync('go.html', 'utf8');
  if (!goContent.includes('<meta name="robots" content="noindex, nofollow">')) {
    console.error('[FAIL] go.html 头部缺少严格的 <meta name="robots" content="noindex, nofollow">！');
    hasError = true;
  } else {
    console.log('[PASS] go.html 头部严格包含 <meta name="robots" content="noindex, nofollow">。');
  }

  const h1Matches = goContent.match(/<h1\b[^>]*>(.*?)<\/h1>/gi);
  if (!h1Matches || h1Matches.length !== 1) {
    console.error(`[FAIL] go.html h1 标签数量异常（当前有 ${h1Matches ? h1Matches.length : 0} 个）！`);
    hasError = true;
  } else {
    console.log('[PASS] go.html 严格符合单个 <h1> 语义规范。');
  }
}

// 3. 检查 _redirects 和 nginx-redirects.conf
const redirectsPaths = ['_redirects', 'public/_redirects', 'nginx-redirects.conf'];
redirectsPaths.forEach(p => {
  if (!fs.existsSync(p)) {
    console.error(`[FAIL] 缺失重定向配置文件: ${p}`);
    hasError = true;
  } else {
    const content = fs.readFileSync(p, 'utf8');
    if (!content.includes('huanqiuti') || (!content.includes('302') && !content.includes('301'))) {
      console.error(`[FAIL] ${p} 重定向规则不完整！`);
      hasError = true;
    } else {
      console.log(`[PASS] ${p} 302/301 重定向规则配置正常。`);
    }
  }
});

// 4. 扫描所有 HTML/MD 文件中的 AFF 裸链残留和 /go.html 链接规范
const affDomains = [
  'huanqiutiaff.com',
  'dalaoyunaff.com',
  'yunjiexianaff.com',
  'liulianyunaff.com',
  'shenxingaff.com',
  'shandianshuaff.com',
  'jichang.best',
  'jlyvipaff.com',
  'edgenovaaff.com',
  'kuailiaff.com',
  'kosingaff.com',
  'speedworldaff.cc',
  'ytjcok.org',
  'kunpengjiasu.com',
  'gntvipaff.cc'
];

const validIds = new Set([
  'huanqiuti',
  'dalaoyun',
  'yunjiexian',
  'liulianyun',
  'shenxing',
  'shandianshu',
  'shunyun',
  'jilianyun',
  'edgenode',
  'bianyuan',
  'kuaili',
  'kexinyun',
  'sujie',
  'yuntu',
  'kunpeng',
  'guangnianti',
  'telegram',
  'tg'
]);

function getAllFiles(dir, exts = ['.html', '.md']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'dist') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      if (exts.includes(path.extname(file).toLowerCase())) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const allFiles = getAllFiles(process.cwd());
let remainingRawAff = 0;
let totalGoLinks = 0;
let invalidRelCount = 0;
let invalidIdCount = 0;

allFiles.forEach(f => {
  const relPath = path.relative(process.cwd(), f);
  if (relPath === 'go.html') return; // go.html 内包含 target/decode 逻辑
  const content = fs.readFileSync(f, 'utf8');

  // 检查是否有裸 AFF 直链
  affDomains.forEach(domain => {
    if (content.includes(domain)) {
      console.error(`[FAIL] ${relPath} 中仍残留原始 AFF 域名: ${domain}`);
      remainingRawAff++;
      hasError = true;
    }
  });

  // 检查所有 a 标签
  const aRegex = /<a\b([^>]*)>/gi;
  let m;
  while ((m = aRegex.exec(content)) !== null) {
    const attrs = m[1];
    const hrefMatch = attrs.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];

    if (href.startsWith('/go.html') || href.startsWith('/go/')) {
      totalGoLinks++;

      // 提取 id
      let id = '';
      if (href.startsWith('/go.html')) {
        const idMatch = href.match(/[?&]id=([^&#]+)/);
        if (idMatch) id = idMatch[1];
      } else if (href.startsWith('/go/')) {
        id = href.replace(/^\/go\//, '').split(/[?#]/)[0];
      }

      if (!id || !validIds.has(id)) {
        console.error(`[FAIL] ${relPath} 存在无效或未定义的跳转 ID: ${href}`);
        invalidIdCount++;
        hasError = true;
      }

      // 检查 rel 属性
      const relMatch = attrs.match(/rel=["']([^"']+)["']/i);
      if (!relMatch) {
        console.error(`[FAIL] ${relPath} 中跳转链接缺少 rel 属性: ${m[0]}`);
        invalidRelCount++;
        hasError = true;
      } else {
        const relVal = relMatch[1].toLowerCase();
        if (!relVal.includes('nofollow') || !relVal.includes('sponsored')) {
          console.error(`[FAIL] ${relPath} 中跳转链接 rel 缺少 nofollow 或 sponsored: ${relMatch[0]}`);
          invalidRelCount++;
          hasError = true;
        }
      }
    }
  }
});

console.log('\n--- 审计统计汇总 ---');
console.log(`- 裸 AFF 域名直链残留: ${remainingRawAff} 处 (目标必须为 0)`);
console.log(`- 全站安全跳转内链数量: ${totalGoLinks} 处`);
console.log(`- 无效/死链 ID 数量: ${invalidIdCount} 处 (目标必须为 0)`);
console.log(`- rel 属性不达标数量: ${invalidRelCount} 处 (目标必须为 0)`);

if (hasError) {
  console.error('\n[FAIL] 门禁审计未全部通过，请检查上述错误！');
  process.exit(1);
} else {
  console.log('\n[SUCCESS] 恭喜！全站 AFF 301 隔离与搜索引擎合规门禁审计 100% 通过！无死链、无泄露、零合规隐患！');
}
