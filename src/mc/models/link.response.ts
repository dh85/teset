export interface Application {
  id: string;
  scopes: Scope[];
}

export interface Scope {
  id: string;
  approved: string;
}
