import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Flower2,
  GraduationCap,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const fadeUp = (delay: number): MotionProps => ({
  initial: { opacity: 1, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
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

const journey = [
  "Ngày đầu bước vào giảng đường",
  "Những giờ học đầy kỉ niệm",
  "Những ngày thực tập sư phạm",
  "Những học sinh đầu tiên",
  "Khoảnh khắc khoác áo tốt nghiệp",
  "Bắt đầu hành trình trở thành cô giáo",
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

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pt-32">
      <FloatingPetals />
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
  const getInitialGuestName = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("name")?.trim() ?? "";
  };

  const sharedGuestName = getInitialGuestName();
  const isSharedInvitation = sharedGuestName.length > 0;
  const [guestName, setGuestName] = useState(sharedGuestName);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy link");

  const createGuestLink = () => {
    const cleanName = guestName.trim();

    if (!cleanName) {
      return;
    }

    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("name", cleanName);
    url.hash = "invitation";
    setGeneratedLink(url.toString());
    setCopyLabel("Copy link");
  };

  const copyGuestLink = async () => {
    if (!generatedLink) {
      return;
    }

    await navigator.clipboard.writeText(generatedLink);
    setCopyLabel("Đã copy");
  };

  return (
    <section id="invitation" className="px-5 py-20 md:px-10">
      {!isSharedInvitation ? (
        <motion.div {...fadeUp(0)} className="mx-auto mb-8 max-w-2xl text-center">
          <label className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground" htmlFor="guest-name">
            Cá nhân hóa thiệp mời
          </label>
          <input
            id="guest-name"
            value={guestName}
            onChange={(event) => {
              setGuestName(event.target.value);
              setGeneratedLink("");
              setCopyLabel("Copy link");
            }}
            placeholder="Nhập tên người nhận"
            className="mt-4 h-13 w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--paper))] px-6 py-4 text-center text-base shadow-sm outline-none transition focus:border-[hsl(var(--sage-dark))] focus:ring-2 focus:ring-ring/30"
          />
          <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={createGuestLink}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[hsl(var(--deep-red))] px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_26px_rgba(127,45,38,0.2)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!guestName.trim()}
            >
              Tạo link
            </button>
            <button
              type="button"
              onClick={copyGuestLink}
              className="paper-glass inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[hsl(var(--brown))] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!generatedLink}
            >
              {copyLabel}
            </button>
          </div>
          {generatedLink ? (
            <p className="mx-auto mt-4 max-w-xl break-all rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--paper))]/75 px-4 py-3 text-sm leading-6 text-muted-foreground">
              {generatedLink}
            </p>
          ) : null}
        </motion.div>
      ) : null}

      <motion.div
        {...fadeUp(0.08)}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--paper))] shadow-[0_30px_80px_rgba(91,69,45,0.16)]"
      >
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
            {guestName.trim() || "................................................"}
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
            key={item}
            {...fadeUp(index * 0.06)}
            className="paper-glass paper-card group relative min-h-56 rounded-2xl p-6"
          >
            <span className="absolute -top-3 left-8 h-6 w-6 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--accent))]" />
            <span className="absolute right-8 top-5 text-3xl text-[hsl(var(--sage-dark))]/35">✿</span>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Kỉ niệm {index + 1}</p>
            <h3 className="mt-4 font-serif text-2xl text-[hsl(var(--foreground))]">{item}</h3>
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

function Mission() {
  return (
    <section className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.img
          {...fadeUp(0)}
          src={asset("school-cta-bg.png")}
          alt="Lớp học ấm áp với bảng phấn, sách vở, cửa lớp và hoa cúc"
          className="mx-auto aspect-square w-full max-w-[720px] rounded-[2rem] border border-[hsl(var(--border))] object-cover shadow-[0_26px_70px_rgba(91,69,45,0.16)]"
        />
        <motion.article
          {...fadeUp(0.08)}
          className="paper-glass mx-auto mt-14 max-w-5xl rounded-[2rem] p-7 leading-8 md:p-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
            Lời phê của
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold uppercase leading-tight text-[hsl(var(--sage-dark))] md:text-6xl">
            "Cô giáo tương lai"
          </h2>
          <div className="mt-8 space-y-6 text-lg text-[hsl(var(--foreground))] md:text-xl">
            <div>
              <p className="font-semibold">Nhận xét của giáo viên chủ nhiệm:</p>
              <ul className="mt-3 space-y-2 pl-5">
                <li className="list-disc">Luôn đồng hành cùng mình trong những năm tháng thanh xuân.</li>
                <li className="list-disc">Hoàn thành tốt nhiệm vụ làm một người bạn tuyệt vời.</li>
                <li className="list-disc">
                  Cần phát huy tinh thần đúng giờ và có mặt đầy đủ trong Lễ tốt nghiệp của cô giáo tương lai.
                </li>
              </ul>
            </div>
            <p>
              <span className="font-semibold text-[hsl(var(--deep-red))]">Đánh giá cuối kỳ:</span> Xuất sắc.
            </p>
            <p>
              <span className="font-semibold text-[hsl(var(--deep-red))]">Bài tập về nhà:</span> Đến dự Lễ tốt
              nghiệp của mình, mang theo một nụ cười thật tươi và cùng mình chụp thật nhiều ảnh đẹp.
            </p>
            <p>
              <span className="font-semibold text-[hsl(var(--deep-red))]">Lời nhắn của cô giáo tương lai:</span> Đề
              nghị bạn có mặt đúng giờ, trang phục chỉnh tề, tinh thần phấn khởi để thực hiện nhiệm vụ: Chụp ảnh kỷ
              niệm và chung vui cùng mình. Sự vắng mặt không có lý do chính đáng sẽ bị tính là một "thiệt thòi lớn"
              cho tình bạn của chúng ta. Hẹn gặp bạn nhé!
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function EventInfo() {
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
            <motion.article key={title} {...fadeUp(index * 0.07)} className="paper-glass relative rounded-2xl p-6">
              <Icon className="h-7 w-7 text-[hsl(var(--sage-dark))]" />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{value}</p>
            </motion.article>
          ))}
        </div>
        <motion.a
          {...fadeUp(0.1)}
          href="https://www.google.com/maps/place/%C4%90%E1%BA%A1i+H%E1%BB%8Dc+S%C6%B0+Ph%E1%BA%A1m+-+280+An+D%C6%B0%C6%A1ng+V%C6%B0%C6%A1ng/@10.7609921,106.6800193,16z/data=!4m14!1m7!3m6!1s0x31752f1b8e6575c3:0x48d253bde1931e59!2zxJDhuqFpIEjhu41jIFPGsCBQaOG6oW0gLSAyODAgQW4gRMawxqFuZyBWxrDGoW5n!8m2!3d10.7609868!4d106.6825942!16s%2Fg%2F1tv21nb4!3m5!1s0x31752f1b8e6575c3:0x48d253bde1931e59!8m2!3d10.7609868!4d106.6825942!16s%2Fg%2F1tv21nb4?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D"
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
  return (
    <section className="relative px-5 py-20 md:px-10">
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
