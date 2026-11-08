const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Starting SEO & E-E-A-T optimization across ${files.length} HTML files...`);

// Mapping of external aff links to clean internal URLs
const affLinkReplacements = [
  { regex: /https:\/\/123pps01\.huanqiutiaff\.com\/#\/\?code=j5VBUvw0/g, replacement: '/post.html', label: '查看环球梯图鉴' },
  { regex: /https:\/\/ppsvip01\.dalaoyunaff\.com\/#\/\?code=Iz1GlCVa/g, replacement: '/rankings.html#item-2', label: '查看大佬云图鉴' },
  { regex: /https:\/\/pp01\.yunjiexianaff\.com\/#\/\?code=(?:bp0ZSKBV|6Y9vSMcc)/g, replacement: '/rankings.html#item-3', label: '查看云界线图鉴' },
  { regex: /https:\/\/123pp01\.liulianyunaff\.com\/#\/\?code=MsZP3u7G/g, replacement: '/rankings.html#item-4', label: '查看榴莲云图鉴' },
  { regex: /https:\/\/pps123\.shenxingaff\.com\/#\/\?code=6tQ7zHUc/g, replacement: '/rankings.html#item-5', label: '查看神行加速图鉴' },
  { regex: /https:\/\/ppsvip01\.shandianshuaff\.com\/#\/\?code=QbLF8tjB/g, replacement: '/rankings.html#item-6', label: '查看闪电鼠图鉴' },
  { regex: /https:\/\/haozevpn\.jlyvipaff\.com\/#\/\?code=jwCMOvQO/g, replacement: '/rankings.html#item-8', label: '查看极连云图鉴' },
  { regex: /https:\/\/wep\.edgenovaaff\.com\/#\/\?code=mLLL6h6F/g, replacement: '/rankings.html#item-9', label: '查看边缘节点图鉴' },
  { regex: /https:\/\/fanxiaobin\.kuailiaff\.com\/#\/\?code=e0cAmK7F/g, replacement: '/rankings.html#item-10', label: '查看快狸图鉴' },
  { regex: /https:\/\/everett7623\.kosingaff\.com\/#\/\?code=sFKKfEYs/g, replacement: '/rankings.html#item-11', label: '查看可信云图鉴' },
  // Generic fallback for any remaining aff.com or code=
  { regex: /https:\/\/[a-zA-Z0-9.-]*aff\.com\/[^\s"']*/g, replacement: '/rankings.html', label: '查看图鉴档案' }
];

// Clean post.html title & h1
function fixPostHtml(content) {
  content = content.replace(/文章标题示例：专线网络服务深度横向评测与选型指南/g, '专线网络服务深度横向评测与选型指南');
  content = content.replace(/包含框架支持的所有典型排版元素（代码块、参数表、测速看板、支持矩阵、折叠问答等），专为技术博客与评测文章设计。/g, '基于五维网络测速模型对主流企业级 IPLC/IEPL 专线网络服务进行深度横向评测，涵盖物理延迟、丢包率、晚高峰抖动抑制与流媒体/AI 原生解锁能力全景实测。');
  return content;
}

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (file === 'post.html') {
    content = fixPostHtml(content);
  }

  // 1. Replace all aff links
  affLinkReplacements.forEach(({ regex, replacement, label }) => {
    content = content.replace(regex, replacement);
  });
  // Clean up any remaining rel="sponsored nofollow"
  content = content.replace(/rel="sponsored nofollow"/g, 'class="transition-colors"');

  // 2. Replace Telegram links with internal link to /about.html
  content = content.replace(/href="https:\/\/t\.me\/huanqiuti8899"/g, 'href="/about.html"');
  content = content.replace(/<span>TG 客服<\/span>/g, '<span>图鉴交流</span>');
  content = content.replace(/>Telegram 客服<\/a>/g, '>图鉴交流与关于</a>');
  content = content.replace(/点击跳转 Telegram 客服/g, '关于图鉴与交流');
  content = content.replace(/联系 Telegram 客服/g, '关于图鉴与交流');

  // 3. Convert relative static asset paths to root absolute
  content = content.replace(/href=["']\.\/css\/style\.css["']/g, 'href="/css/style.css"');
  content = content.replace(/src=["']\.\/js\/main\.js["']/g, 'src="/js/main.js"');
  content = content.replace(/href=["']\.\/assets\/favicon\.svg["']/g, 'href="/assets/favicon.svg"');
  content = content.replace(/src=["']\.\/assets\/logo-mark\.svg["']/g, 'src="/assets/logo-mark.svg"');
  content = content.replace(/href=["']\.\/assets\//g, 'href="/assets/');
  content = content.replace(/src=["']\.\/assets\//g, 'src="/assets/');
  content = content.replace(/href=["']\.\/favicon\.svg["']/g, 'href="/assets/favicon.svg"');
  content = content.replace(/src=["']\.\/logo-mark\.svg["']/g, 'src="/assets/logo-mark.svg"');

  // 4. Preload CSS
  if (!content.includes('rel="preload" href="/css/style.css"') && !content.includes("rel='preload' href='/css/style.css'")) {
    content = content.replace(
      /<link\s+rel=["']stylesheet["']\s+href=["']\/css\/style\.css["']>/i,
      '<link rel="preload" href="/css/style.css" as="style">\n  <link rel="stylesheet" href="/css/style.css">'
    );
  }

  // 5. Extract Title, Description, Canonical
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : '机场图鉴 | 现代化全球高速网络节点选型与评测框架';
  
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  let description = descMatch ? descMatch[1].trim() : '2026 全球高速网络节点选型与机场测速图鉴：从直连中转到 IPLC/IEPL 专线全景深度评测。';

  let canonicalUrl = file === 'index.html' ? 'https://jichangtujian.vip/' : `https://jichangtujian.vip/${file}`;

  // Ensure Canonical is clean
  if (!content.includes('rel="canonical"')) {
    content = content.replace(/<\/title>/i, `</title>\n  <link rel="canonical" href="${canonicalUrl}">`);
  } else {
    content = content.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
  }

  // 6. Open Graph & Twitter Social Meta Tags
  const isArticle = file.startsWith('post');
  const ogType = isArticle ? 'article' : 'website';
  const logoUrl = 'https://jichangtujian.vip/assets/logo.png';

  const socialMetaTags = `  <!-- Social Graph Meta Tags -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${logoUrl}">
  <meta property="og:type" content="${ogType}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${logoUrl}">`;

  // Remove existing OG and twitter tags if present to prevent duplicates
  content = content.replace(/<!-- Social Graph Meta Tags -->[\s\S]*?<meta name="twitter:image"[^>]*>\n?/gi, '');
  content = content.replace(/<meta\s+property=["']og:[^"']*["'][^>]*>\n?/gi, '');
  content = content.replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>\n?/gi, '');

  // Insert social meta tags before </head>
  content = content.replace(/<\/head>/i, `${socialMetaTags}\n</head>`);

  // 7. Schema.org JSON-LD Generation
  let jsonLdObj = null;

  if (file === 'index.html') {
    jsonLdObj = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://jichangtujian.vip/#website",
          "url": "https://jichangtujian.vip/",
          "name": "机场图鉴",
          "description": description,
          "inLanguage": "zh-CN",
          "publisher": {
            "@id": "https://jichangtujian.vip/#organization"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://jichangtujian.vip/#organization",
          "name": "机场图鉴评测智库",
          "url": "https://jichangtujian.vip/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jichangtujian.vip/assets/logo-mark.svg",
            "width": 512,
            "height": 512
          },
          "description": "独立客观的全球跨境网络链路评测机构，建立五维网络健康度模型，定期发布底层物理链路审计与节点实测数据。"
        },
        {
          "@type": "Person",
          "@id": "https://jichangtujian.vip/#auditor",
          "name": "网络测试巡检员",
          "jobTitle": "资深网络架构评测工程师 (Senior Network Infrastructure Auditor)",
          "worksFor": {
            "@id": "https://jichangtujian.vip/#organization"
          },
          "description": "专注全球 BGP 多线接入、跨国海缆拓扑、IPLC 内网专线调度与对抗网络拥塞 QoS 优化的资深网络测试工程师。"
        },
        {
          "@type": "FAQPage",
          "@id": "https://jichangtujian.vip/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "为什么在晚高峰期间普通网络节点丢包严重，而 IPLC 专线依然坚挺？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "普通公网直连或普通中转节点在经过公网国际出入口网关时，必须参与运营商的 QoS 队列排队，晚高峰 20:00 - 23:00 骨干海缆拥塞会导致无差别丢包（常达 15%-40%）。而 IPLC（国际私有租用线路）在境内入口即封装进入运营商私有物理光纤内网，全程不经过公网国际出口，不触发公网流量整形，因此能维持 0 丢包与毫秒级恒定延迟。"
              }
            },
            {
              "@type": "Question",
              "name": "如何辨别假冒的 IPLC 专线或虚假节点？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "真实的 IPLC 专线具备端到端物理光纤直连特征：晚高峰 20:00 - 23:00 进行连续 Ping 测算时，往返抖动标准差（Jitter StdDev）通常小于 1.5ms，丢包率趋近于 0%；通过 MTR 路由追踪，境内入口后直接进入私有内网段直达境外 POP，中间无公网 AS 级跳转。"
              }
            },
            {
              "@type": "Question",
              "name": "为什么访问 ChatGPT 或 Netflix 经常出现 403 阻断或无法解锁？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "主流 AI 与流媒体平台使用 IP 风险数据库（如 IPinfo、Scamalytics、MaxMind）实时识别数据中心广播 IP（Hosting/IDC）。若节点使用被污染或多人共用的机房 IP，将直接触发风控拦截。优质机场通常采用原生住宅 IP（Residential/ISP）或经过严格纯净度洗涤的落地出口，以保障 100% 通过率。"
              }
            }
          ]
        }
      ]
    };
  } else if (isArticle) {
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : title;
    const dateMatch = content.match(/datetime=["']([\d-]+)["']/i);
    const pubDate = dateMatch ? dateMatch[1] : '2026-10-14';

    jsonLdObj = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${canonicalUrl}#article`,
          "headline": h1Text,
          "description": description,
          "url": canonicalUrl,
          "inLanguage": "zh-CN",
          "datePublished": `${pubDate}T08:00:00+08:00`,
          "dateModified": "2026-10-24T00:00:00+08:00",
          "author": {
            "@type": "Person",
            "name": "网络测试巡检员",
            "url": "https://jichangtujian.vip/about.html"
          },
          "publisher": {
            "@type": "Organization",
            "name": "机场图鉴评测智库",
            "url": "https://jichangtujian.vip/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://jichangtujian.vip/assets/logo-mark.svg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "图鉴首页",
              "item": "https://jichangtujian.vip/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "图鉴档案库",
              "item": "https://jichangtujian.vip/blog.html"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": h1Text,
              "item": canonicalUrl
            }
          ]
        }
      ]
    };
  } else if (file !== 'article.html' && file !== '404.html') {
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : title;

    jsonLdObj = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          "url": canonicalUrl,
          "name": title,
          "description": description,
          "inLanguage": "zh-CN",
          "publisher": {
            "@type": "Organization",
            "name": "机场图鉴评测智库",
            "url": "https://jichangtujian.vip/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://jichangtujian.vip/assets/logo-mark.svg"
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "图鉴首页",
              "item": "https://jichangtujian.vip/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": h1Text,
              "item": canonicalUrl
            }
          ]
        }
      ]
    };
  }

  // Remove existing JSON-LD if present to replace with new clean JSON-LD
  content = content.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>\n?/gi, '');

  if (jsonLdObj) {
    const jsonLdString = `  <!-- Schema.org E-E-A-T Entity Graph -->\n  <script type="application/ld+json">\n${JSON.stringify(jsonLdObj, null, 2)}\n  </script>`;
    content = content.replace(/<\/head>/i, `${jsonLdString}\n</head>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('All HTML files have been processed and optimized!');
