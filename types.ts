
export interface Chapter {
  title: string | null;
  author: string | null;
  "written date": string | null;
  prologue: string | null;
  text: string | null;
  link: string | null;
  父记录: string | null;
}

export interface AppState {
  selectedChapterIndex: number;
  isSidebarOpen: boolean;
  searchQuery: string;
}
