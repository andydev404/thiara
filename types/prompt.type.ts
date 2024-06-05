export interface IPrompt {
  name: string;
  userId: string;
  categoryId: string | null;
  public: boolean;
}

export interface IPromptDetails extends IPrompt {
  id: string;
  createdAt: Date | null;
  category: ICategoryPrompt | null;
  promptVersions: IPromptVersion[];
}

export interface ICategoryPrompt {
  id: string;
  userId: string;
  title: string;
  createdAt: Date | null;
}

export interface IPromptVersion {
  id: string;
  createdAt: Date | null;
  value: string;
  promptId: string;
}
