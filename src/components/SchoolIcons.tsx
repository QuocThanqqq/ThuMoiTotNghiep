import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

export type SchoolIconKind =
  | "book"
  | "bookStack"
  | "pencil"
  | "pen"
  | "chalkboard"
  | "bag"
  | "apple"
  | "daisy"
  | "cap"
  | "certificate"
  | "globe"
  | "ruler"
  | "bell"
  | "note"
  | "heart"
  | "door"
  | "lamp"
  | "palette"
  | "blocks"
  | "notebook"
  | "clock"
  | "calendar"
  | "ribbon"
  | "paperclip";

type AnimatedSchoolIconProps = {
  kind: SchoolIconKind;
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  style?: MotionStyle;
};

type ParallaxIcon = AnimatedSchoolIconProps & {
  strength?: number;
};

function SchoolIconShape({ kind }: { kind: SchoolIconKind }) {
  return (
    <span className={`school-icon-shape school-icon-${kind}`} aria-hidden="true">
      <span className="icon-part icon-part-a" />
      <span className="icon-part icon-part-b" />
      <span className="icon-part icon-part-c" />
      <span className="icon-mark" />
    </span>
  );
}

export function AnimatedSchoolIcon({
  kind,
  className = "",
  delay = 0,
  size = "md",
  style,
}: AnimatedSchoolIconProps) {
  return (
    <motion.span
      className={`school-icon-wrap school-icon-${size} ${className}`}
      style={style}
      animate={{
        y: [0, -8, 0],
        rotate: [-2, 2, -2],
        scale: [1, 1.015, 1],
      }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: 1.06,
        y: -7,
        rotate: 3,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <SchoolIconShape kind={kind} />
    </motion.span>
  );
}

function ParallaxIconItem({ strength = 8, ...icon }: ParallaxIcon & { mouseX: ReturnType<typeof useSpring>; mouseY: ReturnType<typeof useSpring> }) {
  const x = useTransform(icon.mouseX, [-500, 500], [-strength, strength]);
  const y = useTransform(icon.mouseY, [-500, 500], [-strength * 0.7, strength * 0.7]);

  return <AnimatedSchoolIcon {...icon} style={{ x, y }} />;
}

export function ParallaxIconLayer({
  icons,
  className = "",
}: {
  icons: ParallaxIcon[];
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left - rect.width / 2);
        mouseY.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      aria-hidden="true"
    >
      {icons.map((icon, index) => (
        <ParallaxIconItem
          key={`${icon.kind}-${index}`}
          {...icon}
          mouseX={springX}
          mouseY={springY}
        />
      ))}
    </motion.div>
  );
}
