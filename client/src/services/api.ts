const apiBase = '/api';

type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  period: string;
  funder: string;
  status: string;
  categories: string[];
  image: string;
  gallery: string[];
  goals: string[];
  activities: string[];
  keyResults: string[];
};

type Document = {
  slug: string;
  title: string;
  category: string;
  date: string;
  size?: string;
  fileType: string;
  summary: string;
  url: string;
};

type GalleryItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  placeholder?: boolean;
};

type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  gallery: string[];
  featured: boolean;
};

async function request<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include',
    ...options
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Erreur dans la requête API');
  }

  return response.json() as Promise<T>;
}

export function loginAdmin(email: string, password: string) {
  return request<{ user: { id: number; email: string; name?: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export function logoutAdmin() {
  return request('/auth/logout', { method: 'POST' });
}

export function getCurrentUser() {
  return request<{ user: { id: number; email: string; name?: string } }>('/auth/me');
}

// Admin projects
export function getAdminProjects() {
  return request<{ slug: string; title: string; status: string; created_at: string }[]>('/admin/projects');
}

export function createAdminProject(payload: { slug: string; title: string; excerpt?: string; content?: string }) {
  return request('/admin/projects', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateAdminProject(slug: string, payload: { title: string; excerpt?: string; content?: string }) {
  return request(`/admin/projects/${slug}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export function deleteAdminProject(slug: string) {
  return request(`/admin/projects/${slug}`, { method: 'DELETE' });
}

export function publishAdminProject(slug: string) {
  return request(`/admin/projects/${slug}/publish`, { method: 'POST' });
}

// Admin messages
export function getAdminContacts() {
  return request<{
    id: number;
    name: string;
    email: string;
    organisation?: string;
    subject: string;
    message: string;
    category: string;
    status: string;
    received_at: string;
  }[]>('/admin/contacts');
}

export function updateContactStatus(id: number, status: string) {
  return request(`/admin/contacts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export function getHomeContent() {
  return request('/content/home');
}

export function getProjects() {
  return request<Project[]>('/projects');
}

export function getProject(slug: string) {
  return request<Project>(`/projects/${slug}`);
}

export function getDocuments() {
  return request<Document[]>('/documents');
}

export function getGallery() {
  return request<GalleryItem[]>('/gallery');
}

export function getPartners() {
  return request<{ slug: string; name: string; logo?: string | null; description?: string; projects?: string[] }[]>('/partners');
}

type ContactPayload = {
  name: string;
  email: string;
  organisation?: string;
  subject: string;
  message: string;
  category: 'Partenariat' | 'Projet' | 'Information' | 'Financement' | 'Autre';
};

export function postContact(payload: ContactPayload) {
  return request<{ message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function createGalleryItem(item: Pick<GalleryItem, 'title' | 'category' | 'description' | 'image'>) {
  return request<GalleryItem>('/admin/gallery', {
    method: 'POST',
    body: JSON.stringify(item)
  });
}

export function deleteGalleryItem(slug: string) {
  return request<GalleryItem>(`/admin/gallery/${slug}`, {
    method: 'DELETE'
  });
}

export function getAdminStats() {
  return request<{ projets: number; actualites: number; documents: number; photos: number; partenaires: number; messages: number }>('/admin/stats');
}

export function getNews() {
  return request<NewsArticle[]>('/news');
}

export function getNewsArticle(slug: string) {
  return request<NewsArticle>(`/news/${slug}`);
}

export function createAdminNews(payload: Partial<NewsArticle>) {
  return request<NewsArticle>('/admin/news', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateAdminNews(slug: string, payload: Partial<NewsArticle>) {
  return request<NewsArticle>(`/admin/news/${slug}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export function deleteAdminNews(slug: string) {
  return request<NewsArticle>(`/admin/news/${slug}`, { method: 'DELETE' });
}

export function createAdminDocument(payload: Partial<Document>) {
  return request<Document>('/admin/documents', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateAdminDocument(slug: string, payload: Partial<Document>) {
  return request<Document>(`/admin/documents/${slug}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export function deleteAdminDocument(slug: string) {
  return request<Document>(`/admin/documents/${slug}`, { method: 'DELETE' });
}

export type Partner = { slug: string; name: string; logo?: string | null; description?: string; projects?: string[] };

export function createAdminPartner(payload: Partial<Partner>) {
  return request<Partner>('/admin/partners', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateAdminPartner(slug: string, payload: Partial<Partner> & { projects?: string[] | string }) {
  return request<Partner>(`/admin/partners/${slug}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export function deleteAdminPartner(slug: string) {
  return request<Partner>(`/admin/partners/${slug}`, { method: 'DELETE' });
}

export type AdminUser = { id: number; email: string; name?: string | null; role: string; created_at?: string };

export function getAdminUsers() {
  return request<AdminUser[]>('/admin/users');
}

export function createAdminUser(payload: { email: string; password: string; name?: string; role?: string }) {
  return request<AdminUser>('/admin/users', { method: 'POST', body: JSON.stringify(payload) });
}

export function deleteAdminUser(id: number) {
  return request<AdminUser>(`/admin/users/${id}`, { method: 'DELETE' });
}

export type { Project, Document, NewsArticle, GalleryItem };
