import { IPrompt } from "./prompt.type";

export interface ISidebarStore {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface ICategory {
  id: string;
  title: string;
  userId: string;
  createdAt: Date | null;
  prompts: IPrompt[];
}
