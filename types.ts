import React from 'react';

export interface ScrollProps {
  scrollY: number;
}

export interface AnimationProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export enum SectionId {
  HERO = 'hero',
  TRUTH = 'truth',
  CHALLENGE = 'challenge',
  Q_UNIVERSE = 'quniverse',
  INDIVIDUALS = 'individuals',
  ENTERPRISES = 'enterprises',
  UNIVERSITIES = 'universities',
  CITIES = 'cities',
  TECH = 'tech',
  CONTACT = 'contact'
}