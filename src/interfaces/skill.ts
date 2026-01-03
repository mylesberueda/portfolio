export type TechSkillRating = 'low' | 'medium' | 'high' | 'expert';
export type SoftSkillRating = 'low' | 'medium' | 'high';

interface BaseTechSkillData {
  name: string;
  type: 'tech';
  experience: TechSkillRating;
}

interface BaseSoftSkillData {
  name: string;
  type: 'soft';
  experience: SoftSkillRating;
}

export type SkillData = BaseTechSkillData | BaseSoftSkillData;

export interface Skill extends SkillData {
  icon: React.ReactNode;
}
