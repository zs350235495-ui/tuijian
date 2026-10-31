import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        article: resolve(__dirname, 'article.html'),
        post: resolve(__dirname, 'post.html'),
        postNodeTypes: resolve(__dirname, 'post-network-nodes-direct-relay-iplc-guide.html'),
        postRoutingGuide: resolve(__dirname, 'post-rule-based-routing-anti-pollution-guide.html'),
        postAirportGuide: resolve(__dirname, 'post-airport-selection-guide.html'),
        postClashVerge: resolve(__dirname, 'post-clash-verge-rev-tutorial.html'),
        postV2rayn: resolve(__dirname, 'post-v2rayn-beginners-guide.html'),
        postShadowrocket: resolve(__dirname, 'post-shadowrocket-ios-setup.html'),
        postAirportWarnings: resolve(__dirname, 'post-airport-shutdown-warning-signals.html'),
        postStreaming: resolve(__dirname, 'post-streaming-unlock-guide.html'),
        postChatgpt: resolve(__dirname, 'post-chatgpt-claude-ai-nodes.html'),
        postEcommerce: resolve(__dirname, 'post-cross-border-ecommerce-network.html'),
        postSoftRouter: resolve(__dirname, 'post-soft-router-openclash-setup.html'),
        postTroubleshooting: resolve(__dirname, 'post-network-latency-packet-loss-troubleshooting.html'),
        postIpv6DualStack: resolve(__dirname, 'post-ipv6-dual-stack-happy-eyeballs.html'),
        networkProtocolHandbook: resolve(__dirname, 'network-protocol-topology-handbook-2026.html'),
        rankings: resolve(__dirname, 'rankings.html'),
        faq: resolve(__dirname, 'faq.html'),
        airportWarnings: resolve(__dirname, 'airport-warnings.html'),
        downloads: resolve(__dirname, 'downloads.html'),
        clashVerge: resolve(__dirname, 'clash-verge.html'),
        v2rayn: resolve(__dirname, 'v2rayn.html'),
        tools: resolve(__dirname, 'tools.html'),
        topics: resolve(__dirname, 'topics.html'),
        about: resolve(__dirname, 'about.html'),
        bestValue: resolve(__dirname, 'best-value.html'),
        compare: resolve(__dirname, 'compare.html'),
        coupons: resolve(__dirname, 'coupons.html'),
        brands: resolve(__dirname, 'brands.html'),
        sitemap: resolve(__dirname, 'sitemap.html'),
        notFound: resolve(__dirname, '404.html'),
        go: resolve(__dirname, 'go.html'),
        articlesBenchmark: resolve(__dirname, 'articles/protocol-concurrency-latency-benchmark-2026.html')
      }
    }
  }
});
