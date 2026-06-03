import { NextResponse } from 'next/server';

const FORBIDDEN_TERMS = [
  'SIA Approved',
  'ACS Registered',
  'ACS compliant',
  'BS7858 certified',
  'BS7858 vetted',
  'ISO Certified',
  'ISO 9001',
  '98%',
  '500+',
  '32 boroughs',
];

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      return NextResponse.json({
        error: 'GITHUB_TOKEN not configured',
        pages: 0,
        issues: [],
        compliance_violations: [],
        last_checked: new Date().toISOString(),
      });
    }

    // Fetch app directory contents
    const response = await fetch(
      'https://api.github.com/repos/netyvee/security/contents/app',
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch repository contents');
    }

    const contents = await response.json();
    const issues: Array<{ page: string; type: string; severity: string; description: string }> = [];
    const complianceViolations: Array<{ page: string; term: string; line: number }> = [];
    let pageCount = 0;

    // Recursively scan for page.tsx files
    const scanDirectory = async (path: string) => {
      const dirResponse = await fetch(
        `https://api.github.com/repos/netyvee/security/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!dirResponse.ok) return;

      const dirContents = await dirResponse.json();

      for (const item of dirContents) {
        if (item.type === 'dir') {
          await scanDirectory(item.path);
        } else if (item.name === 'page.tsx') {
          pageCount++;
          await analyzePage(item.path);
        }
      }
    };

    const analyzePage = async (filePath: string) => {
      const fileResponse = await fetch(
        `https://api.github.com/repos/netyvee/security/contents/${filePath}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3.raw',
          },
        }
      );

      if (!fileResponse.ok) return;

      const content = await fileResponse.text();
      const lines = content.split('\n');

      // Check for title tag
      const titleMatch = content.match(/<title>(.*?)<\/title>/);
      if (titleMatch) {
        const titleLength = titleMatch[1].length;
        if (titleLength < 55 || titleLength > 63) {
          issues.push({
            page: filePath,
            type: 'title_length',
            severity: 'medium',
            description: `Title is ${titleLength} characters (should be 55-63)`,
          });
        }
      } else {
        issues.push({
          page: filePath,
          type: 'missing_title',
          severity: 'high',
          description: 'Missing title tag',
        });
      }

      // Check for meta description
      const metaDescMatch = content.match(/<meta name="description" content="(.*?)"/);
      if (metaDescMatch) {
        const descLength = metaDescMatch[1].length;
        if (descLength < 145 || descLength > 155) {
          issues.push({
            page: filePath,
            type: 'meta_description_length',
            severity: 'medium',
            description: `Meta description is ${descLength} characters (should be 145-155)`,
          });
        }
      } else {
        issues.push({
          page: filePath,
          type: 'missing_meta_description',
          severity: 'high',
          description: 'Missing meta description',
        });
      }

      // Check for robots meta
      if (content.includes('noindex')) {
        issues.push({
          page: filePath,
          type: 'noindex',
          severity: 'high',
          description: 'Page has noindex directive',
        });
      }

      // Check for canonical tag
      if (!content.includes('<link rel="canonical"')) {
        issues.push({
          page: filePath,
          type: 'missing_canonical',
          severity: 'medium',
          description: 'Missing canonical tag',
        });
      }

      // Check for H1
      if (!content.match(/<h1[\s>]/i)) {
        issues.push({
          page: filePath,
          type: 'missing_h1',
          severity: 'high',
          description: 'Missing H1 tag',
        });
      }

      // Compliance check for forbidden terms
      for (const term of FORBIDDEN_TERMS) {
        lines.forEach((line, index) => {
          if (line.includes(term)) {
            complianceViolations.push({
              page: filePath,
              term,
              line: index + 1,
            });
          }
        });
      }
    };

    await scanDirectory('app');

    return NextResponse.json({
      pages: pageCount,
      issues,
      compliance_violations: complianceViolations,
      last_checked: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        pages: 0,
        issues: [],
        compliance_violations: [],
        last_checked: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
