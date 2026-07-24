# Benchmark results — 2026-07-24 18:59 UTC

wrk: -t2 -c50 -d30s (after 5s warmup) — 1 vCPU / 512MB per container, PHP 8.3 + Apache, OPcache on, no DB

| Framework | Endpoint | p50 latency | p99 latency | Req/sec | Peak memory |
|-----------|----------|-------------|-------------|---------|-------------|
| magrathea | /hello | 54.19ms | 161.20ms | 1403.35 | 0.3 MB |
| magrathea | /planets | 52.97ms | 117.61ms | 1359.74 | 0.3 MB |
| slim | /hello | 54.17ms | 423.54ms | 984.06 | 0.4 MB |
| slim | /planets | 52.72ms | 197.82ms | 990.19 | 0.4 MB |
| laravel | /hello | 295.52ms | 993.32ms | 163.68 | 0.6 MB |
| laravel | /planets | 297.65ms | 898.90ms | 169.81 | 0.6 MB |
| symfony | /hello | 101.75ms | 442.37ms | 391.36 | 0.5 MB |
| symfony | /planets | 101.31ms | 498.65ms | 402.48 | 0.5 MB |
