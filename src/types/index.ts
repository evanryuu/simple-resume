import type React from 'react'

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export interface TextProps {
  value: string | number
  color?: string
  icon?: string
  iconColor?: Color
  style?: React.CSSProperties
  className?: string
  md?: boolean
}
