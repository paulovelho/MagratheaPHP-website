import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';

type BenchmarkModeId = 'throughput' | 'time' | 'memory';
interface BenchmarkMetric {
  value: string;
  pct: number;
}
interface BenchmarkRow {
  name: string;
  main?: boolean;
  barClass: string;
  throughput: BenchmarkMetric;
  time: BenchmarkMetric;
  memory: BenchmarkMetric;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // Version info
  currentVersion = signal<string>('???');

  ngOnInit(): void {
    fetch('https://api.github.com/repos/PlatypusTechnology/MagratheaPHP2/tags')
      .then(response => response.json())
      .then(tags => {
        if (Array.isArray(tags) && tags.length > 0) {
          // Find the first version-like tag (e.g. starts with 'v' or is a version number)
          const versionTag = tags.find(t => t.name && /^v?\d+\.\d+/.test(t.name));
          if (versionTag) {
            this.currentVersion.set(versionTag.name);
          } else if (tags[0].name) {
            this.currentVersion.set(tags[0].name);
          }
        }
      })
      .catch(err => {
        console.error('Failed to fetch latest version tag:', err);
      });
  }

  // Copyable snippet for the "Initialize the visual admin" step
  readonly adminInitSnippet: string = [
    '<?php // public/admin.php',
    'require "bootstrap.php"; // Magrathea setup + StartSession()',
    '',
    'use Magrathea2\\Admin\\AdminManager;',
    'AdminManager::Instance()->Start(new MyAppAdmin());',
  ].join('\n');

  // Navigation
  mobileMenuOpen = signal<boolean>(false);

  // Hero Code Section Tabs
  codeTab = signal<string>('routing');

  // Visual Admin Section Tabs
  adminTab = signal<string>('generator');
  showModelGenerated = signal<boolean>(false);
  sqlExecuted = signal<boolean>(false);
  selectedQueryPreset = signal<string>('select');

  // Benchmarks Section Toggle
  benchmarkMode = signal<BenchmarkModeId>('throughput');

  readonly benchmarkModes: { id: BenchmarkModeId; label: string }[] = [
    {id: 'throughput', label: 'Throughput'},
    {id: 'time', label: 'Time/Req'},
    {id: 'memory', label: 'Memory'},
  ];

  readonly benchmarkHeaders: Record<BenchmarkModeId, { title: string; unit: string }> = {
    throughput: {title: 'THROUGHPUT (HIGHER IS BETTER)', unit: 'req/s'},
    time: {title: 'CPU TIME PER REQUEST (LOWER IS BETTER)', unit: 'ms (Milliseconds)'},
    memory: {title: 'PEAK MEMORY PER REQUEST (LOWER IS BETTER)', unit: 'MB (Megabytes)'},
  };

  // Measured 2026-07-24 by the reproducible harness in /benchmark (wrk -t2 -c50 -d30s,
  // avg of /hello + /planets endpoints, 1 vCPU / 512MB containers, PHP 8.3 + OPcache).
  readonly benchmarkResults: BenchmarkRow[] = [
    {
      name: 'MagratheaPHP v2', main: true,
      barClass: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      throughput: {value: '1,382 req/s', pct: 100},
      time: {value: '0.72 ms', pct: 12},
      memory: {value: '0.3 MB', pct: 50},
    },
    {
      name: 'Slim Framework 4 (Micro)',
      barClass: 'bg-gray-600',
      throughput: {value: '987 req/s', pct: 71.4},
      time: {value: '1.01 ms', pct: 16.8},
      memory: {value: '0.4 MB', pct: 66.7},
    },
    {
      name: 'Symfony 7',
      barClass: 'bg-gray-700',
      throughput: {value: '397 req/s', pct: 28.7},
      time: {value: '2.52 ms', pct: 42},
      memory: {value: '0.5 MB', pct: 83.3},
    },
    {
      name: 'Laravel 12',
      barClass: 'bg-gray-800',
      throughput: {value: '167 req/s', pct: 12.1},
      time: {value: '6.00 ms', pct: 100},
      memory: {value: '0.6 MB', pct: 100},
    },
  ];

  // Full per-endpoint numbers, straight from benchmark/results.md
  readonly benchmarkDetails = [
    {framework: 'MagratheaPHP v2', endpoint: '/hello', p50: '54.19 ms', p99: '161.20 ms', rps: '1,403', mem: '0.3 MB', main: true},
    {framework: 'MagratheaPHP v2', endpoint: '/planets', p50: '52.97 ms', p99: '117.61 ms', rps: '1,360', mem: '0.3 MB', main: true},
    {framework: 'Slim 4', endpoint: '/hello', p50: '54.17 ms', p99: '423.54 ms', rps: '984', mem: '0.4 MB'},
    {framework: 'Slim 4', endpoint: '/planets', p50: '52.72 ms', p99: '197.82 ms', rps: '990', mem: '0.4 MB'},
    {framework: 'Symfony 7', endpoint: '/hello', p50: '101.75 ms', p99: '442.37 ms', rps: '391', mem: '0.5 MB'},
    {framework: 'Symfony 7', endpoint: '/planets', p50: '101.31 ms', p99: '498.65 ms', rps: '402', mem: '0.5 MB'},
    {framework: 'Laravel 12', endpoint: '/hello', p50: '295.52 ms', p99: '993.32 ms', rps: '164', mem: '0.6 MB'},
    {framework: 'Laravel 12', endpoint: '/planets', p50: '297.65 ms', p99: '898.90 ms', rps: '170', mem: '0.6 MB'},
  ];

  benchmarkMetric(row: BenchmarkRow): BenchmarkMetric {
    return row[this.benchmarkMode()];
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  switchCodeTab(tab: string): void {
    this.codeTab.set(tab);
  }

  switchAdminTab(tab: string): void {
    this.adminTab.set(tab);
  }

  simulateGenerate(): void {
    this.showModelGenerated.set(true);
  }

  updateQueryPreset(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedQueryPreset.set(selectElement.value);
    this.sqlExecuted.set(false);
  }

  simulateQueryRun(): void {
    this.sqlExecuted.set(true);
  }

  toggleBenchmarkMode(mode: BenchmarkModeId): void {
    this.benchmarkMode.set(mode);
  }

  copyCommand(text: string): void {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(text).then(() => {
        alert('Command copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  }
}
