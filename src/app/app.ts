import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';

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
  benchmarkMode = signal<string>('latency');

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

  toggleBenchmarkMode(mode: string): void {
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
