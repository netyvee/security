'use client';

import { useState, useEffect } from 'react';

const colors = {
  navy: '#0a1628',
  card: '#0f1f3d',
  teal: '#4ecdc4',
  red: '#ef4444',
  amber: '#f59e0b',
  green: '#22c55e',
  text: 'rgba(255,255,255,0.9)',
  muted: 'rgba(255,255,255,0.5)',
  dim: 'rgba(255,255,255,0.2)',
  border: 'rgba(78,205,196,0.2)',
};

function card(extra = {}): React.CSSProperties {
  return {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '1.25rem',
    marginBottom: '1rem',
    ...extra,
  };
}

function label(text: string) {
  return (
    <p style={{
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.07em',
      textTransform: 'uppercase' as const,
      color: colors.teal,
      marginBottom: 10,
    }}>{text}</p>
  );
}

function badge(text: string, color: string) {
  return (
    <span style={{
      fontSize: 11,
      padding: '2px 8px',
      borderRadius: 10,
      background: color + '22',
      color,
      fontWeight: 500,
    }}>{text}</span>
  );
}

function scoreColor(score: number): string {
  if (score >= 70) return colors.green;
  if (score >= 40) return colors.amber;
  return colors.red;
}

export default function SiteHealth() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'dry_run' | 'live'>('dry_run');
  const [setupStatus, setSetupStatus] = useState<any>(null);
  const [confirmLive, setConfirmLive] = useState(false);

  useEffect(() => {
    fetch('/api/admin/setup-check')
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setSetupStatus(d))
      .catch(() => {});
  }, []);

  const runAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/health-check?mode=${mode}`,
        { signal: AbortSignal.timeout(60000) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || 'Audit failed');
    } finally {
      setLoading(false);
    }
  };

  const score = result?.score ?? 0;
  const grade = result?.grade ?? '-';
  const summary = result?.summary ?? {};
  const issues = result?.critical_issues ?? [];
  const warnings = result?.warnings ?? [];
  const pages = result?.page_results ?? [];
  const byCategory = result?.by_category ?? {};
  const moduleResults = result?.module_results ?? {};
  const timings = result?.module_timings_ms ?? {};
  const ahrefs = result?.ahrefs_comparison ?? {};
  const writeLog = result?.write_operation_log ?? [];
  const pagerank = moduleResults?.pagerank ?? null;
  const cwv = moduleResults?.core_web_vitals ?? null;
  const gsc = moduleResults?.gsc_data ?? null;
  const changes = moduleResults?.changes ?? null;
  const pageSizeData = moduleResults?.page_size ?? null;

  return (
    <div style={{ color: colors.text, fontFamily: 'sans-serif' }}>

      {/* SETUP STATUS BAR */}
      {setupStatus && (
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap' as const,
          marginBottom: '1rem',
          padding: '0.75rem 1rem',
          background: colors.card,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
        }}>
          {Object.entries(setupStatus?.checks ?? {}).map(
            ([key, val]: [string, any]) => (
              <span key={key} style={{
                fontSize: 11,
                padding: '3px 10px',
                borderRadius: 12,
                background: val.status === 'ok'
                  ? colors.green + '22'
                  : colors.red + '22',
                color: val.status === 'ok'
                  ? colors.green
                  : colors.red,
              }}>
                {val.status === 'ok' ? '✓' : '✗'}{' '}
                {key.replace(/_/g, ' ')}
              </span>
            )
          )}
        </div>
      )}

      {/* MODE TOGGLE + RUN BUTTON */}
      <div style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        marginBottom: '1.25rem',
        flexWrap: 'wrap' as const,
      }}>
        <button
          onClick={() => setMode('dry_run')}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: `1px solid ${mode === 'dry_run' ? colors.teal : colors.dim}`,
            background: mode === 'dry_run' ? colors.teal + '22' : 'transparent',
            color: mode === 'dry_run' ? colors.teal : colors.muted,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >Dry Run</button>
        <button
          onClick={() => setConfirmLive(true)}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: `1px solid ${mode === 'live' ? colors.red : colors.dim}`,
            background: mode === 'live' ? colors.red + '22' : 'transparent',
            color: mode === 'live' ? colors.red : colors.muted,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >Live Mode</button>
        <button
          onClick={runAudit}
          disabled={loading}
          style={{
            padding: '8px 24px',
            borderRadius: 8,
            border: 'none',
            background: loading ? colors.dim : colors.teal,
            color: loading ? colors.muted : colors.navy,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: 14,
            marginLeft: 8,
          }}
        >
          {loading ? 'Auditing...' : 'Run Audit'}
        </button>
        {result && (
          <span style={{ fontSize: 12, color: colors.muted }}>
            Last run: {new Date(result.checked_at).toLocaleTimeString()}
            {' · '}{result.duration_ms}ms
            {' · '}{result.tool}
          </span>
        )}
      </div>

      {/* LIVE MODE CONFIRM */}
      {confirmLive && (
        <div style={{
          ...card(),
          border: `1px solid ${colors.red}`,
          marginBottom: '1rem',
        }}>
          <p style={{ color: colors.red, fontWeight: 500, marginBottom: 8 }}>
            Switch to Live Mode?
          </p>
          <p style={{ fontSize: 13, color: colors.muted, marginBottom: 12 }}>
            This submits eligible pages to Google for indexing.
            Maximum 10 submissions per run.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => {
              setMode('live');
              setConfirmLive(false);
            }} style={{
              padding: '6px 16px',
              borderRadius: 8,
              border: 'none',
              background: colors.red,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
            }}>Confirm Live Mode</button>
            <button onClick={() => setConfirmLive(false)} style={{
              padding: '6px 16px',
              borderRadius: 8,
              border: `1px solid ${colors.dim}`,
              background: 'transparent',
              color: colors.muted,
              cursor: 'pointer',
              fontSize: 13,
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={{
          ...card(),
          border: `1px solid ${colors.red}`,
        }}>
          <p style={{ color: colors.red }}>
            ✗ Audit failed: {error}
          </p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: colors.teal, fontSize: 16 }}>
            Auditing {summary.pages_audited || '...'} pages...
          </p>
          <p style={{ color: colors.muted, fontSize: 13, marginTop: 8 }}>
            Running {ahrefs?.checks_we_now_perform?.length || 38} checks
          </p>
        </div>
      )}

      {/* RESULTS */}
      {result && !loading && (
        <>
          {/* SECTION A — SCORE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: '1.25rem' }}>
            <div style={{ ...card({ textAlign: 'center' }) }}>
              <div style={{
                fontSize: 42,
                fontWeight: 700,
                color: scoreColor(score),
                lineHeight: 1,
              }}>{score}</div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Score / 100</div>
            </div>
            <div style={{ ...card({ textAlign: 'center' }) }}>
              <div style={{ fontSize: 42, fontWeight: 700, color: scoreColor(score), lineHeight: 1 }}>{grade}</div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Grade</div>
            </div>
            <div style={{ ...card({ textAlign: 'center' }) }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.red, lineHeight: 1 }}>{summary.errors ?? 0}</div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Errors</div>
            </div>
            <div style={{ ...card({ textAlign: 'center' }) }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.amber, lineHeight: 1 }}>{summary.warnings ?? 0}</div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Warnings</div>
            </div>
            <div style={{ ...card({ textAlign: 'center' }) }}>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{summary.pages_audited ?? 0}</div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Pages audited</div>
            </div>
            <div style={{ ...card({ textAlign: 'center' }) }}>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{summary.total_issues ?? 0}</div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>Total issues</div>
            </div>
          </div>

          {/* SECTION B — ISSUES BY CATEGORY */}
          {Object.keys(byCategory).length > 0 && (
            <>
              {label('Issues by category')}
              <div style={card()}>
                {Object.entries(byCategory)
                  .sort(([,a],[,b]) => (b as number) - (a as number))
                  .map(([cat, count]) => (
                    <div key={cat} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 8,
                    }}>
                      <div style={{
                        width: 140,
                        fontSize: 12,
                        color: colors.muted,
                        flexShrink: 0,
                      }}>{cat}</div>
                      <div style={{
                        flex: 1,
                        height: 5,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(100, ((count as number) / (summary.total_issues || 1)) * 100 * 3)}%`,
                          background: (count as number) > 10 ? colors.red : colors.amber,
                          borderRadius: 3,
                        }} />
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: colors.muted,
                        width: 24,
                        textAlign: 'right',
                        flexShrink: 0,
                      }}>{count as number}</div>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* SECTION C — CRITICAL ERRORS */}
          {issues.length > 0 && (
            <>
              {label(`Critical errors — ${issues.length}`)}
              <div style={card()}>
                {issues.map((issue: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 8,
                    padding: '6px 0',
                    borderBottom: i < issues.length - 1
                      ? `1px solid ${colors.dim}`
                      : 'none',
                    fontSize: 12,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: 10,
                      padding: '2px 6px',
                      borderRadius: 8,
                      background: colors.red + '22',
                      color: colors.red,
                      whiteSpace: 'nowrap' as const,
                      flexShrink: 0,
                    }}>{issue.category}</span>
                    <span style={{ flex: 1, color: colors.text, lineHeight: 1.5 }}>
                      {issue.message}
                    </span>
                    <span style={{ color: colors.red, flexShrink: 0 }}>
                      -{issue.impact}pts
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* SECTION D — WARNINGS */}
          {warnings.length > 0 && (
            <>
              {label(`Warnings — ${warnings.length}`)}
              <div style={card()}>
                {warnings.map((w: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 8,
                    padding: '6px 0',
                    borderBottom: i < warnings.length - 1
                      ? `1px solid ${colors.dim}`
                      : 'none',
                    fontSize: 12,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: 10,
                      padding: '2px 6px',
                      borderRadius: 8,
                      background: colors.amber + '22',
                      color: colors.amber,
                      whiteSpace: 'nowrap' as const,
                      flexShrink: 0,
                    }}>{w.category}</span>
                    <span style={{ flex: 1, color: colors.text, lineHeight: 1.5 }}>
                      {w.message}
                    </span>
                    <span style={{ color: colors.amber, flexShrink: 0 }}>
                      -{w.impact}pts
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* SECTION E — PAGERANK */}
          {pagerank && (
            <>
              {label('Internal PageRank distribution')}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginBottom: '1rem',
              }}>
                <div style={card()}>
                  <p style={{ fontSize: 12, color: colors.teal, marginBottom: 10 }}>
                    Top 5 — highest authority
                  </p>
                  {(pagerank.top_5_pages || []).map((p: any) => (
                    <div key={p.url} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 8,
                    }}>
                      <div style={{
                        flex: 1,
                        fontSize: 11,
                        color: colors.muted,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap' as const,
                      }}>
                        {p.url.replace('https://security.vigilservices.co.uk', '') || '/'}
                      </div>
                      <div style={{
                        width: 60,
                        height: 4,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${p.score}%`,
                          height: '100%',
                          background: p.score > 60 ? colors.green : p.score > 30 ? colors.amber : colors.red,
                          borderRadius: 2,
                        }} />
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: p.score > 60 ? colors.green : p.score > 30 ? colors.amber : colors.red,
                        width: 28,
                        textAlign: 'right' as const,
                      }}>{p.score}</div>
                    </div>
                  ))}
                </div>
                <div style={card()}>
                  <p style={{ fontSize: 12, color: colors.red, marginBottom: 10 }}>
                    Bottom 5 — under-linked
                  </p>
                  {(pagerank.bottom_5_pages || []).map((p: any) => (
                    <div key={p.url} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 8,
                    }}>
                      <div style={{
                        flex: 1,
                        fontSize: 11,
                        color: colors.muted,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap' as const,
                      }}>
                        {p.url.replace('https://security.vigilservices.co.uk', '') || '/'}
                      </div>
                      <div style={{
                        width: 60,
                        height: 4,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${p.score}%`,
                          height: '100%',
                          background: colors.red,
                          borderRadius: 2,
                        }} />
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: colors.red,
                        width: 28,
                        textAlign: 'right' as const,
                      }}>{p.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SECTION F — CORE WEB VITALS */}
          {label('Core Web Vitals')}
          {(!cwv || cwv.pages_tested === 0) ? (
            <div style={{
              ...card(),
              border: `1px solid ${colors.dim}`,
              opacity: 0.7,
            }}>
              <p style={{ color: colors.muted, fontSize: 13 }}>
                Not configured — add PAGESPEED_API_KEY to Vercel
              </p>
              <a href="/api/admin/setup-check" target="_blank" style={{
                color: colors.teal,
                fontSize: 12,
              }}>
                Run setup check →
              </a>
            </div>
          ) : (
            <div style={{ ...card(), overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    {['Page','Mobile','Desktop','LCP','CLS','TBT','Grade'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left' as const,
                        padding: '4px 8px',
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.dim}`,
                        fontWeight: 500,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(cwv.results || []).map((r: any) => (
                    <tr key={r.url}>
                      <td style={{ padding: '6px 8px', color: colors.muted }}>
                        {r.url.replace('https://security.vigilservices.co.uk', '') || '/'}
                      </td>
                      <td style={{ padding: '6px 8px', color: scoreColor(r.mobile_score) }}>
                        {r.mobile_score}
                      </td>
                      <td style={{ padding: '6px 8px', color: scoreColor(r.desktop_score) }}>
                        {r.desktop_score}
                      </td>
                      <td style={{ padding: '6px 8px', color: r.lcp > 4 ? colors.red : r.lcp > 2.5 ? colors.amber : colors.green }}>
                        {r.lcp}s
                      </td>
                      <td style={{ padding: '6px 8px', color: r.cls > 0.25 ? colors.red : r.cls > 0.1 ? colors.amber : colors.green }}>
                        {r.cls}
                      </td>
                      <td style={{ padding: '6px 8px', color: r.tbt > 600 ? colors.red : r.tbt > 200 ? colors.amber : colors.green }}>
                        {r.tbt}ms
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        {badge(
                          r.grade,
                          r.grade === 'good' ? colors.green : r.grade === 'needs-improvement' ? colors.amber : colors.red
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SECTION G — GSC DATA */}
          {label('Google Search Console')}
          {(!gsc || !gsc.connected) ? (
            <div style={{
              ...card(),
              border: `1px solid ${colors.dim}`,
              opacity: 0.7,
            }}>
              <p style={{ color: colors.muted, fontSize: 13, marginBottom: 8 }}>
                Not connected — complete OAuth to unlock search performance data
              </p>
              <a href="/api/admin/gsc-auth" style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: 8,
                border: `1px solid ${colors.teal}`,
                color: colors.teal,
                fontSize: 12,
                textDecoration: 'none',
              }}>Connect GSC →</a>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gap: 10,
                marginBottom: '1rem',
              }}>
                {[
                  { label: 'Clicks (28d)', value: gsc.total_clicks_28d ?? 0 },
                  { label: 'Impressions (28d)', value: gsc.total_impressions_28d ?? 0 },
                  { label: 'Avg CTR', value: `${gsc.average_ctr ?? 0}%` },
                  { label: 'Avg Position', value: gsc.average_position ?? 0 },
                ].map(m => (
                  <div key={m.label} style={{ ...card({ textAlign: 'center' }) }}>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              {(gsc.top_5_pages || []).length > 0 && (
                <div style={{ ...card(), overflowX: 'auto' as const }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr>
                        {['Page','Clicks','Impressions','CTR','Position'].map(h => (
                          <th key={h} style={{
                            textAlign: 'left' as const,
                            padding: '4px 8px',
                            color: colors.muted,
                            borderBottom: `1px solid ${colors.dim}`,
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(gsc.top_5_pages || []).map((p: any) => (
                        <tr key={p.url}>
                          <td style={{ padding: '6px 8px', color: colors.muted }}>
                            {p.url.replace('https://security.vigilservices.co.uk', '') || '/'}
                          </td>
                          <td style={{ padding: '6px 8px' }}>{p.clicks}</td>
                          <td style={{ padding: '6px 8px' }}>{p.impressions}</td>
                          <td style={{ padding: '6px 8px' }}>{p.ctr}%</td>
                          <td style={{ padding: '6px 8px', color: p.position <= 3 ? colors.green : p.position <= 10 ? colors.amber : colors.red }}>
                            {p.position}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* SECTION H — PAGE RESULTS */}
          {pages.length > 0 && (
            <>
              {label(`Page results — ${pages.length} pages`)}
              <div style={{ ...card(), overflowX: 'auto' as const }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <thead>
                    <tr>
                      {['Page','Status','Canon','H1','Words','Sitemap','Issues','PR'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left' as const,
                          padding: '4px 8px',
                          color: colors.muted,
                          borderBottom: `1px solid ${colors.dim}`,
                          fontWeight: 500,
                          whiteSpace: 'nowrap' as const,
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((p: any) => (
                      <tr key={p.url} style={{
                        borderBottom: `1px solid ${colors.dim}`,
                      }}>
                        <td style={{ padding: '5px 8px', color: colors.muted, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                          {p.url.replace('https://security.vigilservices.co.uk', '') || '/'}
                        </td>
                        <td style={{ padding: '5px 8px', color: p.status === 200 ? colors.green : colors.red }}>
                          {p.status}
                        </td>
                        <td style={{ padding: '5px 8px', color: p.canonical_ok ? colors.green : colors.red }}>
                          {p.canonical_ok ? '✓' : '✗'}
                        </td>
                        <td style={{ padding: '5px 8px', color: p.has_h1 ? colors.green : colors.red }}>
                          {p.has_h1 ? '✓' : '✗'}
                        </td>
                        <td style={{ padding: '5px 8px', color: p.word_count > 300 ? colors.green : colors.amber }}>
                          {p.word_count ?? 0}
                        </td>
                        <td style={{ padding: '5px 8px', color: p.in_sitemap ? colors.green : colors.muted }}>
                          {p.in_sitemap ? '✓' : '—'}
                        </td>
                        <td style={{ padding: '5px 8px', color: (p.issue_count ?? 0) > 0 ? colors.red : colors.green }}>
                          {p.issue_count ?? 0}
                        </td>
                        <td style={{ padding: '5px 8px', color: (p.page_rank ?? 0) > 60 ? colors.green : (p.page_rank ?? 0) > 30 ? colors.amber : colors.red }}>
                          {p.page_rank ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* SECTION I — MODULE TIMINGS */}
          {Object.keys(timings).length > 0 && (
            <>
              {label('Module timings')}
              <div style={card()}>
                {Object.entries(timings).map(([mod, ms]) => (
                  <div key={mod} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                  }}>
                    <div style={{ width: 140, fontSize: 11, color: colors.muted, flexShrink: 0 }}>
                      {mod.replace(/_/g, ' ')}
                    </div>
                    <div style={{
                      flex: 1,
                      height: 4,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${Math.min(100, ((ms as number) / 5000) * 100)}%`,
                        height: '100%',
                        background: (ms as number) > 3000 ? colors.red : (ms as number) > 1000 ? colors.amber : colors.green,
                        borderRadius: 2,
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: colors.muted, width: 50, textAlign: 'right' as const }}>
                      {ms as number}ms
                    </div>
                  </div>
                ))}
                <div style={{
                  borderTop: `1px solid ${colors.dim}`,
                  paddingTop: 8,
                  marginTop: 4,
                  fontSize: 12,
                  color: colors.teal,
                }}>
                  Total: {result.duration_ms}ms
                </div>
              </div>
            </>
          )}

          {/* SECTION J — WRITE LOG */}
          {writeLog.length > 0 && (
            <>
              {label('Write operation log')}
              <div style={card()}>
                {writeLog.map((entry: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 8,
                    padding: '5px 0',
                    borderBottom: i < writeLog.length - 1 ? `1px solid ${colors.dim}` : 'none',
                    fontSize: 11,
                  }}>
                    <span style={{ color: colors.muted, flexShrink: 0 }}>
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                    <span style={{ color: colors.teal, flexShrink: 0 }}>
                      {entry.operation}
                    </span>
                    <span style={{ flex: 1, color: colors.muted, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {entry.url.replace('https://security.vigilservices.co.uk', '')}
                    </span>
                    <span style={{
                      color: entry.result.includes('SUCCESS') ? colors.green : entry.dryRun ? colors.muted : colors.red,
                      flexShrink: 0,
                    }}>
                      {entry.dryRun ? 'DRY RUN' : entry.result}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* SECTION K — AHREFS COMPARISON */}
          {ahrefs.checks_we_now_perform && (
            <>
              {label('Ahrefs comparison')}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 10,
                marginBottom: '1rem',
              }}>
                <div style={card()}>
                  <p style={{ fontSize: 12, color: colors.teal, marginBottom: 8 }}>
                    We perform ({(ahrefs.checks_we_now_perform || []).length})
                  </p>
                  {(ahrefs.checks_we_now_perform || []).map((c: string, i: number) => (
                    <p key={i} style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
                      ✓ {c}
                    </p>
                  ))}
                </div>
                <div style={card()}>
                  <p style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                    Still missing ({(ahrefs.checks_ahrefs_does_we_still_miss || []).length})
                  </p>
                  {(ahrefs.checks_ahrefs_does_we_still_miss || []).map((c: string, i: number) => (
                    <p key={i} style={{ fontSize: 11, color: colors.dim, marginBottom: 4 }}>
                      — {c}
                    </p>
                  ))}
                </div>
                <div style={card()}>
                  <p style={{ fontSize: 12, color: colors.green, marginBottom: 8 }}>
                    Our advantage ({(ahrefs.our_advantage_over_ahrefs || []).length})
                  </p>
                  {(ahrefs.our_advantage_over_ahrefs || []).map((c: string, i: number) => (
                    <p key={i} style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
                      ★ {c}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* EMPTY STATE */}
      {!result && !loading && !error && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: colors.muted,
        }}>
          <p style={{ fontSize: 16, marginBottom: 8 }}>
            Site Health Auditor
          </p>
          <p style={{ fontSize: 13 }}>
            Click Run Audit to analyse {result?.site || 'the site'}
          </p>
        </div>
      )}
    </div>
  );
}
