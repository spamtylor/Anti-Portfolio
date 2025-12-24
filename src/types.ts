export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string | null;
  created_at: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  epitaph: string;
}

export interface GraveyardProps {
  repos: Repository[];
}
