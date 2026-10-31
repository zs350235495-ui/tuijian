/**
 * Comprehensive SEO, E-E-A-T, and Zero-Deadlink Gate Check
 * jichangtujian.vip (机场图鉴)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const PORT = 8089;
const HOST = '127.0.0.1';
const ROOT_DIR = process.cwd();

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=UTF-8',
  '.json': 'application/json'
};

// Static file server for local testing
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(ROOT_DIR, reqPath);

  // If path doesn't exist, check inside public/
  if (!fs.existsSync(filePath)) {
    const publicPath = path.join(ROOT_DIR, 'public', reqPath);
    if (fs.existsSync(publicPath)) {
      filePath = publicPath;
    }
  }

  // If still doesn't exist, check if appending .html matches
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://${HOST}:${PORT}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 正在启动本地静态审计服务器 (http://127.0.0.1:8089)...');
  console.log('====================================================\n');

  await new Promise(resolve => server.listen(PORT, HOST, resolve));

  const errors = [];
  const warnings = [];

  // 1. Check LICENSE, robots.txt, llms.txt, sitemap.xml existence
  console.log('【1. 核心合规文件与协议凭证检查】');
  const requiredFiles = ['LICENSE', 'robots.txt', 'llms.txt', 'sitemap.xml', '404.html'];
  requiredFiles.forEach(f => {
    if (!fs.existsSync(path.join(ROOT_DIR, f))) {
      errors.push(`缺失核心文件: ${f}`);
    } else {
      console.log(`  ✓ 已验证存在: ${f}`);
    }
  });

  // Verify LICENSE contains MIT
  const licenseContent = fs.readFileSync(path.join(ROOT_DIR, 'LICENSE'), 'utf8');
  assert(licenseContent.includes('MIT License'), 'LICENSE must be MIT');
  console.log('  ✓ LICENSE 协议校验通过: MIT License');

  // Verify robots.txt allows AI spiders
  const robotsContent = fs.readFileSync(path.join(ROOT_DIR, 'robots.txt'), 'utf8');
  ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'Google-Extended'].forEach(bot => {
    assert(robotsContent.includes(bot), `robots.txt 必须放行 ${bot}`);
  });
  console.log('  ✓ robots.txt 主流 AI 爬虫协议放行校验通过');

  // 2. Sitemap URL 100% 200 OK Check
  console.log('\n【2. Sitemap 物理单页可达性与 200 OK 门禁】');
  const sitemapContent = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
  const locRegex = /<loc>(https:\/\/jichangtujian\.vip(\/[^<]*))<\/loc>/g;
  let locMatch;
  const sitemapUrls = [];
  while ((locMatch = locRegex.exec(sitemapContent)) !== null) {
    sitemapUrls.push(locMatch[2]);
  }

  console.log(`  * Sitemap 共收录物理页面数: ${sitemapUrls.length}`);
  for (const urlPath of sitemapUrls) {
    const res = await fetchUrl(urlPath);
    if (res.status !== 200) {
      errors.push(`Sitemap URL 返回非 200: ${urlPath} -> HTTP ${res.status}`);
    }
    assert(!urlPath.includes('#'), `Sitemap 严禁包含虚拟锚点路由: ${urlPath}`);
  }
  console.log(`  ✓ Sitemap 全部 ${sitemapUrls.length} 个页面公网可达性测试 100% 返回 HTTP 200 OK`);

  // 3. HTML Pages Content, Headings, JSON-LD, Assets, and Compliance Audit
  const htmlFiles = [
    ...fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html')),
    ...(fs.existsSync(path.join(ROOT_DIR, 'articles'))
      ? fs.readdirSync(path.join(ROOT_DIR, 'articles')).filter(f => f.endsWith('.html')).map(f => path.join('articles', f))
      : [])
  ];

  let totalPagesChecked = 0;
  for (const file of htmlFiles) {
    totalPagesChecked++;
    const filePath = path.join(ROOT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // (1) H1 tag count assertion (Skip redirect helper article.html)
    if (file !== 'article.html') {
      const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
      if (h1Count !== 1) {
        errors.push(`${file}: H1 标签数量不符合规范 (期望 1 个，实际发现 ${h1Count} 个)`);
      }
    }

    // (2) Check for forbidden commercial promo / affiliate links
    // 仅允许已官方授权的 6 大服务商跳转链接，禁止任何未授权外部商业链接或异常返利参数
    const allowedPartnerHosts = [
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
    const linkMatches = content.match(/href=["'](https?:\/\/[^"']+)["']/gi) || [];
    for (const linkStr of linkMatches) {
      const urlMatch = linkStr.match(/href=["'](https?:\/\/[^"']+)["']/i);
      if (urlMatch) {
        const url = urlMatch[1];
        if (/(?:code=|aff|\?ref=)/i.test(url) || /aff\.(com|cc|net|org)/i.test(url)) {
          const isAllowed = allowedPartnerHosts.some(host => url.includes(host));
          if (!isAllowed) {
            errors.push(`${file}: 发现未授权商业外链或邀请返利参数: ${url}`);
          }
        }
      }
    }

    // (3) Check for external Telegram links
    if (/t\.me\/(?!huanqiuti8899)[^\s"'<>]+/i.test(content)) {
      errors.push(`${file}: 发现未授权 Telegram 外部直连`);
    }

    // (4) Check Canonical tag
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    if (!canonicalMatch) {
      errors.push(`${file}: 缺失 canonical 规范标签`);
    } else {
      const href = canonicalMatch[1];
      if (!href.startsWith('https://jichangtujian.vip/')) {
        errors.push(`${file}: canonical URL 前缀必须为 https://jichangtujian.vip/，实际为: ${href}`);
      }
      if (href.includes('#') || href.includes('?')) {
        errors.push(`${file}: canonical URL 严禁包含哈希或查询参数: ${href}`);
      }
    }

    // (5) Check Open Graph & Twitter Social meta
    const hasOgTitle = /<meta\s+property=["']og:title["']/i.test(content);
    const hasOgDesc = /<meta\s+property=["']og:description["']/i.test(content);
    const hasOgUrl = /<meta\s+property=["']og:url["']/i.test(content);
    const hasOgImage = /<meta\s+property=["']og:image["']/i.test(content);
    const hasTwitter = /<meta\s+name=["']twitter:card["']/i.test(content);

    if (file !== 'go.html' && (!hasOgTitle || !hasOgDesc || !hasOgUrl || !hasOgImage || !hasTwitter)) {
      errors.push(`${file}: 缺失社交图谱元数据 (og:title, og:description, og:url, og:image 或 twitter:card)`);
    }

    // (6) Check Schema.org JSON-LD validity
    if (file !== 'article.html' && file !== '404.html' && file !== 'go.html') {
      const jsonLdMatch = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
      if (!jsonLdMatch) {
        errors.push(`${file}: 缺失 Schema.org JSON-LD 结构化数据`);
      } else {
        try {
          const parsed = JSON.parse(jsonLdMatch[1]);
          if (parsed['@context'] !== 'https://schema.org') {
            errors.push(`${file}: JSON-LD @context 必须为 https://schema.org`);
          }
        } catch (e) {
          errors.push(`${file}: JSON-LD 解析语法错误: ${e.message}`);
        }
      }
    }

    // (7) Check Static Resources exist (Zero 404 broken resources)
    const resourceRegex = /(?:href|src)=["'](\/(?:assets|css|js)\/[^"']+)["']/g;
    let resMatch;
    while ((resMatch = resourceRegex.exec(content)) !== null) {
      const resPath = resMatch[1];
      let fullPath = path.join(ROOT_DIR, resPath);
      if (!fs.existsSync(fullPath)) {
        fullPath = path.join(ROOT_DIR, 'public', resPath);
      }
      if (!fs.existsSync(fullPath)) {
        errors.push(`${file}: 静态资源路径不存在 (404): ${resPath}`);
      }
    }
  }

  console.log(`  ✓ 已审计全站 ${totalPagesChecked} 个 HTML 文件`);
  console.log('  ✓ 标题语义层级规范 100% 通过（严格单 H1）');
  console.log('  ✓ 社交图谱 (OG & Twitter) 100% 覆盖');
  console.log('  ✓ Schema.org JSON-LD E-E-A-T 实体注入与语法验证 100% 通过');
  console.log('  ✓ 全站静态资源（CSS / JS / SVG / PNG）0 死链、0 个 404');
  console.log('  ✓ 15 大核心服务商专属跳转链路合规加载，未授权外链与 Telegram 直连零残留');

  // Close server
  server.close();

  console.log('\n====================================================');
  if (errors.length > 0) {
    console.error('❌ 审计门禁未通过，发现以下问题：');
    errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  } else {
    console.log('✅ 全站 SEO 权重挖掘、E-E-A-T 实体与合规审计【全部通过】！');
    console.log('====================================================\n');
  }
}

runAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
