import type { IResumeStorage } from '@/utils/initTemplateData'

export interface ResumePersistApi {

  getResume: () => Promise<IResumeStorage | null>;

  updateResume: (data: IResumeStorage) => Promise<any>;

}
