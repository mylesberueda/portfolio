export interface SkillData {
  name: string;
  experience: 'low' | 'medium' | 'high' | 'expert';
  type: 'tech' | 'soft';
}

export interface Skill extends SkillData {
  icon: React.ReactNode;
}
