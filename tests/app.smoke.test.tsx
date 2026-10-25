import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from '../src/layouts/AppShell';
import '../src/i18n/config';

describe('AppShell Smoke Test', () => {
  it('renders sidebar brand, games list, and footer', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/cs2']}>
          <AppShell liveSlugs={['cs2']}>
            <div data-testid="test-content">RageTV Content Stage</div>
          </AppShell>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Verify brand logo images (present in both navbar and footer)
    expect(screen.getByAltText('RageTV')).toBeDefined();
    expect(screen.getByAltText('RageTV Logo')).toBeDefined();

    // Verify presence of all 5 supported games in the document
    expect(screen.getByTitle('Counter-Strike 2')).toBeDefined();
    expect(screen.getByTitle('Valorant')).toBeDefined();
    expect(screen.getByTitle('PUBG: Battlegrounds')).toBeDefined();
    expect(screen.getByTitle('League of Legends')).toBeDefined();
    expect(screen.getByTitle('Dota 2')).toBeDefined();

    // Verify stage content rendered
    expect(screen.getByTestId('test-content')).toBeDefined();
  });
});
