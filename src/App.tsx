import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Clock,
  Flower2,
  GraduationCap,
  Heart,
  MapPin,
  Navigation,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionProps,
  type MotionValue,
} from "framer-motion";
import {
  AnimatedSchoolIcon,
  ParallaxIconLayer,
  type SchoolIconKind,
} from "./components/SchoolIcons";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const fadeUp = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const navLinks = [
  ["Trang chủ", "home"],
  ["Lời mời", "invitation"],
  ["Hành trình", "journey"],
  ["Thông tin", "info"],
];

const eventInfo = [
  { icon: Clock, title: "Thời gian", value: "11 giờ" },
  { icon: CalendarDays, title: "Ngày tổ chức", value: "21/07 - Thứ Ba" },
  {
    icon: MapPin,
    title: "Địa điểm",
    value: "Trường Đại học Sư phạm Thành phố Hồ Chí Minh",
  },
  {
    icon: Sparkles,
    title: "Trang phục gợi ý",
    value: "Thanh lịch, trang nhã hoặc màu sắc nhẹ nhàng",
  },
];

const journey: { title: string; icon: SchoolIconKind }[] = [
  { title: "Ngày đầu bước vào giảng đường", icon: "book" },
  { title: "Những giờ học đầy kỉ niệm", icon: "notebook" },
  { title: "Những ngày thực tập sư phạm", icon: "chalkboard" },
  { title: "Những học sinh đầu tiên", icon: "blocks" },
  { title: "Khoảnh khắc khoác áo tốt nghiệp", icon: "cap" },
  { title: "Bắt đầu hành trình trở thành cô giáo", icon: "globe" },
];

const gallery = [
  { caption: "Những giờ lên lớp", image: "memory-1.jpg", position: "center" },
  { caption: "Kỉ niệm thực tập", image: "memory-2.jpg", position: "center" },
  { caption: "Cùng những học sinh thân thương", image: "memory-3.jpg", position: "center" },
  { caption: "Lớp học hạnh phúc", image: "memory-4.jpg", position: "center" },
  { caption: "Khoảnh khắc trưởng thành", image: "memory-5.jpg", position: "center" },
  { caption: "Một ngày thật đáng nhớ", image: "memory-6.jpg", position: "center" },
];

function PaperButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "glass";
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={
        variant === "primary"
          ? "inline-flex min-h-12 items-center justify-center rounded-full bg-[hsl(var(--deep-red))] px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_26px_rgba(127,45,38,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          : "paper-glass inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[hsl(var(--brown))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      }
    >
      {children}
    </motion.button>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--sage-dark))]/40 bg-[hsl(var(--paper))]/80 text-[hsl(var(--sage-dark))]">
      <GraduationCap className="h-5 w-5" />
      <Flower2 className="absolute -right-1 -top-1 h-4 w-4 text-[hsl(var(--accent-foreground))]" />
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-6 py-4 transition-all duration-300 md:px-20 ${
        scrolled
          ? "border-b border-[hsl(var(--border))]/45 bg-[hsl(var(--cream))]/78 shadow-[0_12px_32px_rgba(91,69,45,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a href="#home" className="flex items-center gap-3" aria-label="Trang chủ lễ tốt nghiệp">
          <Logo />
          <span className="font-serif text-xl font-semibold text-[hsl(var(--foreground))]">
            Lễ Tốt Nghiệp
          </span>
        </a>

        <nav className="hidden items-center gap-3 text-sm lg:flex" aria-label="Điều hướng chính">
          {navLinks.map(([label, id], index) => (
            <span key={id} className="flex items-center gap-3">
              {index > 0 ? <Heart className="h-3 w-3 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" /> : null}
              <a className="text-muted-foreground transition hover:text-foreground" href={`#${id}`}>
                {label}
              </a>
            </span>
          ))}
        </nav>

      </div>
    </header>
  );
}

function FloatingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, index) => (
        <span
          key={index}
          className="petal"
          style={{
            left: `${8 + index * 7}%`,
            animationDelay: `${index * 0.7}s`,
            animationDuration: `${8 + (index % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

function Daisy({ className = "" }: { className?: string }) {
  return (
    <div className={`daisy-cluster ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <i />
    </div>
  );
}

function Hero() {
  const heroIcons = [
    { kind: "cap", className: "right-[8%] top-28 hidden md:block", size: "md", delay: 0.1, strength: 7 },
    { kind: "pencil", className: "left-[3%] top-[34%] hidden lg:block", size: "lg", delay: 0.4, strength: 10 },
    { kind: "book", className: "left-[48%] top-[56%] hidden xl:block", size: "md", delay: 0.8, strength: 6 },
    { kind: "apple", className: "right-[14%] bottom-[24%] hidden md:block", size: "sm", delay: 1.1, strength: 8 },
    { kind: "daisy", className: "left-[30%] top-[18%] hidden lg:block", size: "sm", delay: 1.4, strength: 7 },
    { kind: "bag", className: "right-[4%] bottom-[11%] hidden lg:block", size: "md", delay: 0.2, strength: 9 },
    { kind: "heart", className: "right-[34%] top-[30%] hidden md:block", size: "sm", delay: 1.7, strength: 5 },
  ] as const;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pt-32">
      <FloatingPetals />
      <ParallaxIconLayer icons={[...heroIcons]} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeUp(0.05)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="torn-paper relative overflow-hidden rounded-[2rem] bg-[hsl(var(--paper))] p-3 shadow-[0_24px_60px_rgba(91,69,45,0.18)]">
            <img
              src={asset("classroom-invitation.jpg")}
              alt="Minh họa thiệp tốt nghiệp với cửa lớp, bảng phấn và chân dung tốt nghiệp"
              className="aspect-[4/3] h-auto w-full rounded-[1.5rem] object-cover object-center lg:h-[560px]"
            />
          </div>
          <motion.div
            className="paper-note absolute -right-4 top-8 max-w-44 rotate-6 rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--paper))] px-4 py-3 font-hand text-2xl text-[hsl(var(--brown))] shadow-lg"
            animate={{ rotate: [5, 8, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Hành trình mới bắt đầu từ đây
          </motion.div>
        </motion.div>

        <div className="space-y-7">
          <motion.p {...fadeUp(0)} className="font-hand text-4xl text-[hsl(var(--brown))]">
            Lớp học hạnh phúc
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif text-6xl font-semibold uppercase leading-none tracking-wide text-[hsl(var(--sage-dark))] md:text-8xl"
          >
            Lễ Tốt Nghiệp
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="font-hand text-4xl text-[hsl(var(--deep-red))]">
            Hành trình mới bắt đầu từ đây
          </motion.p>
          <motion.p {...fadeUp(0.3)} className="max-w-2xl text-lg leading-8 text-[hsl(var(--hero-subtitle))]">
            Một chặng đường khép lại, một hành trình đầy yêu thương đang chờ phía trước.
          </motion.p>
          <motion.div {...fadeUp(0.4)} className="flex flex-col gap-3 sm:flex-row">
            <PaperButton onClick={() => document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" })}>
              Mở thư mời
            </PaperButton>
            <PaperButton
              variant="glass"
              onClick={() => document.getElementById("info")?.scrollIntoView({ behavior: "smooth" })}
            >
              Xem thông tin buổi lễ
            </PaperButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  const [guestName, setGuestName] = useState("");

  return (
    <section id="invitation" className="px-5 py-20 md:px-10">
      <motion.div {...fadeUp(0)} className="mx-auto mb-8 max-w-xl text-center">
        <label className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground" htmlFor="guest-name">
          Cá nhân hóa thiệp mời
        </label>
        <input
          id="guest-name"
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
          placeholder="Nhập tên của bạn"
          className="mt-4 h-13 w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--paper))] px-6 py-4 text-center text-base shadow-sm outline-none transition focus:border-[hsl(var(--sage-dark))] focus:ring-2 focus:ring-ring/30"
        />
      </motion.div>

      <motion.div
        {...fadeUp(0.08)}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper))] shadow-[0_30px_80px_rgba(91,69,45,0.16)]"
      >
        <AnimatedSchoolIcon kind="paperclip" size="sm" delay={0.1} className="absolute left-9 top-12 z-10" />
        <AnimatedSchoolIcon kind="pencil" size="sm" delay={0.6} className="absolute right-12 top-24 z-10 hidden sm:block" />
        <AnimatedSchoolIcon kind="chalkboard" size="sm" delay={1} className="absolute bottom-28 left-12 z-10 hidden sm:block" />
        <AnimatedSchoolIcon kind="certificate" size="sm" delay={1.2} className="absolute bottom-20 right-14 z-10" />
        <AnimatedSchoolIcon kind="ruler" size="sm" delay={1.5} className="absolute left-1/2 top-9 z-10 hidden md:block" />
        <AnimatedSchoolIcon kind="notebook" size="sm" delay={1.8} className="absolute bottom-10 left-[44%] z-10 hidden md:block" />
        <div className="page-corner left-8 top-8" />
        <div className="page-corner bottom-8 left-8 rotate-[-90deg]" />
        <div className="page-corner right-8 top-8 rotate-90" />
        <div className="page-corner bottom-8 right-8 rotate-180" />

        <div className="relative flex min-h-[620px] flex-col items-center justify-center px-7 py-14 text-center md:px-16">
          <Heart className="mb-7 h-5 w-5 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
          <p className="font-serif text-2xl text-[hsl(var(--foreground))]">Trân trọng kính mời</p>
          <motion.div
            key={guestName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6 min-h-9 w-full max-w-sm border-b border-dotted border-[hsl(var(--brown))] font-hand text-3xl text-[hsl(var(--deep-red))]"
          >
            {guestName || "................................................"}
          </motion.div>
          <p className="text-lg text-muted-foreground">đến dự</p>
          <h2 className="mt-4 font-serif text-5xl uppercase tracking-wide text-[hsl(var(--sage-dark))] md:text-6xl">
            Lễ Tốt Nghiệp
          </h2>
          <p className="mt-8 max-w-sm font-hand text-3xl leading-9 text-[hsl(var(--brown))]">
            Sự hiện diện của bạn là niềm vinh hạnh của mình.
          </p>
          <div className="mt-10 w-full max-w-md space-y-5 text-left">
            <InfoRow icon={Clock} text="Vào lúc: 11 giờ" />
            <InfoRow icon={CalendarDays} text="Ngày 21 tháng 7 - Thứ Ba" />
            <InfoRow icon={MapPin} text="Địa điểm: Trường Đại học Sư phạm Thành phố Hồ Chí Minh" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function InfoRow({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--accent-foreground))]/30 bg-[hsl(var(--accent))]/45 text-[hsl(var(--brown))]">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-lg font-medium leading-7 text-[hsl(var(--foreground))]">{text}</p>
    </div>
  );
}

function Journey() {
  return (
    <section id="journey" className="px-5 py-20 md:px-10">
      <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-5xl font-semibold text-[hsl(var(--foreground))] md:text-6xl">
          Một hành trình được viết bằng{" "}
          <span className="font-hand text-[hsl(var(--deep-red))]">yêu thương</span>
        </h2>
      </motion.div>
      <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {journey.map((item, index) => {
          const memory = gallery[index % gallery.length];

          return (
          <motion.article
            key={item.title}
            {...fadeUp(index * 0.06)}
            className="paper-glass paper-card group relative min-h-56 rounded-2xl p-6"
          >
            <AnimatedSchoolIcon kind={item.icon} size="sm" delay={index * 0.15} className="absolute -right-3 -top-5 z-10" />
            <span className="absolute -top-3 left-8 h-6 w-6 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--accent))]" />
            <span className="absolute right-8 top-5 text-3xl text-[hsl(var(--sage-dark))]/35">✿</span>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Kỉ niệm {index + 1}</p>
            <h3 className="mt-4 font-serif text-2xl text-[hsl(var(--foreground))]">{item.title}</h3>
            <img
              src={asset(memory.image)}
              alt={memory.caption}
              loading="lazy"
              className="mt-5 aspect-[4/3] w-full rounded-xl border border-[hsl(var(--border))] object-cover shadow-sm"
              style={{ objectPosition: memory.position }}
            />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Một mảnh ký ức dịu dàng trong hành trình học tập và lớn lên cùng nghề giáo.
            </p>
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function WordReveal({
  text,
  progress,
  className,
}: {
  text: string;
  progress: MotionValue<number>;
  className: string;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, index) => (
        <RevealWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={progress}
        />
      ))}
    </p>
  );
}

function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index / total, index / total + 0.18], [0.22, 1]);
  const clean = word.toLowerCase().replace(/[.,]/g, "");
  const highlighted = ["gieo", "chữ", "yêu", "thương", "lớp", "học", "hạnh", "phúc"].includes(clean);

  return (
    <motion.span
      style={{ opacity }}
      className={highlighted ? "text-[hsl(var(--deep-red))]" : "text-[hsl(var(--foreground))]"}
    >
      {word}{" "}
    </motion.span>
  );
}

function Mission() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 35%"],
  });

  return (
    <section ref={ref} className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.img
          {...fadeUp(0)}
          src={asset("school-cta-bg.png")}
          alt="Lớp học ấm áp với bảng phấn, sách vở, cửa lớp và hoa cúc"
          className="mx-auto aspect-square w-full max-w-[720px] rounded-[2rem] border border-[hsl(var(--border))] object-cover shadow-[0_26px_70px_rgba(91,69,45,0.16)]"
        />
        <div className="mt-14">
          <WordReveal
            progress={scrollYProgress}
            className="font-serif text-3xl font-semibold leading-tight md:text-5xl"
            text="Tốt nghiệp không chỉ là dấu chấm kết thúc cho những năm tháng giảng đường, mà còn là cánh cửa mở ra hành trình gieo chữ, gieo yêu thương và cùng học sinh tạo nên một lớp học hạnh phúc."
          />
          <WordReveal
            progress={scrollYProgress}
            className="mt-9 text-2xl font-medium leading-snug md:text-3xl"
            text="Mỗi bài giảng sẽ là một hạt mầm, mỗi học sinh sẽ là một câu chuyện và mỗi ngày đến lớp sẽ là một ngày đáng nhớ."
          />
        </div>
      </div>
    </section>
  );
}

function EventInfo() {
  const infoIcons: SchoolIconKind[] = ["clock", "calendar", "globe", "ribbon"];

  return (
    <section id="info" className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.32em] text-muted-foreground">
          THÔNG TIN BUỔI LỄ
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="mt-4 max-w-3xl font-serif text-5xl font-semibold md:text-6xl">
          Hẹn bạn tại{" "}
          <span className="font-hand text-[hsl(var(--deep-red))]">ngày đặc biệt</span>{" "}
          của mình
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {eventInfo.map(({ icon: Icon, title, value }, index) => (
            <motion.article key={title} {...fadeUp(index * 0.07)} className="paper-glass relative rounded-2xl p-6 pt-12">
              <AnimatedSchoolIcon kind={infoIcons[index]} size="sm" delay={index * 0.2} className="absolute -top-5 right-5 z-10" />
              <Icon className="h-7 w-7 text-[hsl(var(--sage-dark))]" />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{value}</p>
            </motion.article>
          ))}
        </div>
        <motion.a
          {...fadeUp(0.1)}
          href="https://www.google.com/maps/search/?api=1&query=Tr%C6%B0%E1%BB%9Dng%20%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20S%C6%B0%20ph%E1%BA%A1m%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[hsl(var(--sage-dark))] px-7 py-3 text-sm font-semibold text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Navigation className="h-4 w-4" />
          Xem đường đi
        </motion.a>
      </div>
    </section>
  );
}

function Gallery() {
  const galleryIcons = [
    { kind: "pencil", className: "left-[7%] top-32 hidden md:block", size: "sm", delay: 0.2, strength: 8 },
    { kind: "paperclip", className: "right-[12%] top-20 hidden md:block", size: "sm", delay: 0.6, strength: 6 },
    { kind: "apple", className: "left-[47%] top-36 hidden lg:block", size: "sm", delay: 1, strength: 7 },
    { kind: "daisy", className: "right-[5%] bottom-24 hidden lg:block", size: "sm", delay: 1.4, strength: 7 },
    { kind: "heart", className: "left-[18%] bottom-12 hidden md:block", size: "sm", delay: 1.8, strength: 5 },
  ] as const;

  return (
    <section className="relative px-5 py-20 md:px-10">
      <ParallaxIconLayer icons={[...galleryIcons]} />
      <motion.h2 {...fadeUp(0)} className="text-center font-serif text-5xl font-semibold md:text-6xl">
        Những mảnh ghép thanh xuân
      </motion.h2>
      <div className="mx-auto mt-12 flex max-w-7xl gap-5 overflow-x-auto pb-6 md:grid md:grid-cols-3 md:overflow-visible">
        {gallery.map((item, index) => (
          <motion.figure
            key={item.image}
            {...fadeUp(index * 0.06)}
            className="polaroid group min-w-[260px] rotate-[-2deg] rounded-sm bg-[hsl(var(--paper))] p-4 pb-8 shadow-[0_18px_35px_rgba(91,69,45,0.14)] transition hover:rotate-0 hover:scale-[1.02]"
          >
            <div className="absolute left-1/2 top-[-10px] h-6 w-24 -translate-x-1/2 rotate-[-2deg] bg-[#e7d7b9]/80" />
            <img
              src={asset(item.image)}
              alt={item.caption}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
              style={{ objectPosition: item.position }}
            />
            <figcaption className="mt-4 font-hand text-2xl text-[hsl(var(--brown))]">
              {item.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 py-24 text-center md:px-10">
      <img
        src={asset("school-cta-bg.png")}
        alt="Lớp học ấm áp với bảng phấn, sách vở và hoa cúc"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-[hsl(var(--cream))]/60" />
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <AnimatedSchoolIcon kind="door" size="lg" delay={0.1} className="absolute left-[8%] top-16 hidden md:block" />
        <AnimatedSchoolIcon kind="cap" size="md" delay={0.5} className="absolute right-[14%] top-20 hidden md:block" />
        <AnimatedSchoolIcon kind="book" size="lg" delay={0.9} className="absolute bottom-12 left-[18%] hidden lg:block" />
        <AnimatedSchoolIcon kind="note" size="sm" delay={1.3} className="absolute right-[25%] bottom-16 hidden md:block" />
        <AnimatedSchoolIcon kind="daisy" size="sm" delay={1.7} className="absolute bottom-10 right-[9%] hidden md:block" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <Logo />
        <motion.h2 {...fadeUp(0)} className="mt-8 font-serif text-5xl font-semibold md:text-7xl">
          <span className="font-hand text-[hsl(var(--deep-red))]">Hẹn gặp bạn</span>{" "}
          tại lễ tốt nghiệp
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 text-lg leading-8 text-muted-foreground">
          Cảm ơn bạn vì đã trở thành một phần trong hành trình đặc biệt này.
        </motion.p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 border-t border-[hsl(var(--border))] pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">© 2026 - Thiệp mời lễ tốt nghiệp của Ngọc Huệ.</p>
          <p className="mt-2 font-hand text-3xl text-[hsl(var(--brown))]">Hành trình mới bắt đầu từ đây.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <a href="#info" className="hover:text-foreground">Thông tin buổi lễ</a>
          <a href="#info" className="hover:text-foreground">Chỉ đường</a>
          <a href="#home" className="hover:text-foreground">Liên hệ</a>
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", Boolean(reduceMotion));
  }, [reduceMotion]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="paper-grain" />
      <Navbar />
      <Hero />
      <Invitation />
      <Journey />
      <Mission />
      <Gallery />
      <EventInfo />
      <FinalCta />
      <Footer />
    </main>
  );
}
