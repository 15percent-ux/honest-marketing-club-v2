import type { Icon as PhIcon } from '@phosphor-icons/react';
import {
  BookOpen,
  CalendarCheck,
  ChatCircleText,
  ChatsCircle,
  Check,
  Compass,
  Coffee,
  DeviceMobile,
  Eye,
  Footprints,
  ForkKnife,
  Gift,
  Handshake,
  House,
  Leaf,
  Lightbulb,
  Lock,
  MagicWand,
  NotePencil,
  Plant,
  Robot,
  Scissors,
  Sparkle,
  Storefront,
  Toolbox,
  UserCircle,
  VideoCamera,
  Wrench,
} from '@phosphor-icons/react';

/**
 * 設定ファイルでは絵文字ではなくアイコン名（英小文字）で指定する。
 * 名前が見つからない場合は、渡された文字（絵文字など）をそのまま表示する。
 */
const ICONS: Record<string, PhIcon> = {
  book: BookOpen,
  calendar: CalendarCheck,
  chat: ChatCircleText,
  chats: ChatsCircle,
  check: Check,
  compass: Compass,
  coffee: Coffee,
  phone: DeviceMobile,
  eye: Eye,
  steps: Footprints,
  food: ForkKnife,
  gift: Gift,
  handshake: Handshake,
  home: House,
  leaf: Leaf,
  idea: Lightbulb,
  lock: Lock,
  magic: MagicWand,
  note: NotePencil,
  plant: Plant,
  robot: Robot,
  scissors: Scissors,
  sparkle: Sparkle,
  shop: Storefront,
  toolbox: Toolbox,
  user: UserCircle,
  video: VideoCamera,
  wrench: Wrench,
};

export const isIconName = (s: string) => s in ICONS;

export function Icon({ name, size = 24, className = '', weight = 'regular' }: { name: string; size?: number; className?: string; weight?: 'regular' | 'duotone' | 'bold' | 'light' | 'fill' }) {
  const C = ICONS[name];
  if (!C) return <span className={className} style={{ fontSize: size * 0.9, lineHeight: 1 }} aria-hidden>{name}</span>;
  return <C size={size} weight={weight} className={className} aria-hidden />;
}
