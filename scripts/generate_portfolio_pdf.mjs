import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { content, projectDetails } from '../src/data/content.ts'

const OUTPUT_DIR = path.resolve('..')
const PUBLIC_DIR = path.resolve('public')
const SCHOOL_DIR = '/home/xander/Downloads/school/resume'

function escapeHtml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderHtml(lang) {
  const isJp = lang === 'jp'
  const c = content[lang]

  const contactEmail = 'c250469@ccg.ac.jp'
  const contactPhone = '+81 80 1098 1841'
  const contactGithub = 'https://github.com/Alartist40'
  const contactPortfolio = 'https://alartist40.github.io/Portfolio/'
  const contactLocation = isJp ? '埼玉県志木市 / 東京都' : 'Saitama / Tokyo, Japan'

  const heroTitle = isJp
    ? `${c.hero.titleLine1} ${c.hero.titleLine2}`
    : `${c.hero.titleLine1} ${c.hero.titleLine2}`

  const projects = c.work.projects
  const pGroup1 = projects.slice(0, 3) // Cynapse, LeafcutterLLM, E&P Medical
  const pGroup2 = projects.slice(3)    // Pathfinder, Paraclea, Mazzaroth, Hikarigo

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${isJp ? 'アレハンドロ・ガルシア・ロメロ ポートフォリオ' : 'Alejandro Garcia Romero — Portfolio'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 11mm 13mm 11mm 13mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #F4F1EA;
      color: #191919;
      font-family: "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 9.5pt;
      line-height: 1.45;
      -webkit-font-smoothing: antialiased;
    }
    .page {
      width: 100%;
      min-height: 275mm;
      max-height: 275mm;
      position: relative;
      page-break-after: always;
      break-after: page;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
    .content-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    h1, h2, h3, h4, .serif {
      font-family: "Instrument Serif", "Noto Serif JP", Georgia, serif;
      font-weight: 400;
      margin: 0;
      color: #191919;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .accent {
      color: #E06000;
    }
    .gray {
      color: #55524C;
    }
    .section-eyebrow {
      font-size: 8pt;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: #6E6A62;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid #D8D4CA;
      border-radius: 9px;
      padding: 11px 14px;
      margin-bottom: 9px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .pill {
      display: inline-block;
      background: #EDEAE1;
      border: 1px solid #D5D1C7;
      border-radius: 12px;
      padding: 2px 7.5px;
      font-size: 7pt;
      color: #44413C;
      font-weight: 500;
      margin-right: 4px;
      margin-top: 3px;
    }
    .pill-accent {
      background: #FDF1E8;
      border-color: #F0C4A4;
      color: #B54500;
      font-weight: 600;
    }
    /* Running Page Header & Footer */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 6px;
      margin-bottom: 10px;
      border-bottom: 1px solid #DFDBD1;
      font-size: 7.5pt;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #7A756C;
    }
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 6px;
      margin-top: 8px;
      border-top: 1px solid #DFDBD1;
      font-size: 7.2pt;
      color: #7A756C;
    }
    /* Grid Utilities */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 9px;
    }
    /* List styles */
    ul.bullet-list {
      list-style: none;
      padding: 0;
      margin: 4px 0 0 0;
    }
    ul.bullet-list li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 4.5px;
      font-size: 8.4pt;
      line-height: 1.38;
      color: #383530;
    }
    ul.bullet-list li::before {
      content: "—";
      position: absolute;
      left: 0;
      color: #E06000;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER & EXECUTIVE PROFILE ==================== -->
  <div class="page">
    <div class="page-header">
      <span>ROMERO ALEJANDRO • PORTFOLIO</span>
      <span>${isJp ? 'システム＆AIエンジニア' : 'FORWARD DEPLOYED & SYSTEMS AI ENGINEER'}</span>
    </div>

    <div class="content-wrap">
      <!-- Header / Identity -->
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1 style="font-size: 34pt; line-height: 1.05; letter-spacing: -1px; margin-bottom: 2px;">
              ROMERO ALEJANDRO
            </h1>
            <p style="font-size: 10.5pt; color: #E06000; font-weight: 500; letter-spacing: 0.5px; margin: 0 0 4px 0;">
              ${isJp ? 'ガルシア・ロメロ・アレハンドロ・エドアルド ｜ AIプロジェクト学科（CCMC）' : 'Garcia Romero Alejandro Eduardo ｜ AI Project Development (CCMC)'}
            </p>
          </div>
          <div style="text-align: right; font-size: 7.8pt; line-height: 1.45; color: #4A463F;">
            <div><strong>Email:</strong> <span class="mono">${contactEmail}</span></div>
            <div><strong>Phone:</strong> ${contactPhone}</div>
            <div><strong>Location:</strong> ${contactLocation}</div>
            <div><strong>GitHub:</strong> github.com/Alartist40</div>
            <div><strong>Web:</strong> alartist40.github.io/Portfolio</div>
          </div>
        </div>

        <div style="margin-top: 8px; padding: 9px 12px; background: #FFFFFF; border-left: 3px solid #E06000; border-radius: 0 6px 6px 0; border-top: 1px solid #D8D4CA; border-right: 1px solid #D8D4CA; border-bottom: 1px solid #D8D4CA;">
          <h2 style="font-size: 15pt; line-height: 1.2; margin-bottom: 4px; color: #191919;">
            ${escapeHtml(heroTitle)}
          </h2>
          <p style="font-size: 8.5pt; color: #4A463F; margin: 0; line-height: 1.42;">
            ${escapeHtml(c.hero.subtitle)}
          </p>
        </div>
      </div>

      <!-- 4 High-Impact Metrics -->
      <div class="grid-4" style="margin-bottom: 12px;">
        ${c.about.stats.map(s => `
          <div style="background: #FFFFFF; border: 1px solid #D8D4CA; border-radius: 8px; padding: 8px 10px; text-align: center;">
            <div class="serif accent" style="font-size: 21pt; line-height: 1; letter-spacing: -0.5px;">${escapeHtml(s.num)}</div>
            <div style="font-size: 6.8pt; letter-spacing: 0.8px; text-transform: uppercase; color: #6E6A62; font-weight: 600; margin-top: 4px;">${escapeHtml(s.label)}</div>
          </div>
        `).join('')}
      </div>

      <!-- Core Focus & Engineering Pillars -->
      <div>
        <div class="section-eyebrow">${isJp ? 'コア・フォーカス（エンジニアリングの5大柱）' : 'CORE FOCUS & ENGINEERING PILLARS'}</div>
        <div class="grid-2" style="gap: 8px;">
          ${c.about.pillars.slice(0, 4).map(p => `
            <div class="card" style="padding: 9px 11px; margin-bottom: 0;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                <span class="mono accent" style="font-size: 7.5pt; font-weight: 600;">${escapeHtml(p.num)}</span>
                <span style="font-size: 7pt; color: #7A756C;">${p.tags.slice(0, 2).join(' • ')}</span>
              </div>
              <h3 style="font-size: 12pt; line-height: 1.2; margin-bottom: 3px;">${escapeHtml(p.title)}</h3>
              <p style="font-size: 8pt; color: #55524C; line-height: 1.35; margin: 0 0 6px 0;">${escapeHtml(p.description)}</p>
              <div>
                ${p.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- 5th Pillar full width -->
        ${c.about.pillars.length > 4 ? `
          <div class="card" style="padding: 8px 12px; margin-top: 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <span class="mono accent" style="font-size: 7.5pt; font-weight: 600;">${escapeHtml(c.about.pillars[4].num)}</span>
              <span style="font-size: 7pt; color: #7A756C;">${c.about.pillars[4].tags.slice(0, 3).join(' • ')}</span>
            </div>
            <h3 style="font-size: 11.5pt; line-height: 1.2; margin-bottom: 2px;">${escapeHtml(c.about.pillars[4].title)}</h3>
            <p style="font-size: 8pt; color: #55524C; line-height: 1.35; margin: 0 0 4px 0;">${escapeHtml(c.about.pillars[4].description)}</p>
            <div>
              ${c.about.pillars[4].tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="page-footer">
      <span>Romero Alejandro • ${contactEmail}</span>
      <span>Page 1 of 5</span>
    </div>
  </div>


  <!-- ==================== PAGE 2: FLAGSHIP PROJECTS I (CYNAPSE, LEAFCUTTER, E&P) ==================== -->
  <div class="page">
    <div class="page-header">
      <span>FLAGSHIP SYSTEMS ARCHITECTURE (PART I)</span>
      <span>PURE RUST & RESILIENT PRODUCTION</span>
    </div>

    <div class="content-wrap">
      <div style="margin-bottom: 8px;">
        <div class="section-eyebrow">${isJp ? '主要開発システム 01〜03' : 'FLAGSHIP SYSTEMS 01 — 03'}</div>
        <p style="font-size: 8pt; color: #55524C; margin: 0;">
          ${isJp ? '低レイヤRustによる高効率推論・グラフ記憶・本番医療基幹マイグレーション' : 'Low-overhead Rust inference runtimes, graph memory, and zero-loss production database modernizations.'}
        </p>
      </div>

      ${pGroup1.map(p => {
        const d = projectDetails[p.slug]?.[lang]
        return `
          <div class="card" style="padding: 10px 13px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <span class="mono accent" style="font-size: 7.5pt; font-weight: 600;">${escapeHtml(p.num)}</span>
              <span style="font-size: 7.5pt; color: #4A463F;" class="mono">${escapeHtml(d?.githubUrl || '')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
              <h2 style="font-size: 16pt; letter-spacing: -0.4px;">${escapeHtml(p.title)}</h2>
            </div>
            <p style="font-size: 8.2pt; color: #383530; line-height: 1.35; margin: 0 0 6px 0;">
              ${escapeHtml(p.description)}
            </p>

            ${d && d.architecture && d.architecture.length > 0 ? `
              <div style="background: #F9F8F5; border: 1px solid #E3DFD5; border-radius: 6px; padding: 6px 10px; margin-bottom: 6px;">
                <div style="font-size: 7pt; letter-spacing: 1px; text-transform: uppercase; color: #7A756C; font-weight: 600; margin-bottom: 3px;">
                  ${isJp ? 'アーキテクチャ＆技術的ハイライト' : 'KEY ARCHITECTURAL HIGHLIGHTS'}
                </div>
                <ul class="bullet-list" style="margin-top: 2px;">
                  ${d.architecture.slice(0, 3).map(arch => `
                    <li style="font-size: 7.8pt; line-height: 1.32; margin-bottom: 2.5px;">${escapeHtml(arch)}</li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}

            <div style="margin-top: 4px;">
              ${p.tags.map(t => `<span class="pill pill-accent">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
        `
      }).join('')}
    </div>

    <div class="page-footer">
      <span>Romero Alejandro • ${contactEmail}</span>
      <span>Page 2 of 5</span>
    </div>
  </div>


  <!-- ==================== PAGE 3: FLAGSHIP PROJECTS II (PATHFINDER, PARACLEA, MAZZAROTH, HIKARIGO) ==================== -->
  <div class="page">
    <div class="page-header">
      <span>FLAGSHIP SYSTEMS ARCHITECTURE (PART II)</span>
      <span>ROBOTICS, OFFLINE VAULTS & DISTRIBUTED SYSTEMS</span>
    </div>

    <div class="content-wrap">
      <div style="margin-bottom: 8px;">
        <div class="section-eyebrow">${isJp ? '主要開発システム 04〜07' : 'FLAGSHIP SYSTEMS 04 — 07'}</div>
        <p style="font-size: 8pt; color: #55524C; margin: 0;">
          ${isJp ? '自律型ロボティクス、LoRaオフグリッド通信、SBC向けBM25検索エンジン、分散学習基盤' : 'Autonomous robotics, LoRa off-grid mesh, SBC full-text search, and local-first spaced repetition.'}
        </p>
      </div>

      <div class="grid-2" style="gap: 8px;">
        ${pGroup2.map(p => {
          const d = projectDetails[p.slug]?.[lang]
          return `
            <div class="card" style="padding: 9px 11px; margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                  <span class="mono accent" style="font-size: 7.2pt; font-weight: 600;">${escapeHtml(p.num)}</span>
                  <span style="font-size: 6.8pt; color: #7A756C;" class="mono">${escapeHtml(d?.githubUrl ? d.githubUrl.replace('https://github.com/', '') : '')}</span>
                </div>
                <h3 style="font-size: 13pt; line-height: 1.15; margin-bottom: 3px;">${escapeHtml(p.title)}</h3>
                <p style="font-size: 7.8pt; color: #383530; line-height: 1.32; margin: 0 0 6px 0;">
                  ${escapeHtml(p.description)}
                </p>

                ${d && d.architecture && d.architecture.length > 0 ? `
                  <div style="background: #F9F8F5; border: 1px solid #E3DFD5; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px;">
                    <ul class="bullet-list" style="margin: 0;">
                      ${d.architecture.slice(0, 2).map(arch => `
                        <li style="font-size: 7.3pt; line-height: 1.28; margin-bottom: 2px;">${escapeHtml(arch)}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>

              <div>
                ${p.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('')}
              </div>
            </div>
          `
        }).join('')}
      </div>
    </div>

    <div class="page-footer">
      <span>Romero Alejandro • ${contactEmail}</span>
      <span>Page 3 of 5</span>
    </div>
  </div>


  <!-- ==================== PAGE 4: TECHNICAL SKILLS, TIMELINE & INTERESTS ==================== -->
  <div class="page">
    <div class="page-header">
      <span>EXPERTISE & BACKGROUND</span>
      <span>SKILLS MATRIX, TIMELINE & PERSPECTIVES</span>
    </div>

    <div class="content-wrap">
      <!-- Technical Skills Matrix (6 Balanced Cards in 3x2 Grid) -->
      <div style="margin-bottom: 10px;">
        <div class="section-eyebrow">${isJp ? '特技・技術スキルマトリクス' : 'TECHNICAL SKILLS MATRIX'}</div>
        <div class="grid-3" style="gap: 8px;">
          <!-- 1: Systems -->
          <div class="card" style="padding: 7px 10px; margin-bottom: 0;">
            <h4 style="font-size: 10.5pt; color: #191919; margin-bottom: 2px;">
              ${isJp ? '低レイヤ・システムプログラミング' : 'Systems & Low-Level Architecture'}
            </h4>
            <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.34; margin: 0;">
              ${isJp
                ? 'Rust（主言語・100%純粋コア開発・マルチクレート）、Go、C/C++、SIMD最適化（AVX2/ARM NEON）、アリーナメモリ管理、単一バイナリ設計、Linux（Arch Linux日常常用）、Bash、Podman/Docker。'
                : 'Rust (primary language, 100% pure cores, multi-crate workspaces), Go, C/C++, SIMD (AVX2/NEON), arena memory allocation, zero-dependency single binaries, Arch Linux, Bash, Podman/Docker.'}
            </p>
          </div>

          <!-- 2: Edge AI -->
          <div class="card" style="padding: 7px 10px; margin-bottom: 0;">
            <h4 style="font-size: 10.5pt; color: #191919; margin-bottom: 2px;">
              ${isJp ? 'エッジAI・LLM推論ランタイム' : 'Edge AI & LLM Inference Runtimes'}
            </h4>
            <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.34; margin: 0;">
              ${isJp
                ? '3層適応型ストリーミング推論（70BモデルをRAM 1.1GBで推論）、GGUF/Safetensors解析、GBNF構造化文法制約、SQLite FTS5シナプス型グラフ記憶、BM25全文検索、Python（scikit-learn）。'
                : '3-tier adaptive streaming runtime (70B LLM at 1.1GB RAM), GGUF/Safetensors execution, GBNF grammar sampling, SQLite FTS5 synaptic graph memory, BM25 text retrieval, Python (scikit-learn).'}
            </p>
          </div>

          <!-- 3: Hardware & Robotics -->
          <div class="card" style="padding: 7px 10px; margin-bottom: 0;">
            <h4 style="font-size: 10.5pt; color: #191919; margin-bottom: 2px;">
              ${isJp ? '組込みハードウェア・ロボティクス' : 'Hardware & Embedded Robotics'}
            </h4>
            <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.34; margin: 0;">
              ${isJp
                ? 'Raspberry Pi 5、Pi Zero 2W、Orange Pi 6 Plus、ESP32-S3/C3、I2C/SPI通信、メカナムホイール運動学、リアルタイムYOLO物体認識（30fps）、3D CADモデリング・迅速FDM筐体試作。'
                : 'Raspberry Pi 5, Pi Zero 2W, Orange Pi 6 Plus, ESP32-S3/C3, I2C/SPI protocols, mecanum locomotion kinematics, real-time YOLO vision (30fps), 3D CAD modeling & rapid FDM additive prototyping.'}
            </p>
          </div>

          <!-- 4: Web & Production -->
          <div class="card" style="padding: 7px 10px; margin-bottom: 0;">
            <h4 style="font-size: 10.5pt; color: #191919; margin-bottom: 2px;">
              ${isJp ? '本番Web・データ移行・インフラ' : 'Web Backends & Data Modernization'}
            </h4>
            <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.34; margin: 0;">
              ${isJp
                ? 'Axum、Tokio非同期ランタイム、Actix-web、Rusqlite（組み込みWALモード）、レガシーAccessからSQLiteへの完全移行（89テーブル/11,133件）、HTML5/CSS3、TypeScript/React、Git/CI/CD。'
                : 'Axum, Tokio async runtime, Actix-web, embedded SQLite WAL mode, complete zero-loss legacy Access to SQLite migration (89 tables / 11,133 records), HTML5/CSS3, TypeScript/React, Git/CI/CD.'}
            </p>
          </div>

          <!-- 5: Languages -->
          <div class="card" style="padding: 7px 10px; margin-bottom: 0; background: #FDFBFA; border-color: #E8D3C4;">
            <h4 style="font-size: 10.5pt; color: #B54500; margin-bottom: 2px;">
              ${isJp ? '多言語コミュニケーション能力' : 'Language Proficiency (4 Languages)'}
            </h4>
            <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.34; margin: 0;">
              ${isJp
                ? 'スペイン語（母語・ネイティブ）、英語（ビジネスレベル・多国籍教育）、日本語（日常会話・専門講義聴講・日本語能力試験N2取得に向けて学習中）、フランス語（基礎学習中）。'
                : 'Spanish (Native speaker), English (Business level / multinational education), Japanese (Conversational / technical coursework / JLPT N2 study), French (Basic study).'}
            </p>
          </div>

          <!-- 6: Credentials & Emergency -->
          <div class="card" style="padding: 7px 10px; margin-bottom: 0;">
            <h4 style="font-size: 10.5pt; color: #191919; margin-bottom: 2px;">
              ${isJp ? '公的資格・救急法・AI研鑽' : 'Certifications & Emergency Training'}
            </h4>
            <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.34; margin: 0;">
              ${isJp
                ? '生成AIパスポート合格（2025年10月）、赤十字救急法短期講習修了（日本赤十字社東京都支部・2026年4月）、SIGNATE Cloud Lv.63（870問以上演習クリア）、Anthropic Claude 101修了。'
                : 'Generative AI Passport Certified (Oct 2025), Japanese Red Cross First Aid Certified (Tokyo Branch, Apr 2026), SIGNATE Cloud Level 63 (870+ exercises completed), Anthropic Claude 101 Certified.'}
            </p>
          </div>
        </div>
      </div>

      <!-- Academic & Professional Journey Timeline -->
      <div style="margin-bottom: 10px;">
        <div class="section-eyebrow">${escapeHtml(c.about.timelineHeading || (isJp ? '学歴・職歴タイムライン' : 'ACADEMIC & PROFESSIONAL JOURNEY'))}</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${(c.about.timeline || []).map(item => `
            <div class="card" style="padding: 6.5px 11px; margin-bottom: 0; display: flex; align-items: flex-start; gap: 12px;">
              <div style="min-width: 85px; flex-shrink: 0;">
                <span class="mono accent" style="font-size: 7.8pt; font-weight: 600;">${escapeHtml(item.period)}</span>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                  <h4 style="font-size: 10.5pt; margin: 0;">${escapeHtml(item.title)}</h4>
                  <span class="pill" style="font-size: 6.6pt; margin: 0;">${escapeHtml(item.role)}</span>
                </div>
                <p style="font-size: 7.6pt; color: #4A463F; line-height: 1.32; margin: 0;">
                  ${escapeHtml(item.desc)}
                </p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Hobbies & Specialized Academic Subjects (Direct from Resume) -->
      <div class="grid-2" style="gap: 8px;">
        <div class="card" style="padding: 8px 12px; margin-bottom: 0;">
          <div style="font-size: 7pt; letter-spacing: 1px; text-transform: uppercase; color: #7A756C; font-weight: 600; margin-bottom: 3px;">
            ${isJp ? '【趣味・自己管理】' : 'PERSONAL PURSUITS & SELF-DISCIPLINE'}
          </div>
          <p style="font-size: 7.8pt; color: #4A463F; line-height: 1.36; margin: 0;">
            ${isJp
              ? '・<strong>デッサン：</strong>高校時代から独学で継続し、観察力と表現力を向上<br>・<strong>筋力トレーニング：</strong>日々の自宅トレーニングによる体力維持と自己管理<br>・<strong>デザイン：</strong>FigmaによるUIプロトタイピングやオリジナルロゴ作成'
              : '• <strong>Sketching:</strong> Self-taught since high school, continuously honing visual observation and analytical drawing.<br>• <strong>Strength Training:</strong> Daily home training regimens for physical stamina, focus, and self-discipline.<br>• <strong>UI Design:</strong> Rapid interactive prototyping, design systems, and vector logo design in Figma.'}
          </p>
        </div>

        <div class="card" style="padding: 8px 12px; margin-bottom: 0;">
          <div style="font-size: 7pt; letter-spacing: 1px; text-transform: uppercase; color: #7A756C; font-weight: 600; margin-bottom: 3px;">
            ${isJp ? '【得意科目・研究関心】' : 'SPECIALIZED ACADEMIC SUBJECTS'}
          </div>
          <p style="font-size: 7.8pt; color: #4A463F; line-height: 1.36; margin: 0;">
            ${isJp
              ? '・<strong>AIプロジェクト開発：</strong>エッジLLM推論基盤・自律エージェントのフルサイクル実装<br>・<strong>コンピュータサイエンス：</strong>メモリレイアウト、アリーナ割当、低レイヤ並行処理<br>・<strong>アルゴリズムとデータ構造：</strong>グラフ走査、BM25全文検索、シナプス連想記憶'
              : '• <strong>AI Project Development:</strong> Full-cycle implementation of edge LLM streaming runtimes and autonomous agents.<br>• <strong>Computer Science:</strong> Memory layout, arena allocation, SIMD parallelism, zero-cost abstractions.<br>• <strong>Algorithms & Data Structures:</strong> Graph traversal, SQLite FTS5 BM25 search, associative memory.'}
          </p>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Romero Alejandro • ${contactEmail}</span>
      <span>Page 4 of 5</span>
    </div>
  </div>


  <!-- ==================== PAGE 5: COMPLETE VOLUNTEER & HUMANITARIAN LEADERSHIP ==================== -->
  <div class="page">
    <div class="page-header">
      <span>LEADERSHIP & GLOBAL IMPACT</span>
      <span>VOLUNTEER & HUMANITARIAN RECORD</span>
    </div>

    <div class="content-wrap">
      <div style="margin-bottom: 10px;">
        <div class="section-eyebrow">${escapeHtml(c.about.volunteerHeading || (isJp ? 'ボランティア・社会活動実績' : 'VOLUNTEER & HUMANITARIAN LEADERSHIP'))}</div>
        <p style="font-size: 8.4pt; color: #55524C; margin: 0; line-height: 1.38;">
          ${escapeHtml(c.about.volunteerSubtext || '')}
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 9px;">
        ${(c.about.volunteerCategories || []).map(cat => `
          <div class="card" style="padding: 11px 15px; margin-bottom: 0;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #E06000; flex-shrink: 0;"></span>
              <h3 style="font-size: 13pt; line-height: 1.2;">${escapeHtml(cat.category)}</h3>
            </div>
            <ul class="bullet-list" style="margin-top: 4px;">
              ${cat.items.map(it => `
                <li style="font-size: 8.3pt; line-height: 1.4; margin-bottom: 4.5px;">${escapeHtml(it)}</li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Leadership & Humanitarian Philosophy Card -->
      <div class="card" style="padding: 10px 14px; margin-top: 9px; margin-bottom: 0; background: #FAF9F6; border-left: 3px solid #E06000;">
        <div style="font-size: 7.2pt; letter-spacing: 1px; text-transform: uppercase; color: #E06000; font-weight: 600; margin-bottom: 3px;">
          ${isJp ? '活動哲学・現場適応力' : 'HUMANITARIAN PHILOSOPHY & FIELD ADAPTABILITY'}
        </div>
        <p style="font-size: 8pt; color: #4A463F; line-height: 1.38; margin: 0;">
          ${isJp
            ? '15歳でのボツワナ医療帯同やフィリピン山岳部での6時間におよぶ徒歩支援など、苛酷な現場環境でも動じずに行動できる高い精神力と適応力を培ってきました。さらに、日本国内では子どもから大人までを対象としたロボティクス・プログラミング・工作教室の企画・指導やバイリンガル通訳を担当。技術と人道的精神を融合させ、多国籍・多世代のチームを牽引できるリーダーシップを発揮します。'
            : 'From clinical triage in Botswana at age 15 to 6-hour mountain treks delivering medicine to remote Philippine tribes, these experiences forged extreme resilience, emergency calm, and deep cross-cultural adaptability. Combined with bilingual interpreting and hands-on technology education across Japan, these humanitarian foundations drive my commitment to engineering systems that genuinely protect, serve, and empower communities worldwide.'}
        </p>
      </div>

      <!-- Contact Ribbon Callout -->
      <div style="margin-top: 9px; background: #FFFFFF; border: 1px solid #D8D4CA; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div class="serif" style="font-size: 14pt; line-height: 1.2;">
            ${isJp ? '採用・技術的なご相談・共同開発のお問い合わせ' : 'Inquiries, Engineering Roles & Collaborations'}
          </div>
          <div style="font-size: 7.8pt; color: #6E6A62; margin-top: 2px;">
            ${isJp ? '低レイヤRust開発、LLM推論基盤、自律型ロボティクス、基幹システム刷新' : 'Systems engineering, low-level Rust, LLM streaming engines, and robotics.'}
          </div>
        </div>
        <div style="text-align: right; font-size: 8pt; line-height: 1.4;">
          <div><strong class="mono accent">${contactEmail}</strong></div>
          <div class="mono" style="color: #4A463F;">${contactPortfolio}</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Romero Alejandro • ${contactEmail}</span>
      <span>Page 5 of 5</span>
    </div>
  </div>

</body>
</html>
`
}

async function run() {
  console.log('Generating HTML templates...')
  const enHtml = renderHtml('en')
  const jpHtml = renderHtml('jp')

  const enHtmlPath = path.resolve('public', 'portfolio_print_en.html')
  const jpHtmlPath = path.resolve('public', 'portfolio_print_jp.html')

  fs.writeFileSync(enHtmlPath, enHtml, 'utf8')
  fs.writeFileSync(jpHtmlPath, jpHtml, 'utf8')
  console.log('Wrote HTML files to public directory.')

  const enPdfName = 'Romero_Alejandro_Portfolio.pdf'
  const jpPdfName = 'Romero_Alejandro_Portfolio_JP.pdf'

  const tempEnPdf = path.resolve('dist', enPdfName)
  const tempJpPdf = path.resolve('dist', jpPdfName)

  // Ensure dist exists
  if (!fs.existsSync(path.resolve('dist'))) {
    fs.mkdirSync(path.resolve('dist'), { recursive: true })
  }

  console.log('Compiling English PDF via Brave...')
  execSync(
    `brave --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${tempEnPdf}" "file://${enHtmlPath}"`,
    { stdio: 'inherit' }
  )

  console.log('Compiling Japanese PDF via Brave...')
  execSync(
    `brave --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${tempJpPdf}" "file://${jpHtmlPath}"`,
    { stdio: 'inherit' }
  )

  // Copy to public directory for deployment
  fs.copyFileSync(tempEnPdf, path.join(PUBLIC_DIR, enPdfName))
  fs.copyFileSync(tempJpPdf, path.join(PUBLIC_DIR, jpPdfName))
  console.log(`Copied PDFs to ${PUBLIC_DIR}`)

  // Copy to root workspace
  fs.copyFileSync(tempEnPdf, path.join(OUTPUT_DIR, enPdfName))
  fs.copyFileSync(tempJpPdf, path.join(OUTPUT_DIR, jpPdfName))
  console.log(`Copied PDFs to ${OUTPUT_DIR}`)

  // Copy to school directory
  if (fs.existsSync(SCHOOL_DIR)) {
    fs.copyFileSync(tempEnPdf, path.join(SCHOOL_DIR, 'ポートフォリオ_EN.pdf'))
    fs.copyFileSync(tempJpPdf, path.join(SCHOOL_DIR, 'ポートフォリオ.pdf'))
    fs.copyFileSync(tempJpPdf, path.join(SCHOOL_DIR, 'ポートフォリオ_JP.pdf'))
    console.log(`Copied PDFs to ${SCHOOL_DIR}`)
  }

  console.log('PDF generation complete!')
}

run().catch(console.error)
