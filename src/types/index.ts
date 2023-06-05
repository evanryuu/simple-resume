import type React from 'react'

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type IconSize = TextSize

export interface TextProps {
  value: string | number
  color?: string
  icon?: string
  iconColor?: Color
  iconSize?: IconSize
  style?: React.CSSProperties
  /** className not working, change to classes */
  classes?: string
  md?: boolean
  /** className not working */
  // className?: string

}

export type BaseInputType = 'color' | 'string' | 'number' | 'textarea' | 'boolean' | 'switch' | 'slider' | 'select'

export interface BaseComponentProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}
