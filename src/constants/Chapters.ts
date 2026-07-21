export interface Chapter {
  id: number;
  chapter: string;
  title: string;
  subtitle: string;
  icon: string;
  screen: string;
  color: string;
}

const Chapters: Chapter[] = [
  {
    id: 1,
    chapter: "Chapter I",
    title: "The Girl Who Changed Everything",
    subtitle: "The beginning of a beautiful story.",
    icon: "🌸",
    screen: "AboutScreen",
    color: "#FFB6C1",
  },

  {
    id: 2,
    chapter: "Chapter II",
    title: "Things I Admire",
    subtitle: "The little things that make you special.",
    icon: "💖",
    screen: "ComplimentsScreen",
    color: "#FFC8DD",
  },

  {
    id: 3,
    chapter: "Chapter III",
    title: "Little Compliments",
    subtitle: "Kind words from the heart.",
    icon: "💌",
    screen: "ComplimentsScreen",
    color: "#F8BBD0",
  },

  {
    id: 4,
    chapter: "Chapter IV",
    title: "Moments & Memories",
    subtitle: "A collection of unforgettable moments.",
    icon: "📷",
    screen: "GalleryScreen",
    color: "#D8B4FE",
  },

  {
    id: 5,
    chapter: "Chapter V",
    title: "Songs That Remind Me Of You",
    subtitle: "Every song tells a little story.",
    icon: "🎵",
    screen: "MusicScreen",
    color: "#C4B5FD",
  },

  {
    id: 6,
    chapter: "Chapter VI",
    title: "Letters From My Heart",
    subtitle: "Messages written with sincerity.",
    icon: "💌",
    screen: "LettersScreen",
    color: "#FDA4AF",
  },

  {
    id: 7,
    chapter: "Chapter VII",
    title: "The Secret Garden",
    subtitle: "A magical place filled with surprises.",
    icon: "🌹",
    screen: "SecretGardenScreen",
    color: "#BBF7D0",
  },

  {
    id: 8,
    chapter: "Chapter VIII",
    title: "One Wish Every Day",
    subtitle: "A new positive thought each day.",
    icon: "🌠",
    screen: "WishTreeScreen",
    color: "#BFDBFE",
  },

  {
    id: 9,
    chapter: "Chapter IX",
    title: "The Final Page",
    subtitle: "A heartfelt thank you for reading.",
    icon: "❤️",
    screen: "FinalLetterScreen",
    color: "#FCA5A5",
  },
];

export default Chapters;